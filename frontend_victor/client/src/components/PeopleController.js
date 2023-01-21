import Personas from './Personas';
import axios from 'axios';


const apiEndpoint = 'http://localhost:2000/conversation/inbox/victor';

const reset = () => {
    const element = document.querySelector('#delete-request .status');

    const headers = {
        //Authorization: `Bearer ${ApiKey}`,
        'Content-Type': 'application/json',
    };
    const body = JSON.stringify({ from: "victor", message: "PROBANDO" })

    const options = {
        method: 'POST',
        headers: headers
    };

    axios.delete(apiEndpoint, body, options)
    .then(() => element.innerHTML = 'Delete successful');
};


const PeopleController = ({
    setPersona,
    persona,
    personas,
}) => {
    const personasArray = Object.entries(personas);
    return (
        <div className='settings '>
            <h3 className='text-center mg-top-md'>¿Con quién deseas hablar?</h3>
            <div className='underline-full mg-top-sm'></div>
            <div className='mg-top-sm'>
                {personasArray.map(([key, value], index) => {
                    return (
                        <Personas
                            personaValue={value}
                            personaKey={key}
                            key={index}
                            persona={persona}
                            setPersona={setPersona}
                        />
                    );
                })}
            </div>

            <button
                className='btn mg-top-md mg-left-sm'
                title='Resetea la conversación en el backend. Importante para no guardar una cola de mensajes muy grande'
                onClick={reset}
            >
                Reset
            </button>
        </div>
    );
};

export default PeopleController;
