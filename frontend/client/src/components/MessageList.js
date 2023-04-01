import React, {useEffect, useRef, useState} from "react";
import Message from "./Message";
import {apiGetMessages} from "../api";
import './Conversation.css';
import ResetButton from "./ResetButton";

const MessageList = ({
    isAdmin
}) => {
    const [messages, setMessages] = useState([]);

    // Continually ask for new messages.
    const REFRESH_INTERVAL = 2000;
    useEffect(() => {
        fetchMessages().catch(console.error);
        const intervalId = setInterval(fetchMessages, REFRESH_INTERVAL);
        return () => clearInterval(intervalId);
    }, []);

    const fetchMessages = async () => {
        try {
            setMessages(await apiGetMessages());
        } catch (err) {
            console.log(err);
        }
    };

    // Scroll to the bottom whenever we detect new messages.
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
    }

    const lastMessageCount = useRef(0);
    useEffect(() => {
        if (messages.length > lastMessageCount.current) {
            scrollToBottom();
        }
        lastMessageCount.current = messages.length;
    }, [messages]);

    return (
        <div className='conversation'>
            {isAdmin && <ResetButton/>}
            {messages.map((element, index) => (
                <Message from={element.from} message={element.message} to={element.to} key={index}/>
            ))}
            <div ref={messagesEndRef}/>
        </div>
    );
}
export default MessageList;