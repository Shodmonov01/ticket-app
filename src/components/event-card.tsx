import { Heart, MapPin } from 'lucide-react'
import { Button } from './ui/button'
import { useState } from 'react'

interface EventCardProps {
    id: number
    title: string
    image: string
    price: number
    location: string
    date: string
    time: string
}

export function EventCard({ id, title, image, price, location, date, time }: EventCardProps) {
    const [isFavorite, setIsFavorite] = useState(false)

    return (
        <div className='relative overflow-hidden rounded-xl bg-[#1c232b] min-w-[200px]'>
            <div className='relative h-48 w-full'>
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
            </div>
        </div>
    )
}
