import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { createAgent ,tool} from "langchain";
import "dotenv/config"
import z from 'zod'

const getWeather = tool((input)=>{
    return `its always sunny in ${input.city}`
},{
    name:'get_weather',
    description:"get weather for given city",
    schema:z.object({
        city:z.string()
    })
})

const getTime = tool((input)=>{
    return `the current time in ${input} is 3:00`
},{
    name:'get_time',
    description:"get time for given city",
    schema:z.object({
        city:z.string()
    })
})

const agent = createAgent({
    model: new ChatGoogleGenerativeAI({
        model:'gemini-2.5-flash'
    }), tools:[getWeather,getTime]
})


const response = await agent.invoke({
//     messages: [
//     {
//       role: "user",
//       content: "what is weather in new york?"
//     },
//   ],
    messages:[{role:'user', content:'What is time in new york'}]
})


console.log(response)