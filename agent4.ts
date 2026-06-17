//run time configuration
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { createAgent, tool } from "langchain";
import 'dotenv/config'
import z from "zod";


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
    }),tools:[getUserLocation,getWeather] 
})

const response = await agent.invoke({
    messages:[{role:'user', content:"what is weather outside"}]
},config)

console.log(response)