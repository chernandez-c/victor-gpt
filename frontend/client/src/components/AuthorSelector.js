import React from "react";
import './AuthorSelector.css'

const AuthorSelector = ({author, setAuthor}) => {
    return (
        <div className='container auto content-center align mg-bot-lg '>
            <div className='container '>
                    <label> Escribir como:</label>
                    <input
                        className='author-selector bg-mid '
                        type="text"
                        value={author}
                        onChange={(event) => setAuthor(event.target.value)}
                    />
            </div>
        </div>);
};

export default AuthorSelector;