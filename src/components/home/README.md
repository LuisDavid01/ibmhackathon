# Home Page Components

This directory contains all the modular components for the Home/Project Detail page.

## Structure

```
home/
├── index.ts              # Main export file for all components
├── types.ts              # TypeScript interfaces and types
├── mockData.ts           # Mock data for development
├── Navbar.tsx            # Top navigation bar
├── Hero.tsx              # Hero section with project info cards
├── ProgressBar.tsx       # Reusable progress bar component
├── Timeline.tsx          # Project milestones timeline
├── BudgetChart.tsx       # Budget execution chart
├── ActivityFeed.tsx      # Activity updates feed
├── Sidebar.tsx           # All sidebar components
└── Footer.tsx            # Page footer
```

## Components

### Layout Components

- **Navbar**: Top navigation with logo and menu items
- **Footer**: Page footer with links and contact info

### Hero Section

- **HeroSection**: Main hero banner with project title and info cards
- **StatusBadge**: Project status indicator (En Ejecución, Planificación, etc.)
- **InfoCard**: Info cards for progress, investment, and beneficiaries

### Main Content Components

- **Timeline**: Vertical timeline showing project milestones
- **BudgetChart**: Horizontal bar chart for budget execution
- **ActivityFeed**: Feed of project updates and activities
- **ProgressBar**: Reusable progress bar component

### Sidebar Components

- **ParticipationCard**: Citizen participation card with CTA button
- **LocationCard**: Project location with map placeholder
- **DocumentsCard**: List of related documents
- **ResponsibleEntityCard**: Responsible entity information
- **ProjectCard**: Card for related projects
- **SidebarCard**: Generic sidebar card wrapper
- **MapPlaceholder**: Map placeholder component

## Usage

Import components from the main index file:

```tsx
import {
  Navbar,
  Footer,
  HeroSection,
  Timeline,
  BudgetChart,
  ActivityFeed,
  ParticipationCard,
  LocationCard,
  DocumentsCard,
  ResponsibleEntityCard,
  ProjectCard
} from '@/components/home'
```

Or import specific components:

```tsx
import { HeroSection } from '@/components/home/Hero'
import { Timeline } from '@/components/home/Timeline'
```

## Types

All TypeScript interfaces are defined in `types.ts`:

- `Project`: Main project data structure
- `Milestone`: Timeline milestone
- `BudgetCategory`: Budget category data
- `ActivityUpdate`: Activity feed item
- `Document`: Document metadata
- `TechnicalVersion`: Technical version info
- `RelatedProject`: Related project data

## Mock Data

Development mock data is available in `mockData.ts`:

- `mockProject`: Sample project data
- `mockMilestones`: Sample milestones
- `mockBudget`: Sample budget data
- `mockActivities`: Sample activity updates
- `mockDocuments`: Sample documents
- `mockVersions`: Sample version history
- `mockRelatedProjects`: Sample related projects

## Styling

All components use:
- Tailwind CSS for styling
- Shadcn UI components (Card, Button, etc.)
- Primary color: `#2E7D32` (green)
- Responsive design with mobile-first approach

## Best Practices

1. **Component Isolation**: Each component is self-contained and reusable
2. **Type Safety**: All props are properly typed with TypeScript
3. **Responsive Design**: Components adapt to mobile, tablet, and desktop
4. **Accessibility**: Semantic HTML and ARIA labels where needed
5. **Performance**: Optimized with proper React patterns