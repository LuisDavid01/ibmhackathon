import type OpenAI from "openai";
import { lookProyectInfo, lookProyectToolDefinition } from "./tools/lookProyectInformation.server";
import { listProjectsAllDefinition, listProjectsWithoutChanges} from "./tools/listProjectsWithoutChanges.server";
import { listProjectsWithChanges, listProjectsWithChangesDefinition } from "./tools/listProjectsWithChanges.server";
import { listProjectChangesByName, listProjectChangesByNameDefinition } from "./tools/listProjectChangesByName.server";

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
        case lookProyectToolDefinition.name:
            return await lookProyectInfo(userInput)

        case listProjectsAllDefinition.name:
            return await listProjectsWithoutChanges(userInput)

        case listProjectsWithChangesDefinition.name:
            return await listProjectsWithChanges(userInput)

        case listProjectChangesByNameDefinition.name:
            return await listProjectChangesByName(userInput)

        default:
            return `Stop dont call this tool again ${toolcall.function.name}`
    }
}