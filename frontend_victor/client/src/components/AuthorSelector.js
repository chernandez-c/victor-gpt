import React from "react";

const AuthorSelector = ({author, setAuthor}) => {
    return (
        <div className='container auto content-center align mg-bot-lg '>
            <div className='container '>
                    <label htmlFor='input-text'>Escribir como:</label>
                    <input
                        className='input-text bg-mid '
                        type="text"
                        value={author}
                        onChange={(event) => setAuthor(event.target.value)}
                    />
            </div>
        </div>);
};

export default AuthorSelector;