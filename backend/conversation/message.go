package conversation

type Message struct {
	// TODO: ideally, message should know nothing about how it is serialized.
	From    string `json:"from"`
	Message string `json:"message"`
	To      string `json:"to,omitempty"`
}

func NewMessage(from string, message string, to string) Message {
	if from == "" {
		from = "Anonymous"
	}
	if to == "" {
		return Message{From: from, Message: message}
	}
	return Message{From: from, Message: message, To: to}
}
