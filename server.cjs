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

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: input }],
  });

  res.json({ response: response.data.choices[0].message.content});
});

app.use(express.static(''));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));