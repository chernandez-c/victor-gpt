import React, { useState } from 'react';
import { useEffect } from 'react';


function MyComponent() {
    const [userInput, setUserInput] = useState('');
    const [messages, setMessages] = useState([]);


    const [rows, setRows] = useState(10);
    const [question, setQuestion] = useState('');
    const [newMessage, setNewMessage] = useState('');


    async function handleSubmit(event) {
        event.preventDefault();
        const response = await fetch('http://localhost:2000/conversation/inbox/victor', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization, X-Request-With' },
            body: {"from": "victor", "to": "victor", "message": "userInput"}
        });
        const data = await response.json();
        console.log(data);
    }

    async function getMessages() {
        const response = await fetch('http://localhost:2000/conversation/inbox/victor');
        response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        const data = await response.json();
        setMessages(data);
    }

    useEffect(() => {
        getMessages();
        const interval = setInterval(() => {
            getMessages();
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    /*
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={(event) => setUserInput(event.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      {messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </div>
    */
    return (
        <div className='container auto content-center align mg-bot-lg '>
            <div className='container '>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={userInput}
                        onChange={(event) => setUserInput(event.target.value)}
                    />
                    <button type="submit">Send</button>
                </form>
                {messages.map((message, index) => (
                    <div key={index}>{message}</div>
                ))}

            </div>
        </div>
    );
}

/*                <div className='loader '>{loading && <div className='spinner '></div>}</div>*/
export default MyComponent;