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


    return (
        <div className='container auto content-center align mg-bot-lg '>
            <div className='container '>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='input-text'>Adelante, pelele!</label>
                    <textarea
                        className='input-text bg-mid '
                        rows={5}
                        autoFocus={true}
                        placeholder='Pregunta lo que quieras'
                        value={userInput}
                        onChange={(event) => setUserInput(event.target.value)}
                    />
                    <button
                        className='btn mg-top-md mg-left-sm'
                        type="submit">Enviar</button>
                </form>
            </div>
        </div>
    );
}


export default WritingArea;
