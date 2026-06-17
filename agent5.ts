//set agent how behave using promt for agent role and responsibilities with intracting tools
//because why give llm to findout each tool to decide instead promt to direct respective tool
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { createAgent, tool } from "langchain";
import 'dotenv/config'
import z from "zod";



const systemPrompt = `You are an expert weather forecaster.

You have access to two tools:

- get_weather_for_location: use this to get the weather for a specific location
- get_user_location: use this to get the user's location

If a user asks you for the weather, make sure you know the location first. If you can tell from the question that they mean wherever they are, use the get_user_location tool to find their location.`;


//how i should get the location for that is via ->tool

const getUserLocation = tool((_,config)=> {
     const user_id = config.context.user_id;
     //fire database query to get location based on user_id
     return user_id === "1" ? "Florida" : "SFO";
},{
    name:"get_user_location",
    description:"Retrive user information from user id",
    schema : z.object({})
})

const getWeather = tool((input)=>{
    return `its always sunny in ${input.city}`
},{
    name:'get_weather',
    description:"get weather for given city",
    schema:z.object({
        city:z.string()
    })
})

//run time config
const config = {
    context : {user_id:"1"} 
}
// here in config based on login user token to fire the database and grap the user details ex location
// 12 (userid), 12->city()
const agent = createAgent({
    model:new ChatGoogleGenerativeAI({
        model:'gemini-2.5-flash'
    }),tools:[getUserLocation,getWeather] ,systemPrompt
})

const response = await agent.invoke({
    messages:[{role:'user', content:"what is weather outside"}]
},config)

console.log(response)