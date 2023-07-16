const express = require('express');
const app = express();

require('dotenv').config();
const path = require('path');

const bodyParser = require('body-parser');
app.use(bodyParser.json())

//cors

const cors = require("cors");
app.use(cors())

// Open-ai key
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const prompt = `Please make quiz of more than three questions from this text in the json format like{ quiz : { title  :   Geography Quiz  , description  :   Test your knowledge on geography!  , length  :3, questions  : [ { question  :   What is the capital of France?  ,             options  : [ Madrid  ,Paris  , London  ,    Berlin   ], answer  :   Paris  }, { question  :   Which continent is Brazil located in?  , options  : [ North America  , South America  , Europe  , Asia   ], answer  :   South America   }, { question  :   What is the largest country in the world by land area?  , options  : [ United States  , China  , Russia  , Canada   ],   answer  :   Russia   } ] }  use this following text The word photosynthesis is derived from the Greek words phōs pronounced: fos and σύνθεσις (pronounced: synthesis)Phōs means light and σύνθεσις means, combining together. This means combining together with the help of light Photosynthesis also applies to other organisms besides green plants. These include several prokaryotes such as  bacteria and green sulfur bacteria. These organisms exhibit photosynthesis just like green plants.The glucose produced during photosynthesis is then used to fuel various cellular activities. The by-product of this physio-chemical is oxygen.`

// const runPrompt = async() => {
//     const promptai = prompt;

//     const response = await openai.createCompletion({
//         model:"text-davinci-003",
//         prompt: prompt,
//         max_tokens: 2048,
//         temperature: 0.9,
//     });

//     console.log(response.data)
// }

// runPrompt();
app.get('/hello',() => {
  res.send("hello world")
})
app.get("/",(req,res)=>{
   console.log('hello')
})

app.post("/quiz", async(req,res)=>{
    // Quiz Question
    const {quiz} = req.body
    console.log(quiz)
    // Number of quiz

    //Prompt
    const prompt = `Please make ${quiz} of more than three questions from this text in the json format like{ quiz : { title  :   Geography Quiz  , description  :   Test your knowledge on geography!  , length  :3, questions  : [ { question  :   What is the capital of France?  ,             options  : [ Madrid  ,Paris  , London  ,    Berlin   ], answer  :   Paris  }, { question  :   Which continent is Brazil located in?  , options  : [ North America  , South America  , Europe  , Asia   ], answer  :   South America   }, { question  :   What is the largest country in the world by land area?  , options  : [ United States  , China  , Russia  , Canada   ],   answer  :   Russia   } ] }  use this following text The word photosynthesis is derived from the Greek words phōs pronounced: fos and σύνθεσις (pronounced: synthesis)Phōs means light and σύνθεσις means, combining together. This means combining together with the help of light Photosynthesis also applies to other organisms besides green plants. These include several prokaryotes such as  bacteria and green sulfur bacteria. These organisms exhibit photosynthesis just like green plants.The glucose produced during photosynthesis is then used to fuel various cellular activities. The by-product of this physio-chemical is oxygen.`

   ;
    // const runPrompt = async() => {
        // const response = await openai.createCompletion({
        //     model:"text-davinci-003",
        //     prompt: prompt,
        //     max_tokens: 2048,
        //     temperature: 0.9,
        // });
    
    //     console.log(response.data)
    //     res.send(response.data)
    // }
    
    // runPrompt();

    
      const response = await openai.createCompletion({
        model:"text-davinci-003",
        prompt: prompt,
        max_tokens: 2048,
        temperature: 0.9,
    });
    console.log(response.data);
    res.send(response.data)

     
})

app.listen(5000,console.log('sever is running on port 5000'));

