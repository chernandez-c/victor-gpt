import Personas from './Personas';
import ResetButton from "./ResetButton";




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
        </div>
    );
};

export default PeopleController;
