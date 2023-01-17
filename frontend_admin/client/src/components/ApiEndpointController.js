import { useState } from 'react';



const ApiEndpointController = ({
    setApiEndpoint,
    onSubmitApiKey,
    loading
}) => {

    const [rows, setRows] = useState(1);
    const [question, setQuestion] = useState('');

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && event.shiftKey && rows !== 5) {
            setRows(rows + 1);
        }
    };

    const handleSubmit = async (event) => {
        if (event.keyCode === 13 && !event.shiftKey) {
            event.preventDefault();
            setRows(1);
            await onSubmitApiKey(event, question);
            setQuestion('');
        }
    };
    return (

        <form className='container-col '>

            <h3 className='text-center mg-top-md'>Backend</h3>

            <select
                className='mg-top-md pad-sm'
                onChange={(event) => setApiEndpoint(event.target.value)}
                title='Change the endpoint to make the request.'
            >
                <option value='https://localhost:2000/conversation/inbox/victor'>Victor</option>
                <option value='https://localhost:2000/conversation/inbox/admin'>Admin</option>
                <option value='https://localhost:2000/'>Backend en localhost</option>
                <option value='https://localhost:8080/api'>Backend a través del nginx</option>
            </select>

            <div className='container auto content-center align mg-bot-lg '>
                <form onKeyDown={handleKeyDown}>
                    <textarea
                        rows={rows}
                        resize='none'
                        value={question}
                        onChange={(event) => setQuestion(event.target.value)}
                        cols='40'
                        className='input-text '
                        onKeyDown={handleSubmit}
                        autoFocus={true}
                        placeholder='¿What is the API key?'
                    />
                </form>
                <div className='loader '>{loading && <div className='spinner '></div>}</div>
            </div>
        </form>
    );
};

export default ApiEndpointController;
