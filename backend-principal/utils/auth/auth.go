
package auth

import (
	"net/http"
)

var conversationApiToken string = "peleles"

func VerificaToken(w http.ResponseWriter, r *http.Request) bool {
	if (r.Header.Get("Authorization") != "Bearer " + conversationApiToken) {
		w.WriteHeader(http.StatusUnauthorized)
		return false
	} else {
		return true
	}
}
