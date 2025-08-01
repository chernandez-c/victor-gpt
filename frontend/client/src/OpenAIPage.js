import {useState} from 'react';
import {apiOpenAIChat} from './api';

const OpenAIPage = () => {
    const [model, setModel] = useState('gpt-3.5-turbo');
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');

    const handleSend = async () => {
        const res = await apiOpenAIChat(prompt, model);
        if (res && res.response) {
            setResponse(res.response);
        } else {
            setResponse('');
        }
    };

    return (
        <div className='container-col'>
            <h2>OpenAI Chat</h2>
            <select value={model} onChange={(e)=>setModel(e.target.value)}>
                <option value='gpt-3.5-turbo'>gpt-3.5-turbo</option>
                <option value='gpt-4'>gpt-4</option>
            </select>
            <textarea
                rows={5}
                value={prompt}
                onChange={(e)=>setPrompt(e.target.value)}
                className='input-text bg-mid mg-top-md'
                placeholder='Escribe tu pregunta'
            />
            <button className='btn mg-top-md' onClick={handleSend}>Enviar</button>
            <pre className='mg-top-md'>{response}</pre>
        </div>
    );
};

export default OpenAIPage;
