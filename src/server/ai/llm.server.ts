
import type { AIMessage } from "@/types"
import { zodFunction } from 'openai/helpers/zod'
import {OpenAI} from "openai"
import { defaultSystemPrompt } from "./systemPrompt.server"
const ai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})


export const runLLM = async ({
    	messages, 
	tools = [], 
	systemPrompt }:
	{
		messages: AIMessage[],
		tools?: any[],
		systemPrompt?: string
	}) => {

        const formatTools = tools.map(zodFunction)

        const response = await ai.chat.completions.create({
            model: "gpt-5-nano",
            messages:[
                {role: "system", content: systemPrompt ?? defaultSystemPrompt},
                ...messages
            ],
            ...(formatTools.length > 0 && {
                tools: formatTools,
                tool_choice: "auto",
                parallel_tool_calls: false,
            }),

        })

        return response.choices[0].message ?? ""
    }