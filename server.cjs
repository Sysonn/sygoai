// const { config } = require("dotenv");
// const express = require('express');
// const bodyParser = require('body-parser');
// const { OpenAIApi, Configuration } = require('openai');
// const cors = require('cors');

// const app = express();

// config();

// app.use(cors());
// app.use(bodyParser.json());

// const openai = new OpenAIApi(new Configuration({
//   apiKey: process.env.API_KEY,
// }));

// app.post('/chat', async (req, res) => {
//   const { input } = req.body;

//   const response = await openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     messages: [{ role: "user", content: input }],
//   });

//   //openai.setHistory([...openai.history, input]);


//     // // Create the history array if it doesn't exist.
//     // if (!openai.history) {
//     //   openai.history = [];
//     // }

//     //openai.history.push(input);
  
//     // // Add the historical context to the next prompt.
//     // openai.history.push(input);
//     // openai.history.push({response: response.data.choices[0].message.content});
//     // input.push(...openai.history);


//       // Create the history array if it doesn't exist.
//       if (!openai.history) {
//         openai.history = [{input}];
//       }

//       // Add the historical context to the next prompt.
//       //openai.history.push(input);
//       //openai.history.push({response: response.data.choices[0].message.content});
//       //const newInput = [...openai.history, input];
//       //input.push(...openai.history);

//  console.log(response.data.choices[0].message.content);
//  console.log(openai.history);
//  console.log({input});
//   res.json({ response: response.data.choices[0].message.content});
// });

// app.use(express.static('public'));

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

//////////////////////////////////////////////////////////

const { config } = require("dotenv");
const express = require('express');
const bodyParser = require('body-parser');
const { OpenAIApi, Configuration } = require('openai');
const cors = require('cors');

const app = express();

config();

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.API_KEY,
}));

app.post('/chat', async (req, res) => {
  const { input } = req.body;

  const messages = [{ role: "user", content: input }];
  if (openai.history) {
    messages.unshift(...openai.history);
  }

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages,
  });

  if (!openai.history) {
    openai.history = [];
  }
  openai.history.push({role: 'user', content: input});
  openai.history.push({role: 'assistant', content: response.data.choices[0].message.content});
  const newInput = [...openai.history, { role: 'user', content: input }];
  
  console.log(response.data.choices[0].message);
  console.log("----------------------");
  console.log(response.data.choices);
  console.log("----------------------");
  console.log(openai.history);
  console.log("----------------------");
  console.log({input});
  res.json({ response: response.data.choices[0].message.content});
});

app.use(express.static('public'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));