import React, { useState, useEffect, useRef } from 'react';
import logo from './load.gif';
import mainlogo from './sygoLogo.png';
import axios from 'axios';
import Prism from 'prismjs';

import 'prismjs/components/prism-core';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import "prismjs/components/prism-java";
import "prismjs/components/prism-python";
import "prismjs/components/prism-php";


import { ThemeProvider } from 'styled-components';
// import styled components from ChatStyles.js
import { ChatContainer, ChatHeader, ChatConversation, ChatForm, ChatInput, ChatButton, ChatBubble, ChatMessage } from './ChatStyles'; 
// import prism css
import 'prismjs/themes/prism-okaidia.css';
import { themes } from './themes.js';


const Chat = () => {
  const [input, setInput] = useState('');
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false); // new state for loading
  const codeRef = useRef(null);
  const conversationRef = useRef(null);

  const [theme, setTheme] = useState({
    name: "theme1",
    backgroundColor: "#1a1b1c",
    color: "#dadce1",
    buttonBackgroundColor: "#7289da",
    buttonColor: "#ffffff",
    bubbleBackgroundColor: "#cf8c36",
    bubbleColor: "#ffffff",
  });

  const ThemeSwitcher = ({ onThemeChange }) => {
  
    return (
      <div>
        {themes.map((theme) => (
          <button key={theme.name} onClick={() => onThemeChange(theme)}>
            {theme.name}
          </button>
        ))}
      </div>
    );
  };
  
  const handleThemeChange = (theme) => {
    setTheme(theme);
  };

  useEffect(() => {
    conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
  }, [responses]);

  useEffect(() => {
    Prism.highlightAll();
  }, [responses]);


  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true); // set loading to true when API call is made
    try {
      //const res = await axios.post(['/.netlify/functions/server'], { input });
       const res = await axios.post(['http://localhost:5000/chat'], { input });
      setResponses([...responses, {input, response: res.data.response}]);
    } catch (err) {
      console.error(err);
    }
    setLoading(false); // set loading to false when API response is received
    setInput('');
  };

        return (
          <ThemeProvider theme={theme}>
            <ChatContainer>
              <ChatHeader><div><img src={mainlogo} alt='SyGoAI Chat' className='imgLogo'></img></div></ChatHeader>
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

                        <ChatMessage isResponse={true}>
                        {msg.response.split(/(```.*\n[\s\S]*?\n```)/g).map((part, i) => {
                            if (part.startsWith('```')) {
                              return (
                                <pre key={i} ref={codeRef}>
                                  <code className="language-javascript prism-okaidia">{part.slice(3, -3)}</code>
                                </pre>
                              );
                            }
                            if (part.includes('\n')) {
                              return(
                                  <div key={i} style={{ whiteSpace: 'pre-wrap' }}>
                                  {part}
                                  <br />
                                  </div>
                                
                              );
                            }
                            return part;
                          })}
                        </ChatMessage>

                    </ChatBubble>

                  </div>
                ))
              )}
              </ChatConversation> 

              <ChatForm onSubmit={handleSubmit}>
                {/* <ChatInput type="text" value={input} onKeyPress={handleKeyPress} onChange={e => setInput(e.target.value)} /> */}
                <ChatInput as="textarea" value={input} 
                    onChange={e => setInput(e.target.value)} 
                    onKeyDown={e => {
                      if (e.keyCode === 13 && e.shiftKey) {
                        e.preventDefault();
                        setInput(input + "\n");
                      }else{
                        if (e.keyCode === 13) {
                          e.preventDefault();
                          handleSubmit(e);
                        }
                      }
                    }}
                />
                <ChatButton type="submit">Send</ChatButton>
              </ChatForm>

               {/* <ThemeSwitcher onThemeChange={handleThemeChange} /> */}
                <ThemeSwitcher onThemeChange={handleThemeChange} />

            </ChatContainer>
            </ThemeProvider>  
          );
};

export default Chat;

