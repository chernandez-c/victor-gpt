import axios from "axios";

const SERVER_ADDR = 'http://localhost:2000/';
const GET_MESSAGES_API = SERVER_ADDR + 'getMessages';
const WRITE_MESSAGE_API = SERVER_ADDR + 'write';
const DELETE_ALL_MESSAGES_API = SERVER_ADDR + 'deleteAllMessages';

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

export {apiGetMessages, apiDeleteAllMessages, apiWriteMessage}