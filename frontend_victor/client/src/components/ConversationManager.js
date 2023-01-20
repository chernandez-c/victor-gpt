import React, { useState, useEffect } from 'react';


/*
interface Message {
    text: string;
    author: Author;
}
*/

const API_ENDPOINT = 'http://conversation/inbox/victor';
const REFRESH_INTERVAL = 10000;


const ConversationManager = ({ onSubmit, loading }) => {

    useEffect(() => {
        fetchMessages().catch(console.error);
        const intervalId = setInterval(fetchMessages, REFRESH_INTERVAL);
        return () => clearInterval(intervalId);
    }, []);

    const [rows, setRows] = useState(10);
    const [question, setQuestion] = useState('');
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');


    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && event.shiftKey && rows !== 30) {
            setRows(rows + 1);
        }
    };
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
                body: { "from": author, "text": text }
            });
            setNewMessage('');
            await fetchMessages();
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = async (event) => {
        if (event.keyCode === 13 && !event.shiftKey) {
            event.preventDefault();
            setRows(10);
            await onSubmit(event, question);
            sendMessage("victor", question)
            setQuestion('');
        }
    };
    return (
        <div className='container auto content-center align mg-bot-lg '>
            <div className='container '>
                <form onKeyDown={handleKeyDown}>
                    <textarea
                        rows={rows}
                        resize='none'
                        value={question}
                        onChange={(event) => setQuestion(event.target.value)}
                        cols='50'
                        className='input-text bg-mid '
                        onKeyDown={handleSubmit}
                        autoFocus={true}
                        placeholder='Ask a question'
                    />
                </form>
                <div className='loader '>{loading && <div className='spinner '></div>}</div>
            </div>
        </div>
    );
};


export default ConversationManager;
