import { MapPin, Star } from 'lucide-react'
import { Card } from '@/components/ui/card'

export default function PopularCard() {
    return (
        <Card className='w-full max-w-sm overflow-hidden bg-transparent text-white border-0 '>
            <div className='flex items-center gap-3'>
                <div className='!min-w-28 !min-h-28'>
                    <img
                        src='https://thumbs.dreamstime.com/b/silhouettes-concert-crowd-front-bright-stage-lights-confetti-colourful-background-high-lighted-places-people-holding-83284529.jpg'
                        alt='David Guetta Ultra Miami 2025'
                        className='object-cover brightness-75  !w-28 !h-28 rounded-lg'
                    />
                </div>

                <div className=' bottom-0 left-0 w-full'>
                    <div className='flex items-center gap-1 text-xs text-gray-300 mb-1'>
                        <MapPin className='h-3 w-3' />
                        <span>Bayfront Park, Miami...</span>
                    </div>

                    <h2 className='text-sm font-bold leading-tight mb-1'>
                        David Guetta Ultra Miami 2025 Music Festival
                    </h2>

                    <p className='text-xs text-gray-300 mb-2'>Nov 25, 2025, 02:00 PM</p>

                    <div className='flex items-center justify-between'>
                        <span className='text-sm'>From $45</span>
                        <div className='flex items-center gap-1'>
                            <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                            <span className='text-sm text-yellow-400'>4.8</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}
