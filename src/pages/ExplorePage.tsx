import { Header } from '../components/layout/Header'
import { BottomNav } from '../components/layout/BottomNav'
import { SearchBar } from '../components/SearchBar'
import { CategoryCard } from '@/components/CategoryCard'
import { Calendar, MegaphoneIcon, Moon } from 'lucide-react'
import { CategorySection } from '@/components/CategorySection'

export default function ExplorePage() {
    return (
        <div className='flex min-h-screen flex-col items-center justify-center pb-20 pt-16 text-white'>
            <Header />

            <div className='mb-8 flex justify-center gap-3 w-full overflow-x-auto scrollbar-hide'>
                <CategoryCard
                    title='This Week'
                    count={28}
                    icon={<Calendar className='h-full w-full text-primary' />}
                    className='bg-[#1c232b]'
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

            <CategorySection title='Categories' seeAllHref='/categories'>
                <div className='grid grid-cols-2 gap-3'>
                    <div className='flex items-center gap-3 rounded-lg bg-[#1c232b] p-3'>
                        <div className='h-12 w-12 overflow-hidden rounded-xl'>
                            <img
                                src='https://thumbs.dreamstime.com/b/silhouettes-concert-crowd-front-bright-stage-lights-confetti-colourful-background-high-lighted-places-people-holding-83284529.jpg'
                                alt='Tourism'
                                className='h-full w-full object-cover'
                            />
                        </div>
                        <span className='font-medium text-white'>Tourism</span>
                    </div>
                    <div className='flex items-center gap-3 rounded-lg bg-[#1c232b] p-3'>
                        <div className='h-12 w-12 overflow-hidden rounded-xl'>
                            <img
                                src='https://thumbs.dreamstime.com/b/silhouettes-concert-crowd-front-bright-stage-lights-confetti-colourful-background-high-lighted-places-people-holding-83284529.jpg'
                                alt='Live Shows'
                                className='h-full w-full object-cover'
                            />
                        </div>
                        <span className='font-medium text-white'>Live Shows</span>
                    </div>
                </div>
            </CategorySection>
            <BottomNav />
        </div>
    )
}
