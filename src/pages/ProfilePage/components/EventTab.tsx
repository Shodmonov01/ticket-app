import api from '@/api/api'
import { EventCard } from '@/components/event-card'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const EventTab = ({ isOrganizator }: any) => {
    const navigate = useNavigate()

    const {
        data: events,
        isLoading: eventsLoading,
        error: eventsError
    } = useQuery<any>(['owners'], async () => {
        const res = await api.get('/api/event/for/owner/')
        return res.data || []
    })

    const { data: cities } = useQuery<{ id: number; name: string }[]>(['cities'], async () => {
        const res = await api.get('/api/cities/')
        return res.data || []
    })

    const { data: areas } = useQuery<{ id: number; name: string }[]>(['area'], async () => {
        const res = await api.get('/api/area/')
        return res.data || []
    })

    function getCityName(cityId: number): string {
        return cities?.find(city => city.id === cityId)?.name || 'Unknown city'
    }

    function getAreaName(areaId: number): string {
        return areas?.find(area => area.id === areaId)?.name || 'Unknown area'
    }

    if (eventsLoading) {
        return <div>Loading events...</div>
    }

    if (eventsError) {
        return <div>Error loading events</div>
    }

    const safeEvents = Array.isArray(events) ? events : []

    return (
        <div className='flex flex-col gap-4 mb-20'>
            {isOrganizator && (
                <Button className='w-full my-4 font-medium' onClick={() => navigate('/profile/create-event')}>
                    Создание мероприятия
                </Button>
            )}
            <div className='grid sm:grid-cols-2 gap-3'>
                {safeEvents.map((event: any) => (
                    <EventCard
                        key={event.id}
                        id={event.id}
                        title={event.name}
                        image={event.image}
                        price={event.event_category[0]?.price}
                        location={`${getCityName(event.city_id)}, ${getAreaName(event.area)}`}
                        date={event.event_time[0]?.date}
                        time={event.event_time[0]?.start_time}
                        isPartner={true}
                    />
                ))}
            </div>
        </div>
    )
}

export default EventTab
