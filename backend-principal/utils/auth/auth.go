
package auth

import (
	"net/http"
)

var conversationApiToken string = "peleles"

func VerificaToken(w http.ResponseWriter, r *http.Request) bool {
	if (r.Header.Get("Authorization") != "Bearer " + conversationApiToken) {
		return false
	} else {
		return true
	}
}
