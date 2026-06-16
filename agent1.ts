import { createAgent } from "langchain";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import "dotenv/config";

const agent = createAgent({
  model: new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
  }),
});

const response = await agent.invoke({
  messages: [
    {
      role: "user",
      content: "what is the value of 2+18 ?"
    },
  ],
});

console.log(response);