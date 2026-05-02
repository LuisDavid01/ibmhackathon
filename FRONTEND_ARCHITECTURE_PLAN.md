# 🎨 FRONTEND ARCHITECTURE PLAN
## Costa Rica Government Transparency Platform

**Version:** 1.0  
**Date:** May 2, 2026  
**Stack:** React + TanStack Start + TypeScript + Tailwind v4 + shadcn/ui

---

## 📋 EXECUTIVE SUMMARY

This document defines a complete frontend architecture for a government transparency platform using a **neo-brutal editorial design system**. The plan ensures:

- ✅ Full integration with existing backend functions
- ✅ Consistent neo-brutal design language
- ✅ Real data fetching (no mock data)
- ✅ Production-ready UX patterns
- ✅ Government-grade clarity and accessibility

---

## 🎨 DESIGN SYSTEM SPECIFICATION

### 1. NEO-BRUTAL EDITORIAL PRINCIPLES

#### 1.1 Shape System
```
RULE: NO rounded corners anywhere
- border-radius: 0 (always)
- All borders: 2px solid
- Border color: border token only
```

#### 1.2 Shadow System (Hard Shadows)
```css
/* Default State */
shadow-[4px_4px_0px_0px_hsl(var(--foreground))]
shadow-[6px_6px_0px_0px_hsl(var(--border))]

/* Hover State (Press Effect) */
- Shadow: none
- Transform: translate-x-[4px] translate-y-[4px]
- Simulates physical button press
```

**Implementation Pattern:**
```
Default: shadow-[4px_4px_0_black] 
Hover: shadow-none translate-x-[4px] translate-y-[4px]
```

#### 1.3 Color Token System (STRICT)
```
ALLOWED TOKENS ONLY:
- bg-background (cream #fff5ee)
- bg-muted (white)
- bg-foreground (dark/black - for inversions)
- text-foreground (dark text)
- text-muted-foreground (gray text)
- bg-primary (accent color)
- text-primary-foreground (text on primary)
- bg-destructive (errors)
- border-border (all borders)

FORBIDDEN:
- NO hardcoded colors (#fff, #000, etc.)
- NO arbitrary values
- NO opacity modifiers (except icons)
```

#### 1.4 Section Contrast Pattern
```
Alternating sections create visual rhythm:

Section 1: bg-background (cream)
Section 2: bg-muted (white)
Section 3: bg-foreground + text-background (full inversion)
Section 4: bg-background (cream)
Section 5: bg-muted (white)
...repeat pattern
```

#### 1.5 Typography System
```
Emphasis Text:
- Inline highlight: bg-primary with px-1 padding
- Example: "Este <span class="bg-primary px-1">texto</span> es importante"

Stats & IDs:
- font-mono (monospace)
- Used for: project IDs, dates, budgets, technical data

Hierarchy:
- H1: text-4xl font-black uppercase
- H2: text-3xl font-bold
- H3: text-xl font-semibold
- Body: text-base
- Small: text-sm
- Micro: text-xs font-mono uppercase tracking-widest
```

---

## 🔧 ICONOGRAPHY FIX (CRITICAL)

### Current Issues
❌ Icons too transparent (hard to see)  
❌ Icons overlapping input fields  
❌ Misaligned icons  

### Solution Specification

#### Icon Visibility
```
Minimum opacity: 80% (opacity-80)
Preferred: 100% opacity (no transparency)
Size scale: 16px / 20px / 24px (w-4 h-4 / w-5 h-5 / w-6 h-6)
```

#### Icon Positioning in Inputs
```tsx
// WRONG (current):
<div className="relative">
  <Icon className="absolute left-3 top-1/2 -translate-y-1/2" />
  <input className="pl-3" /> {/* Icon overlaps! */}
</div>

// CORRECT (new):
<div className="relative">
  <Icon className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-80" />
  <input className="pl-10" /> {/* Space for icon */}
</div>

// OR BETTER (flex layout):
<div className="flex items-center gap-2 border-2 border-border px-3 py-2">
  <Icon className="w-5 h-5 text-muted-foreground flex-shrink-0" />
  <input className="flex-1 bg-transparent border-none outline-none" />
</div>
```

#### Icon Usage Rules
```
1. ALWAYS use Tabler Icons (lucide-react package)
2. NEVER use absolute positioning that blocks input
3. ALWAYS add pointer-events-none to decorative icons
4. ALWAYS provide adequate padding (pl-10 minimum for left icons)
5. Icons in buttons: mr-2 spacing
```

---

## 🧭 NAVBAR UX FIX

### Current Issue
```
Active menu item has dark background (visual noise)
Context is already clear from URL
```

### Solution
```tsx
// REMOVE active background
// KEEP subtle indicator only

<Link
  to="/proyectos"
  className="text-sm font-bold hover:text-primary transition-colors"
  activeProps={{ 
    className: "text-primary border-b-2 border-primary" // Subtle underline only
  }}
>
  Proyectos
</Link>
```

**Rationale:**
- Navigation context clear from URL
- Reduces visual clutter
- Maintains neo-brutal minimalism
- Underline provides sufficient feedback

---

## 🧩 COMPONENT ARCHITECTURE

See detailed component specifications in sections below.

### Component Categories:
1. **Layout**: Container, Section, Navbar
2. **UI Core**: Card, Button, Input, Select, Textarea, Table, Badge, Modal
3. **Feedback**: Alert, EmptyState, LoadingState
4. **Data Display**: ProjectCard, UserRow, CommentItem
5. **Assistant**: ChatContainer, MessageBubble, ChatInput

---

## 📡 BACKEND INTEGRATION

### Available Functions (from /functions)

#### Users (user.functions.ts)
```typescript
- getUsuarios(limit, offset) → DataPagination<User>
- crearUsuarios(UserInsert) → ServerFNResponse
- actualizarUsuario(id, data) → ServerFNResponse (not implemented yet)
- eliminarUsuario(id) → ServerFNResponse (not implemented yet)
```

#### Projects (project.functions.ts)
```typescript
- getProyectos(limit, offset) → DataPagination<Project>
- getProyectoById(id) → Project
- buscarProyectos(searchTerm, limit, offset) → DataPagination<Project>
- crearProyecto(ProyectData) → ServerFNResponse
- actualizarProyecto(id, data) → ServerFNResponse
- eliminarProyecto(id) → ServerFNResponse
```

#### Comments (comments.functions.ts)
```typescript
- getComments(limit, offset) → DataPagination<Comment>
- getCommentById(id) → Comment
- buscarComments(searchTerm, limit, offset) → DataPagination<Comment>
- crearComment(CommentData) → ServerFNResponse
- actualizarComment(id, data) → ServerFNResponse
- eliminarComment(id) → ServerFNResponse
```

#### Project Changes (projectChanges.functions.ts)
```typescript
- getProjectChanges(limit, offset) → DataPagination<ProjectChange>
- getProjectChangeById(id) → ProjectChange
- getProjectChangesByProjectId(proyectId, limit, offset) → DataPagination<ProjectChange>
- buscarProjectChanges(searchTerm, limit, offset) → DataPagination<ProjectChange>
- crearProjectChange(ProjectChangeData) → ServerFNResponse
- actualizarProjectChange(id, data) → ServerFNResponse
- eliminarProjectChange(id) → ServerFNResponse
```

#### AI Agent (agent.function.ts)
```typescript
- clientAgent(message, conversationHistory) → { success, data: AIMessage[], message }
```

---

## 📄 PAGE IMPLEMENTATION PLANS

### 1. HOME PAGE (index.tsx)

#### Critical Change: RecentProjects Component
**MUST replace mock data with real query**

```typescript
// Current (WRONG):
import { mockProjects } from "@/data/mockData"

// Required (CORRECT):
import { useQuery } from '@tanstack/react-query'
import { getProyectos } from '@/functions/project.functions'

function RecentProjects() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['projects', { limit: 4, offset: 0 }],
    queryFn: () => getProyectos({ data: { limit: 4, offset: 0 } }),
  })

  const projects = data?.data || []

  if (isLoading) return <BrutalLoadingState message="Cargando proyectos..." />
  if (isError) return <BrutalAlert variant="error">Error al cargar proyectos</BrutalAlert>
  if (projects.length === 0) return <BrutalEmptyState title="No hay proyectos" />

  return (
    <section className="bg-background py-24 px-6">
      {/* Render real projects */}
    </section>
  )
}
```

#### Section Contrast Pattern:
```
HeroSection: bg-background (cream)
WhyTransparency: bg-muted (white)
AIChatPromo: bg-foreground text-background (inverted)
RecentProjects: bg-background (cream)
CTASection: bg-muted (white)
Footer: bg-background border-t-2
```

---

### 2. PROYECTOS PAGE (proyectos.tsx)

#### Status: ✅ Already using real data
#### Required: Neo-brutal styling updates

#### Icon Fix in Search:
```tsx
<div className="relative">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none opacity-80" />
  <input
    className="w-full border-2 border-border bg-background pl-10 pr-4 py-3 font-mono text-sm focus:outline-none focus:border-primary"
    placeholder="BUSCAR PROYECTOS..."
  />
</div>
```

#### Table Styling:
```tsx
<table className="w-full border-2 border-border border-collapse">
  <thead className="bg-foreground text-background">
    <tr>
      <th className="font-mono text-xs uppercase tracking-widest px-4 py-3 text-left border-r-2 border-background/20">
        Proyecto
      </th>
    </tr>
  </thead>
  <tbody>
    {projects.map((project, index) => (
      <tr className={cn(
        "border-b-2 border-border hover:bg-muted transition-colors",
        index % 2 === 0 && "bg-muted/30"
      )}>
        {/* cells */}
      </tr>
    ))}
  </tbody>
</table>
```

---

### 3. USUARIOS PAGE (dashboard/usuarios.tsx)

#### Status: ✅ TanStack Query + Form implemented
#### Required: Icon fixes + consistency

#### Search Input Fix:
```tsx
<div className="relative">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none opacity-80" />
  <input
    className="w-full border-2 border-border bg-background pl-10 pr-4 py-3 font-mono text-sm focus:outline-none focus:border-primary"
    placeholder="BUSCAR USUARIO..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
</div>
```

#### Add Proper States:
```tsx
if (isLoading) return <BrutalLoadingState message="Cargando usuarios..." />
if (isError) return <BrutalAlert variant="error">Error al cargar usuarios</BrutalAlert>
if (filteredUsers.length === 0) {
  return <BrutalEmptyState 
    icon={Users}
    title="No hay usuarios"
    action={<BrutalButton onClick={openModal}>Crear Usuario</BrutalButton>}
  />
}
```

---

### 4. PARTICIPAR PAGE (participar.tsx)

#### Status: ❌ Using mock submission
#### Required: Real backend integration

#### Backend Integration:
```typescript
import { crearComment } from '@/functions/comments.functions'
import { useMutation } from '@tanstack/react-query'

const submitMutation = useMutation({
  mutationFn: (data: CommentData) => crearComment({ data }),
  onSuccess: (response) => {
    if (response.success) {
      toast.success('Opinión enviada exitosamente')
      form.reset()
      setShowSuccess(true)
    } else {
      toast.error(response.message)
    }
  },
})

// In form submit:
const commentData: CommentData = {
  title: formValue.tipoComentario || 'Participación Ciudadana',
  content: formValue.comentario,
}
submitMutation.mutate(commentData)
```

#### Replace All Inputs with Neo-Brutal Components:
```tsx
<BrutalInput
  label="Nombre (Opcional)"
  value={field.state.value}
  onChange={(e) => field.handleChange(e.target.value)}
  placeholder="Su nombre completo"
/>

<BrutalSelect
  label="Tipo de Comentario *"
  value={field.state.value}
  onChange={(e) => field.handleChange(e.target.value)}
  options={[
    { value: 'sugerencia', label: 'SUGERENCIA' },
    { value: 'reporte', label: 'REPORTE' },
    // ...
  ]}
/>

<BrutalTextarea
  label="Comentario *"
  value={field.state.value}
  onChange={(e) => field.handleChange(e.target.value)}
  rows={6}
  placeholder="Escriba aquí su opinión..."
/>
```

---

### 5. ASISTENTE PAGE (asistente/index.tsx)

#### Status: ❌ Empty placeholder
#### Required: Complete implementation

#### Page Structure:
```typescript
function AsistentePage() {
  const [messages, setMessages] = useState<AIMessage[]>([])
  const [inputValue, setInputValue] = useState('')

  const sendMutation = useMutation({
    mutationFn: (message: string) => 
      clientAgent({ data: { message, conversationHistory: messages } }),
    onSuccess: (response) => {
      if (response.success && response.data) {
        setMessages(prev => [...prev, ...response.data])
      }
    },
  })

  const handleSend = () => {
    if (!inputValue.trim()) return
    
    const userMessage: AIMessage = { role: 'user', content: inputValue }
    setMessages(prev => [...prev, userMessage])
    sendMutation.mutate(inputValue)
    setInputValue('')
  }

  return (
    <div className="min-h-screen bg-background">
      <ChatContainer>
        <ChatHeader />
        <MessagesList messages={messages} isLoading={sendMutation.isPending} />
        <ChatInput value={inputValue} onChange={setInputValue} onSend={handleSend} />
      </ChatContainer>
    </div>
  )
}
```

#### MessageBubble Component:
```tsx
function MessageBubble({ message }: { message: AIMessage }) {
  const isUser = message.role === 'user'
  
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div className={cn(
        "max-w-[80%] border-2 px-4 py-3 font-mono text-sm",
        isUser && "bg-primary text-primary-foreground border-foreground shadow-[3px_3px_0_hsl(var(--foreground))]",
        !isUser && "bg-muted text-foreground border-border shadow-[3px_3px_0_hsl(var(--border))]"
      )}>
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  )
}
```

---

## 🎨 BRANDING INTEGRATION

### iconoEmpresa.png Usage

#### Navbar:
```tsx
<Link to="/" className="flex items-center gap-2">
  <img src="/src/components/iconoEmpresa.png" alt="Logo" className="w-8 h-8" />
  <span className="text-xl font-black">TransparenciaCR</span>
</Link>
```

#### Login Page:
```tsx
<div className="text-center mb-8">
  <img src="/src/components/iconoEmpresa.png" alt="Logo" className="w-16 h-16 mx-auto mb-4" />
  <h1 className="text-3xl font-black uppercase">Iniciar Sesión</h1>
</div>
```

#### Footer:
```tsx
<div className="flex items-center gap-2">
  <img src="/src/components/iconoEmpresa.png" alt="Logo" className="w-6 h-6" />
  <span className="font-bold">TransparenciaCR</span>
</div>
```

---

## 🎯 IMPLEMENTATION ROADMAP

### Phase 1: Design System (Week 1)
- [ ] Create all BrutalComponents (Card, Button, Input, Select, Textarea, Table, Badge, Modal)
- [ ] Create feedback components (Alert, EmptyState, LoadingState)
- [ ] Update Navbar (fix active state, add logo)

### Phase 2: Data Integration (Week 2)
- [ ] Replace RecentProjects mock data with real query
- [ ] Apply neo-brutal styling to Proyectos page
- [ ] Fix all icon spacing issues
- [ ] Add proper loading/error/empty states everywhere

### Phase 3: Forms (Week 3)
- [ ] Integrate Participar form with crearComment backend
- [ ] Convert all inputs to neo-brutal components
- [ ] Add Zod validation to all forms
- [ ] Test all CRUD operations

### Phase 4: AI Assistant (Week 4)
- [ ] Implement complete Asistente page
- [ ] Create chat UI components
- [ ] Integrate with clientAgent function
- [ ] Handle conversation state
- [ ] Add error handling

### Phase 5: Polish (Week 5)
- [ ] Remove ALL rounded corners
- [ ] Verify color token usage (no hardcoded colors)
- [ ] Test all press effects
- [ ] Verify section contrast pattern
- [ ] Final UX testing

---

## ✅ QUALITY CHECKLIST

Before considering implementation complete:

- [ ] NO rounded corners anywhere (border-radius: 0)
- [ ] ALL borders are 2px solid
- [ ] ONLY shadcn color tokens used (no hardcoded colors)
- [ ] Hard shadows with press effects on interactive elements
- [ ] Icons minimum 80% opacity
- [ ] Icons never overlap input fields
- [ ] Proper padding for icon inputs (pl-10 minimum)
- [ ] Navbar active state is subtle (underline only)
- [ ] All data fetching uses TanStack Query
- [ ] All forms use TanStack Form
- [ ] NO mock data in production components
- [ ] Loading states for all async operations
- [ ] Error states for all async operations
- [ ] Empty states for zero-data scenarios
- [ ] iconoEmpresa.png in navbar, login, footer
- [ ] Section contrast pattern followed
- [ ] Monospace font for stats/IDs/dates
- [ ] Government-grade clarity maintained

---

## 📚 REFERENCE

### Key Files to Modify:
1. `src/components/home/RecentProjects.tsx` - Replace mock data
2. `src/components/home/Navbar.tsx` - Fix active state, add logo
3. `src/routes/proyectos.tsx` - Apply neo-brutal styling
4. `src/routes/dashboard/usuarios.tsx` - Fix icon spacing
5. `src/routes/participar.tsx` - Backend integration, neo-brutal forms
6. `src/routes/asistente/index.tsx` - Complete implementation

### New Components to Create:
- `src/components/brutal/BrutalCard.tsx`
- `src/components/brutal/BrutalButton.tsx`
- `src/components/brutal/BrutalInput.tsx`
- `src/components/brutal/BrutalSelect.tsx`
- `src/components/brutal/BrutalTextarea.tsx`
- `src/components/brutal/BrutalTable.tsx`
- `src/components/brutal/BrutalBadge.tsx`
- `src/components/brutal/BrutalModal.tsx`
- `src/components/brutal/BrutalAlert.tsx`
- `src/components/brutal/BrutalEmptyState.tsx`
- `src/components/brutal/BrutalLoadingState.tsx`
- `src/components/assistant/ChatContainer.tsx`
- `src/components/assistant/MessageBubble.tsx`
- `src/components/assistant/ChatInput.tsx`

---

**END OF ARCHITECTURE PLAN**