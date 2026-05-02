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
            .describe('location of the project where it is being executed')
		})
		.describe('Search for government projects by name and location. Returns detailed information about the project including budget, changes, and progress.'),
}

type Args = z.infer<typeof  lookProyectToolDefinition.parameters>

export const lookProyectInfo: ToolFn<Args, string> = async ({
	toolArgs,
	userMessage,
}) => {
	try {
		const { projectName, location } = toolArgs
		
		// Query the database for project information
		const result = await QUERIES.lookProyectWithInfo(projectName, location)
		
		if (!result.found) {
			return JSON.stringify({
				success: false,
				message: result.message,
				suggestion: 'Intenta buscar con un nombre diferente o verifica la ubicación del proyecto.'
			})
		}

		// Format the response for the AI
		const formattedResponse = {
			success: true,
			message: `Se encontraron ${result.count} proyecto(s) que coinciden con la búsqueda.`,
			projects: result.projects.map((project: any) => ({
				id: project.id,
				name: project.name,
				description: project.description,
				company: project.company,
				location: project.location,
				municipality: project.municipalidad,
				budget: {
					total: project.budget,
					spent: project.totalBudgetSpent,
					remaining: project.budgetRemaining,
					usedPercentage: project.budgetUsedPercentage + '%'
				},
				startedAt: project.startedAt,
				statistics: {
					totalChanges: project.changesCount,
					lastUpdate: project.changes[0]?.createdAt || null
				},
				recentChanges: project.changes.slice(0, 5).map((change: any) => ({
					title: change.changeTitle,
					details: change.details,
					budgetSpent: change.budgetSpent,
					date: change.createdAt
				}))
			}))
		}

		return JSON.stringify(formattedResponse, null, 2)
	} catch (error) {
		console.error('Error in lookProyectInfo tool:', error)
		return JSON.stringify({
			success: false,
			message: 'Ocurrió un error al buscar la información del proyecto.',
			error: error instanceof Error ? error.message : 'Error desconocido'
		})
	}
}