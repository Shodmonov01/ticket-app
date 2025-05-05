import { useState } from 'react'

import { BottomNav } from '@/components/layout/bottom-nav'
import DistributorTab from './components/DistributorTab'
import EventTab from './components/EventTab'

const DistributorProfilePage = () => {
    const [activeTab, setActiveTab] = useState('event')

    return (
        <div>
            <main className='container w-full px-4 pt-10'>
                <div className='grid grid-cols-2 bg-[#1c232b] rounded-lg overflow-hidden mb-2 p-1'>
                    <button
                        onClick={() => setActiveTab('offer')}
                        className={`py-2 px-4 text-center font-medium rounded-lg ${
                            activeTab === 'event' ? 'text-white bg-[#29333d]' : 'text-gray-400'
                        }`}
                    >
                        Предложения
                    </button>
                    <button
                        onClick={() => setActiveTab('organizator')}
                        className={`py-2 px-4 text-center font-medium rounded-lg  ${
                            activeTab === 'distributor' ? 'text-white bg-[#29333d]' : 'text-gray-400'
                        }`}
                    >
                        Распространители
                    </button>
                    <button
                        onClick={() => setActiveTab('distributor')}
                        className={`py-2 px-4 text-center font-medium rounded-lg  ${
                            activeTab === 'distributor' ? 'text-white bg-[#29333d]' : 'text-gray-400'
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
