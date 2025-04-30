import { Header } from '../../components/layout/header'
import { BottomNav } from '../../components/layout/bottom-nav'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { Ellipsis, EllipsisIcon, EllipsisVertical, Search } from 'lucide-react'
import TicketCard from './components/TicketCard'
import { useState } from 'react'

export default function TicketsPage() {
    const navigate = useNavigate()

    const [activeTab, setActiveTab] = useState('upcoming')

    return (
        <div className='flex min-h-screen flex-col  pb-20 text-white'>
            <div className=' bg-[#1c232b] px-4 fixed top-0 left-0 right-0 z-50 flex h-16 justify-between items-center w-full'>
                <p className='text-xl font-bold'>My tickets</p>
                <div className='flex items-center gap-2'>
                    <Button variant='ghost' size='icon' className='text-white'>
                        <Search />
                    </Button>
                    <Button variant='ghost' size='icon' className='text-white'>
                        <EllipsisVertical />
                    </Button>
                </div>
            </div>

            <main className='container w-full px-4 pt-20'>
                <div className='grid grid-cols-2 bg-[#1c232b] rounded-lg overflow-hidden mb-2 p-1'>
                    <button
                        onClick={() => setActiveTab('upcoming')}
                        className={`py-2 px-4 text-center font-medium rounded-lg  ${
                            activeTab === 'upcoming' ? 'text-white bg-[#29333d]' : 'text-gray-400'
                        }`}
                    >
                        Upcoming
                    </button>
                    <button
                        onClick={() => setActiveTab('past')}
                        className={`py-2 px-4 text-center font-medium rounded-lg ${
                            activeTab === 'past' ? 'text-white bg-[#29333d]' : 'text-gray-400'
                        }`}
                    >
                        Past tickets
                    </button>
                </div>

                <TicketCard />

                <Button className='w-full mt-4' onClick={() => navigate('/profile/create-event')}>
                    Создание мероприятия
                </Button>
            </main>

            <BottomNav />
        </div>
    )
}
