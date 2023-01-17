
package mock

import (
	"fmt"
	"net/http"
)


// getCompletionBody Returns the body of the request to create a completion.
func getDummyMessages(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK) 
	mensajes := []string{"Eres un pelele", "Maldita sea! Ya me han vuelto a engañar"}
	fmt.Fprintln(w, mensajes )
}
