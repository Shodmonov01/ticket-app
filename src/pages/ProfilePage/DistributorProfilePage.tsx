import { useState } from 'react'

import { BottomNav } from '@/components/layout/bottom-nav'
import DistributorTab from './components/DistributorTab'
import EventTab from './components/EventTab'

const DistributorProfilePage = () => {
    const [activeTab, setActiveTab] = useState('offer')

    return (
        <div>
            <main className='container w-full px-4 pt-10'>
                <div className='flex bg-[#1c232b] rounded-lg overflow-hidden mb-2 p-1'>
                    <button
                        onClick={() => setActiveTab('offer')}
                        className={`py-2 px-4 text-center font-medium rounded-lg ${
                            activeTab === 'offer' ? 'text-white bg-[#29333d]' : 'text-gray-400'
                        }`}
                    >
                        Предложения
                    </button>
                    <button
                        onClick={() => setActiveTab('organizator')}
                        className={`py-2 px-4 text-center font-medium rounded-lg  !min-w-full ${
                            activeTab === 'organizator' ? 'text-white bg-[#29333d]' : 'text-gray-400'
                        }`}
                    >
                        Распространители
                    </button>
                    <button
                        onClick={() => setActiveTab('channel')}
                        className={`py-2 px-4 text-center font-medium rounded-lg  ${
                            activeTab === 'channel' ? 'text-white bg-[#29333d]' : 'text-gray-400'
                        }`}
                    >
                        Канналы
                    </button>
                </div>

                {activeTab === 'distributor' && <DistributorTab />}
                {activeTab === 'event' && <EventTab />}
            </main>
            <BottomNav />
        </div>
    )
}

export default DistributorProfilePage
