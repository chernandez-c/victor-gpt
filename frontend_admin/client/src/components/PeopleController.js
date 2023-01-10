import Personas from './Personas';
const PeopleController = ({
    setPersona,
    persona,
    personas,
    reset,
}) => {
    const personasArray = Object.entries(personas);
    return (
        <div className='settings '>
            <h3 className='text-center mg-top-md'>Vista Admin</h3>
            <div className='underline-full mg-top-sm'></div>

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
                title='Reset the conversation thread. As the conversation gets bigger, so will the token requirements.'
                onClick={reset}
            >
                Reset
            </button>
        </div>
    );
};

export default PeopleController;
