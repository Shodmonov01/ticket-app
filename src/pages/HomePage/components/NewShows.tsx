import { useState } from 'react'
import { ChevronRight, Heart, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Show {
    id: string
    title: string
    location: string
    date: string
    time: string
    color: string
    image: string
}

export default function NewShows() {
    const [shows, setShows] = useState<Show[]>([
        {
            id: '1',
            title: 'Sunset Jazz Festival',
            location: 'Santorini Island, Greece',
            date: 'Oct 5, 2025',
            time: '05:00 PM',
            color: 'text-cyan-400',
            image: '/jazz-festival.png'
        },
        {
            id: '2',
            title: 'Van Gogh Immersive',
            location: 'Louvre Museum, Paris',
            date: 'Mar 15, 2025',
            time: '10:00 AM',
            color: 'text-cyan-400',
            image: '/van-gogh.png'
        },
        {
            id: '3',
            title: 'Anime Expo Tokyo 2025',
            location: 'Tokyo Big Sight, Tokyo',
            date: 'Jun 5, 2025',
            time: '09:00 AM',
            color: 'text-cyan-400',
            image: '/anime-expo.png'
        },
        {
            id: '4',
            title: 'Berlin International Film',
            location: 'Berlin Film Theater, Berlin',
            date: 'Aug 15, 2025',
            time: '10:00 AM',
            color: 'text-cyan-400',
            image: '/berlin-film.png'
        }
    ])

    const [favorites, setFavorites] = useState<string[]>([])

    const toggleFavorite = (id: string) => {
        setFavorites(prev => (prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]))
    }

    return (
        <div className='w-full max-w-md bg-[#1c232b] rounded-xl p-3 text-white mb-8'>
            <div className='flex justify-between items-center mb-4'>
                <div>
                    <h2 className='text-xl font-bold'>New Shows</h2>
                    <p className='text-gray-400 text-sm'>Just Announced. Updated every day.</p>
                </div>
                <button className='bg-[#29333d] rounded-full p-2'>
                    <ChevronRight className='h-5 w-5' />
                </button>
            </div>

            <div className='space-y-4'>
                {shows.map(show => (
                    <div key={show.id} className='flex items-center gap-3'>
                        <div className='flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden'>
                            <img
                                src='https://thumbs.dreamstime.com/b/silhouettes-concert-crowd-front-bright-stage-lights-confetti-colourful-background-high-lighted-places-people-holding-83284529.jpg'
                                alt={show.title}
                                className='w-full h-full object-cover'
                            />
                        </div>

                        <div className='flex-1 min-w-0'>
                            <div className='flex items-center text-gray-400 text-xs mb-1'>
                                <MapPin className='h-3 w-3 mr-1' />
                                <span className='truncate'>{show.location}</span>
                            </div>

                            <h3 className='font-medium text-white truncate'>{show.title}</h3>

                            <p className={cn('text-sm', show.color)}>
                                {show.date}, {show.time}
                            </p>
                        </div>

                        <button
                            onClick={() => toggleFavorite(show.id)}
                            className='flex-shrink-0 h-9 w-9 rounded-full bg-[#14191f] flex items-center justify-center'
                        >
                            <Heart
                                className={cn(
                                    'h-5 w-5 transition-colors',
                                    favorites.includes(show.id) ? 'fill-red-500 stroke-red-500' : 'stroke-white'
                                )}
                            />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
