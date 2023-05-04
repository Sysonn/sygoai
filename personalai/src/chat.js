import React, { useState, useEffect, useRef, handleKeyPress} from 'react';
import logo from './load.gif'
import axios from 'axios';
import styled from 'styled-components';
import Prism from 'prismjs';

import 'prismjs/components/prism-core';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import "prismjs/components/prism-css";
import "prismjs/components/prism-java";
import "prismjs/components/prism-python";
import "prismjs/components/prism-php";
import "prismjs/components/prism-markup";

import 'prismjs/themes/prism-okaidia.css';

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
width: 1000px;
`;

const ChatForm = styled.form`
  display: flex;
  float: right;
  flex-direction: row;
  align-items: center;
  width: 1000px;
  margin-bottom: 10px;
`;

const ChatInput = styled.input`
  background-color: #3a3b3c;
  border: none;
  padding: 0.5rem 1rem;
  color: #dadce1;
  width: 100%;
  margin-right: 0.5rem;
  
`;

const ChatButton = styled.button`
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


const ChatBubble = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.isResponse ? 'flex-end' : 'flex-start'};
  opacity: ${props => props.isLoading ? '0.5' : '1'}; // set opacity to 0.5 when loading is true
  margin: 1rem;
  
`;


const ChatMessage = styled.div`
  background-color: ${props => props.isResponse ? '#7289da' : '#3a3b3c'};
  color: ${props => props.isResponse ? '#ffffff' : '#dadce1'};
  padding: 0.5rem 1rem;
  border-radius: ${props => props.isResponse ? '10px 10px 0 10px' : '10px 10px 10px 0'};
  max-width: 90%;
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
  const [loading, setLoading] = useState(false); // new state for loading
  const codeRef = useRef(null);
  const conversationRef = useRef(null);
  

  useEffect(() => {
    conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
  }, [responses]);

  useEffect(() => {
    Prism.highlightAll();
  }, [responses]);


//   function ChatInput(props) {
//     const [inputValue, setInputValue] = useState("");
  
//     function handleKeyDown(event) {
//       if (event.key === "Enter" && !event.shiftKey) {
//         event.preventDefault();
//         props.onSendMessage(inputValue);
//         setInputValue("");
//       } else if (event.key === "Enter" && event.shiftKey) {
//         setInputValue(inputValue + "\n");
//       }
//     }
  
//     function handleChange(event) {
//       setInputValue(event.target.value);
//     }
  
//     return (
//       <div className="chat-input">
//         <textarea
//           placeholder="Type your message here..."
//           value={inputValue}
//           onChange={handleChange}
//           onKeyDown={handleKeyDown}
//         />
//       </div>
//     );
//   }
  
    //export default ChatInput;


  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true); // set loading to true when API call is made
    try {
      const res = await axios.post('http://localhost:5000/chat', { input });
      setResponses([...responses, {input, response: res.data.response}]);
    } catch (err) {
      console.error(err);
    }
    setLoading(false); // set loading to false when API response is received
    setInput('');
  };


 return (
    <ChatContainer>
      <ChatHeader>OpenAI Chat</ChatHeader>
      <ChatConversation ref={conversationRef}>
      {loading ? ( // render a loading component if loading is true
          <div className='loadingModal'><img src={logo} alt='Loading...'></img></div>
        ) : (
        
         responses.map((msg, index) => (
          <div key={index}>

            <ChatBubble isResponse={false} isLoading={loading}>
              <ChatMessage isResponse={false}>{msg.input}</ChatMessage>
            </ChatBubble>

            <ChatBubble isResponse={true} isLoading={loading}>
                <ChatMessage isResponse={true} >
                    {msg.response.split(/(```.*\n[\s\S]*?\n```)/g).map((part, i) => {
                        if (part.startsWith('```')) {
                        return (
                            <pre key={i} ref={codeRef}>
                            <code className="language-javascript prism-okaidia">{part.slice(3, -3)}</code>
                            </pre>
                        );
                        } else if (part.startsWith('`')) {
                        return(
                            <pre key={i} ref={codeRef}>
                            <code className="language-javascript prism-okaidia">{part.slice(3, -3)}</code>
                            </pre>
                        );
                        } else {
                        return part;
                        }
                        
                    })}
                </ChatMessage>
            </ChatBubble>

          </div>
        ))
      )}
      </ChatConversation> 

      <ChatForm onSubmit={handleSubmit}>
        {/* <ChatInput type="text" value={input} onKeyPress={handleKeyPress} onChange={e => setInput(e.target.value)} /> */}
        <ChatInput type="text" value={input} onKeyPress={handleKeyPress} onChange={e => setInput(e.target.value)} />
        <ChatButton type="submit">Send</ChatButton>
      </ChatForm>
    </ChatContainer>
    
  );
};

export default Chat;

