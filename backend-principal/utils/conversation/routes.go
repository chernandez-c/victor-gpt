package conversation

import (
    "github.com/gorilla/mux"
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

	router.PathPrefix("/inbox/{destinatario}").HandlerFunc(handleMessageGet).Methods("GET")
	
	router.PathPrefix("/inbox/{destinatario}").HandlerFunc(handleMessagePost).Methods("POST")

	router.HandleFunc("/{loquesea}", getDummyMessages).Methods("GET")
    return router

}


