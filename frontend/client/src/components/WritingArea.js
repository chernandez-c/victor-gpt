import React, {useState} from 'react';
import {apiWriteMessage} from "../api";

const DEFAULT_AUTHOR = "Ateneo";

const WritingArea = ({author, persona}) => {
    const [userInput, setUserInput] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        await apiWriteMessage((author || DEFAULT_AUTHOR), persona, userInput);

        setUserInput('');
    };

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
          handleSubmit(event);
        }
      }

    return (
        <form onSubmit={handleSubmit} className='container-col '>
            <textarea
                className='input-text bg-mid '
                rows={5}
                autoFocus={true}
                placeholder='¡Adelante, pelele! Pregunta lo que quieras'
                value={userInput}
                onChange={(event) => setUserInput(event.target.value)}
                onKeyDown={handleKeyPress}
            />
            <button
                className='btn mg-top-md mg-left-sm'
                type="submit">Enviar</button>
        </form>
    );
}


export default WritingArea;
