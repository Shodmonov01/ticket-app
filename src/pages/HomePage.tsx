import { Header } from '../components/layout/header'
import { BottomNav } from '../components/layout/bottom-nav'
import { SearchBar } from '../components/search-bar'
import { CategoryCard } from '../components/category-card'
import { CategorySection } from '../components/category-section'
import { EventCard } from '../components/event-card'
import { Calendar, MegaphoneIcon, Moon } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import api from '@/api/api'
import { EventsResponse, TypeEventItem } from '@/types/type'

export default function HomePage() {
    const {
        data,
        isLoading: isEventsLoading,
        error: eventsError
    } = useQuery<EventsResponse>({
        queryKey: ['events'],
        queryFn: async () => {
            const res = await api.get('/api/events')
            return res.data
        }
    })

    const events = data?.results || []

    const { data: cities, isLoading: isCitiesLoading } = useQuery<{ id: number; name: string }[]>({
        queryKey: ['cities'],
        queryFn: async () => {
            const res = await api.get('/api/cities/')
            return res.data
        }
    })

    const { data: areas, isLoading: isAreasLoading } = useQuery<{ id: number; name: string }[]>({
        queryKey: ['area'],
        queryFn: async () => {
            const res = await api.get('/api/area/')
            return res.data
        }
    })

    function getCityName(cityId: number): string {
        return cities?.find(city => city.id === cityId)?.name || 'Unknown city'
    }

    function getAreaName(areaId: number): string {
        return areas?.find(area => area.id === areaId)?.name || 'Unknown area'
    }

    return (
        <div className='flex min-h-screen flex-col items-center justify-center pb-20 pt-16 text-white'>
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

                <CategorySection title='Near You' seeAllHref='/near-you'>
                    <div className='flex gap-3 overflow-x-auto scrollbar-hide'>
                        {isEventsLoading ? (
                            <div className='text-center text-white'>Loading events...</div>
                        ) : eventsError ? (
                            <div className='text-center text-red-500'>Failed to load events. Please try again.</div>
                        ) : events.length === 0 ? (
                            <div className='text-center text-white'>No events found.</div>
                        ) : (
                            events.map((event: TypeEventItem) => (
                                <EventCard
                                    key={event.id}
                                    id={event.id}
                                    title={event.name}
                                    image={event.image}
                                    price={event.event_category[0]?.price ?? 'N/A'}
                                    location={`${getCityName(event.city_id)}, ${getAreaName(event.area)}`}
                                    date={event.event_time[0]?.date ?? 'No date'}
                                    time={event.event_time[0]?.start_time ?? 'No time'}
                                />
                            ))
                        )}
                    </div>
                </CategorySection>
            </main>

            <BottomNav />
        </div>
    )
}
