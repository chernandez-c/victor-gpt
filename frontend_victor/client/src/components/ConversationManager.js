import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Completion from '../components/Completion';
const apiEndpoint = 'http://localhost:2000/conversation/inbox/victor';


const PromptSend = ({ loading, setLoading, persona, setPersona, personas, setShowError, setError, error }) => {
    const [userInput, setUserInput] = useState('');

    const [rows, setRows] = useState(10);
    setLoading(true);


    const handleSubmit = async (event) => {

        setRows(20);
        setLoading(true);
        event.preventDefault();


        //const ApiKey = `${process.env.REACT_APP_OPENAI_KEY}`;

        const headers = {
            //Authorization: `Bearer ${ApiKey}`,
            'Content-Type': 'application/json',
        };
        const body = JSON.stringify({ from: "victor", message: userInput })

        const options = {
            method: 'POST',
            headers: headers
        };

        axios.post(apiEndpoint, body, options);
        //const response = axios.post(apiEndpoint, body, options);

        /*
        const response2 = await fetch(apiEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body
        });
        */

        //const data = await response.json();
        setLoading(false);
    };


    /*
    
        */
    return (
        <div className='container auto content-center align mg-bot-lg '>
            <div className='container '>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='input-text'>Adelante, pelele!</label>
                    <input
                        className='input-text bg-mid '
                        cols='50'
                        rows={rows}
                        resize='none'
                        autoFocus={true}
                        placeholder='Ask a question'
                        type="text"
                        value={userInput}
                        onChange={(event) => setUserInput(event.target.value)}
                    />
                    <button type="submit">Send</button>
                </form>

                <div className='loader '>{loading && <div className='spinner '></div>}</div>
            </div>
        </div>



    );

}


const PromptOutput = () => {

    const [messages, setMessages] = useState([]);

    const REFRESH_INTERVAL = 2000;
    //const rows = 10;

    useEffect(() => {
        fetchMessages().catch(console.error);
        const intervalId = setInterval(fetchMessages, REFRESH_INTERVAL);
        return () => clearInterval(intervalId);
    }, []);


    const fetchMessages = async () => {
        try {
            const response = await fetch(apiEndpoint);
            const data = await response.json();
            setMessages(data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='container auto content-center align mg-bot-lg '>
            <div className='container '>
                {messages.map((element, index, array) => ( 
                    <Completion from={element.from} message={element.message} key={index} />
                ))}
            </div>
        </div>
    );
}


/*  Array de json */
/*

            <div className='container '>
                {messages.map((message, index) => (

                    <div key={index}>
                        <div key={index}>
                            From: {message.From}
                        </div>
                        <div key={index}>
                            Message: {message.Message}
                        </div>
                        <div className='container-col '>
                            {messages && messages.map((item, index) => <Completion {...item} key={index} />)}
                        </div>
                    </div>
                ))}
           </div>
*/


/* Si viniera un solo json en lugar de un array utilizaríamos esto */
/*
<div className='container '>
{Object.entries(messages).map(([key, value], index) => (
    <div key={index}>{key}: {value}</div>
))}
</div>
*/

/*<div className='loader '>{loading && <div className='spinner '></div>}</div>*/
export { PromptSend, PromptOutput };
