

import type { AIMessage } from "@/types.js";
import { runLLM } from "./llm.server.js";
import { execTool } from "./toolManager.server.js";



type RunAgentInput = {
  userMessage: string;
  prevMessages: AIMessage[]
  tools: any[];
};

export const runAgent = async ({ userMessage, prevMessages, tools }: RunAgentInput): Promise<AIMessage[]> => {
  // Guardar el índice inicial para identificar mensajes nuevos
  const initialMessageCount = prevMessages.length;
  
  // Agregar mensaje del usuario
  prevMessages.push({ role: "user", content: userMessage });

  while (true) {
    const response = await runLLM({ messages: prevMessages, tools });

    prevMessages.push(response);

    if (response.content) {
      // Retornar solo los mensajes nuevos generados en esta sesión
      return prevMessages.slice(initialMessageCount + 1);
    }

    if (response.tool_calls && response.tool_calls.length > 0) {
      const toolCall = response.tool_calls[0];

	  if (!toolCall || toolCall?.type != 'function') {
		  // Retornar mensajes nuevos incluso en caso de error
		  return prevMessages.slice(initialMessageCount);
	  }

      const toolResponse = await execTool(toolCall, userMessage);

      prevMessages.push({ role: "tool", content: toolResponse, tool_call_id: toolCall.id });

      continue;
    
	}

    // Retornar mensajes nuevos en caso de que no haya contenido ni tool calls
    return prevMessages.slice(initialMessageCount);
  }
};