import { useState } from 'react'

import DistributorTab from './components/DistributorTab'
import EventTab from './components/EventTab'
import { PartnerNav } from '@/components/PartnerNav'
import MyChannelTab from './components/MyChannelTab'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import Partner from './components/PartnerDistributer'
import HeaderPartner from '@/components/Headerr'

const DistributorProfilePage = () => {
    const navigate = useNavigate()

    const [activeTab, setActiveTab] = useState('offer')

    return (
        <div>
            <HeaderPartner title='Профиль' path='/profile' />
            <main className='container w-full px-4 pt-6'>
                <div className='flex bg-[#1c232b] rounded-lg  overflow-x-auto scrollbar-hide mb-2 p-1'>
                    <button
                        onClick={() => setActiveTab('offer')}
                        className={`py-2 px-4 text-center font-medium rounded-lg ${
                            activeTab === 'offer' ? 'text-white bg-[#29333d]' : 'text-gray-400'
                        }`}
                    >
                        Предложения
                    </button>
                    <button
                        onClick={() => setActiveTab('event')}
                        className={`py-2 px-4 text-center font-medium rounded-lg  ${
                            activeTab === 'event' ? 'text-white bg-[#29333d]' : 'text-gray-400'
                        }`}
                    >
                        Мероприятия
                    </button>
                    <button
                        onClick={() => setActiveTab('channel')}
                        className={`py-2 px-4 text-center font-medium whitespace-nowrap rounded-lg  ${
                            activeTab === 'channel' ? 'text-white bg-[#29333d]' : 'text-gray-400'
                        }`}
                    >
                        Мои каналы
                    </button>
                    <button
                        onClick={() => setActiveTab('partner')}
                        className={`py-2 px-4 text-center font-medium rounded-lg  ${
                            activeTab === 'partner' ? 'text-white bg-[#29333d]' : 'text-gray-400'
                        }`}
                    >
                        Партнеры
                    </button>
                </div>

                {activeTab === 'offer' && <DistributorTab />}
                {activeTab === 'event' && <EventTab />}
                {activeTab === 'channel' && <MyChannelTab />}
                {activeTab === 'partner' && <Partner />}
            </main>

            <PartnerNav />
        </div>
    )
}

export default DistributorProfilePage
