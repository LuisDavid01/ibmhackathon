**User:**

<task>
You are a senior frontend developer specialized in React, TypeScript, and modern UI systems.

Generate a complete responsive UI using React + TypeScript (.tsx) based on the following design description of a government transparency platform (Costa Rica public projects system).

TECH STACK REQUIREMENTS:
- React with TypeScript (.tsx)
- Functional components with hooks
- Tailwind CSS (preferred) OR CSS Modules
- Clean component-based architecture
- Reusable components
- Modern UI practices

MAIN PAGE: PROJECT DETAIL / HOME VIEW

LAYOUT STRUCTURE:

1. HERO SECTION (TOP BANNER)
- Large banner with project title:
  "Ampliación del Puente sobre el Río Virilla (Ruta 32)"
- Subtitle description below
- Status badge: "En Ejecución"
- 3 info cards:
  - Progreso físico (progress bar: 68%)
  - Inversión total ($22.4M)
  - Beneficiarios (45,000+)
- Dark overlay with background image effect

2. MAIN CONTENT (2 COLUMN GRID)

LEFT COLUMN:
A. Descripción General (card)
- Text block explaining project

B. Cronograma de Hitos (timeline component)
- Steps:
  - Aprobación de planos
  - Movimiento de tierras
  - Cimentación (active step)
  - Instalaciones
  - Entrega final
- Include dates and status indicators

C. Ejecución Presupuestaria
- Horizontal bar chart
- Categories:
  - Materiales
  - Mano de obra
  - Equipamiento
  - Gestión
- Include "Presupuesto asignado vs ejecutado"

D. Bitácora de Actualizaciones
- Activity feed (cards)
- Include user, role, message, timestamp

E. Información Técnica y Versiones
- Version history
- Last update date
- Technical notes

RIGHT COLUMN:

A. Participación Ciudadana
- Card with CTA button:
  "Enviar Opinión Anónima"

B. Ubicación del Proyecto
- Map placeholder (circular or card style)

C. Documentos Relacionados
- List of downloadable files

D. Entidad Responsable
- Display:
  "MOPT / CONAVI"

BOTTOM SECTION:

- Proyectos relacionados (cards with image + title)

---

DESIGN REQUIREMENTS:
- Minimalist modern UI
- Green color palette (#2E7D32 primary)
- Light gray backgrounds
- Rounded cards (border-radius)
- Soft shadows
- Clean typography
- Spacing system (consistent padding/margin)

---

COMPONENT STRUCTURE:
Create reusable components:
- Navbar
- HeroSection
- InfoCard
- ProgressBar
- Timeline
- BudgetChart
- ActivityFeed
- SidebarCard
- ProjectCard

---

RESPONSIVENESS:
- Desktop (grid 2 columns)
- Tablet (stacked)
- Mobile (single column)

---

EXTRA:
- Include mock data (JSON)
- Use TypeScript interfaces
- Add basic interactivity (hover, buttons)
- Clean and readable code

---

STYLE DETAIL (example CSS):
Include example like:

.line {
  position: absolute;
  top: 72px;
  left: 0;
  width: 100%;
  border-top: 1px solid #DEE1E6;
}

---

OUTPUT:
- Full .tsx page
- Component breakdown
- Styles included
- Ready to run in React project

GOAL:
Produce production-level UI code that visually matches a government transparency dashboard with strong UX and clarity.
</task>
<environment_details>
# VSCode Visible Files
src\components\ui\button.tsx

# VSCode Open Tabs
src/routes/index.tsx,src/components/ui/button.tsx,.env

# Current Time
Current time in ISO 8601 UTC format: 2026-05-01T19:56:35.561Z
User time zone: America/Costa_Rica, UTC-6:00

# Current Cost
$0.00

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>advanced</slug>
<name>🛠️ Advanced</name>


# Current Workspace Directory (c:/Users/alexa/Downloads/ibmhackathon) Files
.cta.json
.gitignore
.prettierignore
.prettierrc
auth-schema.ts
components.json
drizzle.config.ts
eslint.config.js
GUIA_ESTADO_REACT.md
MIGRATION_SINGLESTORE.md
package-lock.json
package.json
README.md
tsconfig.json
vite.config.ts
bob_sessions/
bob_sessions/bob_task_may-1-2026_9-42-38-am.md
drizzle/
drizzle/0000_worthless_dreadnoughts.sql
drizzle/meta/
drizzle/meta/_journal.json
drizzle/meta/0000_snapshot.json
public/
public/favicon.ico
public/manifest.json
public/robots.txt
src/
src/logo.svg
src/router.tsx
src/routeTree.gen.ts
src/styles.css
src/components/
src/components/ui/
src/components/ui/button.tsx
src/components/ui/card.tsx
src/lib/
src/lib/auth.ts
src/lib/utils.ts
src/routes/
src/routes/__root.tsx
src/routes/acerca.tsx
src/routes/index.tsx
src/server/
src/server/db/
src/server/db/index.ts
src/server/db/schema.ts
You have not created a todo list yet. Create one with `update_todo_list` if your task is complicated or involves multiple steps.
</environment_details>

---

**Assistant:**

I'll create a complete responsive UI for the government transparency platform. Let me start by analyzing the project structure and then build the components systematically.

<read_file>
<args>
  <file>
    <path>src/routes/index.tsx</path>
  </file>
  <file>
    <path>src/components/ui/button.tsx</path>
  </file>
  <file>
    <path>src/components/ui/card.tsx</path>
  </file>
  <file>
    <path>src/styles.css</path>
  </file>
  <file>
    <path>package.json</path>
  </file>
</args>
</read_file>

---

**User:**

[read_file for 5 files] Result:
<files>
<file><path>src/routes/index.tsx</path>
<content lines="1-20">
 1 | import { createFileRoute } from "@tanstack/react-router"
 2 | import { Button } from "@/components/ui/button"
 3 | 
 4 | export const Route = createFileRoute("/")({ component: App })
 5 | 
 6 | function App() {
 7 |   return (
 8 |     <div className="flex min-h-svh p-6">
 9 |       <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
10 |         <div>
11 |           <h1 className="font-medium">Project ready!</h1>
12 |           <h1>Hola bob</h1>
13 |           <p>You may now add components and start building.</p>
14 |           <p>We&apos;ve already added the button component for you.</p>
15 |           <Button className="mt-2">Button</Button>
16 |         </div>
17 |       </div>
18 |     </div>
19 |   )
20 | }
</content>
</file>
<file><path>src/components/ui/button.tsx</path>
<content lines="1-65">
 1 | import * as React from "react"
 2 | import { cva, type VariantProps } from "class-variance-authority"
 3 | import { Slot } from "radix-ui"
 4 | 
 5 | import { cn } from "@/lib/utils"
 6 | 
 7 | const buttonVariants = cva(
 8 |   "group/button inline-flex shrink-0 items-center justify-center rounded-4xl border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
 9 |   {
10 |     variants: {
11 |       variant: {
12 |         default: "bg-primary text-primary-foreground hover:bg-primary/80",
13 |         outline:
14 |           "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:bg-transparent dark:hover:bg-input/30",
15 |         secondary:
16 |           "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
17 |         ghost:
18 |           "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
19 |         destructive:
20 |           "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
21 |         link: "text-primary underline-offset-4 hover:underline",
22 |       },
23 |       size: {
24 |         default:
25 |           "h-9 gap-1.5 px-3 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
26 |         xs: "h-6 gap-1 px-2.5 text-xs has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
27 |         sm: "h-8 gap-1 px-3 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
28 |         lg: "h-10 gap-1.5 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
29 |         icon: "size-9",
30 |         "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
31 |         "icon-sm": "size-8",
32 |         "icon-lg": "size-10",
33 |       },
34 |     },
35 |     defaultVariants: {
36 |       variant: "default",
37 |       size: "default",
38 |     },
39 |   }
40 | )
41 | 
42 | function Button({
43 |   className,
44 |   variant = "default",
45 |   size = "default",
46 |   asChild = false,
47 |   ...props
48 | }: React.ComponentProps<"button"> &
49 |   VariantProps<typeof buttonVariants> & {
50 |     asChild?: boolean
51 |   }) {
52 |   const Comp = asChild ? Slot.Root : "button"
53 | 
54 |   return (
55 |     <Comp
56 |       data-slot="button"
57 |       data-variant={variant}
58 |       data-size={size}
59 |       className={cn(buttonVariants({ variant, size, className }))}
60 |       {...props}
61 |     />
62 |   )
63 | }
64 | 
65 | export { Button, buttonVariants }
</content>
</file>
<file><path>src/components/ui/card.tsx</path>
<content lines="1-100">
  1 | import * as React from "react"
  2 | 
  3 | import { cn } from "@/lib/utils"
  4 | 
  5 | function Card({
  6 |   className,
  7 |   size = "default",
  8 |   ...props
  9 | }: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
 10 |   return (
 11 |     <div
 12 |       data-slot="card"
 13 |       data-size={size}
 14 |       className={cn(
 15 |         "group/card flex flex-col gap-6 overflow-hidden rounded-4xl bg-card py-6 text-sm text-card-foreground shadow-md ring-1 ring-foreground/5 has-[>img:first-child]:pt-0 data-[size=sm]:gap-4 data-[size=sm]:py-4 dark:ring-foreground/10 *:[img:first-child]:rounded-t-4xl *:[img:last-child]:rounded-b-4xl",
 16 |         className
 17 |       )}
 18 |       {...props}
 19 |     />
 20 |   )
 21 | }
 22 | 
 23 | function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
 24 |   return (
 25 |     <div
 26 |       data-slot="card-header"
 27 |       className={cn(
 28 |         "group/card-header @container/card-header grid auto-rows-min items-start gap-1.5 rounded-t-4xl px-6 group-data-[size=sm]/card:px-4 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-6 group-data-[size=sm]/card:[.border-b]:pb-4",
 29 |         className
 30 |       )}
 31 |       {...props}
 32 |     />
 33 |   )
 34 | }
 35 | 
 36 | function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
 37 |   return (
 38 |     <div
 39 |       data-slot="card-title"
 40 |       className={cn("font-heading text-base font-medium", className)}
 41 |       {...props}
 42 |     />
 43 |   )
 44 | }
 45 | 
 46 | function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
 47 |   return (
 48 |     <div
 49 |       data-slot="card-description"
 50 |       className={cn("text-sm text-muted-foreground", className)}
 51 |       {...props}
 52 |     />
 53 |   )
 54 | }
 55 | 
 56 | function CardAction({ className, ...props }: React.ComponentProps<"div">) {
 57 |   return (
 58 |     <div
 59 |       data-slot="card-action"
 60 |       className={cn(
 61 |         "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
 62 |         className
 63 |       )}
 64 |       {...props}
 65 |     />
 66 |   )
 67 | }
 68 | 
 69 | function CardContent({ className, ...props }: React.ComponentProps<"div">) {
 70 |   return (
 71 |     <div
 72 |       data-slot="card-content"
 73 |       className={cn("px-6 group-data-[size=sm]/card:px-4", className)}
 74 |       {...props}
 75 |     />
 76 |   )
 77 | }
 78 | 
 79 | function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
 80 |   return (
 81 |     <div
 82 |       data-slot="card-footer"
 83 |       className={cn(
 84 |         "flex items-center rounded-b-4xl px-6 group-data-[size=sm]/card:px-4 [.border-t]:pt-6 group-data-[size=sm]/card:[.border-t]:pt-4",
 85 |         className
 86 |       )}
 87 |       {...props}
 88 |     />
 89 |   )
 90 | }
 91 | 
 92 | export {
 93 |   Card,
 94 |   CardHeader,
 95 |   CardFooter,
 96 |   CardTitle,
 97 |   CardAction,
 98 |   CardDescription,
 99 |   CardContent,
100 | }
</content>
</file>
<file><path>src/styles.css</path>
<content lines="1-133">
  1 | @import "tailwindcss";
  2 | @import "tw-animate-css";
  3 | @import "shadcn/tailwind.css";
  4 | @import "@fontsource-variable/ibm-plex-sans";
  5 | 
  6 | @custom-variant dark (&:is(.dark *));
  7 | 
  8 | @theme inline {
  9 |     --font-heading: var(--font-sans);
 10 |     --font-sans: 'IBM Plex Sans Variable', sans-serif;
 11 |     --color-sidebar-ring: var(--sidebar-ring);
 12 |     --color-sidebar-border: var(--sidebar-border);
 13 |     --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
 14 |     --color-sidebar-accent: var(--sidebar-accent);
 15 |     --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
 16 |     --color-sidebar-primary: var(--sidebar-primary);
 17 |     --color-sidebar-foreground: var(--sidebar-foreground);
 18 |     --color-sidebar: var(--sidebar);
 19 |     --color-chart-5: var(--chart-5);
 20 |     --color-chart-4: var(--chart-4);
 21 |     --color-chart-3: var(--chart-3);
 22 |     --color-chart-2: var(--chart-2);
 23 |     --color-chart-1: var(--chart-1);
 24 |     --color-ring: var(--ring);
 25 |     --color-input: var(--input);
 26 |     --color-border: var(--border);
 27 |     --color-destructive: var(--destructive);
 28 |     --color-accent-foreground: var(--accent-foreground);
 29 |     --color-accent: var(--accent);
 30 |     --color-muted-foreground: var(--muted-foreground);
 31 |     --color-muted: var(--muted);
 32 |     --color-secondary-foreground: var(--secondary-foreground);
 33 |     --color-secondary: var(--secondary);
 34 |     --color-primary-foreground: var(--primary-foreground);
 35 |     --color-primary: var(--primary);
 36 |     --color-popover-foreground: var(--popover-foreground);
 37 |     --color-popover: var(--popover);
 38 |     --color-card-foreground: var(--card-foreground);
 39 |     --color-card: var(--card);
 40 |     --color-foreground: var(--foreground);
 41 |     --color-background: var(--background);
 42 |     --radius-sm: calc(var(--radius) * 0.6);
 43 |     --radius-md: calc(var(--radius) * 0.8);
 44 |     --radius-lg: var(--radius);
 45 |     --radius-xl: calc(var(--radius) * 1.4);
 46 |     --radius-2xl: calc(var(--radius) * 1.8);
 47 |     --radius-3xl: calc(var(--radius) * 2.2);
 48 |     --radius-4xl: calc(var(--radius) * 2.6);
 49 | }
 50 | 
 51 | :root {
 52 |     --background: oklch(1 0 0);
 53 |     --foreground: oklch(0.148 0.004 228.8);
 54 |     --card: oklch(1 0 0);
 55 |     --card-foreground: oklch(0.148 0.004 228.8);
 56 |     --popover: oklch(1 0 0);
 57 |     --popover-foreground: oklch(0.148 0.004 228.8);
 58 |     --primary: oklch(0.218 0.008 223.9);
 59 |     --primary-foreground: oklch(0.987 0.002 197.1);
 60 |     --secondary: oklch(0.963 0.002 197.1);
 61 |     --secondary-foreground: oklch(0.218 0.008 223.9);
 62 |     --muted: oklch(0.963 0.002 197.1);
 63 |     --muted-foreground: oklch(0.56 0.021 213.5);
 64 |     --accent: oklch(0.963 0.002 197.1);
 65 |     --accent-foreground: oklch(0.218 0.008 223.9);
 66 |     --destructive: oklch(0.577 0.245 27.325);
 67 |     --border: oklch(0.925 0.005 214.3);
 68 |     --input: oklch(0.925 0.005 214.3);
 69 |     --ring: oklch(0.723 0.014 214.4);
 70 |     --chart-1: oklch(0.865 0.127 207.078);
 71 |     --chart-2: oklch(0.715 0.143 215.221);
 72 |     --chart-3: oklch(0.609 0.126 221.723);
 73 |     --chart-4: oklch(0.52 0.105 223.128);
 74 |     --chart-5: oklch(0.45 0.085 224.283);
 75 |     --radius: 0.45rem;
 76 |     --sidebar: oklch(0.987 0.002 197.1);
 77 |     --sidebar-foreground: oklch(0.148 0.004 228.8);
 78 |     --sidebar-primary: oklch(0.218 0.008 223.9);
 79 |     --sidebar-primary-foreground: oklch(0.987 0.002 197.1);
 80 |     --sidebar-accent: oklch(0.963 0.002 197.1);
 81 |     --sidebar-accent-foreground: oklch(0.218 0.008 223.9);
 82 |     --sidebar-border: oklch(0.925 0.005 214.3);
 83 |     --sidebar-ring: oklch(0.723 0.014 214.4);
 84 | }
 85 | 
 86 | .dark {
 87 |     --background: oklch(0.148 0.004 228.8);
 88 |     --foreground: oklch(0.987 0.002 197.1);
 89 |     --card: oklch(0.218 0.008 223.9);
 90 |     --card-foreground: oklch(0.987 0.002 197.1);
 91 |     --popover: oklch(0.218 0.008 223.9);
 92 |     --popover-foreground: oklch(0.987 0.002 197.1);
 93 |     --primary: oklch(0.925 0.005 214.3);
 94 |     --primary-foreground: oklch(0.218 0.008 223.9);
 95 |     --secondary: oklch(0.275 0.011 216.9);
 96 |     --secondary-foreground: oklch(0.987 0.002 197.1);
 97 |     --muted: oklch(0.275 0.011 216.9);
 98 |     --muted-foreground: oklch(0.723 0.014 214.4);
 99 |     --accent: oklch(0.275 0.011 216.9);
100 |     --accent-foreground: oklch(0.987 0.002 197.1);
101 |     --destructive: oklch(0.704 0.191 22.216);
102 |     --border: oklch(1 0 0 / 10%);
103 |     --input: oklch(1 0 0 / 15%);
104 |     --ring: oklch(0.56 0.021 213.5);
105 |     --chart-1: oklch(0.865 0.127 207.078);
106 |     --chart-2: oklch(0.715 0.143 215.221);
107 |     --chart-3: oklch(0.609 0.126 221.723);
108 |     --chart-4: oklch(0.52 0.105 223.128);
109 |     --chart-5: oklch(0.45 0.085 224.283);
110 |     --sidebar: oklch(0.218 0.008 223.9);
111 |     --sidebar-foreground: oklch(0.987 0.002 197.1);
112 |     --sidebar-primary: oklch(0.488 0.243 264.376);
113 |     --sidebar-primary-foreground: oklch(0.987 0.002 197.1);
114 |     --sidebar-accent: oklch(0.275 0.011 216.9);
115 |     --sidebar-accent-foreground: oklch(0.987 0.002 197.1);
116 |     --sidebar-border: oklch(1 0 0 / 10%);
117 |     --sidebar-ring: oklch(0.56 0.021 213.5);
118 | }
119 | 
120 | @layer base {
121 |   * {
122 |     @apply border-border outline-ring/50;
123 |     }
124 |   body {
125 |     @apply bg-background text-foreground;
126 |     }
127 |   button:not(:disabled), [role="button"]:not(:disabled) {
128 |     cursor: pointer;
129 |     }
130 |   html {
131 |     @apply font-sans;
132 |     }
133 | }
</content>
</file>
<file><path>package.json</path>
<content lines="1-64">
 1 | {
 2 |   "name": "ibmhackathon",
 3 |   "private": true,
 4 |   "type": "module",
 5 |   "engines": {
 6 |     "node": ">=22.22.0"
 7 |   },
 8 |   "scripts": {
 9 |     "dev": "vite dev --port 3000",
10 |     "build": "vite build",
11 |     "preview": "vite preview",
12 |     "test": "vitest run",
13 |     "lint": "eslint",
14 |     "format": "prettier --write \"**/*.{ts,tsx,js,jsx}\"",
15 |     "typecheck": "tsc --noEmit"
16 |   },
17 |   "dependencies": {
18 |     "@fontsource-variable/ibm-plex-sans": "^5.2.8",
19 |     "@tabler/icons-react": "^3.41.1",
20 |     "@tailwindcss/vite": "^4.2.1",
21 |     "@tanstack/react-devtools": "^0.10.0",
22 |     "@tanstack/react-router": "^1.167.4",
23 |     "@tanstack/react-router-devtools": "^1.166.9",
24 |     "@tanstack/react-router-ssr-query": "^1.166.9",
25 |     "@tanstack/react-start": "^1.166.15",
26 |     "@tanstack/router-plugin": "^1.166.13",
27 |     "better-auth": "^1.6.9",
28 |     "class-variance-authority": "^0.7.1",
29 |     "clsx": "^2.1.1",
30 |     "dotenv": "^17.4.2",
31 |     "drizzle-orm": "^0.45.2",
32 |     "kysely-singlestore": "^0.4.4",
33 |     "mysql2": "^3.22.3",
34 |     "nitro": "latest",
35 |     "openai": "^6.35.0",
36 |     "radix-ui": "^1.4.3",
37 |     "react": "^19.2.4",
38 |     "react-dom": "^19.2.4",
39 |     "shadcn": "^4.6.0",
40 |     "tailwind-merge": "^3.5.0",
41 |     "tailwindcss": "^4.2.1",
42 |     "tw-animate-css": "^1.4.0",
43 |     "vite-tsconfig-paths": "^5.1.4"
44 |   },
45 |   "devDependencies": {
46 |     "@tanstack/devtools-vite": "^0.6.0",
47 |     "@tanstack/eslint-config": "^0.4.0",
48 |     "@testing-library/dom": "^10.4.1",
49 |     "@testing-library/react": "^16.3.2",
50 |     "@types/node": "^22.19.15",
51 |     "@types/react": "^19.2.14",
52 |     "@types/react-dom": "^19.2.3",
53 |     "@vitejs/plugin-react": "^5.2.0",
54 |     "drizzle-kit": "^0.31.10",
55 |     "jsdom": "^27.4.0",
56 |     "prettier": "^3.8.1",
57 |     "prettier-plugin-tailwindcss": "^0.7.2",
58 |     "tsx": "^4.21.0",
59 |     "typescript": "^5.9.3",
60 |     "vite": "^7.3.1",
61 |     "vitest": "^3.2.4",
62 |     "web-vitals": "^5.1.0"
63 |   }
64 | }
</content>
</file>
</files>
<environment_details>
# VSCode Visible Files
src\components\ui\button.tsx

# VSCode Open Tabs
src/routes/index.tsx,src/components/ui/button.tsx,.env

# Current Time
Current time in ISO 8601 UTC format: 2026-05-01T19:56:47.262Z
User time zone: America/Costa_Rica, UTC-6:00

# Current Cost
$0.04

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>advanced</slug>
<name>🛠️ Advanced</name>
You have not created a todo list yet. Create one with `update_todo_list` if your task is complicated or involves multiple steps.
</environment_details>

---

**Assistant:**

I'll create a complete government transparency platform UI with React + TypeScript. Let me break this down into manageable steps.

<update_todo_list>
<todos>
[-] Create TypeScript interfaces for mock data
[ ] Create reusable UI components (ProgressBar, Timeline, BudgetChart, etc.)
[ ] Create main page components (HeroSection, InfoCard, ActivityFeed, etc.)
[ ] Build the complete ProjectDetail page
[ ] Add custom styles for specific elements
</todos>
</update_todo_list>

<write_to_file>
<path>src/types/project.ts</path>
<content>
// TypeScript interfaces for the government transparency platform

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  status: ProjectStatus;
  physicalProgress: number;
  totalInvestment: number;
  beneficiaries: number;
  description: string;
  backgroundImage?: string;
  responsibleEntity: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
}

export type ProjectStatus = 'En Ejecución' | 'Planificación' | 'Completado' | 'Suspendido';

export interface Milestone {
  id: string;
  title: string;
  date: string;
  status: 'completed' | 'active' | 'pending';
}

export interface BudgetCategory {
  name: string;
  assigned: number;
  executed: number;
  percentage: number;
}

export interface ActivityUpdate {
  id: string;
  user: string;
  role: string;
  message: string;
  timestamp: string;
  avatar?: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  url: string;
}

export interface TechnicalVersion {
  version: string;
  date: string;
  notes: string;
}

export interface RelatedProject {
  id: string;
  title: string;
  image: string;
  status: ProjectStatus;
}
</content>
<line

[Response interrupted by a tool use result. Only one tool may be used at a time and should be placed at the end of the message.]

---

**User:**

[update_todo_list] Result:
Todo list updated successfully.
Tool [write_to_file] was not executed because a tool has already been used in this message. Only one tool may be used per message. You must assess the first tool's result before proceeding to use the next tool.
<environment_details>
# VSCode Visible Files
src\components\ui\button.tsx

# VSCode Open Tabs
src/routes/index.tsx,src/components/ui/button.tsx,.env

# Current Time
Current time in ISO 8601 UTC format: 2026-05-01T19:56:58.640Z
User time zone: America/Costa_Rica, UTC-6:00

# Current Cost
$0.04

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>advanced</slug>
<name>🛠️ Advanced</name>
====

REMINDERS

Below is your current list of reminders for this task. Keep them updated as you progress.

| # | Content | Status |
|---|---------|--------|
| 1 | Create TypeScript interfaces for mock data | In Progress |
| 2 | Create reusable UI components (ProgressBar, Timeline, BudgetChart, etc.) | Pending |
| 3 | Create main page components (HeroSection, InfoCard, ActivityFeed, etc.) | Pending |
| 4 | Build the complete ProjectDetail page | Pending |
| 5 | Add custom styles for specific elements | Pending |


IMPORTANT: When task status changes, remember to call the `update_todo_list` tool to update your progress.

</environment_details>

---

**Assistant:**

<write_to_file>
<path>src/types/project.ts</path>
<content>
// TypeScript interfaces for the government transparency platform

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  status: ProjectStatus;
  physicalProgress: number;
  totalInvestment: number;
  beneficiaries: number;
  description: string;
  backgroundImage?: string;
  responsibleEntity: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
}

export type ProjectStatus = 'En Ejecución' | 'Planificación' | 'Completado' | 'Suspendido';

export interface Milestone {
  id: string;
  title: string;
  date: string;
  status: 'completed' | 'active' | 'pending';
}

export interface BudgetCategory {
  name: string;
  assigned: number;
  executed: number;
  percentage: number;
}

export interface ActivityUpdate {
  id: string;
  user: string;
  role: string;
  message: string;
  timestamp: string;
  avatar?: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  url: string;
}

export interface TechnicalVersion {
  version: string;
  date: string;
  notes: string;
}

export interface RelatedProject {
  id: string;
  title: string;
  image: string;
  status: ProjectStatus;
}
</content>
<line_count>67</line_count>
</write_to_file>

---

**User:**

[write_to_file for 'src/types/project.ts'] Result:
The user denied this operation and provided the following feedback:
<feedback>
You are a senior frontend developer specialized in React, TypeScript, and modern UI systems.

Generate a complete responsive UI using React + TypeScript (.tsx) based on the following design description of a government transparency platform (Costa Rica public projects system).

TECH STACK REQUIREMENTS:
- React with TypeScript (.tsx)
- Functional components with hooks
- Tailwind CSS (preferred) OR CSS Modules
- Clean component-based architecture
- Reusable components
- Modern UI practices

MAIN PAGE: PROJECT DETAIL / HOME VIEW

LAYOUT STRUCTURE:

1. HERO SECTION (TOP BANNER)
- Large banner with project title:
  "Ampliación del Puente sobre el Río Virilla (Ruta 32)"
- Subtitle description below
- Status badge: "En Ejecución"
- 3 info cards:
  - Progreso físico (progress bar: 68%)
  - Inversión total ($22.4M)
  - Beneficiarios (45,000+)
- Dark overlay with background image effect

2. MAIN CONTENT (2 COLUMN GRID)

LEFT COLUMN:
A. Descripción General (card)
- Text block explaining project

B. Cronograma de Hitos (timeline component)
- Steps:
  - Aprobación de planos
  - Movimiento de tierras
  - Cimentación (active step)
  - Instalaciones
  - Entrega final
- Include dates and status indicators

C. Ejecución Presupuestaria
- Horizontal bar chart
- Categories:
  - Materiales
  - Mano de obra
  - Equipamiento
  - Gestión
- Include "Presupuesto asignado vs ejecutado"

D. Bitácora de Actualizaciones
- Activity feed (cards)
- Include user, role, message, timestamp

E. Información Técnica y Versiones
- Version history
- Last update date
- Technical notes

RIGHT COLUMN:

A. Participación Ciudadana
- Card with CTA button:
  "Enviar Opinión Anónima"

B. Ubicación del Proyecto
- Map placeholder (circular or card style)

C. Documentos Relacionados
- List of downloadable files

D. Entidad Responsable
- Display:
  "MOPT / CONAVI"

BOTTOM SECTION:

- Proyectos relacionados (cards with image + title)

---

DESIGN REQUIREMENTS:
- Minimalist modern UI
- Green color palette (#2E7D32 primary)
- Light gray backgrounds
- Rounded cards (border-radius)
- Soft shadows
- Clean typography
- Spacing system (consistent padding/margin)

---

COMPONENT STRUCTURE:
Create reusable components:
- Navbar
- HeroSection
- InfoCard
- ProgressBar
- Timeline
- BudgetChart
- ActivityFeed
- SidebarCard
- ProjectCard

---

RESPONSIVENESS:
- Desktop (grid 2 columns)
- Tablet (stacked)
- Mobile (single column)

---

EXTRA:
- Include mock data (JSON)
- Use TypeScript interfaces
- Add basic interactivity (hover, buttons)
- Clean and readable code

---

STYLE DETAIL (example CSS):
Include example like:

.line {
  position: absolute;
  top: 72px;
  left: 0;
  width: 100%;
  border-top: 1px solid #DEE1E6;
}

---

OUTPUT:
- Full .tsx page
- Component breakdown
- Styles included
- Ready to run in React project

GOAL:
Produce production-level UI code that visually matches a government transparency dashboard with strong UX and clarity.
</feedback>
<environment_details>
# VSCode Visible Files
src\types\project.ts

# VSCode Open Tabs
src/routes/index.tsx,src/types/project.ts,.env

# Current Time
Current time in ISO 8601 UTC format: 2026-05-01T20:00:37.133Z
User time zone: America/Costa_Rica, UTC-6:00

# Current Cost
$0.10

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>code</slug>
<name>💻 Code</name>
====

REMINDERS

Below is your current list of reminders for this task. Keep them updated as you progress.

| # | Content | Status |
|---|---------|--------|
| 1 | Create TypeScript interfaces for mock data | In Progress |
| 2 | Create reusable UI components (ProgressBar, Timeline, BudgetChart, etc.) | Pending |
| 3 | Create main page components (HeroSection, InfoCard, ActivityFeed, etc.) | Pending |
| 4 | Build the complete ProjectDetail page | Pending |
| 5 | Add custom styles for specific elements | Pending |


IMPORTANT: When task status changes, remember to call the `update_todo_list` tool to update your progress.

</environment_details>

---

**Assistant:**

I understand. Let me create a complete, production-ready government transparency platform UI in a single comprehensive file. I'll build everything together with all components, mock data, and styles.

<write_to_file>
<path>src/routes/index.tsx</path>
<content>
import { createFileRoute } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useState } from "react"

export const Route = createFileRoute("/")({ component: ProjectDetailPage })

// ============================================================================
// TYPESCRIPT INTERFACES
// ============================================================================

interface Project {
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

interface Milestone {
  id: string
  title: string
  date: string
  status: 'completed' | 'active' | 'pending'
}

interface BudgetCategory {
  name: string
  assigned: number
  executed: number
  percentage: number
}

interface ActivityUpdate {
  id: string
  user: string
  role: string
  message: string
  timestamp: string
}

interface Document {
  id: string
  name: string
  type: string
  size: string
}

interface TechnicalVersion {
  version: string
  date: string
  notes: string
}

interface RelatedProject {
  id: string
  title: string
  image: string
  status: string
}

// ============================================================================
// MOCK DATA
// ============================================================================

const mockProject: Project = {
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

const mockMilestones: Milestone[] = [
  { id: "1", title: "Aprobación de planos", date: "15 Ene 2024", status: "completed" },
  { id: "2", title: "Movimiento de tierras", date: "28 Feb 2024", status: "completed" },
  { id: "3", title: "Cimentación", date: "15 Abr 2024", status: "active" },
  { id: "4", title: "Instalaciones", date: "30 Jun 2024", status: "pending" },
  { id: "5", title: "Entrega final", date: "15 Sep 2024", status: "pending" }
]

const mockBudget: BudgetCategory[] = [
  { name: "Materiales", assigned: 8500000, executed: 6200000, percentage: 73 },
  { name: "Mano de obra", assigned: 7200000, executed: 5100000, percentage: 71 },
  { name: "Equipamiento", assigned: 4500000, executed: 2800000, percentage: 62 },
  { name: "Gestión", assigned: 2200000, executed: 1500000, percentage: 68 }
]

const mockActivities: ActivityUpdate[] = [
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

const mockDocuments: Document[] = [
  { id: "1", name: "Planos Estructurales v3.2", type: "PDF", size: "12.4 MB" },
  { id: "2", name: "Estudio de Impacto Ambiental", type: "PDF", size: "8.7 MB" },
  { id: "3", name: "Presupuesto Detallado 2024", type: "XLSX", size: "2.1 MB" },
  { id: "4", name: "Cronograma Actualizado", type: "PDF", size: "1.8 MB" }
]

const mockVersions: TechnicalVersion[] = [
  { version: "v2.1", date: "28 Abr 2024", notes: "Actualización de cronograma y presupuesto" },
  { version: "v2.0", date: "15 Mar 2024", notes: "Revisión estructural aprobada" },
  { version: "v1.5", date: "10 Feb 2024", notes: "Ajustes en especificaciones técnicas" }
]

const mockRelatedProjects: RelatedProject[] = [
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

// ============================================================================
// REUSABLE COMPONENTS
// ============================================================================

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2E7D32] text-white font-bold">
            CR
          </div>
          <div>
            <div className="text-sm font-semibold">Transparencia Costa Rica</div>
            <div className="text-xs text-muted-foreground">Proyectos Públicos</div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium hover:text-[#2E7D32] transition-colors">Proyectos</a>
          <a href="#" className="text-sm font-medium hover:text-[#2E7D32] transition-colors">Presupuesto</a>
          <a href="#" className="text-sm font-medium hover:text-[#2E7D32] transition-colors">Reportes</a>
          <a href="#" className="text-sm font-medium hover:text-[#2E7D32] transition-colors">Contacto</a>
        </div>
        <Button size="sm" className="bg-[#2E7D32] hover:bg-[#1B5E20]">
          Iniciar Sesión
        </Button>
      </div>
    </nav>
  )
}

function HeroSection({ project }: { project: Project }) {
  return (
    <div className="relative h-[400px] w-full overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${project.backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      
      <div className="container relative mx-auto h-full px-4">
        <div className="flex h-full flex-col justify-center max-w-4xl">
          <div className="mb-4">
            <StatusBadge status={project.status} />
          </div>
          
          <h1 className="mb-3 text-4xl font-bold text-white md:text-5xl">
            {project.title}
          </h1>
          
          <p className="mb-8 text-lg text-gray-200 max-w-2xl">
            {project.subtitle}
          </p>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <InfoCard
              label="Progreso físico"
              value={`${project.physicalProgress}%`}
              showProgress
              progress={project.physicalProgress}
            />
            <InfoCard
              label="Inversión total"
              value={`$${(project.totalInvestment / 1000000).toFixed(1)}M`}
            />
            <InfoCard
              label="Beneficiarios"
              value={`${(project.beneficiaries / 1000).toFixed(0)}K+`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const colors = {
    'En Ejecución': 'bg-[#2E7D32] text-white',
    'Planificación': 'bg-blue-600 text-white',
    'Completado': 'bg-gray-600 text-white',
    'Suspendido': 'bg-red-600 text-white'
  }
  
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium ${colors[status as keyof typeof colors]}`}>
      <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
      {status}
    </span>
  )
}

function InfoCard({ label, value, showProgress, progress }: { 
  label: string
  value: string
  showProgress?: boolean
  progress?: number 
}) {
  return (
    <div className="rounded-xl bg-white/95 backdrop-blur p-4 shadow-lg">
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      {showProgress && progress !== undefined && (
        <ProgressBar percentage={progress} className="mt-3" />
      )}
    </div>
  )
}

function ProgressBar({ percentage, className = "", showLabel = false }: { 
  percentage: number
  className?: string
  showLabel?: boolean 
}) {
  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between text-sm mb-1">
          <span className="text-muted-foreground">Progreso</span>
          <span className="font-medium">{percentage}%</span>
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div 
          className="h-full rounded-full bg-[#2E7D32] transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

function Timeline({ milestones }: { milestones: Milestone[] }) {
  return (
    <div className="relative">
      {milestones.map((milestone, index) => (
        <div key={milestone.id} className="relative flex gap-4 pb-8 last:pb-0">
          {/* Vertical line */}
          {index < milestones.length - 1 && (
            <div className="absolute left-[15px] top-[32px] h-full w-0.5 bg-gray-200" />
          )}
          
          {/* Status indicator */}
          <div className="relative z-10 flex-shrink-0">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
              milestone.status === 'completed' 
                ? 'border-[#2E7D32] bg-[#2E7D32]' 
                : milestone.status === 'active'
                ? 'border-[#2E7D32] bg-white'
                : 'border-gray-300 bg-white'
            }`}>
              {milestone.status === 'completed' && (
                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
              {milestone.status === 'active' && (
                <div className="h-3 w-3 rounded-full bg-[#2E7D32]" />
              )}
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 pt-0.5">
            <div className={`font-medium ${milestone.status === 'active' ? 'text-[#2E7D32]' : ''}`}>
              {milestone.title}
            </div>
            <div className="text-sm text-muted-foreground">{milestone.date}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function BudgetChart({ categories }: { categories: BudgetCategory[] }) {
  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground mb-4">
        Presupuesto asignado vs ejecutado
      </div>
      {categories.map((category) => (
        <div key={category.name}>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium">{category.name}</span>
            <span className="text-muted-foreground">
              ${(category.executed / 1000000).toFixed(1)}M / ${(category.assigned / 1000000).toFixed(1)}M
            </span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
            <div 
              className="h-full rounded-full bg-[#2E7D32] transition-all duration-500"
              style={{ width: `${category.percentage}%` }}
            />
          </div>
          <div className="text-right text-xs text-muted-foreground mt-1">
            {category.percentage}%
          </div>
        </div>
      ))}
    </div>
  )
}

function ActivityFeed({ activities }: { activities: ActivityUpdate[] }) {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="rounded-lg border border-border bg-card p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#2E7D32]/10 text-[#2E7D32] font-semibold">
              {activity.user.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-medium text-sm">{activity.user}</span>
                <span className="text-xs text-muted-foreground">• {activity.role}</span>
              </div>
              <p className="mt-1 text-sm text-foreground">{activity.message}</p>
              <div className="mt-2 text-xs text-muted-foreground">{activity.timestamp}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function SidebarCard({ title, children, action }: { 
  title: string
  children: React.ReactNode
  action?: React.ReactNode 
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {children}
        {action && <div className="mt-4">{action}</div>}
      </CardContent>
    </Card>
  )
}

function ProjectCard({ project }: { project: RelatedProject }) {
  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm hover:shadow-lg transition-all cursor-pointer">
      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-sm mb-2 line-clamp-2">{project.title}</h3>
        <StatusBadge status={project.status} />
      </div>
    </div>
  )
}

function MapPlaceholder() {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-sm text-muted-foreground">Ruta 32, San José</p>
          <p className="text-xs text-muted-foreground mt-1">Costa Rica</p>
        </div>
      </div>
      {/* Decorative map grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-4 grid-rows-4 h-full w-full">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="border border-gray-300" />
          ))}
        </div>
      </div>
    </div>
  )
}

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
                  {mockVersions.map((version) => (
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
            <SidebarCard 
              title="Participación Ciudadana"
              action={
                <Button 
                  className="w-full bg-[#2E7D32] hover:bg-[#1B5E20]"
                  onClick={() => setShowOpinionForm(!showOpinionForm)}
                >
                  <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  Enviar Opinión Anónima
                </Button>
              }
            >
              <p className="text-sm text-muted-foreground">
                Tu opinión es importante para mejorar la transparencia y ejecución de los proyectos públicos.
              </p>
            </SidebarCard>

            {/* Ubicación del Proyecto */}
            <SidebarCard title="Ubicación del Proyecto">
              <MapPlaceholder />
              <div className="mt-3 text-sm">
                <p className="font-medium">{mockProject.location.address}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Coordenadas: {mockProject.location.lat}, {mockProject.location.lng}
                </p>
              </div>
            </SidebarCard>

            {/* Documentos Relacionados */}
            <SidebarCard title="Documentos Relacionados">
              <div className="space-y-2">
                {mockDocuments.map((doc) => (
                  <button
                    key={doc.id}
                    className="flex w-full items-center gap-3 rounded-lg border border-border p-3 text-left hover:bg-muted transition-colors"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#2E7D32]/10">
                      <svg className="h-5 w-5 text-[#2E7D32]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{doc.name}</div>
                      <div className="text-xs text-muted-foreground">{doc.type} • {doc.size}</div>
                    </div>
                  </button>
                ))}
              </div>
            </SidebarCard>

            {/* Entidad Responsable */}
            <SidebarCard title="Entidad Responsable">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-[#2E7D32] text-white font-bold text-lg">
                  M
                </div>
                <div>
                  <div className="font-semibold">{mockProject.responsibleEntity}</div>
                  <div className="text-xs text-muted-foreground">Ministerio de Obras Públicas y Transportes</div>
                </div>
              </div>
            </SidebarCard>
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

      {/* Footer */}
      <footer className="mt-16 border-t border-border bg-card">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <h3 className="font-semibold mb-3">Transparencia Costa Rica</h3>
              <p className="text-sm text-muted-foreground">
                Plataforma oficial para el seguimiento de proyectos públicos en Costa Rica.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Enlaces</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-[#2E7D32]">Acerca de</a></li>
                <li><a href="#" className="hover:text-[#2E7D32]">Contacto</a></li>
                <li><a href="#" className="hover:text-[#2E7D32]">Términos de uso</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Contacto</h3>
              <p className="text-sm text-muted-foreground">
                info@transparencia.go.cr<br />
                Tel: +506 2222-3333
              </p>
            </div>
          </div>
          <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
            © 2024 Gobierno de Costa Rica. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}
</content>
<line_count>738</line_count>
</write_to_file>

---

**User:**

[write_to_file for 'src/routes/index.tsx'] Result:
The user denied this operation and provided the following feedback:
<feedback>
You are a senior frontend developer specialized in React, TypeScript (.tsx), and modern UI systems.

Generate a fully responsive "Projects Page" UI for a government transparency platform (Costa Rica public works system).

TECH STACK:
- React + TypeScript (.tsx)
- Functional components with hooks
- Tailwind CSS (preferred)
- Clean architecture with reusable components

PAGE: PROJECTS CATALOG

---

LAYOUT STRUCTURE:

1. HEADER / NAVBAR
- Logo (Transparencia CR)
- Navigation links: Inicio, Proyectos, Participar
- Search bar (top right)
- Button: "Acceso Institucional"

---

2. FILTER BAR (TOP SECTION)
- Search input: "Buscar por nombre de obra..."
- Dropdown filters:
  - Estado (Todos los estados)
  - Ubicación (Todo el país)
  - Presupuesto (Cualquier monto)
- View toggle buttons:
  - Grid (Cuadrícula)
  - Lista

---

3. PAGE TITLE
- Title: "Catálogo de Obras Públicas"
- Subtitle: "Visualice y fiscalice el avance de los proyectos..."
- Results counter (e.g., 6 resultados)

---

4. PROJECT GRID (MAIN CONTENT)

Responsive grid:
- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 1 column

Each PROJECT CARD includes:

A. IMAGE SECTION
- Project image
- Status badge:
  - En ejecución (green)
  - Completado (gray)
  - Licitación (blue)
  - Suspendido (red)
- Reference ID (e.g., REF: #1029)

B. CONTENT
- Location (small text)
- Project title (bold)
- Description (short text)

C. PROGRESS
- Label: "Progreso Físico"
- Progress bar (percentage)

D. METADATA
- Presupuesto
- Fecha de entrega

E. ACTION BUTTONS
- "Detalle" (secondary button)
- "Opinar" (primary green button)

---

5. INFO SECTION (BOTTOM)

3 informational cards:
- "Datos en tiempo real"
- "Auditoría Ciudadana"
- "Acceso Abierto"

Each with icon + short description

---

6. FOOTER
- Logo + description
- Sections:
  - Ciudadanos
  - Institucional
  - Legal
- Copyright

---

COMPONENT STRUCTURE:

Create reusable components:
- Navbar
- FilterBar
- ProjectCard
- ProgressBar
- StatusBadge
- InfoCard
- Footer

---

DESIGN SYSTEM:

- Primary color: green (#2E7D32)
- Background: light gray (#F5F5F5)
- Cards: white, rounded corners (rounded-xl)
- Shadows: soft (shadow-md)
- Buttons:
  - Primary: green
  - Secondary: outline
- Typography: clean sans-serif

---

FUNCTIONALITY:

- Mock data array of projects
- Map through projects to render cards
- Basic filter logic (optional)
- Hover effects on cards
- Responsive design

---

TYPE DEFINITIONS:

Create TypeScript interface:

interface Project {
  id: string;
  title: string;
  location: string;
  description: string;
  progress: number;
  budget: number;
  endDate: string;
  status: "En ejecución" | "Completado" | "Licitación" | "Suspendido";
  image: string;
}

---

OUTPUT:

- Full ProjectsPage.tsx
- Reusable components
- Clean and readable code
- Ready to integrate into a real project

GOAL:

Build a professional, modern, and visually accurate UI that represents a government transparency platform with strong UX and clarity.
</feedback>
<environment_details>
# VSCode Visible Files
src\routes\index.tsx

# VSCode Open Tabs
src/routes/acerca.tsx,src/routes/index.tsx,src/routes/proyectos.tsx,src/components/ProjectCard.tsx,.env

# Recently Modified Files
These files have been modified since you last accessed them (file was just edited so you may need to re-read it before editing):
src/routes/index.tsx

# Current Time
Current time in ISO 8601 UTC format: 2026-05-01T20:10:26.777Z
User time zone: America/Costa_Rica, UTC-6:00

# Current Cost
$0.15

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>code</slug>
<name>💻 Code</name>
====

REMINDERS

Below is your current list of reminders for this task. Keep them updated as you progress.

| # | Content | Status |
|---|---------|--------|
| 1 | Create TypeScript interfaces for mock data | In Progress |
| 2 | Create reusable UI components (ProgressBar, Timeline, BudgetChart, etc.) | Pending |
| 3 | Create main page components (HeroSection, InfoCard, ActivityFeed, etc.) | Pending |
| 4 | Build the complete ProjectDetail page | Pending |
| 5 | Add custom styles for specific elements | Pending |


IMPORTANT: When task status changes, remember to call the `update_todo_list` tool to update your progress.

</environment_details>

---

**Assistant:**

I understand! You want a **Projects Catalog Page** instead. Let me create a complete, production-ready projects listing page with filters and grid layout.

<update_todo_list>
<todos>
[x] Create TypeScript interfaces for projects catalog
[-] Build Projects Catalog Page with filters and grid
[ ] Create reusable components (ProjectCard, FilterBar, etc.)
[ ] Add responsive design and interactivity
</todos>
</update_todo_list>

---

**User:**

[update_todo_list] Result:
The user denied this operation and provided the following feedback:
<feedback>
You are a senior frontend developer specialized in React, TypeScript (.tsx), and modern UI systems.

Generate a fully responsive "Projects Page" UI for a government transparency platform (Costa Rica public works system).

TECH STACK:
- React + TypeScript (.tsx)
- Functional components with hooks
- Tailwind CSS (preferred)
- Clean architecture with reusable components

PAGE: PROJECTS CATALOG

---

LAYOUT STRUCTURE:

1. HEADER / NAVBAR
- Logo (Transparencia CR)
- Navigation links: Inicio, Proyectos, Participar
- Search bar (top right)
- Button: "Acceso Institucional"

---

2. FILTER BAR (TOP SECTION)
- Search input: "Buscar por nombre de obra..."
- Dropdown filters:
  - Estado (Todos los estados)
  - Ubicación (Todo el país)
  - Presupuesto (Cualquier monto)
- View toggle buttons:
  - Grid (Cuadrícula)
  - Lista

---

3. PAGE TITLE
- Title: "Catálogo de Obras Públicas"
- Subtitle: "Visualice y fiscalice el avance de los proyectos..."
- Results counter (e.g., 6 resultados)

---

4. PROJECT GRID (MAIN CONTENT)

Responsive grid:
- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 1 column

Each PROJECT CARD includes:

A. IMAGE SECTION
- Project image
- Status badge:
  - En ejecución (green)
  - Completado (gray)
  - Licitación (blue)
  - Suspendido (red)
- Reference ID (e.g., REF: #1029)

B. CONTENT
- Location (small text)
- Project title (bold)
- Description (short text)

C. PROGRESS
- Label: "Progreso Físico"
- Progress bar (percentage)

D. METADATA
- Presupuesto
- Fecha de entrega

E. ACTION BUTTONS
- "Detalle" (secondary button)
- "Opinar" (primary green button)

---

5. INFO SECTION (BOTTOM)

3 informational cards:
- "Datos en tiempo real"
- "Auditoría Ciudadana"
- "Acceso Abierto"

Each with icon + short description

---

6. FOOTER
- Logo + description
- Sections:
  - Ciudadanos
  - Institucional
  - Legal
- Copyright

---

COMPONENT STRUCTURE:

Create reusable components:
- Navbar
- FilterBar
- ProjectCard
- ProgressBar
- StatusBadge
- InfoCard
- Footer

---

DESIGN SYSTEM:

- Primary color: green (#2E7D32)
- Background: light gray (#F5F5F5)
- Cards: white, rounded corners (rounded-xl)
- Shadows: soft (shadow-md)
- Buttons:
  - Primary: green
  - Secondary: outline
- Typography: clean sans-serif

---

FUNCTIONALITY:

- Mock data array of projects
- Map through projects to render cards
- Basic filter logic (optional)
- Hover effects on cards
- Responsive design

---

TYPE DEFINITIONS:

Create TypeScript interface:

interface Project {
  id: string;
  title: string;
  location: string;
  description: string;
  progress: number;
  budget: number;
  endDate: string;
  status: "En ejecución" | "Completado" | "Licitación" | "Suspendido";
  image: string;
}

---

OUTPUT:

- Full ProjectsPage.tsx
- Reusable components
- Clean and readable code
- Ready to integrate into a real project

GOAL:

Build a professional, modern, and visually accurate UI that represents a government transparency platform with strong UX and clarity.
</feedback>
[update_todo_list] Result:
User declined to update the todoList.
<environment_details>
# VSCode Visible Files
src\routes\index.tsx

# VSCode Open Tabs
src/routes/acerca.tsx,src/routes/index.tsx,src/routes/proyectos.tsx,src/components/ProjectCard.tsx,.env

# Current Time
Current time in ISO 8601 UTC format: 2026-05-01T20:10:56.808Z
User time zone: America/Costa_Rica, UTC-6:00

# Current Cost
$0.21

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>code</slug>
<name>💻 Code</name>
====

REMINDERS

Below is your current list of reminders for this task. Keep them updated as you progress.

| # | Content | Status |
|---|---------|--------|
| 1 | Create TypeScript interfaces for mock data | In Progress |
| 2 | Create reusable UI components (ProgressBar, Timeline, BudgetChart, etc.) | Pending |
| 3 | Create main page components (HeroSection, InfoCard, ActivityFeed, etc.) | Pending |
| 4 | Build the complete ProjectDetail page | Pending |
| 5 | Add custom styles for specific elements | Pending |


IMPORTANT: When task status changes, remember to call the `update_todo_list` tool to update your progress.

</environment_details>

---

**Assistant:**

I'll create a complete Projects Catalog Page. Let me build it as a comprehensive, production-ready component.

<write_to_file>
<path>src/routes/index.tsx</path>
<content>
import { createFileRoute } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"

export const Route = createFileRoute("/")({ component: ProjectsCatalogPage })

// ============================================================================
// TYPESCRIPT INTERFACES
// ============================================================================

interface Project {
  id: string
  title: string
  location: string
  description: string
  progress: number
  budget: number
  endDate: string
  status: "En ejecución" | "Completado" | "Licitación" | "Suspendido"
  image: string
  refId: string
}

type ViewMode = "grid" | "list"

// ============================================================================
// MOCK DATA
// ============================================================================

const mockProjects: Project[] = [
  {
    id: "1",
    refId: "#1029",
    title: "Ampliación del Puente sobre el Río Virilla",
    location: "San José, Ruta 32",
    description: "Modernización y ampliación de infraestructura vial para mejorar conectividad metropolitana.",
    progress: 68,
    budget: 22400000,
    endDate: "15 Sep 2024",
    status: "En ejecución",
    image: "https://images.unsplash.com/photo-1587850850969-e8d906a22c6b?w=600"
  },
  {
    id: "2",
    refId: "#1030",
    title: "Construcción Centro de Salud Comunitario",
    location: "Alajuela, Centro",
    description: "Nueva infraestructura de salud con equipamiento moderno y capacidad para 500 pacientes diarios.",
    progress: 45,
    budget: 8500000,
    endDate: "30 Nov 2024",
    status: "En ejecución",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600"
  },
  {
    id: "3",
    refId: "#1028",
    title: "Parque Recreativo La Sabana Norte",
    location: "San José, La Sabana",
    description: "Renovación completa de áreas verdes, senderos y zonas deportivas del parque.",
    progress: 100,
    budget: 3200000,
    endDate: "15 Mar 2024",
    status: "Completado",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600"
  },
  {
    id: "4",
    refId: "#1031",
    title: "Sistema de Alcantarillado Pluvial",
    location: "Cartago, Centro Histórico",
    description: "Implementación de sistema moderno de drenaje para prevención de inundaciones.",
    progress: 0,
    budget: 15600000,
    endDate: "20 Dic 2024",
    status: "Licitación",
    image: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=600"
  },
  {
    id: "5",
    refId: "#1027",
    title: "Modernización Escuela Pública Central",
    location: "Heredia, San Francisco",
    description: "Remodelación integral de instalaciones educativas con tecnología de punta.",
    progress: 82,
    budget: 5800000,
    endDate: "10 Jul 2024",
    status: "En ejecución",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600"
  },
  {
    id: "6",
    refId: "#1026",
    title: "Acueducto Regional Pacífico Central",
    location: "Puntarenas, Región Pacífico",
    description: "Infraestructura hídrica para garantizar suministro de agua potable a 12 comunidades.",
    progress: 25,
    budget: 18900000,
    endDate: "15 Feb 2025",
    status: "Suspendido",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600"
  }
]

// ============================================================================
// REUSABLE COMPONENTS
// ============================================================================

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2E7D32] text-white font-bold text-lg">
            CR
          </div>
          <div>
            <div className="text-sm font-bold text-gray-900">Transparencia CR</div>
            <div className="text-xs text-gray-500">Obras Públicas</div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm font-medium text-gray-700 hover:text-[#2E7D32] transition-colors">
            Inicio
          </a>
          <a href="#" className="text-sm font-medium text-[#2E7D32] border-b-2 border-[#2E7D32] pb-1">
            Proyectos
          </a>
          <a href="#" className="text-sm font-medium text-gray-700 hover:text-[#2E7D32] transition-colors">
            Participar
          </a>
        </div>

        {/* Search & Button */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-50 px-3 py-1.5">
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Buscar..." 
              className="w-32 bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
          </div>
          <Button size="sm" className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white">
            Acceso Institucional
          </Button>
        </div>
      </div>
    </nav>
  )
}

function FilterBar({ 
  viewMode, 
  setViewMode,
  searchTerm,
  setSearchTerm 
}: { 
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
  searchTerm: string
  setSearchTerm: (term: string) => void
}) {
  return (
    <div className="bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search Input */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Buscar por nombre de obra..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm outline-none focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <select className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20">
              <option>Todos los estados</option>
              <option>En ejecución</option>
              <option>Completado</option>
              <option>Licitación</option>
              <option>Suspendido</option>
            </select>

            <select className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20">
              <option>Todo el país</option>
              <option>San José</option>
              <option>Alajuela</option>
              <option>Cartago</option>
              <option>Heredia</option>
              <option>Puntarenas</option>
            </select>

            <select className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20">
              <option>Cualquier monto</option>
              <option>Menos de $5M</option>
              <option>$5M - $15M</option>
              <option>Más de $15M</option>
            </select>

            {/* View Toggle */}
            <div className="flex rounded-lg border border-gray-300 bg-white">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  viewMode === "grid" 
                    ? "bg-[#2E7D32] text-white" 
                    : "text-gray-600 hover:bg-gray-50"
                } rounded-l-lg`}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  viewMode === "list" 
                    ? "bg-[#2E7D32] text-white" 
                    : "text-gray-600 hover:bg-gray-50"
                } rounded-r-lg border-l border-gray-300`}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: Project["status"] }) {
  const styles = {
    "En ejecución": "bg-[#2E7D32] text-white",
    "Completado": "bg-gray-600 text-white",
    "Licitación": "bg-blue-600 text-white",
    "Suspendido": "bg-red-600 text-white"
  }

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-white" />
      {status}
    </span>
  )
}

function ProgressBar({ percentage }: { percentage: number }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-gray-600 font-medium">Progreso Físico</span>
        <span className="font-semibold text-gray-900">{percentage}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div 
          className="h-full rounded-full bg-[#2E7D32] transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

function ProjectCard({ project, viewMode }: { project: Project; viewMode: ViewMode }) {
  if (viewMode === "list") {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="flex flex-col sm:flex-row">
          {/* Image */}
          <div className="relative sm:w-64 h-48 sm:h-auto flex-shrink-0">
            <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
            <div className="absolute top-3 left-3">
              <StatusBadge status={project.status} />
            </div>
            <div className="absolute top-3 right-3 rounded-md bg-black/70 px-2 py-1 text-xs font-mono text-white">
              REF: {project.refId}
            </div>
          </div>

          {/* Content */}
          <CardContent className="flex-1 p-5">
            <div className="flex flex-col h-full">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {project.location}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
                </div>
              </div>

              <div className="mt-auto space-y-4">
                <ProgressBar percentage={project.progress} />

                <div className="flex items-center justify-between text-sm">
                  <div>
                    <div className="text-xs text-gray-500">Presupuesto</div>
                    <div className="font-semibold text-gray-900">${(project.budget / 1000000).toFixed(1)}M</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Fecha de entrega</div>
                    <div className="font-semibold text-gray-900">{project.endDate}</div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Detalle
                  </Button>
                  <Button size="sm" className="flex-1 bg-[#2E7D32] hover:bg-[#1B5E20]">
                    Opinar
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <StatusBadge status={project.status} />
        </div>
        <div className="absolute top-3 right-3 rounded-md bg-black/70 px-2 py-1 text-xs font-mono text-white">
          REF: {project.refId}
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-5">
        <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {project.location}
        </div>

        <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2">
          {project.title}
        </h3>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {project.description}
        </p>

        <ProgressBar percentage={project.progress} />

        <div className="mt-4 flex items-center justify-between text-sm border-t border-gray-100 pt-4">
          <div>
            <div className="text-xs text-gray-500">Presupuesto</div>
            <div className="font-semibold text-gray-900">${(project.budget / 1000000).toFixed(1)}M</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500">Entrega</div>
            <div className="font-semibold text-gray-900">{project.endDate}</div>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            Detalle
          </Button>
          <Button size="sm" className="flex-1 bg-[#2E7D32] hover:bg-[#1B5E20]">
            Opinar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function InfoCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="text-center hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#2E7D32]/10 text-[#2E7D32]">
          {icon}
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
    </Card>
  )
}

function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2E7D32] text-white font-bold text-lg">
                CR
              </div>
              <div className="text-sm font-bold text-gray-900">Transparencia CR</div>
            </div>
            <p className="text-sm text-gray-600">
              Plataforma oficial para el seguimiento y fiscalización de obras públicas en Costa Rica.
            </p>
          </div>

          {/* Ciudadanos */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Ciudadanos</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-[#2E7D32]">Ver Proyectos</a></li>
              <li><a href="#" className="hover:text-[#2E7D32]">Participar</a></li>
              <li><a href="#" className="hover:text-[#2E7D32]">Reportar Irregularidades</a></li>
              <li><a href="#" className="hover:text-[#2E7D32]">Preguntas Frecuentes</a></li>
            </ul>
          </div>

          {/* Institucional */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Institucional</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-[#2E7D32]">Acerca de</a></li>
              <li><a href="#" className="hover:text-[#2E7D32]">Normativa</a></li>
              <li><a href="#" className="hover:text-[#2E7D32]">Contacto</a></li>
              <li><a href="#" className="hover:text-[#2E7D32]">Acceso Institucional</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-[#2E7D32]">Términos de Uso</a></li>
              <li><a href="#" className="hover:text-[#2E7D32]">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-[#2E7D32]">Protección de Datos</a></li>
              <li><a href="#" className="hover:text-[#2E7D32]">Accesibilidad</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
          © 2024 Gobierno de Costa Rica. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

function ProjectsCatalogPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProjects = mockProjects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <FilterBar 
        viewMode={viewMode} 
        setViewMode={setViewMode}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Page Title */}
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Catálogo de Obras Públicas
          </h1>
          <p className="text-gray-600 mb-4">
            Visualice y fiscalice el avance de los proyectos de infraestructura en todo el país
          </p>
          <div className="text-sm text-gray-500">
            <span className="font-semibold text-[#2E7D32]">{filteredProjects.length}</span> resultados encontrados
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className={
          viewMode === "grid"
            ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            : "space-y-6"
        }>
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} viewMode={viewMode} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-600">No se encontraron proyectos que coincidan con tu búsqueda</p>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="bg-white border-t border-gray-200 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <InfoCard
              icon={
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
              title="Datos en Tiempo Real"
              description="Información actualizada diariamente sobre el progreso y ejecución presupuestaria de cada proyecto."
            />
            <InfoCard
              icon={
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              }
              title="Auditoría Ciudadana"
              description="Participe activamente en la fiscalización de obras públicas mediante opiniones y reportes."
            />
            <InfoCard
              icon={
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
              title="Acceso Abierto"
              description="Descargue documentos técnicos, presupuestos y reportes de avance de forma gratuita y transparente."
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
</content>
<line_count>738</line_count>
</write_to_file>

---

**User:**

[write_to_file for 'src/routes/index.tsx'] Result:
The tool execution failed with the following error:
<error>
Content appears to be truncated (file has 583 lines but was predicted to have 738 lines), and found comments indicating omitted code (e.g., '// rest of code unchanged', '/* previous code */'). Please provide the complete file content without any omissions if possible, or otherwise use the 'apply_diff' tool to apply the diff to the original file.
</error>
<environment_details>
# VSCode Visible Files
src\routes\index.tsx

# VSCode Open Tabs
src/routes/proyectos.tsx,src/components/ProjectCard.tsx,src/routes/index.tsx,.env

# Recently Modified Files
These files have been modified since you last accessed them (file was just edited so you may need to re-read it before editing):
src/routes/index.tsx

# Current Time
Current time in ISO 8601 UTC format: 2026-05-01T20:12:16.807Z
User time zone: America/Costa_Rica, UTC-6:00

# Current Cost
$0.29

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>code</slug>
<name>💻 Code</name>
====

REMINDERS

Below is your current list of reminders for this task. Keep them updated as you progress.

| # | Content | Status |
|---|---------|--------|
| 1 | Create TypeScript interfaces for mock data | In Progress |
| 2 | Create reusable UI components (ProgressBar, Timeline, BudgetChart, etc.) | Pending |
| 3 | Create main page components (HeroSection, InfoCard, ActivityFeed, etc.) | Pending |
| 4 | Build the complete ProjectDetail page | Pending |
| 5 | Add custom styles for specific elements | Pending |


IMPORTANT: When task status changes, remember to call the `update_todo_list` tool to update your progress.

</environment_details>

---

**Assistant:**

Let me read the current file first and then apply the complete changes.

<read_file>
<args>
<file>
<path>src/routes/index.tsx</path>
</file>
</args>
</read_file>

---

**User:**

[read_file for 'src/routes/index.tsx'. Reading multiple files at once is more efficient for the LLM. If other files are relevant to your current task, please read them simultaneously.] Result:
<files>
<file><path>src/routes/index.tsx</path>
<content lines="1-20">
 1 | import { createFileRoute } from "@tanstack/react-router"
 2 | import { Button } from "@/components/ui/button"
 3 | 
 4 | export const Route = createFileRoute("/")({ component: App })
 5 | 
 6 | function App() {
 7 |   return (
 8 |     <div className="flex min-h-svh p-6">
 9 |       <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
10 |         <div>
11 |           <h1 className="font-medium">Project ready!</h1>
12 |           <h1>Hola bob</h1>
13 |           <p>You may now add components and start building.</p>
14 |           <p>We&apos;ve already added the button component for you.</p>
15 |           <Button className="mt-2">Button</Button>
16 |         </div>
17 |       </div>
18 |     </div>
19 |   )
20 | }
</content>
</file>
</files>
<environment_details>
# VSCode Visible Files
src\routes\proyectos.tsx

# VSCode Open Tabs
src/routes/proyectos.tsx,src/components/ProjectCard.tsx,src/routes/index.tsx,src/components/ui/button.tsx,.env

# Current Time
Current time in ISO 8601 UTC format: 2026-05-01T20:12:51.023Z
User time zone: America/Costa_Rica, UTC-6:00

# Current Cost
$0.37

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>code</slug>
<name>💻 Code</name>
====

REMINDERS

Below is your current list of reminders for this task. Keep them updated as you progress.

| # | Content | Status |
|---|---------|--------|
| 1 | Create TypeScript interfaces for mock data | In Progress |
| 2 | Create reusable UI components (ProgressBar, Timeline, BudgetChart, etc.) | Pending |
| 3 | Create main page components (HeroSection, InfoCard, ActivityFeed, etc.) | Pending |
| 4 | Build the complete ProjectDetail page | Pending |
| 5 | Add custom styles for specific elements | Pending |


IMPORTANT: When task status changes, remember to call the `update_todo_list` tool to update your progress.

</environment_details>

---

**Assistant:**

Now I'll replace the entire file with the complete Projects Catalog Page:

<apply_diff>
<path>src/routes/index.tsx</path>
<diff>
<<<<<<< SEARCH
:start_line:1
-------
import { createFileRoute } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"

export const Route = createFileRoute("/")({ component: App })

function App() {
  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium">Project ready!</h1>
          <h1>Hola bob</h1>
          <p>You may now add components and start building.</p>
          <p>We&apos;ve already added the button component for you.</p>
          <Button className="mt-2">Button</Button>
        </div>
      </div>
    </div>
  )
}
=======
import { createFileRoute } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"

export const Route = createFileRoute("/")({ component: ProjectsCatalogPage })

// ============================================================================
// TYPESCRIPT INTERFACES
// ============================================================================

interface Project {
  id: string
  title: string
  location: string
  description: string
  progress: number
  budget: number
  endDate: string
  status: "En ejecución" | "Completado" | "Licitación" | "Suspendido"
  image: string
  refId: string
}

type ViewMode = "grid" | "list"

// ============================================================================
// MOCK DATA
// ============================================================================

const mockProjects: Project[] = [
  {
    id: "1",
    refId: "#1029",
    title: "Ampliación del Puente sobre el Río Virilla",
    location: "San José, Ruta 32",
    description: "Modernización y ampliación de infraestructura vial para mejorar conectividad metropolitana.",
    progress: 68,
    budget: 22400000,
    endDate: "15 Sep 2024",
    status: "En ejecución",
    image: "https://images.unsplash.com/photo-1587850850969-e8d906a22c6b?w=600"
  },
  {
    id: "2",
    refId: "#1030",
    title: "Construcción Centro de Salud Comunitario",
    location: "Alajuela, Centro",
    description: "Nueva infraestructura de salud con equipamiento moderno y capacidad para 500 pacientes diarios.",
    progress: 45,
    budget: 8500000,
    endDate: "30 Nov 2024",
    status: "En ejecución",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600"
  },
  {
    id: "3",
    refId: "#1028",
    title: "Parque Recreativo La Sabana Norte",
    location: "San José, La Sabana",
    description: "Renovación completa de áreas verdes, senderos y zonas deportivas del parque.",
    progress: 100,
    budget: 3200000,
    endDate: "15 Mar 2024",
    status: "Completado",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600"
  },
  {
    id: "4",
    refId: "#1031",
    title: "Sistema de Alcantarillado Pluvial",
    location: "Cartago, Centro Histórico",
    description: "Implementación de sistema moderno de drenaje para prevención de inundaciones.",
    progress: 0,
    budget: 15600000,
    endDate: "20 Dic 2024",
    status: "Licitación",
    image: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=600"
  },
  {
    id: "5",
    refId: "#1027",
    title: "Modernización Escuela Pública Central",
    location: "Heredia, San Francisco",
    description: "Remodelación integral de instalaciones educativas con tecnología de punta.",
    progress: 82,
    budget: 5800000,
    endDate: "10 Jul 2024",
    status: "En ejecución",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600"
  },
  {
    id: "6",
    refId: "#1026",
    title: "Acueducto Regional Pacífico Central",
    location: "Puntarenas, Región Pacífico",
    description: "Infraestructura hídrica para garantizar suministro de agua potable a 12 comunidades.",
    progress: 25,
    budget: 18900000,
    endDate: "15 Feb 2025",
    status: "Suspendido",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600"
  }
]

// ============================================================================
// REUSABLE COMPONENTS
// ============================================================================

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2E7D32] text-white font-bold text-lg">
            CR
          </div>
          <div>
            <div className="text-sm font-bold text-gray-900">Transparencia CR</div>
            <div className="text-xs text-gray-500">Obras Públicas</div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm font-medium text-gray-700 hover:text-[#2E7D32] transition-colors">
            Inicio
          </a>
          <a href="#" className="text-sm font-medium text-[#2E7D32] border-b-2 border-[#2E7D32] pb-1">
            Proyectos
          </a>
          <a href="#" className="text-sm font-medium text-gray-700 hover:text-[#2E7D32] transition-colors">
            Participar
          </a>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-50 px-3 py-1.5">
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Buscar..." 
              className="w-32 bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
          </div>
          <Button size="sm" className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white">
            Acceso Institucional
          </Button>
        </div>
      </div>
    </nav>
  )
}

function FilterBar({ 
  viewMode, 
  setViewMode,
  searchTerm,
  setSearchTerm 
}: { 
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
  searchTerm: string
  setSearchTerm: (term: string) => void
}) {
  return (
    <div className="bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Buscar por nombre de obra..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm outline-none focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20">
              <option>Todos los estados</option>
              <option>En ejecución</option>
              <option>Completado</option>
              <option>Licitación</option>
              <option>Suspendido</option>
            </select>

            <select className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20">
              <option>Todo el país</option>
              <option>San José</option>
              <option>Alajuela</option>
              <option>Cartago</option>
              <option>Heredia</option>
              <option>Puntarenas</option>
            </select>

            <select className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20">
              <option>Cualquier monto</option>
              <option>Menos de $5M</option>
              <option>$5M - $15M</option>
              <option>Más de $15M</option>
            </select>

            <div className="flex rounded-lg border border-gray-300 bg-white">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  viewMode === "grid" 
                    ? "bg-[#2E7D32] text-white" 
                    : "text-gray-600 hover:bg-gray-50"
                } rounded-l-lg`}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  viewMode === "list" 
                    ? "bg-[#2E7D32] text-white" 
                    : "text-gray-600 hover:bg-gray-50"
                } rounded-r-lg border-l border-gray-300`}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: Project["status"] }) {
  const styles = {
    "En ejecución": "bg-[#2E7D32] text-white",
    "Completado": "bg-gray-600 text-white",
    "Licitación": "bg-blue-600 text-white",
    "Suspendido": "bg-red-600 text-white"
  }

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-white" />
      {status}
    </span>
  )
}

function ProgressBar({ percentage }: { percentage: number }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-gray-600 font-medium">Progreso Físico</span>
        <span className="font-semibold text-gray-900">{percentage}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div 
          className="h-full rounded-full bg-[#2E7D32] transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

function ProjectCard({ project, viewMode }: { project: Project; viewMode: ViewMode }) {
  if (viewMode === "list") {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="flex flex-col sm:flex-row">
          <div className="relative sm:w-64 h-48 sm:h-auto flex-shrink-0">
            <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
            <div className="absolute top-3 left-3">
              <StatusBadge status={project.status} />
            </div>
            <div className="absolute top-3 right-3 rounded-md bg-black/70 px-2 py-1 text-xs font-mono text-white">
              REF: {project.refId}
            </div>
          </div>

          <CardContent className="flex-1 p-5">
            <div className="flex flex-col h-full">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {project.location}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
                </div>
              </div>

              <div className="mt-auto space-y-4">
                <ProgressBar percentage={project.progress} />

                <div className="flex items-center justify-between text-sm">
                  <div>
                    <div className="text-xs text-gray-500">Presupuesto</div>
                    <div className="font-semibold text-gray-900">${(project.budget / 1000000).toFixed(1)}M</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Fecha de entrega</div>
                    <div className="font-semibold text-gray-900">{project.endDate}</div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Detalle
                  </Button>
                  <Button size="sm" className="flex-1 bg-[#2E7D32] hover:bg-[#1B5E20]">
                    Opinar
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <StatusBadge status={project.status} />
        </div>
        <div className="absolute top-3 right-3 rounded-md bg-black/70 px-2 py-1 text-xs font-mono text-white">
          REF: {project.refId}
        </div>
      </div>

      <CardContent className="p-5">
        <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {project.location}
        </div>

        <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2">
          {project.title}
        </h3>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {project.description}
        </p>

        <ProgressBar percentage={project.progress} />

        <div className="mt-4 flex items-center justify-between text-sm border-t border-gray-100 pt-4">
          <div>
            <div className="text-xs text-gray-500">Presupuesto</div>
            <div className="font-semibold text-gray-900">${(project.budget / 1000000).toFixed(1)}M</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500">Entrega</div>
            <div className="font-semibold text-gray-900">{project.endDate}</div>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            Detalle
          </Button>
          <Button size="sm" className="flex-1 bg-[#2E7D32] hover:bg-[#1B5E20]">
            Opinar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function InfoCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="text-center hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#2E7D32]/10 text-[#2E7D32]">
          {icon}
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
    </Card>
  )
}

function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2E7D32] text-white font-bold text-lg">
                CR
              </div>
              <div className="text-sm font-bold text-gray-900">Transparencia CR</div>
            </div>
            <p className="text-sm text-gray-600">
              Plataforma oficial para el seguimiento y fiscalización de obras públicas en Costa Rica.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Ciudadanos</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-[#2E7D32]">Ver Proyectos</a></li>
              <li><a href="#" className="hover:text-[#2E7D32]">Participar</a></li>
              <li><a href="#" className="hover:text-[#2E7D32]">Reportar Irregularidades</a></li>
              <li><a href="#" className="hover:text-[#2E7D32]">Preguntas Frecuentes</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Institucional</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-[#2E7D32]">Acerca de</a></li>
              <li><a href="#" className="hover:text-[#2E7D32]">Normativa</a></li>
              <li><a href="#" className="hover:text-[#2E7D32]">Contacto</a></li>
              <li><a href="#" className="hover:text-[#2E7D32]">Acceso Institucional</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-[#2E7D32]">Términos de Uso</a></li>
              <li><a href="#" className="hover:text-[#2E7D32]">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-[#2E7D32]">Protección de Datos</a></li>
              <li><a href="#" className="hover:text-[#2E7D32]">Accesibilidad</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
          © 2024 Gobierno de Costa Rica. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

function ProjectsCatalogPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProjects = mockProjects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <FilterBar 
        viewMode={viewMode} 
        setViewMode={setViewMode}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="bg-white border-b border-gray-200 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Catálogo de Obras Públicas
          </h1>
          <p className="text-gray-600 mb-4">
            Visualice y fiscalice el avance de los proyectos de infraestructura en todo el país
          </p>
          <div className="text-sm text-gray-500">
            <span className="font-semibold text-[#2E7D32]">{filteredProjects.length}</span> resultados encontrados
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className={
          viewMode === "grid"
            ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            : "space-y-6"
        }>
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} viewMode={viewMode} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-600">No se encontraron proyectos que coincidan con tu búsqueda</p>
          </div>
        )}
      </div>

      <div className="bg-white border-t border-gray-200 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <InfoCard
              icon={
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
              title="Datos en Tiempo Real"
              description="Información actualizada diariamente sobre el progreso y ejecución presupuestaria de cada proyecto."
            />
            <InfoCard
              icon={
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              }
              title="Auditoría Ciudadana"
              description="Participe activamente en la fiscalización de obras públicas mediante opiniones y reportes."
            />
            <InfoCard
              icon={
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
              title="Acceso Abierto"
              description="Descargue documentos técnicos, presupuestos y reportes de avance de forma gratuita y transparente."
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
>>>>>>> REPLACE
</diff>
</apply_diff>

---

**User:**

[apply_diff for 'src/routes/index.tsx'] Result:
<error_details>
No sufficiently similar match found at line: 1 (98% similar, needs 100%)

Debug Info:
- Similarity Score: 98%
- Required Threshold: 100%
- Search Range: starting at line 1
- Tried both standard and aggressive line number stripping
- Tip: Use the read_file tool to get the latest content of the file before attempting to use the apply_diff tool again, as the file content may have changed

Search Content:
import { createFileRoute } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"

export const Route = createFileRoute("/")({ component: App })

function App() {
  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium">Project ready!</h1>
          <h1>Hola bob</h1>
          <p>You may now add components and start building.</p>
          <p>We've already added the button component for you.</p>
          <Button className="mt-2">Button</Button>
        </div>
      </div>
    </div>
  )
}

Best Match Found:
 1 | import { createFileRoute } from "@tanstack/react-router"
 2 | import { Button } from "@/components/ui/button"
 3 | 
 4 | export const Route = createFileRoute("/")({ component: App })
 5 | 
 6 | function App() {
 7 |   return (
 8 |     <div className="flex min-h-svh p-6">
 9 |       <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
10 |         <div>
11 |           <h1 className="font-medium">Project ready!</h1>
12 |           <h1>Hola bob</h1>
13 |           <p>You may now add components and start building.</p>
14 |           <p>We&apos;ve already added the button component for you.</p>
15 |           <Button className="mt-2">Button</Button>
16 |         </div>
17 |       </div>
18 |     </div>
19 |   )
20 | }


Original Content:
 1 | import { createFileRoute } from "@tanstack/react-router"
 2 | import { Button } from "@/components/ui/button"
 3 | 
 4 | export const Route = createFileRoute("/")({ component: App })
 5 | 
 6 | function App() {
 7 |   return (
 8 |     <div className="flex min-h-svh p-6">
 9 |       <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
10 |         <div>
11 |           <h1 className="font-medium">Project ready!</h1>
12 |           <h1>Hola bob</h1>
13 |           <p>You may now add components and start building.</p>
14 |           <p>We&apos;ve already added the button component for you.</p>
15 |           <Button className="mt-2">Button</Button>
16 |         </div>
17 |       </div>
18 |     </div>
19 |   )
20 | }

</error_details>
<environment_details>
# VSCode Visible Files
src\components\ui\button.tsx

# VSCode Open Tabs
src/routes/proyectos.tsx,src/components/ProjectCard.tsx,src/routes/index.tsx,src/components/ui/button.tsx,.env

# Current Time
Current time in ISO 8601 UTC format: 2026-05-01T20:14:10.305Z
User time zone: America/Costa_Rica, UTC-6:00

# Current Cost
$0.48

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>code</slug>
<name>💻 Code</name>
====

REMINDERS

Below is your current list of reminders for this task. Keep them updated as you progress.

| # | Content | Status |
|---|---------|--------|
| 1 | Create TypeScript interfaces for mock data | In Progress |
| 2 | Create reusable UI components (ProgressBar, Timeline, BudgetChart, etc.) | Pending |
| 3 | Create main page components (HeroSection, InfoCard, ActivityFeed, etc.) | Pending |
| 4 | Build the complete ProjectDetail page | Pending |
| 5 | Add custom styles for specific elements | Pending |


IMPORTANT: When task status changes, remember to call the `update_todo_list` tool to update your progress.

</environment_details>

---

**Assistant:**

The issue is with the HTML entity `&apos;`. Let me use write_to_file with the correct line count this time:

<execute_command>
<command>powershell -Command "(Get-Content 'src/routes/index.tsx' | Measure-Object -Line).Lines"</command>
</execute_command>

