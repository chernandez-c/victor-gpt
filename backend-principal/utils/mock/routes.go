package mock

import (
    "github.com/gorilla/mux"
)


func NewRouter() *mux.Router {

	router := mux.NewRouter()
	/*******************************************/
	/*                  DUMMY                ***/
	/*******************************************/

	router.HandleFunc("/{loquesea}", getDummyMessages).Methods("GET")
    return router

}


