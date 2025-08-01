import axios from "axios";

const SERVER_ADDR = 'http://localhost:2000/';
const GET_MESSAGES_API = SERVER_ADDR + 'getMessages';
const WRITE_MESSAGE_API = SERVER_ADDR + 'write';
const DELETE_ALL_MESSAGES_API = SERVER_ADDR + 'deleteAllMessages';
const OPENAI_CHAT_API = SERVER_ADDR + 'openai/chat';

const apiGetMessages = async () => {
    const response = await fetch(GET_MESSAGES_API);
    return await response.json();
}

const apiDeleteAllMessages = async () => {
    await axios.delete(DELETE_ALL_MESSAGES_API);
}

const apiWriteMessage = async (author, to, message) => {
    const headers = {
        'Content-Type': 'application/json',
    };
    const body = JSON.stringify({from: author, message: message, to: to})

    const options = {
        method: 'POST',
        headers: headers
    };

    await axios.post(WRITE_MESSAGE_API, body, options);
}

const apiOpenAIChat = async (prompt, model) => {
    const response = await fetch(OPENAI_CHAT_API, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({prompt: prompt, model: model})
    });
    return await response.json();
}

export {apiGetMessages, apiDeleteAllMessages, apiWriteMessage, apiOpenAIChat}