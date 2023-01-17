
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
}

// Los mensajes que escriba la persona A se asignarán a la clave A del map
var inbox map[string][]string



func InitializeConversationVariables() {
	inbox = make(map[string][]string)
}

/*******************************************/
/*                  POST                 ***/
/*******************************************/
func handleMessagePost(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	var persona string = vars["destinatario"]
	message := r.URL.Query().Get("message")
	// Si no viene en el query string lo buscamos con la clave "message" en el body de la request
	if message == "" {
		var msg Message
		// Use json.NewDecoder to read the request body
		decoder := json.NewDecoder(r.Body)
	
		// Use the Decode method to unmarshal the JSON into the struct
		err := decoder.Decode(&msg)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			fmt.Fprintln(w, "Error parsing JSON:", err)
			return
		}
		message = msg.Message
	}

	cerrojo.Lock()

	if _, ok := inbox[persona]; !ok {
		inbox[persona] = []string{}
	} else {
		inbox[persona] = append(inbox[persona], message)
	}

	cerrojo.Unlock()
	w.WriteHeader(http.StatusOK)
	fmt.Fprintln(w, "The message:", message, "has been added to the inbox of", persona)
}
	
/*******************************************/
/*                  GET                  ***/
/*******************************************/
func handleMessageGet(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	var persona string = vars["destinatario"]
	if len(inbox[persona]) == 0 {
		w.WriteHeader(http.StatusNotFound)
		fmt.Fprintln(w, "No messages in the list for", persona)
		return
	}

	cerrojo.Lock()
	message := inbox[persona][0]
	inbox[persona] = inbox[persona][1:]

	cerrojo.Unlock()
	w.WriteHeader(http.StatusOK)
	fmt.Fprintln(w, message)
}


// getCompletionBody Returns the body of the request to create a completion.
func getDummyMessages(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK) 
	mensajes := []string{"Eres un pelele", "Maldita sea! Ya me han vuelto a engañar"}
	fmt.Fprintln(w, mensajes )
}
