import { QUERIES } from '@/server/queries.server'
import type { ToolFn } from '@/types'
import { z } from 'zod'

export const listProjectChangesByNameDefinition = {
	name: 'listProjectChangesByName',
	parameters: z
		.object({
			projectName: z
				.string()
				.describe('Name of the project to search for (partial match allowed)')
		})
		.describe('List all changes for a specific government project by searching its name. Returns detailed information about each change including budget spent, state, and dates.'),
}

type Args = z.infer<typeof listProjectChangesByNameDefinition.parameters>

export const listProjectChangesByName: ToolFn<Args, string> = async ({
	toolArgs,
	userMessage,
}) => {
	try {
		const { projectName } = toolArgs

		// Query the database for project changes by name
		const result = await QUERIES.listProjectChangesByProjectName(projectName)

		if (!result.found) {
			return JSON.stringify({
				success: false,
				message: result.message,
				suggestion: 'Verifica el nombre del proyecto o intenta con una búsqueda más general.'
			})
		}

		// Format the response for the AI
		const formattedResponse = {
			success: true,
			message: `Se encontraron ${result.totalChanges} cambio(s) para el proyecto "${result.projectName}".`,
			project: {
				id: result.projectId,
				name: result.projectName,
				description: result.projectDescription,
				budget: {
					total: result.projectBudget,
					spent: result.totalBudgetSpent,
					remaining: result.budgetRemaining,
					usedPercentage: result.budgetUsedPercentage
				}
			},
			statistics: {
				totalChanges: result.totalChanges,
				totalBudgetSpent: result.totalBudgetSpent
			},
			changes: result.changes.map((change: any) => ({
				id: change.id,
				title: change.changeTitle,
				details: change.details,
				budgetSpent: change.budgetSpent,
				state: change.changeState,
				createdAt: change.createdAt,
				updatedAt: change.updatedAt,
				userId: change.userId
			}))
		}

		return JSON.stringify(formattedResponse, null, 2)
	} catch (error) {
		console.error('Error in listProjectChangesByName tool:', error)
		return JSON.stringify({
			success: false,
			message: 'Ocurrió un error al buscar los cambios del proyecto.',
			error: error instanceof Error ? error.message : 'Error desconocido'
		})
	}
}

// Made with Bob
