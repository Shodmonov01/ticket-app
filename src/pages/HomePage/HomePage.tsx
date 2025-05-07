import { Header } from '../../components/layout/header'
import { BottomNav } from '../../components/layout/bottom-nav'
import { SearchBar } from '../../components/search-bar'
import { CategorySection } from '../../components/category-section'
import { useQuery } from '@tanstack/react-query'
import api from '@/api/api'
import { EventsResponse, TypeEventItem } from '@/types/type'
import CategoryCards from './components/CategoryCards'
import Categories from './components/Categories'
import NewShows from './components/NewShows'
import PopularCard from './components/popularCard'
import { EventCard } from '@/components/event-card'

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
        <div className='flex min-h-screen flex-col items-center justify-center  pb-20 pt-16 text-white'>
            <Header />

            <main className='container max-w-md px-4 py-4'>
                <div className='mb-6'>
                    <SearchBar />
                </div>

                <CategoryCards />

                <CategorySection title='Categories' seeAllHref='/categories'>
                    <Categories />
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
                            events?.results?.map((event: any) => (
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

                <NewShows />

                <CategorySection title='Popular in your city' seeAllHref='/popular'>
                    <PopularCard />
                </CategorySection>
            </main>

            <BottomNav />
        </div>
    )
}
