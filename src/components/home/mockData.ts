import type { 
  Project, 
  Milestone, 
  BudgetCategory, 
  ActivityUpdate, 
  Document, 
  TechnicalVersion, 
  RelatedProject 
} from './types'

// ============================================================================
// MOCK DATA
// ============================================================================

export const mockProject: Project = {
  id: "1",
  title: "Ampliación del Puente sobre el Río Virilla (Ruta 32)",
  subtitle: "Mejora de infraestructura vial para reducir tiempos de viaje y aumentar la seguridad",
  status: "En Ejecución",
  physicalProgress: 68,
  totalInvestment: 22400000,
  beneficiaries: 45000,
  description: "Este proyecto consiste en la ampliación y modernización del puente sobre el Río Virilla en la Ruta 32, una de las arterias viales más importantes del país. La obra incluye la construcción de dos carriles adicionales, mejoras en la iluminación, sistemas de drenaje modernos y la implementación de tecnología para monitoreo estructural en tiempo real. El proyecto beneficiará directamente a más de 45,000 usuarios diarios y contribuirá significativamente a la reducción de congestionamiento vehicular en la zona metropolitana.",
  backgroundImage: "https://images.unsplash.com/photo-1587850850969-e8d906a22c6b?w=1200",
  responsibleEntity: "MOPT / CONAVI",
  location: {
    lat: 9.9281,
    lng: -84.0907,
    address: "Ruta 32, San José, Costa Rica"
  }
}

export const mockMilestones: Milestone[] = [
  { id: "1", title: "Aprobación de planos", date: "15 Ene 2026", status: "completed" },
  { id: "2", title: "Movimiento de tierras", date: "28 Feb 2026", status: "completed" },
  { id: "3", title: "Cimentación", date: "15 Abr 2026", status: "active" },
  { id: "4", title: "Instalaciones", date: "30 Jun 2026", status: "pending" },
  { id: "5", title: "Entrega final", date: "15 Sep 2026", status: "pending" }
]

export const mockBudget: BudgetCategory[] = [
  { name: "Materiales", assigned: 8500000, executed: 6200000, percentage: 73 },
  { name: "Mano de obra", assigned: 7200000, executed: 5100000, percentage: 71 },
  { name: "Equipamiento", assigned: 4500000, executed: 2800000, percentage: 62 },
  { name: "Gestión", assigned: 2200000, executed: 1500000, percentage: 68 }
]

export const mockActivities: ActivityUpdate[] = [
  {
    id: "1",
    user: "Ing. María Rodríguez",
    role: "Supervisora de Obra",
    message: "Se completó la instalación de vigas principales del tramo norte. Avance según cronograma.",
    timestamp: "Hace 2 horas"
  },
  {
    id: "2",
    user: "Arq. Carlos Méndez",
    role: "Director de Proyecto",
    message: "Reunión con MOPT para revisión de especificaciones técnicas. Todo aprobado.",
    timestamp: "Hace 1 día"
  },
  {
    id: "3",
    user: "Ing. Ana Solís",
    role: "Ingeniera Civil",
    message: "Pruebas de resistencia de concreto superaron los estándares requeridos.",
    timestamp: "Hace 3 días"
  }
]

export const mockDocuments: Document[] = [
  { id: "1", name: "Planos Estructurales v3.2", type: "PDF", size: "12.4 MB" },
  { id: "2", name: "Estudio de Impacto Ambiental", type: "PDF", size: "8.7 MB" },
  { id: "3", name: "Presupuesto Detallado 2024", type: "XLSX", size: "2.1 MB" },
  { id: "4", name: "Cronograma Actualizado", type: "PDF", size: "1.8 MB" }
]

export const mockVersions: TechnicalVersion[] = [
  { version: "v2.1", date: "28 Abr 2026", notes: "Actualización de cronograma y presupuesto" },
  { version: "v2.0", date: "15 Mar 2026", notes: "Revisión estructural aprobada" },
  { version: "v1.5", date: "10 Feb 2026", notes: "Ajustes en especificaciones técnicas" }
]

export const mockRelatedProjects: RelatedProject[] = [
  {
    id: "2",
    title: "Modernización Ruta 27",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400",
    status: "En Ejecución"
  },
  {
    id: "3",
    title: "Puente Río Grande",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400",
    status: "Planificación"
  },
  {
    id: "4",
    title: "Ampliación Circunvalación Norte",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400",
    status: "En Ejecución"
  }
]

// Made with Bob
