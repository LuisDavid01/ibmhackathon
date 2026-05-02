import { createFileRoute } from '@tanstack/react-router'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { NeoBrutalButton } from '@/components/dashboard/NeoBrutalButton'
import { NeoBrutalInput } from '@/components/dashboard/NeoBrutalInput'
import { NeoBrutalModal } from '@/components/dashboard/NeoBrutalModal'
import { NeoBrutalTextarea } from '@/components/dashboard/NeoBrutalTextarea'
import { MessageCircle } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getComments, crearComment } from '@/functions/comments.functions'
import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'
import type { CommentData } from '@/types'

export const Route = createFileRoute('/_auth/dashboard/comentarios')({
  component: RouteComponent,
})

function RouteComponent() {
  const queryClient = useQueryClient()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedComment, setSelectedComment] = useState<any>(null)

  const [searchTerm, setSearchTerm] = useState('')

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
                  Título
                </th>
                <th className="font-mono text-xs uppercase tracking-widest px-4 py-3 text-left border-r-2 border-background/20">
                  Contenido
                </th>
                <th className="font-mono text-xs uppercase tracking-widest px-4 py-3 text-left border-r-2 border-background/20">
                  Fecha
                </th>

              </tr>
            </thead>
            <tbody>
              {filteredComments.map((comment: any, index: number) => (
                <tr
                  key={comment.id}
                  onClick={() => setSelectedComment(comment)}
                  className={`border-b-2 border-border hover:bg-muted transition-colors cursor-pointer ${
                    index % 2 === 0 ? 'even:bg-muted/30' : ''
                  }`}
                >
 
                  <td className="px-4 py-3 font-semibold">{comment.title}</td>
                  <td className="px-4 py-3 max-w-md truncate">{comment.content}</td>
                  <td className="font-mono text-sm px-4 py-3">
                    {new Date(comment.createdAt).toLocaleDateString()}
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

      {/* View Comment Modal */}
      <NeoBrutalModal
        isOpen={!!selectedComment}
        onClose={() => setSelectedComment(null)}
        title="Detalle del Comentario"
      >
        {selectedComment && (
          <div className="space-y-6">
            {/* Title */}
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">
                Título
              </p>
              <h3 className="text-xl font-bold">{selectedComment.title}</h3>
            </div>

            {/* Content */}
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">
                Contenido
              </p>
              <div className="bg-muted border-2 border-border p-4">
                <p className="text-sm whitespace-pre-wrap">{selectedComment.content}</p>
              </div>
            </div>

            {/* Date */}
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">
                Fecha de Creación
              </p>
              <p className="font-mono text-sm">
                {new Date(selectedComment.createdAt).toLocaleDateString('es-CR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>

            {/* Close Button */}
            <div className="flex justify-end pt-4 border-t-2 border-border">
              <NeoBrutalButton
                variant="secondary"
                onClick={() => setSelectedComment(null)}
              >
                Cerrar
              </NeoBrutalButton>
            </div>
          </div>
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
