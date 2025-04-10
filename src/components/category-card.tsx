import type { ReactNode } from "react"
import { cn } from "../lib/utils"

interface CategoryCardProps {
  title: string
  count: number
  icon: ReactNode
  className?: string
}

export function CategoryCard({ title, count, icon, className }: CategoryCardProps) {
  return (
    <div className={cn("flex flex-col rounded-lg bg-muted p-4", className)}>
      <div className="mb-2 h-10 w-10 rounded-md p-2">{icon}</div>
      <h3 className="font-medium text-white">{title}</h3>
      <p className="text-sm text-gray-400">{count} events</p>
    </div>
  )
}
