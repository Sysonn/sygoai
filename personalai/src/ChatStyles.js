import styled from 'styled-components';

export const ChatContainer = styled.div`
  //background-color: #1a1b1c;
  //color: #dadce1;
  background-color: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.color};
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const ChatHeader = styled.h1`
  margin-bottom: 1rem;
  font-size: 2rem;
`;

export const ChatConversation = styled.div`
  background-color: #242526;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  width: 90%;
  max-width: 600px;

  @media (min-width: 768px) {
    max-width: 768px;
  }

  @media (min-width: 992px) {
    max-width: 992px;
  }

  @media (min-width: 1200px) {
    max-width: 1200px;
  }
`;

export const ChatForm = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 90%;
  max-width: 600px;
  margin-bottom: 10px;
  background-color: #3a3b3c;
  border-radius: 10px;
  padding: 10px;
  font-size: 16px;

  @media (min-width: 768px) {
    max-width: 768px;
  }

  @media (min-width: 992px) {
    max-width: 992px;
  }

  @media (min-width: 1200px) {
    max-width: 1200px;
  }

`;

export const ChatInput = styled.input`
  background-color: #3a3b3c;
  border: none;
  padding: 0.5rem 1rem;
  color: #dadce1;
  width: 100%;
  margin-right: 0.5rem;
  font-size: 16px;
`;

export const ChatButton = styled.button`
  border-radius: 10px;
  background-color: ${props => props.theme.buttonBackgroundColor};
  border: none;
  color: ${props => props.theme.buttonColor};
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #5b6eae;
  }
`;

export const ChatBubble = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isResponse ? "flex-end" : "flex-start")};
  opacity: ${(props) => (props.isLoading ? "0.5" : "1")}; // set opacity to 0.5 when loading is true
  margin: 1rem;
`;

export const ChatMessage = styled.div`
  // background-color: ${(props) => (props.isResponse ? "#7289da" : "#3a3b3c")};
  background-color: ${(props) => (props.isResponse ? props.theme.bubbleBackgroundColor : "#3a3b3c")};
  color: ${(props) => (props.isResponse ? props.theme.buttonColor  : "#dadce1")};
  padding: 0.5rem 1rem;
  border-radius: ${(props) =>
    props.isResponse ? "10px 10px 0 10px" : "10px 10px 10px 0"};
  max-width: 90%;
  overflow-x: auto;
  box-shadow: 3px 8px 3px rgba(0, 0, 0, 0.3);

  /* Set the font family and size for the highlighted code */
  code {
    font-family: "Courier New", Courier, monospace;
    font-size: 14px;
  }

  @media screen and (min-width: 480px) {
    font-size: 16px;
  }
`;