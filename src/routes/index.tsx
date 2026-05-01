import { createFileRoute } from "@tanstack/react-router"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useState } from "react"

// Import types and mock data
import type { TechnicalVersion } from "@/components/home/types"
import {
  mockProject,
  mockMilestones,
  mockBudget,
  mockActivities,
  mockDocuments,
  mockVersions,
  mockRelatedProjects
} from "@/components/home/mockData"

// Import components
import { Navbar } from "@/components/home/Navbar"
import { Footer } from "@/components/home/Footer"
import { HeroSection } from "@/components/home/Hero"
import { Timeline } from "@/components/home/Timeline"
import { BudgetChart } from "@/components/home/BudgetChart"
import { ActivityFeed } from "@/components/home/ActivityFeed"
import {
  ParticipationCard,
  LocationCard,
  DocumentsCard,
  ResponsibleEntityCard,
  ProjectCard
} from "@/components/home/Sidebar"

export const Route = createFileRoute("/")({ component: ProjectDetailPage })

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

function ProjectDetailPage() {
  const [showOpinionForm, setShowOpinionForm] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <HeroSection project={mockProject} />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Descripción General */}
            <Card>
              <CardHeader>
                <CardTitle>Descripción General</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {mockProject.description}
                </p>
              </CardContent>
            </Card>

            {/* Cronograma de Hitos */}
            <Card>
              <CardHeader>
                <CardTitle>Cronograma de Hitos</CardTitle>
                <CardDescription>Seguimiento de las etapas principales del proyecto</CardDescription>
              </CardHeader>
              <CardContent>
                <Timeline milestones={mockMilestones} />
              </CardContent>
            </Card>

            {/* Ejecución Presupuestaria */}
            <Card>
              <CardHeader>
                <CardTitle>Ejecución Presupuestaria</CardTitle>
                <CardDescription>Distribución y avance del presupuesto por categoría</CardDescription>
              </CardHeader>
              <CardContent>
                <BudgetChart categories={mockBudget} />
              </CardContent>
            </Card>

            {/* Bitácora de Actualizaciones */}
            <Card>
              <CardHeader>
                <CardTitle>Bitácora de Actualizaciones</CardTitle>
                <CardDescription>Últimas actividades y novedades del proyecto</CardDescription>
              </CardHeader>
              <CardContent>
                <ActivityFeed activities={mockActivities} />
              </CardContent>
            </Card>

            {/* Información Técnica y Versiones */}
            <Card>
              <CardHeader>
                <CardTitle>Información Técnica y Versiones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockVersions.map((version: TechnicalVersion) => (
                    <div key={version.version} className="flex items-start gap-3 pb-3 border-b last:border-0">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#2E7D32]/10 text-xs font-semibold text-[#2E7D32]">
                        {version.version}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{version.notes}</div>
                        <div className="text-xs text-muted-foreground mt-1">{version.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Participación Ciudadana */}
            <ParticipationCard onOpenForm={() => setShowOpinionForm(!showOpinionForm)} />

            {/* Ubicación del Proyecto */}
            <LocationCard project={mockProject} />

            {/* Documentos Relacionados */}
            <DocumentsCard documents={mockDocuments} />

            {/* Entidad Responsable */}
            <ResponsibleEntityCard project={mockProject} />
          </div>
        </div>

        {/* Proyectos Relacionados */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Proyectos Relacionados</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mockRelatedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

// Made with Bob
