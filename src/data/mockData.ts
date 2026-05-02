export interface Project {
  id: string
  title: string
  institution: string
  category: string
  budget: string
  progress: number
  status: "En ejecución" | "Inicio reciente" | "Por concluir" | "Suspendido"
  startDate: string
  endDate: string
  region: string
}

export const mockProjects: Project[] = [
  {
    id: "PRY-2024-0412",
    title: "Ampliación Hospital Dr. Rafael Ángel Calderón Guardia",
    institution: "CCSS",
    category: "Salud",
    budget: "₡12.400.000.000",
    progress: 34,
    status: "En ejecución",
    startDate: "Mar 2024",
    endDate: "Dic 2026",
    region: "San José",
  },
  {
    id: "PRY-2024-0389",
    title: "Red de Fibra Óptica Rural — Zona Sur",
    institution: "FONATEL / SUTEL",
    category: "Infraestructura Digital",
    budget: "₡8.750.000.000",
    progress: 61,
    status: "En ejecución",
    startDate: "Ene 2024",
    endDate: "Jun 2025",
    region: "Puntarenas",
  },
  {
    id: "PRY-2024-0401",
    title: "Construcción Puente sobre Río Tempisque, Nicoya",
    institution: "MOPT",
    category: "Infraestructura Vial",
    budget: "₡22.100.000.000",
    progress: 12,
    status: "Inicio reciente",
    startDate: "Abr 2024",
    endDate: "Mar 2027",
    region: "Guanacaste",
  },
  {
    id: "PRY-2024-0378",
    title: "Digitalización de Registros Civiles — Fase III",
    institution: "TSE",
    category: "Gobierno Digital",
    budget: "₡3.200.000.000",
    progress: 88,
    status: "Por concluir",
    startDate: "Jul 2023",
    endDate: "Sep 2024",
    region: "Nacional",
  },
]

export interface WhyTransparencyItem {
  icon: string
  title: string
  description: string
}

export const whyTransparencyData: WhyTransparencyItem[] = [
  {
    icon: "IconEye",
    title: "Rendición de cuentas",
    description: "El ciudadano tiene derecho a saber cómo se ejecutan los fondos públicos en cada proyecto del Estado.",
  },
  {
    icon: "IconScale",
    title: "Combate a la corrupción",
    description: "La visibilidad de datos en tiempo real disuade irregularidades y facilita la auditoría ciudadana.",
  },
  {
    icon: "IconUsers",
    title: "Participación ciudadana",
    description: "Una sociedad informada puede exigir resultados y participar activamente en la gestión pública.",
  },
]

// Made with Bob
