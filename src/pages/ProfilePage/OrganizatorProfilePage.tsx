import { BottomNav } from '@/components/layout/bottom-nav'
import { useState } from 'react'

const OrganizatorProfilePage = () => {
    const [activeTab, setActiveTab] = useState('upcoming')

    return (
        <div>
            <main className='container w-full px-4 pt-10'>
                <div className='grid grid-cols-2 bg-[#1c232b] rounded-lg overflow-hidden mb-2 p-1'>
                    <button
                        onClick={() => setActiveTab('upcoming')}
                        className={`py-2 px-4 text-center font-medium rounded-lg  ${
                            activeTab === 'upcoming' ? 'text-white bg-[#29333d]' : 'text-gray-400'
                        }`}
                    >
                        Распространители
                    </button>
                    <button
                        onClick={() => setActiveTab('past')}
                        className={`py-2 px-4 text-center font-medium rounded-lg ${
                            activeTab === 'past' ? 'text-white bg-[#29333d]' : 'text-gray-400'
                        }`}
                    >
                        Мероприятия
                    </button>
                </div>
            </main>
            <BottomNav />
        </div>
    )
}

export default OrganizatorProfilePage
