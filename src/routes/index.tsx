import { createFileRoute } from "@tanstack/react-router"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useState } from "react"

// Import components
import { Navbar } from "@/components/home/Navbar"
import { Footer } from "@/components/home/Footer"

export const Route = createFileRoute("/")({ component: ProjectDetailPage })

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

function ProjectDetailPage() {
  const [showOpinionForm, setShowOpinionForm] = useState(false)

  // Empty state - ready for backend integration
  const project = null
  const milestones = []
  const budgetCategories = []
  const activities = []
  const documents = []
  const versions = []
  const relatedProjects = []

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section - Empty State */}
      <div className="relative bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Bienvenido a la Plataforma de Transparencia
            </h1>
            <p className="text-lg opacity-90 mb-6">
              Sistema de seguimiento y gestión de proyectos gubernamentales
            </p>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Descripción General */}
            <Card>
              <CardHeader>
                <CardTitle>Información del Proyecto</CardTitle>
                <CardDescription>
                  Los detalles del proyecto aparecerán aquí cuando se conecte al backend
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <svg
                    className="w-16 h-16 mx-auto text-muted-foreground mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  <p className="text-muted-foreground">
                    No hay proyectos disponibles en este momento
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Cronograma de Hitos */}
            <Card>
              <CardHeader>
                <CardTitle>Cronograma de Hitos</CardTitle>
                <CardDescription>Seguimiento de las etapas principales del proyecto</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground">
                    Los hitos del proyecto aparecerán aquí
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Ejecución Presupuestaria */}
            <Card>
              <CardHeader>
                <CardTitle>Ejecución Presupuestaria</CardTitle>
                <CardDescription>Distribución y avance del presupuesto por categoría</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground">
                    La información presupuestaria aparecerá aquí
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Bitácora de Actualizaciones */}
            <Card>
              <CardHeader>
                <CardTitle>Bitácora de Actualizaciones</CardTitle>
                <CardDescription>Últimas actividades y novedades del proyecto</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground">
                    Las actualizaciones del proyecto aparecerán aquí
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Información Técnica y Versiones */}
            <Card>
              <CardHeader>
                <CardTitle>Información Técnica y Versiones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground">
                    Las versiones técnicas aparecerán aquí
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Participación Ciudadana */}
            <Card>
              <CardHeader>
                <CardTitle>Participación Ciudadana</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Comparte tu opinión sobre este proyecto
                </p>
                <button
                  onClick={() => setShowOpinionForm(!showOpinionForm)}
                  className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Dar mi Opinión
                </button>
              </CardContent>
            </Card>

            {/* Ubicación del Proyecto */}
            <Card>
              <CardHeader>
                <CardTitle>Ubicación del Proyecto</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground">
                    La ubicación aparecerá aquí
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Documentos Relacionados */}
            <Card>
              <CardHeader>
                <CardTitle>Documentos Relacionados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground">
                    Los documentos aparecerán aquí
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Entidad Responsable */}
            <Card>
              <CardHeader>
                <CardTitle>Entidad Responsable</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground">
                    La información de la entidad aparecerá aquí
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Proyectos Relacionados */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Proyectos Relacionados</h2>
          <Card>
            <CardContent className="p-12 text-center">
              <svg
                className="w-16 h-16 mx-auto text-muted-foreground mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <p className="text-muted-foreground">
                Los proyectos relacionados aparecerán aquí
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}

// Made with Bob
