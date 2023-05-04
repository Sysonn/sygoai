// import React, { useState } from 'react';
// import axios from 'axios';

// const Chat = () => {
//   const [input, setInput] = useState('');
//   const [response, setResponse] = useState('');

//   const handleSubmit = async e => {
//     e.preventDefault();

//     try {
//       const res = await axios.post('http://localhost:5000/chat', { input });
//       setResponse(res.data.response);
//     } catch (err) {
//       console.error(err);
//     }

//     setInput('');
//   };

//   return (
//     <div>
//       <h1>Chat with OpenAI</h1>
//       <form onSubmit={handleSubmit}>
//         <input type="text" value={input} onChange={e => setInput(e.target.value)} />
//         <button type="submit">Send</button>
//       </form>
//       <div>{response}</div>
//     </div>
//   );
// };

// export default Chat;


///////////////////////////////////////////////////////////////////////////
////////////////////////////////////    ///////////////////////////////////
//////////////////////////////////////////////////////////////////////////

// import React, { useState } from 'react';
// import axios from 'axios';
// import styled from 'styled-components';

// const ChatContainer = styled.div`
//   background-color: #242526;
//   color: #dadce1;
//   min-height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
// `;

// const ChatHeader = styled.h1`
//   margin-bottom: 1rem;
//   font-size: 2rem;
// `;

// const ChatForm = styled.form`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const ChatInput = styled.input`
//   background-color: #3a3b3c;
//   border: none;
//   padding: 0.5rem 1rem;
//   color: #dadce1;
//   margin-right: 0.5rem;
// `;

// const ChatButton = styled.button`
//   margin-top: 10px;
//   border-radius: 10px;
//   background-color: #7289da;
//   border: none;
//   color: #ffffff;
//   padding: 0.5rem 1rem;
//   cursor: pointer;
//   transition: background-color 0.2s ease-in-out;

//   &:hover {
//     background-color: #5b6eae;
//   }
// `;

// const ChatResponse = styled.div`
//   margin-top: 1rem;
// `;

// const Chat = () => {
//   const [input, setInput] = useState('');
//   const [response, setResponse] = useState('');

//   const handleSubmit = async e => {
//     e.preventDefault();

//     try {
//       const res = await axios.post('http://localhost:5000/chat', { input });
//       setResponse(res.data.response);
//     } catch (err) {
//       console.error(err);
//     }

//     setInput('');
//   };

//   return (
//     <ChatContainer>
//       <ChatHeader>Chat with OpenAI</ChatHeader>
//       <ChatForm onSubmit={handleSubmit}>
//         <ChatInput type="text" value={input} onChange={e => setInput(e.target.value)} />
//         <ChatButton type="submit">Send</ChatButton>
//       </ChatForm>
//       <ChatResponse>{response}</ChatResponse>
//     </ChatContainer>
//   );
// };

// export default Chat;


///////////////////////////////////////////////////////////////////////////
////////////////////////////////////    ///////////////////////////////////
//////////////////////////////////////////////////////////////////////////


import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';

const ChatContainer = styled.div`
  background-color: #1a1b1c;
  color: #dadce1;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ChatHeader = styled.h1`
  margin-bottom: 1rem;
  font-size: 2rem;
`;

const ChatConversation = styled.div`
background-color: #242526;
padding: 10px;
margin-bottom: 10px;
border-radius: 10px;
width: 800px;
`;

const ChatForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
`;

const ChatInput = styled.input`
  background-color: #3a3b3c;
  border: none;
  padding: 0.5rem 1rem;
  color: #dadce1;
  margin-right: 0.5rem;
`;

const ChatButton = styled.button`
  margin-top: 10px;
  border-radius: 10px;
  background-color: #7289da;
  border: none;
  color: #ffffff;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #5b6eae;
  }
`;

const ChatResponse = styled.div`
  margin-top: 1rem;
`;

const ChatBubble = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.isResponse ? 'flex-end' : 'flex-start'};
  margin: 1rem;
`;

//////////////////////////////////////////////////
//Original styling
//////////////////////////////////////////////////


// const ChatMessage = styled.div`
//   background-color: ${props => props.isResponse ? '#7289da' : '#3a3b3c'};
//   color: ${props => props.isResponse ? '#ffffff' : '#dadce1'};
//   padding: 0.5rem 1rem;
//   border-radius: ${props => props.isResponse ? '10px 10px 0 10px' : '10px 10px 10px 0'};
//   max-width: 50%;
// `;


////////////////////////////////////////////////
// styling components with code tags
//////////////////////////////////////////////////

// const ChatMessage = styled.div`
//   background-color: ${props => props.isResponse ? '#7289da' : '#3a3b3c'};
//   color: ${props => props.isResponse ? '#ffffff' : '#dadce1'};
//   padding: 0.5rem 1rem;
//   border-radius: ${props => props.isResponse ? '10px 10px 0 10px' : '10px 10px 10px 0'};
//   max-width: 50%;

//   code {
//     color: #ff8c00;
//     font-family: 'Courier New', Courier, monospace;
//     background-color: #f9f9f9;
//     padding: 0.2em 0.4em;
//     border-radius: 3px;
//   }
// `;

//////////////////////////////////////////////////
// styling components manually
//////////////////////////////////////////////////

// const Code = styled.code`
//   background-color: #f0f0f0;
//   font-family: monospace;
//   font-size: 1rem;
//   padding: 0.25rem;
//   margin: 0.25rem;
// `;

// const ChatMessage = styled.div`
//   background-color: ${props => props.isResponse ? '#7289da' : '#3a3b3c'};
//   color: ${props => props.isResponse ? '#ffffff' : '#dadce1'};
//   padding: 0.5rem 1rem;
//   border-radius: ${props => props.isResponse ? '10px 10px 0 10px' : '10px 10px 10px 0'};
//   max-width: 50%;
//   font-size: 1.2rem;
//   line-height: 1.5;

//   ${Code} {
//     background-color: ${props => props.isResponse ? '#25315c' : '#f0f0f0'};
//     color: ${props => props.isResponse ? '#ffffff' : '#666666'};
//     font-size: 1rem;
//     padding: 0.25rem;
//     margin: 0.25rem;
//   }
// `;

/////////////////////////

// const wrapCodeSnippets = text => {
//     const regex = /`([^`]+)`/g;
//     return text.replace(regex, '<code>$1</code>');
//   };
/////////////////////////

const ChatMessage = styled.div`
  background-color: ${props => props.isResponse ? '#7289da' : '#3a3b3c'};
  color: ${props => props.isResponse ? '#ffffff' : '#dadce1'};
  padding: 0.5rem 1rem;
  border-radius: ${props => props.isResponse ? '10px 10px 0 10px' : '10px 10px 10px 0'};
  max-width: 50%;
  overflow-x: auto;
  
  /* Set the font family and size for the highlighted code */
  code {
    font-family: 'Courier New', Courier, monospace;
    font-size: 14px;
  }
`;



const Chat = () => {
  const [input, setInput] = useState('');
  const [responses, setResponses] = useState([]);



//   const ChatMessage = ({ isResponse, children }) => {
//     const wrappedText = wrapCodeSnippets(children);
//     return (
//       <div
//         className="chat-message"
//         dangerouslySetInnerHTML={{ __html: wrappedText }}
//       />
//     );
//   };


const codeRef = useRef(null);

useEffect(() => {
    Prism.highlightAll();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/chat', { input });
      setResponses([...responses, {input, response: res.data.response}]);
    } catch (err) {
      console.error(err);
    }

    setInput('');
  };

//   return (
//     <ChatContainer>
//       <ChatHeader>OpenAI Chat</ChatHeader>
//       <ChatConversation>
//       <div>
//         {responses.map((msg, index) => (
//             <div key={index}>
            
//                 <ChatBubble key={index} isResponse={false}>
//                     <ChatMessage isResponse={false}>{msg.input}</ChatMessage>
//                 </ChatBubble>

//                 <ChatBubble key={index} isResponse={true}>
//                     {/* <ChatMessage isResponse={true}>{msg.response}</ChatMessage> */}
//                     <ChatMessage isResponse={true}>
//                         {msg.response.split(/(```.*\n[\s\S]*?\n```)/g).map((part, i) => {
//                             if (part.startsWith('```')) {
//                             return (
//                                 <pre key={i} className="language-javascript">
//                                     <code>{part.slice(3, -3)}</code>
//                                 </pre>
//                             );
//                             } else {
//                             return part;
//                             }
//                         })}
//                     </ChatMessage>
//                 </ChatBubble>
            
//             </div>

//         ))}
//       </div>
//       </ChatConversation>


 return (
    <ChatContainer>
      <ChatHeader>OpenAI Chat</ChatHeader>
      <ChatConversation>
        {responses.map((msg, index) => (
          <div key={index}>

            <ChatBubble isResponse={false}>
              <ChatMessage isResponse={false}>{msg.input}</ChatMessage>
            </ChatBubble>

            <ChatBubble isResponse={true}>
                <ChatMessage isResponse={true}>
                    {msg.response.split(/(```.*\n[\s\S]*?\n```)/g).map((part, i) => {
                        if (part.startsWith('```')) {
                        return (
                            <pre key={i} ref={codeRef}>
                            <code className="language-javascript">{part.slice(3, -3)}</code>
                            </pre>
                        );
                        } else {
                        return part;
                        }
                    })}
                </ChatMessage>
            </ChatBubble>
            
          </div>
        ))}
      </ChatConversation> 

      <ChatForm onSubmit={handleSubmit}>
        <ChatInput type="text" value={input} onChange={e => setInput(e.target.value)} />
        <ChatButton type="submit">Send</ChatButton>
      </ChatForm>
    </ChatContainer>
  );
};

export default Chat;