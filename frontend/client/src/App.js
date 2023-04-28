import {useState} from 'react';

import PeopleController from './components/PeopleController';
import WritingArea from './components/WritingArea';
import AuthorSelector from "./components/AuthorSelector";
import MessageList from "./components/MessageList";
import ImageSelector from "./components/ImageSelector.js";
import './App.css';

const DEFAULT_ADMIN_AUTHOR = "Victor-GPT";


const App = ({
    isAdmin
}) => {
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
        "Juan Luis": 'Eres muy feliz y te gusta utilizar palabras como tronco, pasote y movida',
        "Más personas...": 'Se puede añadir a más gente...',
    };

    const [persona, setPersona] = useState(personas.default);

    return (
        <div className="background-image" >
            <div className='auto'>
                {/* Admin Tools or People selector */}
                <div className='generalTools'>
                    {isAdmin && <AuthorSelector {...{author, setAuthor}} />}
                    {!isAdmin && <PeopleController {...{setPersona, persona, personas}} />}
                </div>
                
                <div className='container'>
                <WritingArea {...{persona, author}}/>
                </div>

                <div className='container-col '>
                    {<MessageList {...{isAdmin}} />}
                </div>
            
                <div className='container'>
                    { <ImageSelector />}
                </div>



            </div>
        </div>
    );
};

export default App;
