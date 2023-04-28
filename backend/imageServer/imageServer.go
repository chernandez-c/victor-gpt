package imageServer

import (
	"sync"
)

// Struct that represents an image
type Image struct {
	Path string `json:"path"`
}

// A Conversation is synchronized list of messages.
type ImageStorage struct {
	lock   sync.RWMutex
	images []Image
}

// A function that retrieves images from a directory and returns an array of images
func NewImageStorage() ImageStorage {
	i := ImageStorage{}

	i.lock.Lock()
	defer i.lock.Unlock()

	i.AddImages("./public/images")

	return i
}

// A function that adds images from a directory as a parameter to the array of images
func (i *ImageStorage) AddImages(path string) {
	// Read images from a directory
	i.lock.Lock()
	defer i.lock.Unlock()
	i.images = append(i.images, Image{Path: path})
}

/*
func (i *ImageStorage) GetImages() []Image {

	imagenes := []Image{}

	files, err := os.ReadDir(".")
	if err != nil {
		fmt.Println(err)
		return imagenes
	}

	for _, file := range files {
		if !file.IsDir() && IsImage(file.Name()) {

			imagen := Image{Path: file.Name()}
			imagenes = append(imagenes, imagen)
			fmt.Println(file.Name())

			imagenes = append(imagenes, imagen)
		}
	}

	return imagenes
}
*/
