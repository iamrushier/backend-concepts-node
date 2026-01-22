// chat.js
import { GoogleGenAI } from "@google/genai"

import dotenv from "dotenv"
dotenv.config()

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY, });

async function run() {
    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",         // gemini-3-flash-preview, gemini-2.5-flash-lite
        contents: "Write a funny sonnet on Backend Developers"
    })

    console.log(response.text)
}


run()


