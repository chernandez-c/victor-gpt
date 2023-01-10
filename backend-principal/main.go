package main

import (
	"log"
	"net/http"

	"github.com/chernandez-c/victor-gpt/tree/master/backend-principal/utils"
)

const maxUploadSize = 2 * 1024 * 1024 // 2 mb
const uploadPath = "./tmp"

func main() {
	http.HandleFunc("/upload", utils.UploadFileHandler())

	fs := http.FileServer(http.Dir(uploadPath))
	http.Handle("/files/", http.StripPrefix("/files", fs))

	log.Print("Server started on localhost:8080, use /upload for uploading files and /files/{fileName} for downloading")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
