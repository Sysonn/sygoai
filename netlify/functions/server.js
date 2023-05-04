const { config } = require("dotenv");
const { OpenAIApi, Configuration } = require('openai');

config();

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.API_KEY,
}));

exports.handler = async function (event, context) {
  const { input } = JSON.parse(event.body);

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: input }],
  });

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