import { Header } from '../../components/layout/header'
import { BottomNav } from '../../components/layout/bottom-nav'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

export default function TicketsPage() {
    const navigate = useNavigate()

    return (
        <div className='flex min-h-screen flex-col items-center justify-center  pb-20 pt-16 text-white'>
            <Header />

            <main className='container max-w-md px-4 py-4'>
                <h1 className='mb-6 text-2xl font-bold text-white'>Your Tickets</h1>

                <div className='flex h-[60vh] items-center justify-center rounded-lg bg-muted'>
                    <p className='text-center text-gray-400'>You don't have any tickets yet</p>
                </div>

                <Button className='w-full mt-4' onClick={() => navigate('/profile/create-event')}>
                    Создание мероприятия
                </Button>
            </main>

            <BottomNav />
        </div>
    )
}
