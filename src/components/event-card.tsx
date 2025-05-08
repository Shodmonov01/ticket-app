import { Heart, MapPin } from 'lucide-react'
import { Button } from './ui/button'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { TypeUser } from '@/types/type'
import api from '@/api/api'

interface EventCardProps {
    id: number
    title: string
    image: string
    price: number
    location: string
    date: string
    time: string
    isPartner?: boolean
}

export function EventCard({ id, title, image, price, location, date, time, isPartner }: EventCardProps) {
    const [isFavorite, setIsFavorite] = useState(false)

    const { data: user } = useQuery<any>(
        ['user'],
        async () => {
            const res = await api.get('/auth/api/user/profile/')
            return res.data
        },
        {
            staleTime: 5 * 60 * 1000,
            cacheTime: 10 * 60 * 1000,
            refetchOnWindowFocus: false
        }
    )

    const handleSendOffer = async (id: number) => {
        try {
            const res = await api.post('/api/offer/send/', {
                event: id,
                status: 'new_offer',
                channel: user.telegram_channels[0].id
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='relative rounded-xl bg-[#1c232b] min-w-[200px]'>
            <div className='relative h-36 w-full'>
                <img src={image || '/placeholder.jpg'} alt={title} className='h-full w-full object-cover' />
                <Button
                    variant='ghost'
                    size='icon'
                    className='absolute right-2 top-2 h-8 w-8 rounded-full bg-black/40 text-white hover:bg-black/60'
                    onClick={() => setIsFavorite(!isFavorite)}
                >
                    <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                <div className='absolute bottom-2 left-2 rounded-md bg-primary px-2 py-1 text-sm font-medium text-white'>
                    From ${price}
                </div>
            </div>
            <div className='p-3'>
                <div className='mb-1 flex items-center gap-1 text-xs text-gray-400'>
                    <MapPin className='h-3 w-3' />
                    <span>{location}</span>
                </div>
                <h3 className='mb-1 line-clamp-2 font-medium text-white'>{title}</h3>
                <p className='text-xs text-gray-400'>
                    {date}, {time}
                </p>
                {isPartner && (
                    <Button
                        onClick={() => handleSendOffer(id)}
                        variant='outline'
                        size='sm'
                        className='w-full bg-[#29333d] hover:bg-[#232b34] mt-6'
                    >
                        Отправить предложение
                    </Button>
                )}
            </div>
            <div className='flex flex-col  gap-2 px-2 pb-2'>
                <Button className='mt-4 bg-primary hover:bg-primary/90 text-primary-foreground '>Купить</Button>
                <Button className='mt-4 bg-secondary hover:bg-secondary/90 text-secondary-foreground '>
                    Поделиться
                </Button>
                <Button className='mt-4 bg-accent hover:bg-accent/90 text-accent-foreground '>Попасть в списки</Button>
            </div>
        </div>
    )
}
