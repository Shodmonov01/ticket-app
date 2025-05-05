import { CategoryCard } from '@/components/category-card'
import { Calendar, MegaphoneIcon, Moon } from 'lucide-react'

const CategoryCards = () => {
    return (
        <div className='mb-8 flex gap-3 w-full overflow-x-auto scrollbar-hide'>
            <CategoryCard
                title='This Week'
                count={28}
                icon={<Calendar className='h-full w-full text-primary' />}
                className='bg-[#1c232b] '
            />
            <CategoryCard
                title='New shows'
                count={8}
                icon={<MegaphoneIcon className='h-full w-full text-secondary' />}
                className='bg-[#1c232b]'
            />
            <CategoryCard
                title='Late night'
                count={15}
                icon={<Moon className='h-full w-full text-tertiary' />}
                className='bg-[#1c232b]'
            />
        </div>
    )
}

export default CategoryCards
