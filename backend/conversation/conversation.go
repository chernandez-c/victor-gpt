package conversation

import (
	"sync"
)

// A Conversation is synchronized list of messages.
type Conversation struct {
	lock     sync.RWMutex
	messages []Message
}

func NewConversation() Conversation {
	c := Conversation{}

	c.lock.Lock()
	defer c.lock.Unlock()

	c.addWelcomeMessages()

	return c
}

func (c *Conversation) AppendMessage(m Message) {
	c.lock.Lock()
	defer c.lock.Unlock()

	c.messages = append(c.messages, m)
}

func (c *Conversation) GetMessages() []Message {
	c.lock.RLock()
	defer c.lock.RUnlock()

	copiedMessages := make([]Message, len(c.messages))
	copy(copiedMessages, c.messages)

	return copiedMessages
}

func (c *Conversation) DeleteAllMessages() {
	c.lock.Lock()
	defer c.lock.Unlock()

	c.messages = nil
	c.addWelcomeMessages()
}

func (c *Conversation) addWelcomeMessages() {
	m := NewMessage("Chat-GPT", "¿Qué quieres aprender hoy, máquina?\n\n![Chicken](https://i.imgur.com/KXNWk.gif)", "Ateneo")
	c.AppendMessage(m)
}
