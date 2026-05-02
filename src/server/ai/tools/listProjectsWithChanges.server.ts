import { QUERIES } from '@/server/queries.server'
import type { ToolFn } from '@/types'
import { z } from 'zod'

export const listProjectsWithChangesDefinition = {
	name: 'listProjectsWithChanges',
	parameters: z
		.object({
			municipality: z
				.string()
				.optional()
                .nullable()
				.describe('Filter by municipality name'),
			name: z
				.string()
				.optional()
                .nullable()
				.describe('Filter by project name (partial match)'),
			budgetMin: z
				.number()
				.optional()
                .nullable()
				.describe('Minimum budget filter'),
			budgetMax: z
				.number()
				.optional()
                .nullable()
				.describe('Maximum budget filter'),
			company: z
				.string()
				.optional()
                .nullable()
				.describe('Filter by company name (partial match)')
		})
		.describe('List government projects that HAVE changes registered. Returns projects with their change statistics including budget spent, remaining budget, and number of changes. All filters are optional.'),
}

type Args = z.infer<typeof listProjectsWithChangesDefinition.parameters>

export const listProjectsWithChanges: ToolFn<Args, string> = async ({
	toolArgs,
	userMessage,
}) => {
	try {
		const filters = {
			municipality: toolArgs.municipality,
			name: toolArgs.name,
			budgetMin: toolArgs.budgetMin,
			budgetMax: toolArgs.budgetMax,
			company: toolArgs.company,
		}

		// Remove undefined values
		const cleanFilters = Object.fromEntries(
			Object.entries(filters).filter(([_, value]) => value !== undefined)
		)

		// Query the database for projects with changes
		const result = await QUERIES.listProjectsWithChanges(
			Object.keys(cleanFilters).length > 0 ? cleanFilters : undefined
		)

		if (!result.found) {
			return JSON.stringify({
				success: false,
				message: result.message,
				suggestion: 'Intenta con filtros diferentes o verifica que existan proyectos con cambios en el sistema.'
			})
		}

		// Format the response for the AI
		const formattedResponse = {
			success: true,
			message: `Se encontraron ${result.count} proyecto(s) con cambios registrados.`,
			appliedFilters: cleanFilters,
			projects: result.projects.map((project: any) => ({
				id: project.id,
				name: project.name,
				description: project.description,
				company: project.company,
				location: project.location,
				municipality: project.municipality,
				status: project.status,
				budget: {
					total: project.budget,
					spent: project.totalBudgetSpent,
					remaining: project.budgetRemaining,
					usedPercentage: project.budgetUsedPercentage
				},
				statistics: {
					totalChanges: project.changesCount,
					lastChangeDate: project.lastChangeDate
				},
				startedAt: project.startedAt
			}))
		}

		return JSON.stringify(formattedResponse, null, 2)
	} catch (error) {
		console.error('Error in listProjectsWithChanges tool:', error)
		return JSON.stringify({
			success: false,
			message: 'Ocurrió un error al buscar proyectos con cambios.',
			error: error instanceof Error ? error.message : 'Error desconocido'
		})
	}
}

// Made with Bob
