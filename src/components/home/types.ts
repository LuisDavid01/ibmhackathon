// ============================================================================
// TYPESCRIPT INTERFACES
// ============================================================================

export interface Project {
  id: string
  title: string
  subtitle: string
  status: 'En Ejecución' | 'Planificación' | 'Completado' | 'Suspendido'
  physicalProgress: number
  totalInvestment: number
  beneficiaries: number
  description: string
  backgroundImage: string
  responsibleEntity: string
  location: { lat: number; lng: number; address: string }
}

export interface Milestone {
  id: string
  title: string
  date: string
  status: 'completed' | 'active' | 'pending'
}

export interface BudgetCategory {
  name: string
  assigned: number
  executed: number
  percentage: number
}

export interface ActivityUpdate {
  id: string
  user: string
  role: string
  message: string
  timestamp: string
}

export interface Document {
  id: string
  name: string
  type: string
  size: string
}

export interface TechnicalVersion {
  version: string
  date: string
  notes: string
}

export interface RelatedProject {
  id: string
  title: string
  image: string
  status: string
}

// Made with Bob
