import { Button } from '../components/ui/button'
import { useUser } from '../context/user-context'
import { useNavigate } from 'react-router-dom'
import { Ticket, Music, Calendar } from 'lucide-react'

export default function IntroPage() {
    const { setFirstTimeUser } = useUser()
    const navigate = useNavigate()

    const handleGetStarted = () => {
        setFirstTimeUser(false)
        navigate('/')
    }

    return (
        <div className='flex min-h-screen flex-col items-center justify-center  p-4 text-white'>
            <div className='mb-8 flex flex-col items-center'>
                <div className='mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary'>
                    <Ticket className='h-10 w-10 text-white' />
                </div>
                <h1 className='mb-2 text-center text-3xl font-bold'>Welcome to EventBot</h1>
                <p className='text-center text-gray-400'>Discover and explore live events near you</p>
            </div>

            <div className='mb-10 grid w-full max-w-md gap-6'>
                <div className='flex items-start gap-4 rounded-lg bg-muted p-4'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/20'>
                        <Calendar className='h-5 w-5 text-primary' />
                    </div>
                    <div>
                        <h3 className='font-medium'>Find Events</h3>
                        <p className='text-sm text-gray-400'>Discover upcoming events in your area</p>
                    </div>
                </div>

                <div className='flex items-start gap-4 rounded-lg bg-muted p-4'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-secondary/20'>
                        <Ticket className='h-5 w-5 text-secondary' />
                    </div>
                    <div>
                        <h3 className='font-medium'>Book Tickets</h3>
                        <p className='text-sm text-gray-400'>Easily purchase tickets for your favorite events</p>
                    </div>
                </div>

                <div className='flex items-start gap-4 rounded-lg bg-muted p-4'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-tertiary/20'>
                        <Music className='h-5 w-5 text-tertiary' />
                    </div>
                    <div>
                        <h3 className='font-medium'>Enjoy Shows</h3>
                        <p className='text-sm text-gray-400'>Experience amazing live performances</p>
                    </div>
                </div>
            </div>

            <Button className='w-full max-w-md' size='lg' onClick={handleGetStarted}>
                Get Started
            </Button>
        </div>
    )
}
