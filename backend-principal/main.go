package main

import (
	"log"
	"net/http"
	"fmt"
	"github.com/gorilla/mux"
	"github.com/gorilla/handlers"
	"time"
	//"github.com/chernandez-c/victor-gpt/tree/master/backend-principal/utils/gogpt"
	"github.com/chernandez-c/victor-gpt/tree/master/backend-principal/utils/fileHandler"
	"github.com/chernandez-c/victor-gpt/tree/master/backend-principal/utils/conversation"
	"github.com/chernandez-c/victor-gpt/tree/master/backend-principal/utils/mock"
)


type loggingHandler struct {
	http.Handler
}

func (h loggingHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	log.Printf("%s %s %s", r.RemoteAddr, r.Method, r.URL)
	h.Handler.ServeHTTP(w, r)
}


const port = ":2000"

func main() {

	conversation.InitializeConversationVariables()

	router := mux.NewRouter()
	// Este es el handler para todas las cosas de la conversación con la vista de administración que el pensará que es una IA
	router.PathPrefix("/conversation").Handler(http.StripPrefix("/conversation", conversation.NewRouter()))
	//Gestión de ficheros
	router.PathPrefix("/files").Handler(http.StripPrefix("/files", fileHandler.NewRouter()))
	//Dummy pruebas
	router.PathPrefix("/{loquesea}").Handler(http.StripPrefix("", mock.NewRouter()))


	methods := handlers.AllowedMethods([]string{"OPTIONS", "DELETE", "GET", "HEAD", "POST", "PUT", "PATCH"})
	origins := handlers.AllowedOrigins([]string{"*"})
	headers := handlers.AllowedHeaders([]string{"Content-Type"})
	handler := handlers.CORS(methods, origins, headers)(router)


	/*******************************************/
	/*        ARRANCAMOS EL SERVIDOR         ***/
	/*******************************************/
	servidor := &http.Server{
		Handler: handler,
		Addr:    port,
		// Timeouts para evitar que el servidor se quede "colgado" por siempre
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Print("Server started on localhost", port, "\n")
	log.Print("use /upload for uploading files and /files/{fileName} for downloading\n")
	log.Print("use DELETE requests to /conversation/inbox/{cliente} to clean cliente's inbox\n")
	log.Print("use POST requests to /conversation/inbox/{cliente} to send messages to the server and show them to cliente\n")
	log.Print("use GET requests to /conversation/inbox/{cliente} and /conversation/inbox to get messages from the server to cliente\n")

	fmt.Printf("Escuchando en %s. Presiona CTRL + C para salir\n", port)
	
	log.Fatal(servidor.ListenAndServe())
    
}


// getCompletionBody Returns the body of the request to create a completion.
func getDummyMessages(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK) 
	mensajes := []string{"Eres un pelele", "Maldita sea! Ya me han vuelto a engañar"}
	fmt.Fprintln(w, mensajes )
}
