package fileHandler


import (
	"github.com/gorilla/mux"
)

func NewRouter() *mux.Router {

	router := mux.NewRouter()


	/*******************************************/
	/*            GESTIÓN FICHEROS           ***/
	/*******************************************/
	//Para gestionar ficheros
	router.HandleFunc("/files/upload", UploadFileHandler()) 
	
	/*
	fs := http.FileServer(http.Dir(uploadPath))

	http.Handle("/files/", http.StripPrefix("/files", fs)) // esta funciona pero queremos utilizar mux
	router.HandleFunc("/files/", http.StripPrefix("/files", fs)) // esta no funciona 
	
	*/


	/*******************************************/
	/*                  DUMMY                ***/
	/*******************************************/
	router.HandleFunc("/{loquesea}", getDummyMessages).Methods("GET")
    return router

}