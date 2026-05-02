import { QUERIES } from '@/server/queries.server'
import type { ToolFn } from '@/types'
import { z } from 'zod'

export const listProjectsAllDefinition = {
	name: 'listProjectsAll',
	parameters: z
		.object({
			limit: z
				.number()
                .min(1)
                .max(100)
				.describe('limit of entries'),
            offset: z
                .number()
                .min(0)
                .describe('offset of entries'),
		})
		.describe('List government projects Useful for finding projects'),
}

type Args = z.infer<typeof listProjectsAllDefinition.parameters>

export const listProjectsWithoutChanges: ToolFn<Args, string> = async ({
	toolArgs,
	userMessage,
}) => {
	try {
        const {limit, offset} = toolArgs


		// Query the database for projects without changes
		const result = await QUERIES.getProyects(limit, offset)

		if (!result.data || result.data?.length === 0) {
			return JSON.stringify({
				success: false,
				message: "No se encontraron proyectos sin cambios registrados.",
				suggestion: 'Intenta con filtros diferentes o verifica que existan proyectos sin cambios en el sistema.'
			})
		}

		// Format the response for the AI
		const formattedResponse = {
			success: true,
			message: `Se encontraron ${result.data.length} proyecto(s) sin cambios registrados.`,
			projects: result.data.map((project: any) => ({
				id: project.id,
				name: project.name,
				description: project.description,
				company: project.company,
				location: project.location,
				municipality: project.municipality,
				budget: project.budget,
				status: project.status,
				startedAt: project.startedAt,
				hasChanges: false
			}))
		}

		return JSON.stringify(formattedResponse, null, 2)
	} catch (error) {
		console.error('Error in listProjectsWithoutChanges tool:', error)
		return JSON.stringify({
			success: false,
			message: 'Ocurrió un error al buscar proyectos sin cambios.',
			error: error instanceof Error ? error.message : 'Error desconocido'
		})
	}
}

// Made with Bob
