interface StatusBadgeProps {
  status: "En ejecución" | "Inicio reciente" | "Por concluir" | "Suspendido"
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    "En ejecución": "bg-primary/10 border-primary text-primary",
    "Inicio reciente": "bg-blue-500/10 border-blue-500 text-blue-700",
    "Por concluir": "bg-green-500/10 border-green-500 text-green-700",
    "Suspendido": "bg-destructive/10 border-destructive text-destructive",
  }

  return (
    <span className={`border-2 text-xs font-bold px-2 py-0.5 ${styles[status]}`}>
      {status}
    </span>
  )
}

// Made with Bob
