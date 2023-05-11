# SygoAI
A personal openai client.
This is a simple chatbot application that uses OpenAI's GPT-3.5-Turbo API to provide responses to user inputs. It is built using Node.js and Express, and uses the OpenAI Node.js SDK to interface with the OpenAI API.

## Getting Started
To run this application, you will need to have Node.js and npm installed on your computer. You will also need an OpenAI API key, which you can obtain by signing up for the OpenAI API beta.

1. Clone this repository to your local machine.
2. Create a .env file in the root directory of the project, and add your OpenAI API key to it: ```API_KEY=your-api-key-goes-here```

3. Install the required dependencies by running `npm install` in the root directory of the project.
4. Start the server by running `npm run dev`. The server will start on port 5000 by default.
5. To start the react app, navigate into the personai folder: `cd /personai`, then run `npm start` to start the client. 

## How to use the Chatbot
Once the server is running, you can interact with the chatbot with the included react app. Contextual history is used during the session, but if the page is reloaded or disconnects, the history is cleared and the chat starts fresh. 




## About the Process

### Building a Chatbot with OpenAI's GPT-3
As an avid tech enthusiast and programmer, I wanted to challenge myself with a project that combined a few different skills. I decided to create a chatbot using OpenAI's GPT-3.5-Turbo API.

### Choosing the Tech Stack
Before diving into coding, I had to choose my tech stack. I decided to go with React for the front-end, as I am familiar with it. For the back-end, I used a serverless function in Netlify to make API requests to OpenAI's API.

### Setting Up the Front-End
The first step in building the chatbot was creating the front-end. I used React to create a chat window with two bubbles - one for the user's messages and one for the chatbot's responses. When the user sends a message, it pushes contextual history to the input (if there is any) and it's sent to the back-end and the chatbot generates a response using GPT-3.5-Turbo. The response is then displayed in the chat window.

### Connecting to OpenAI's GPT-3.5-Turbo API
To connect to OpenAI's GPT-3.5-Turbo API, I created a serverless function in Netlify. The function uses the Axios library to make HTTP requests to the API. I then created an OpenAI account and generated an API key to use in the function.

### Integrating the Front-End with the Back-End
Once the front-end and back-end were set up, I integrated them to make the chatbot work. When the user sends a message, it's sent to the serverless function in Netlify. The function then makes a request to OpenAI's GPT-3.5-Turbo API to generate a response. The response is sent back to the front-end and displayed in the chat window.

### Adding More Features
With the basic chatbot working, I added a few more features to make it more useful. I added a loading modal when the chatbot is generating a response. I also added the ability to display code snippets formatted using prism.js in the chat window. I also added some different theme colors for fun. 

### Conclusion
Building a chatbot with OpenAI's GPT-3.5-Turbo API was a challenging and rewarding project. It allowed me to improve my React skills, as well as learn more about serverless functions and API integrations. With the chatbot working, there are still many more features that could be added to improve its functionality. Overall, I'm proud of what I was able to accomplish and excited to continue learning and building more projects in the future.
