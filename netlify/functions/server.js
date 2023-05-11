const { config } = require("dotenv");
const { OpenAIApi, Configuration } = require('openai');

config();

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.API_KEY,
}));

exports.handler = async function (event, context) {
  const { input } = JSON.parse(event.body);

  //Add the historical context to the next prompt.
  const messages = [{ role: "user", content: input }];
  if (openai.history) {
    messages.unshift(...openai.history);
  }
  ///////////////////////////////////////////////////

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    //messages: [{ role: "user", content: input }],
    messages
  });

  // Create the history array if it doesn't exist.
  if (!openai.history) {
    openai.history = [];
  }
  openai.history.push({role: 'user', content: input});
  openai.history.push({role: 'assistant', content: response.data.choices[0].message.content});
  const newInput = [...openai.history, { role: 'user', content: input }];
///////////////////////////////////////////////////

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST",
    },
    body: JSON.stringify({ response: response.data.choices[0].message.content }),
  };
};