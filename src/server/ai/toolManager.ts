import type OpenAI from "openai";



export async function execTool(
    toolcall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
    userMessage: string
) {
    if (toolcall.type !== "function") {
        return `Stop asking for this type of toolcall ever ${toolcall.type}`
    }

    const userInput = {
        userMessage,
        toolArgs: JSON.parse(toolcall.function.arguments)
    }

    switch (toolcall.function.name) {

        default:
            return `Stop dont call this tool again ${toolcall.function.name}`
    }
}