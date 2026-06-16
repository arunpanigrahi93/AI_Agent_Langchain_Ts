import { createAgent,tool } from "langchain";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import "dotenv/config";
import z from 'zod';

const getWeather = tool((input)=>{
    return `its always sunny in ${input.city}`
},{
    name:'get_weather',
    description:"get the weather for given city",
    schema:z.object({
        city:z.string()
    })
})


const agent = createAgent({
  model: new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
  }),tools:[getWeather]
});

const response = await agent.invoke({
  messages: [
    {
      role: "user",
      content: "what is weather in new york?"
    },
  ],
});

console.log(response);