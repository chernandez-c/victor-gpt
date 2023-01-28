package conversation

import (
    "github.com/gorilla/mux"
	//"github.com/rs/cors"
)


func NewRouter() *mux.Router {


	router := mux.NewRouter()
	/*******************************************/
	/*                  DUMMY                ***/
	/*******************************************/

    router.HandleFunc("/", getDummyMessages).Methods("GET")


	/*******************************************/
	/*                CONVERSACION           ***/
	/*******************************************/

	router.PathPrefix("/inbox/{cliente}").HandlerFunc(handleMessagesGet).Methods("GET")
	router.PathPrefix("/inbox/{cliente}").HandlerFunc(handleMessagesDelete).Methods("DELETE")
	router.PathPrefix("/inbox/{destinatario}").HandlerFunc(handleMessagePost).Methods("POST")


	router.PathPrefix("/inbox/{cliente}/last").HandlerFunc(handleMessageGet).Methods("GET")

	router.HandleFunc("/{loquesea}", getDummyMessages).Methods("GET")
    return router

}


