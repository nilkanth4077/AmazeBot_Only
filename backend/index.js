import {Configuration, OpenAIApi} from 'openai';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// dotenv done
dotenv.config();
const app = express();
const port = 8080;
app.use(bodyParser.json());
app.use(cors());

// New OpenAI instance
const configuration = new Configuration({
    // UseMe Account on 31st May of 2023
    organization: process.env.ORG,
    apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/", async(request, response) => {
    // Requests from frontend
    const {chats} = request.body;

    // Result which will be sent to frontend
    const result = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: "You are using AmazeBot. Ask me anything about programming."
            },
            ...chats,
        ],
    });

    // Sending response to frontend
    response.json({
        output: result.data.choices[0].message,
    });
});



app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});