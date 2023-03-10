const Personas = ({ personaValue, setPersona, personaKey, persona }) => {
    return (
        <>
            <input
                type='radio'
                name={personaKey}
                value={personaValue}
                checked={persona === personaKey}
                onChange={(event) => setPersona(personaKey)}
                className='mg-top-sm'
            />
            <label htmlFor={personaKey} className='mg-left-sm'>
                {personaKey}
            </label>
            <br />
        </>
    );
};

export default Personas;
