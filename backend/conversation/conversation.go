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
	return Conversation{}
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
}
