import {useState} from 'react';

import PeopleController from './components/PeopleController';
import WritingArea from './components/WritingArea';
import AuthorSelector from "./components/AuthorSelector";
import ResetButton from "./components/ResetButton";
import MessageList from "./components/MessageList";


const DEFAULT_ADMIN_AUTHOR = "Chat-GPT";

const App = ({isAdmin}) => {
    const [author, setAuthor] = useState((isAdmin && DEFAULT_ADMIN_AUTHOR));

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

    const [persona, setPersona] = useState(personas.default);

    return (
        <div className='container-col auto mg-top-lg radius-md size-lg '>
            {isAdmin && <AuthorSelector {...{author, setAuthor}} />}
            <MessageList/>
            <WritingArea {...{persona, author}}/>
            {!isAdmin && <PeopleController {...{setPersona, persona, personas}} />}
            {isAdmin && <ResetButton/>}
        </div>
    );
};

export default App;
