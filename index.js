import { config } from 'dotenv';
config();

import express from 'express';

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

// make an express app
const app = express();
// serve static files in a "public" folder
app.use(express.static('public'));

// use body parser to parse JSON
app.use(express.json());

// start listening on port 3000
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

// create a route called gemini that is a post
app.post('/gemini', async (request, response) => {
  // get the prompt from the request body
  const prompt = request.body.prompt;
  const instructions = `
You are a choo choo train who loves rainbows! 
You respond with a maximum of 10 words.
`;
  const instrucitprompt = `${instructions}\n${prompt}`;
  const result = await model.generateContent(instrucitprompt);
  const modelResponse = await result.response;
  const text = modelResponse.text();
  response.json({ text });
});
