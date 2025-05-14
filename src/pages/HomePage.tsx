import { Header } from '../components/layout/header'
import { BottomNav } from '../components/layout/bottom-nav'
import { SearchBar } from '../components/search-bar'
import { CategorySection } from '../components/category-section'
import { EventCard } from '../components/event-card'
import { useQuery } from '@tanstack/react-query'
import api from '@/api/api'
import { EventsResponse, TypeEventItem } from '@/types/type'
import { useEffect, useState } from 'react'
import { TicketInfo } from './TicketInfo'
import { ChevronDown, MapPin } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

export default function HomePage() {
    const [selectedEvent, setSelectedEvent] = useState(null)

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

    const [location, setLocation] = useState<string>('')

    // Устанавливаем первый город как выбранный по умолчанию
    useEffect(() => {
        if (cities && cities.length > 0 && !location) {
            setLocation(cities[0].name)
        }
    }, [cities, location])

    return (
        <div className='flex min-h-screen flex-col items-center justify-center pb-20 pt-16 text-white'>
            <Header />

            <main className='container max-w-md px-4 py-4'>
                <div className='flex justify-between'>
                    <div className='mb-6 w-5/6'>
                        <SearchBar />
                    </div>
                    <div className='flex items-center gap-2 mb-6'>
                        <MapPin className='h-5 w-5 text-gray-400' />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant='ghost' className='flex items-center gap-1 p-0'>
                                    {/* <span className='text-white'>
                                        {isCitiesLoading ? 'Loading...' : location || 'Select city'}
                                    </span> */}
                                    <ChevronDown className='h-4 w-4 text-gray-400' />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='start'>
                                {isCitiesLoading ? (
                                    <DropdownMenuItem>Loading cities...</DropdownMenuItem>
                                ) : (
                                    cities?.map(city => (
                                        <DropdownMenuItem key={city.id} onClick={() => setLocation(city.name)}>
                                            {city.name}
                                        </DropdownMenuItem>
                                    ))
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* <CategorySection title='Near You' seeAllHref='/near-you'> */}
                <div className='flex flex-col gap-4'>
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
                                onClick={() => setSelectedEvent(event)}
                            />
                        ))
                    )}
                </div>
                {/* </CategorySection> */}
            </main>

            <BottomNav />
            {selectedEvent && <TicketInfo event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
        </div>
    )
}
