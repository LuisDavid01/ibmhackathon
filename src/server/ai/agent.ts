

import type { AIMessage } from "@/types.js";
import { runLLM } from "./llm.js";
import { execTool } from "./toolManager.js";



type RunAgentInput = {
  userMessage: string;
  prevMessages: AIMessage[]
  tools: any[];
};

export const runAgent = async ({ userMessage, prevMessages, tools }: RunAgentInput): Promise<string> => {
  // como hago que el agente pueda ejecutarse en un bucle si el input solo viene del cliente web?
  prevMessages.push({ role: "user", content: userMessage });

  while (true) {
    // como consiguo el context? const context = await getMessages();

    const response = await runLLM({ messages: prevMessages, tools });

    prevMessages.push(response);

    if (response.content) {

      const text = response.content 
      return text.trim();
    }

    if (response.tool_calls && response.tool_calls.length > 0) {
      const toolCall = response.tool_calls[0];

	  if (!toolCall || toolCall?.type != 'function') {
		  return 'No pude generar una respuesta en este turno. Intenta reformular o vuelve a preguntar.';
	  }


      const toolResponse = await execTool(toolCall, userMessage);

      prevMessages.push({ role: "tool", content: toolResponse, tool_call_id: toolCall.id });


      continue;
    
	}

    return 'No pude generar una respuesta en este turno. Intenta reformular o vuelve a preguntar.';
  }
};