import api from '@/api/Api'
import { EventCard } from '@/components/EventCard'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const EventTab = ({ isOrganizator }: any) => {
    const navigate = useNavigate()

    const { data: eventsOwner, isLoading: isEventsOwnerLoading } = useQuery<any>(['eventsOwner'], async () => {
        const res = await api.get('/api/event/for/owner/')
        return res.data
    })

    const { data: events, isLoading: isEventsLoading } = useQuery<any>(['events'], async () => {
        const res = await api.get('/api/events/')
        return res.data
    })

    const { data: cities } = useQuery<{ id: number; name: string }[]>(['cities'], async () => {
        const res = await api.get('/api/cities/')
        return res.data
    })

    const { data: areas } = useQuery<{ id: number; name: string }[]>(['area'], async () => {
        const res = await api.get('/api/area/')
        return res.data
    })

    function getCityName(cityId: number): string {
        return cities?.find(city => city.id === cityId)?.name || 'Unknown city'
    }

    function getAreaName(areaId: number): string {
        return areas?.find(area => area.id === areaId)?.name || 'Unknown area'
    }

    const rawData = isOrganizator ? eventsOwner : events?.results
    const data = Array.isArray(rawData) ? rawData : []

    if (isEventsOwnerLoading || isEventsLoading) {
        return (
            <div className='flex justify-center items-center min-h-[200px]'>
                <Loader2 className='h-8 w-8  text-gray-400' />
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-4 mb-20'>
            {isOrganizator && (
                <Button className='w-full my-4 font-medium' onClick={() => navigate('/profile/create-event')}>
                    Создание мероприятия
                </Button>
            )}
            <div className='grid sm:grid-cols-2 gap-3'>
                {data?.map((event: any) => (
                    <EventCard
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
