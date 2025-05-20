import api from '@/api/api'
import { useQuery } from '@tanstack/react-query'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { EventCard } from '@/components/EventCard'
import { Button } from '@/components/ui/button'

const DistTabModal = ({
    selectedChannel,
    isModalOpen,
    setIsModalOpen
}: {
    selectedChannel: any
    isModalOpen: boolean
    setIsModalOpen: (isOpen: boolean) => void
}) => {
    const { data: events } = useQuery<any>(['eventsOwner'], async () => {
        const res = await api.get('/api/event/for/owner/')
        return res.data.results
    })

    const { data: cities } = useQuery<{ id: number; name: string }[]>({
        queryKey: ['cities'],
        queryFn: async () => {
            const res = await api.get('/api/cities/')
            return res.data
        }
    })

    const { data: areas } = useQuery<{ id: number; name: string }[]>({
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
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className=' text-white border-0 max-w-3xl max-h-[80vh] overflow-y-auto'>
                <DialogHeader>
                    <DialogTitle>Выберите мероприятие для рекламы в канале {selectedChannel?.name}</DialogTitle>
                </DialogHeader>

                {events && events.length > 0 ? (
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
                        {events?.map((event: any) => (
                            <EventCard
                                key={event.id}
                                id={event.id}
                                title={event.name}
                                image={event.image}
                                price={event.event_category[0]?.price ?? 'N/A'}
                                location={`${getCityName(event.city_id)}, ${getAreaName(event.area)}`}
                                date={event.event_time[0]?.date ?? 'No date'}
                                time={event.event_time[0]?.start_time ?? 'No time'}
                                isDistTab={true}
                            />
                        ))}
                    </div>
                ) : (
                    <div className='text-center py-8'>
                        <p>У вас нет доступных мероприятий для рекламы</p>
                        <Button variant='outline' className='mt-4 text-white '>
                            Создать новое мероприятие
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default DistTabModal
