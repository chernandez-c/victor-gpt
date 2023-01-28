import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
const Completion = ({message, from, index}) => {

    var date = new Date(Date.now());
    let destinatario = "Fátima";
    return (

        <div className='container-col bg-mid pad-lg mg-top-md mg-bot-md radius-sm shadow '>
            <div className='container space'>
                <h3>{from}:</h3>
                <h4 title='Para:'>Para {destinatario}</h4>
                <h4 title='Timestamp:'>Hora: {date.toLocaleTimeString()}</h4>
                
            </div>
            <div className='underline-full mg-top-sm mg-bot-sm'></div>

            <ReactMarkdown
                children={message}
                components={{
                    code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                            <SyntaxHighlighter
                                children={String(children).replace(/\n$/, '')}
                                style={coldarkDark}
                                language={match[1]}
                                PreTag='div'
                                {...props}
                            />
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        );
                    },
                }}
            />
        </div>
    );
};


/*
const ClassicCompletion = ({message, from, index}) => {
    let totalTokens = "probando3";

    //console.log(message);
    return (

        <div className='container-col bg-mid pad-lg mg-top-md mg-bot-md radius-sm shadow '>
            <div className='container space'>
                <h3>{from}:</h3>
                <h4 title='Total token cost'>{totalTokens}</h4>
            </div>
            <div className='underline-full mg-top-sm mg-bot-sm'></div>

            <ReactMarkdown
                children={message}
                components={{
                    code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                            <SyntaxHighlighter
                                children={String(children).replace(/\n$/, '')}
                                style={coldarkDark}
                                language={match[1]}
                                PreTag='div'
                                {...props}
                            />
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        );
                    },
                }}
            />
        </div>
    );
};
*/
export default Completion;
