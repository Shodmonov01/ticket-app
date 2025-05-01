import { Header } from '../components/layout/header'
import { BottomNav } from '../components/layout/bottom-nav'
import { SearchBar } from '../components/search-bar'
import { CategoryCard } from '../components/category-card'
import { CategorySection } from '../components/category-section'
import { EventCard } from '../components/event-card'
import { Calendar, MegaphoneIcon, Moon } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import api from '@/api/api'

export default function HomePage() {
    const { data: events } = useQuery(['events'], async () => {
        const res = await api.get('/api/event/for/owner/')
        return res.data
    })
    console.log('events', events)

    return (
        // <div className="min-h-screen bg-background pb-20 pt-16">
        <div className='flex min-h-screen flex-col items-center justify-center  pb-20 pt-16 text-white'>
            <Header />

            <main className='container max-w-md px-4 py-4'>
                <div className='mb-6'>
                    <SearchBar />
                </div>

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

                <CategorySection title='Near You' seeAllHref='/near-you'>
                    <div className='flex gap-3  overflow-x-auto scrollbar-hide'>
                        <EventCard
                            id='1'
                            title='Stars under the Pyramids Concert'
                            image='https://via.placeholder.com/384x192'
                            price={50}
                            location='Giza Pyramids, Cairo'
                            date='Sep 10, 2025'
                            time='06:00 PM'
                        />
                        <EventCard
                            id='2'
                            title='Sunset Jazz Festival'
                            image='https://via.placeholder.com/384x192'
                            price={40}
                            location='Santorini Island, Greece'
                            date='Oct 5, 2025'
                            time='05:00 PM'
                        />
                    </div>
                </CategorySection>
            </main>

            <BottomNav />
        </div>
    )
}
