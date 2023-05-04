import { config } from "dotenv"
config()

import { Configuration, OpenAIApi } from "openai"
import readline from "readline"


///////////////////////////////////////////////////////////

const openai = new OpenAIApi(new Configuration({ 
    apiKey: process.env.API_KEY 
}))

const userInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

userInterface.prompt()
userInterface.on("line", async input => {
    const res = await openai.createCompletion({
        model: "text-davinci-003",
        //messages: [{ role: "user", content: "Hello ChatGPT"}],
        prompt: input,
        //max_tokens: 2048,
        //temperature: 0.5,
        //n: 1,
        //stop: "\n",
    })
    console.log(res.data.choices[0].text)
    userInterface.prompt()

})

// ///////////////////////////////////////////////////////////

// // openai
// //     .createCompletion({
// //         model: "text-davinci-003",
// //         //messages: [{ role: "user", content: "Hello ChatGPT"}],
// //         prompt: "Hello ChatGPT",
// //     })
// //     .then(res => {
// //         //console.log(res.data.choices[0].text)
// //         console.log(res.data)
// //     })

// // console.log(process.env.API_KEY)


// /////////////////////////////////////////////////////////
///////////corrected code///////////////////////////////

// import { config } from "dotenv"
// config()

// import { Configuration, OpenAIApi } from "openai"
// import readline from "readline"

// const openAi = new OpenAIApi(
//   new Configuration({
//     apiKey: process.env.API_KEY,
//   })
// )

// const userInterface = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// })

// userInterface.prompt()
// userInterface.on("line", async input => {
//   const response = await openAi.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     messages: [{ role: "user", content: input }],
//   })
//   console.log(response.data.choices[0].message.content)
//   userInterface.prompt()
// })