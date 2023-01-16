import React, { useState, useEffect } from 'react';

type Author = "Victor" | "Admin";

interface Message {
    text: string;
    author: Author;
}

const API_ENDPOINT = 'http://localhost:5000/messages';
const REFRESH_INTERVAL = 1000;

const App: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');

    useEffect(() => {
        fetchMessages().catch(console.error);
        const intervalId = setInterval(fetchMessages, REFRESH_INTERVAL);
        return () => clearInterval(intervalId);
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await fetch(API_ENDPOINT);
            const data = await response.json();
            setMessages(data);
        } catch (err) {
            console.log(err);
        }
    };

    const sendMessage = async (text: string, author: Author) => {
        try {
            await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: newMessage }),
            });
            setNewMessage('');
            await fetchMessages();
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: newMessage }),
            });
            setNewMessage('');
            await fetchMessages();
        } catch (err) {
            console.log(err);
        }
    };

    const getMessageColor = (m: Message) => {
        if (m.author === "Admin") {
            return "bg-teal-100"
        } else {
            return "bg-white"
        }
    }

    const getMessageClassname = (m: Message) => {
        return getMessageColor(m) + " rounded-lg shadow-md p-4"
    }

    return (
        <div className="bg-gray-200">
            <div className="container mx-auto p-4">
                {messages.map((message, index) => (
                    <div key={index} className="mt-4">
                        <div className={getMessageClassname(message)}>
                            {message.text}
                        </div>
                    </div>
                ))}
                <form onSubmit={handleSubmit} className="my-4">
                    <div className="flex">
                        <input
                            type="text"
                            className="bg-white rounded-lg shadow-md p-4 w-full"
                            value={newMessage}
                            onChange={e => setNewMessage(e.target.value)}
                        />
                        <button className="bg-blue-500 rounded-lg shadow-md p-4 text-white">
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default App;
