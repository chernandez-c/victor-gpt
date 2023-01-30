import {apiDeleteAllMessages} from "../api";

const reset = async () => {
    await apiDeleteAllMessages();
};

const ResetButton = () => {
    return (<button
        className='btn mg-top-md mg-left-sm'
        title='Resetea la conversación en el backend. Importante para no guardar una cola de mensajes muy grande'
        onClick={reset}
    >
        Reset
    </button>);
}

export default ResetButton;
