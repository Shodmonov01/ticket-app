import type { ReactNode } from "react"
import { ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

interface CategorySectionProps {
  title: string
  children: ReactNode
  seeAllHref: string
}

export function CategorySection({ title, children, seeAllHref }: CategorySectionProps) {
  return (
    <div className="mb-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <Link to={seeAllHref} className="flex items-center text-sm text-gray-400">
          See all <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
      {children}
    </div>
  )
}
