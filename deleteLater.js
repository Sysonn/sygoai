import { useState } from 'react';
import axios from 'axios';

const Chat = () => {
  const [input, setInput] = useState('');
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false); // new state for loading

  const codeRef = useRef(null);

  useEffect(() => {
    Prism.highlightAll();
  }, [responses]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // set loading to true when API call is made
    try {
      const res = await axios.post('http://localhost:5000/chat', { input });
      setResponses([...responses, { input, response: res.data.response }]);
    } catch (err) {
      console.error(err);
    }
    setLoading(false); // set loading to false when API response is received
    setInput('');
  };

  return (
    <ChatContainer>
      <ChatHeader>OpenAI Chat</ChatHeader>
      <ChatConversation>
        {loading ? ( // render a loading component if loading is true
          <div>Loading...</div>
        ) : (
          responses.map((msg, index) => (
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
                          <code className="language-javascript prism-okaidia">
                            {part.slice(3, -3)}
                          </code>
                        </pre>
                      );
                    } else if (part.startsWith('`')) {
                      return (
                        <pre key={i} ref={codeRef}>
                          <code className="language-javascript prism-okaidia">
                            {part.slice(3, -3)}
                          </code>
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
        <ChatInput type="text" value={input} onChange={(e) => setInput(e.target.value)} />
        <ChatButton type="submit">Send</ChatButton>
      </ChatForm>
    </ChatContainer>
  );
};

export default Chat;