package main

import (
	"backend/conversation"
	"backend/imageServer"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/rs/cors"
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
	imageStorage *imageServer.ImageStorage
}

func newChatServer() ChatServer {
	c := conversation.NewConversation()
	i := imageServer.NewImageStorage()

	return ChatServer{conversation: &c, imageStorage: &i}
}

func (s *ChatServer) GetMessages(w http.ResponseWriter, r *http.Request) {
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
}

// Handler that retrieves images from a directory and returns an array of images
func GetImage(w http.ResponseWriter, r *http.Request) {

	imagePath := "./public/images"

	// Open the image file
	imgFile, err := os.Open(imagePath)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer imgFile.Close()

	// Get the image file size and read the contents into a byte array
	fileInfo, _ := imgFile.Stat()
	size := fileInfo.Size()
	buffer := make([]byte, size)
	_, err = imgFile.Read(buffer)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Set the content type header and write the image data to the response writer
	w.Header().Set("Content-Type", "image/jpeg")
	w.Header().Set("Content-Length", strconv.Itoa(int(size)))
	w.Write(buffer)
}

func StartServer(port string) {
	chatServer := newChatServer()

	mux := http.NewServeMux()
	mux.HandleFunc("/getMessages", chatServer.conversation.GetMessages)
	mux.HandleFunc("/write", chatServer.writeMessage)
	mux.HandleFunc("/deleteAllMessages", chatServer.deleteAllMessages)

	mux.HandleFunc("/getImage", chatServer.GetImage)

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
