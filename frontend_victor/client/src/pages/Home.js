import { useState } from 'react';

import PeopleController from '../components/PeopleController';
import {PromptSend, PromptOutput} from '../components/ConversationManager';
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



    // Values for PeopleController
    const [persona, setPersona] = useState(personas.default);

    // Props for Prompt component
    const forPromptSend = { loading, setLoading, persona, setPersona, personas, setShowError, setError, error };

    const forPeopleController = {
    setPersona,
    persona,
    personas,
    };
    
    const forError = {
        setShowError,
        error,
    };

    return (
        <div className='container-col auto mg-top-lg radius-md size-lg '>
            {showError && <Error {...forError} />}
            <PeopleController {...forPeopleController} />
            <PromptSend {...forPromptSend}/>
            <PromptOutput/>

        </div>

    );
};

/*
<ConversationManager {...forPrompt} />
*/
export default Home;
