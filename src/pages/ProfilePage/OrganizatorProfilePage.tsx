import { useState } from 'react'

import EventTab from './components/tabs/EventTab'
import { PartnerNav } from '@/components/PartnerNav'
import OrganizatorTab from './components/tabs/OrganizatorTab'
import Partner from './components/tabs/PartnerOrganization'
import DistTab from './components/tabs/DistTab'
import HeaderPartner from '@/components/BackHeader'

const OrganizatorProfilePage = () => {
    const [activeTab, setActiveTab] = useState('event')

    return (
        <div>
            <HeaderPartner title='Профиль' path='/profile' />
            <main className='container w-full px-4 pt-10'>
                <div className='flex bg-[#1c232b] rounded-lg  overflow-x-auto scrollbar-hide mb-2 p-1'>
                    <button
                        onClick={() => setActiveTab('event')}
                        className={`py-2 px-4 text-center font-medium whitespace-nowrap rounded-lg ${
                            activeTab === 'event' ? 'text-white bg-[#29333d]' : 'text-gray-400'
                        }`}
                    >
                        Мои мероприятия
                    </button>
                    <button
                        onClick={() => setActiveTab('offer')}
                        className={`py-2 px-4 text-center font-medium rounded-lg  ${
                            activeTab === 'offer' ? 'text-white bg-[#29333d]' : 'text-gray-400'
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
                    <button
                        onClick={() => setActiveTab('dist')}
                        className={`py-2 px-4 text-center font-medium rounded-lg ${
                            activeTab === 'dist' ? 'text-white bg-[#29333d]' : 'text-gray-400'
                        }`}
                    >
                        Распространители
                    </button>
                </div>

                {activeTab === 'offer' && <OrganizatorTab />}
                {activeTab === 'event' && <EventTab isOrganizator={true} />}
                {activeTab === 'partner' && <Partner />}
                {activeTab === 'dist' && <DistTab />}
            </main>

            <PartnerNav />
        </div>
    )
}

export default OrganizatorProfilePage
