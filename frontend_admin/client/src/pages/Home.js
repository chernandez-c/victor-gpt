import { useEffect, useState } from 'react';
import axios from 'axios';

import Completion from '../components/Completion';
import Prompt from '../components/Prompt';
import PeopleController from '../components/PeopleController';
import GptParamsController from '../components/GptParamsController';
import ApiEndpointController from '../components/ApiEndpointController';
import Error from '../components/Error';

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState('');

    const personas = {
        default: '',
        // eslint-disable-next-line
        Victor: 'Te llamas Victor Jiménez Jiménez Jiménez. Eres un doctorando. Sueles usar las expresiones: \
         "¡Maldita sea!" \
         "¡Sois unos peleles!" \
         "¡Qué pasa, mozo!" \
         ¡Pero qué maravilla!"',
        // eslint-disable-next-line
        MAP: 'Te llamas Miguel Ángel del Pozo. Eres Inmunólogo. Nunca tienes tiempo para atender a tus doctorandos. \
        Te pasas el día en twitter y escribiendo correos',
        JuanLuis: 'Eres muy feliz y te gusta utilizar palabras como tronco, pasote y movida',
        mas_personas: 'Se puede añadir a más gente...',
    };

    // Values for Api Endpoint Selector
    const [apiEndpoint, setApiEndpoint] = useState('https://localhost:2000/conversation/inbox/victor');

    // Values for GptParamsController
    const [temperature, setTemperature] = useState(0.5);
    const [tokens, setTokens] = useState(512);
    const [nucleus, setNucleus] = useState(0.5);
    const [selectedModel, setSelectedModel] = useState('text-davinci-003');
    const [threadSize, setThreadSize] = useState(3);

    // Values for PeopleController
    const [persona, setPersona] = useState(personas.default);

    // Values for Prompt
    const [conversation, setConversation] = useState('');

    // Sets the prompt with instructions.
    const promptOptions = `Respond in markdown and use a codeblock with the language if there is code. ${persona} STOP`;

    // Values for Completion
    const [chatResponse, setChatResponse] = useState([]);

    const [ApiKey, setApiKey] = useState(`${process.env.REACT_APP_OPENAI_KEY}`);


    const onSubmitApiKey = async (event, apiKeyParam) => {
        event.preventDefault();

        setLoading(true);
        console.log(`pasamos por aqui. La api key es ${ApiKey}`);
        setApiKey(apiKeyParam);
        
        setTimeout(() => {
            setLoading(false);
        }, 500);

    }

    const onSubmit = async (event, question) => {
        event.preventDefault();

        setLoading(true);
        const options = {
            headers: {
                Authorization: `Bearer ${ApiKey}`,
                'Content-Type': 'application/json',
            },
        };

        let promptData = {
            model: selectedModel,
            prompt: `${promptOptions}${conversation}\nUser: ${question}.\n`,
            top_p: Number(nucleus),
            max_tokens: Number(tokens),
            temperature: Number(temperature),
            n: 1,
            stream: false,
            logprobs: null,
            stop: ['STOP', 'User:'],
        };

        //if apiEndpint match with chatgpt-api  
        if (apiEndpoint.match('chatgpt-api')) {
            console.log(`HACEMOS MATCH`);
            promptData = {
                "content": "Hello world" 
            };
        }

        try {
            console.log(`mensaje a ${apiEndpoint}: ${promptData}`);
            const response = await axios.post(apiEndpoint, promptData, options);
            const newChat = {
                botResponse: response.data.choices[0].text,
                promptQuestion: question,
                totalTokens: response.data.usage.total_tokens,
            };

            setLoading(false);
            setChatResponse([...chatResponse, newChat]);
        } catch (error) {
            setLoading(false);
            setError(error.response.data.error.message);
            setShowError(true);
            console.log(error.response);
        }
    };

    const reset = () => {
        setChatResponse([]);
        setConversation('');
    };

    // Scrolls to bottom of the page as new content is created
    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, [chatResponse]);

    useEffect(() => {
        if (chatResponse.length > threadSize) {
            const newArray = [...chatResponse];
            newArray.splice(0, newArray.length - threadSize);
            setConversation(newArray.map((chat) => `${chat.promptQuestion}\n${chat.botResponse}\n`));
        } else {
            setConversation(chatResponse.map((chat) => `${chat.promptQuestion}\n${chat.botResponse}\n`));
        }
    }, [chatResponse, threadSize]);

    // Props for Prompt component
    const forPrompt = { onSubmit, loading };

    // Props for PromptController
    const forGptParamsController = {
        temperature,
        setTemperature,
        tokens,
        setTokens,
        setSelectedModel,
        nucleus,
        setNucleus,
        setThreadSize,
        threadSize,
        setChatResponse,
        reset,
    };

    const forPeopleController = {
    setPersona,
    persona,
    personas,
    };

    const forApiEndpointController = {
        setApiEndpoint,
        onSubmitApiKey,
        loading
    }

    
    const forError = {
        setShowError,
        error,
    };

    return (
        <div className='container-col auto mg-top-lg radius-md size-lg '>
            {showError && <Error {...forError} />}
            <div className='container-col '>
                {chatResponse && chatResponse.map((item, index) => <Completion {...item} key={index} />)}
            </div>
            <ApiEndpointController {...forApiEndpointController} />

            <PeopleController {...forPeopleController} />
            <GptParamsController {...forGptParamsController} />
            <Prompt {...forPrompt} />
        </div>

    );
};

export default Home;
