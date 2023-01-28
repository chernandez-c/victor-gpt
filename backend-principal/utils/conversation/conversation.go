
package conversation

import (
	"fmt"
	"net/http"
	"sync"
	"encoding/json"

	"github.com/gorilla/mux"
)


var cerrojo sync.Mutex

type Message struct {
	From    string `json:"from"`
	Message string `json:"message"`
	To 	string `json:"to,omitempty"`
}

func NewMessage(from string, message string, to string) Message {
    if from == "" {
        from = "anonymous"
    }
	if to == "" {
		return Message{From: from, Message: message}
    }
    return Message{From: from, Message: message, To: to}
}


type ErrorResponse struct {
	Error  string `json:"error"`
	Status int    `json:"status"`
}


// Los mensajes que escriba la persona A se asignarán a la clave A del map
var inbox map[string][]Message



func InitializeConversationVariables() {
	inbox = make(map[string][]Message)
}


/*******************************************/
/*                  POST                 ***/
/*******************************************/
func handleMessagePost(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	var destinatario string = vars["destinatario"]

	var body Message
    err := json.NewDecoder(r.Body).Decode(&body)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }
	message := body.Message
	remitente := body.From
	if message == "" {
			w.WriteHeader(http.StatusBadRequest)
			return
		}
	
	msg := NewMessage(remitente, message, "")
	cerrojo.Lock()
	inbox[destinatario] = append(inbox[destinatario], msg)
	cerrojo.Unlock()

	jsonMsg, _ := json.Marshal(msg)
	jsonMsgtring := string(jsonMsg)

	fmt.Fprintln(w, string(jsonMsgtring))
}
	
/*******************************************/
/*                  GET                  ***/
/*******************************************/

func handleMessageGet(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	var cliente string = vars["cliente"]
	if len(inbox[cliente]) == 0 {
		w.WriteHeader(http.StatusNotFound)
		return
	} else {
		cerrojo.Lock()
		message := inbox[cliente][0]
		inbox[cliente] = inbox[cliente][1:]
	
		cerrojo.Unlock()
		w.Header().Set("Content-Type", "application/json")
		jsonString, _ := json.Marshal(message)
		fmt.Fprintln(w, string(jsonString))
		return
	}
}


	
func handleMessagesGet(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	var cliente string = vars["cliente"]
	if len(inbox[cliente]) == 0 {
		w.WriteHeader(http.StatusNotFound)
		return
	} else {

		messages := inbox[cliente]
		w.Header().Set("Content-Type", "application/json")
		jsonString, _ := json.Marshal(messages)
		fmt.Fprintln(w, string(jsonString))
		return
	}
}

func handleMessagesDelete(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	var cliente string = vars["cliente"]
	cerrojo.Lock()
	inbox[cliente] = []Message{}
	cerrojo.Unlock()
	w.WriteHeader(http.StatusOK)
	return
}



// getCompletionBody Returns the body of the request to create a completion.
func getDummyMessages(w http.ResponseWriter, r *http.Request) {
	mensajes := []string{"Eres un pelele", "Maldita sea! Ya me han vuelto a engañar"}
	jsonData := map[string]string{
        "message": mensajes[0],
    }
	w.Header().Set("Content-Type", "application/json")
    jsonString, _ := json.Marshal(jsonData)
	fmt.Fprintln(w, string(jsonString))
}
