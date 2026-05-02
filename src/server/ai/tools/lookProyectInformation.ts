import { QUERIES } from '@/server/queries.server'
import type { ToolFn } from '@/types'
import { z } from 'zod'



export const lookProyectToolDefinition = {
	name: 'lookProyectInfo',
	parameters: z
		.object({
			projectName: z
				.string()
				.describe(
					'name of the project the citizen is looking for'
				),
            location: z
            .string()
            .describe('location of the project')
		})
		.describe('this tool crawls a webpage recursively and only takes ONE URL as parameter, returns a list of all the links the tool could find.'),
}

type Args = z.infer<typeof  lookProyectToolDefinition.parameters>

export const lookProyectInfo: ToolFn<Args, string> = async ({
	toolArgs,
	userMessage,
}) => {
	//const {projectName, location}= toolArgs
    //const resp = await QUERIES.lookProyectWithInfo(projectName,location)
	const respJson = JSON.stringify("")

	return respJson
}