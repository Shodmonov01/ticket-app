import { useState } from 'react'

import EventTab from './components/EventTab'
import { PartnerNav } from '@/components/partner-nav'
import OrganizatorTab from './components/OrganizatorTab'
import Partner from './components/PartnerOrganization'
import HeaderPartner from '../../components/headerr'

const OrganizatorProfilePage = () => {
    const [activeTab, setActiveTab] = useState('event')

    return (
        <div>
            <HeaderPartner title='Профиль' path='/profile' />
            <main className='container w-full px-4 pt-10'>
                <div className='flex bg-[#1c232b] rounded-lg  overflow-x-auto scrollbar-hide mb-2 p-1'>
                    <button
                        onClick={() => setActiveTab('event')}
                        className={`py-2 px-4 text-center font-medium rounded-lg ${
                            activeTab === 'event' ? 'text-white bg-[#29333d]' : 'text-gray-400'
                        }`}
                    >
                        Мероприятия
                    </button>
                    <button
                        onClick={() => setActiveTab('distributor')}
                        className={`py-2 px-4 text-center font-medium rounded-lg  ${
                            activeTab === 'distributor' ? 'text-white bg-[#29333d]' : 'text-gray-400'
                        }`}
                    >
                        Предложения
                    </button>
                    <button
                        onClick={() => setActiveTab('partner')}
                        className={`py-2 px-4 text-center font-medium rounded-lg ${
                            activeTab === 'partner' ? 'text-white bg-[#29333d]' : 'text-gray-400'
                        }`}
                    >
                        Партнеры
                    </button>
                </div>

                {activeTab === 'distributor' && <OrganizatorTab />}
                {activeTab === 'event' && <EventTab />}
                {activeTab === 'partner' && <Partner />}
            </main>

            <PartnerNav />
        </div>
    )
}

export default OrganizatorProfilePage
