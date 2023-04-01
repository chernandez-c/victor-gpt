package main

import (
	"backend/conversation"
	"encoding/json"
	"fmt"
	"github.com/rs/cors"
	"log"
	"net/http"
	"time"
)

type ApiNewMessage struct {
	From    string `json:"from"`
	Message string `json:"message"`
	To      string `json:"to"`
}

func (m *ApiNewMessage) ToConversationMessage() conversation.Message {
	return conversation.NewMessage(m.From, m.Message, m.From)
}

type ChatServer struct {
	conversation *conversation.Conversation
}

func newChatServer() ChatServer {
	c := conversation.NewConversation()

	addWelcomeMessages(&c)

	return ChatServer{conversation: &c}
}

func (s *ChatServer) getMessages(w http.ResponseWriter, r *http.Request) {
	jsonString, _ := json.Marshal(s.conversation.GetMessages())
	fmt.Fprintln(w, string(jsonString))
	return
}

func (s *ChatServer) writeMessage(w http.ResponseWriter, r *http.Request) {
	var body ApiNewMessage
	err := json.NewDecoder(r.Body).Decode(&body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	message := body.Message
	// TODO: this should be an invariant of the Message struct.
	if message == "" {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	m := conversation.NewMessage(body.From, message, body.To)
	s.conversation.AppendMessage(m)

	jsonMsg, _ := json.Marshal(m)
	_, _ = fmt.Fprintln(w, string(jsonMsg))
}

func (s *ChatServer) deleteAllMessages(w http.ResponseWriter, r *http.Request) {
	s.conversation.DeleteAllMessages()
	addWelcomeMessages(s.conversation)
}

func addWelcomeMessages(c *conversation.Conversation) {
	m := conversation.NewMessage("Chat-GPT", "¿Qué quieres aprender hoy, máquina?\n\n![Chicken](https://i.imgur.com/KXNWk.gif)", "Ateneo")
	c.AppendMessage(m)
}

func StartServer(port string) {
	chatServer := newChatServer()

	mux := http.NewServeMux()
	mux.HandleFunc("/getMessages", chatServer.getMessages)
	mux.HandleFunc("/write", chatServer.writeMessage)
	mux.HandleFunc("/deleteAllMessages", chatServer.deleteAllMessages)

	handler := cors.AllowAll().Handler(logRequest(mux))
	server := &http.Server{
		Handler:      handler,
		Addr:         port,
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	fmt.Printf("Listening on %s.\n", port)

	log.Fatal(server.ListenAndServe())
}

func logRequest(handler http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Printf("%s %s %s\n", r.RemoteAddr, r.Method, r.URL)
		handler.ServeHTTP(w, r)
	})
}