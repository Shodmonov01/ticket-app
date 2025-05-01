import type { ReactNode } from 'react'
import { cn } from '../lib/utils'

interface CategoryCardProps {
    title: string
    count: number
    icon: ReactNode
    className?: string
}

export function CategoryCard({ title, count, icon, className }: CategoryCardProps) {
    return (
        <div className={cn('flex flex-col rounded-xl min-w-[130px] bg-muted p-3', className)}>
            <div className='mb-2 h-10 w-10 rounded-md p-2'>{icon}</div>
            <h3 className='font-bold text-white text-lg'>{title}</h3>
            <p className='text-sm text-gray-400'>{count} events</p>
        </div>
    )
}
