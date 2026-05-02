import { createFileRoute } from '@tanstack/react-router'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { NeoBrutalButton } from '@/components/dashboard/NeoBrutalButton'
import { NeoBrutalInput } from '@/components/dashboard/NeoBrutalInput'
import { NeoBrutalModal } from '@/components/dashboard/NeoBrutalModal'
import { NeoBrutalTextarea } from '@/components/dashboard/NeoBrutalTextarea'
import { MessageCircle, Trash2, Edit } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getComments, crearComment, actualizarComment, eliminarComment } from '@/functions/comments.functions'
import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'
import type { CommentData } from '@/types'

export const Route = createFileRoute('/dashboard/comentarios')({
  component: RouteComponent,
})

function RouteComponent() {
  const queryClient = useQueryClient()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingComment, setEditingComment] = useState<any | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null)

  // Fetch comments
  const { data: commentsData, isLoading } = useQuery({
    queryKey: ['comments', 0, 100],
    queryFn: () => getComments({ data: { limit: 100, offset: 0 } }),
  })

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (data: CommentData) => crearComment({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] })
      setIsCreateModalOpen(false)
      toast.success('Comentario creado exitosamente')
    },
    onError: () => {
      toast.error('Error al crear el comentario')
    },
  })

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CommentData> }) =>
      actualizarComment({ data: { id, data } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] })
      setEditingComment(null)
      toast.success('Comentario actualizado exitosamente')
    },
    onError: () => {
      toast.error('Error al actualizar el comentario')
    },
  })

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => eliminarComment({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] })
      setDeleteConfirmId(null)
      toast.success('Comentario eliminado exitosamente')
    },
    onError: () => {
      toast.error('Error al eliminar el comentario')
    },
  })

  // Filter comments
  const filteredComments = commentsData?.data?.filter((comment: any) => {
    return comment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           comment.content.toLowerCase().includes(searchTerm.toLowerCase())
  }) || []

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="relative border-b-2 border-border bg-background px-8 py-6 flex items-center justify-between overflow-hidden">
        <div>
          <div className="font-mono text-xs text-muted-foreground tracking-widest">
            GESTIÓN DE COMENTARIOS
          </div>
          <h1 className="text-4xl font-black uppercase">Comentarios</h1>
          <div className="font-mono text-sm text-muted-foreground mt-1">
            {commentsData?.total || 0} comentarios registrados
          </div>
        </div>
        <MessageCircle className="absolute right-8 top-0 size-32 opacity-5" />
        <NeoBrutalButton onClick={() => setIsCreateModalOpen(true)}>
          Nuevo Comentario
        </NeoBrutalButton>
      </div>

      {/* Search Bar */}
      <div className="bg-muted border-b-2 border-border px-8 py-4">
        <NeoBrutalInput
          placeholder="BUSCAR COMENTARIO..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-64"
        />
      </div>

      {/* Table */}
      <div className="px-8 py-6">
        {isLoading ? (
          <div className="text-center py-12 font-mono text-muted-foreground">
            CARGANDO...
          </div>
        ) : filteredComments.length === 0 ? (
          <div className="text-center py-12 font-mono text-muted-foreground">
            NO HAY COMENTARIOS
          </div>
        ) : (
          <table className="w-full border-collapse border-2 border-border">
            <thead className="bg-foreground text-background">
              <tr>
                <th className="font-mono text-xs uppercase tracking-widest px-4 py-3 text-left border-r-2 border-background/20">
                  #ID
                </th>
                <th className="font-mono text-xs uppercase tracking-widest px-4 py-3 text-left border-r-2 border-background/20">
                  Título
                </th>
                <th className="font-mono text-xs uppercase tracking-widest px-4 py-3 text-left border-r-2 border-background/20">
                  Contenido
                </th>
                <th className="font-mono text-xs uppercase tracking-widest px-4 py-3 text-left border-r-2 border-background/20">
                  Fecha
                </th>
                <th className="font-mono text-xs uppercase tracking-widest px-4 py-3 text-left">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredComments.map((comment: any, index: number) => (
                <tr
                  key={comment.id}
                  className={`border-b-2 border-border hover:bg-muted transition-colors ${
                    index % 2 === 0 ? 'even:bg-muted/30' : ''
                  }`}
                >
                  <td className="font-mono text-xs text-muted-foreground px-4 py-3">
                    #{comment.id}
                  </td>
                  <td className="px-4 py-3 font-semibold">{comment.title}</td>
                  <td className="px-4 py-3 max-w-md truncate">{comment.content}</td>
                  <td className="font-mono text-sm px-4 py-3">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingComment(comment)}
                        className="border-2 border-border rounded-none p-1.5 hover:bg-muted transition-colors"
                        title="Editar comentario"
                      >
                        <Edit className="size-4" />
                      </button>
                      {deleteConfirmId === comment.id ? (
                        <button
                          onClick={() => deleteMutation.mutate(comment.id)}
                          className="border-2 border-destructive rounded-none px-2 py-1.5 font-mono text-xs text-destructive hover:bg-destructive/10 transition-colors"
                          disabled={deleteMutation.isPending}
                        >
                          ¿CONFIRMAR?
                        </button>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirmId(comment.id)}
                          className="border-2 border-border rounded-none p-1.5 hover:bg-muted transition-colors"
                          title="Eliminar comentario"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Create Modal */}
      <NeoBrutalModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Nuevo Comentario"
      >
        <CommentForm
          onSubmit={(data) => createMutation.mutate(data)}
          onCancel={() => setIsCreateModalOpen(false)}
          isSubmitting={createMutation.isPending}
        />
      </NeoBrutalModal>

      {/* Edit Modal */}
      <NeoBrutalModal
        isOpen={!!editingComment}
        onClose={() => setEditingComment(null)}
        title="Editar Comentario"
      >
        {editingComment && (
          <CommentForm
            initialData={editingComment}
            onSubmit={(data) => updateMutation.mutate({ id: editingComment.id, data })}
            onCancel={() => setEditingComment(null)}
            isSubmitting={updateMutation.isPending}
          />
        )}
      </NeoBrutalModal>
    </DashboardLayout>
  )
}

interface CommentFormProps {
  initialData?: any
  onSubmit: (data: CommentData) => void
  onCancel: () => void
  isSubmitting: boolean
}

function CommentForm({ initialData, onSubmit, onCancel, isSubmitting }: CommentFormProps) {
  const form = useForm({
    defaultValues: {
      title: initialData?.title || '',
      content: initialData?.content || '',
    },
    onSubmit: async ({ value }) => {
      onSubmit(value)
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <div className="space-y-4">
        <form.Field name="title">
          {(field) => (
            <NeoBrutalInput
              label="Título"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Título del comentario"
            />
          )}
        </form.Field>

        <form.Field name="content">
          {(field) => (
            <NeoBrutalTextarea
              label="Contenido"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Contenido del comentario"
              rows={6}
            />
          )}
        </form.Field>
      </div>

      <div className="flex gap-4 mt-6">
        <NeoBrutalButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando...' : initialData ? 'Actualizar' : 'Crear'}
        </NeoBrutalButton>
        <NeoBrutalButton type="button" variant="ghost" onClick={onCancel}>
          Cancelar
        </NeoBrutalButton>
      </div>
    </form>
  )
}

// Made with Bob
