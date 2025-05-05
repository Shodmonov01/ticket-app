import { useState } from 'react'

import { User, EllipsisVertical } from 'lucide-react'
import api from '@/api/api'

import ProfileMenu from './components/ProfileMenu'
import { BottomNav } from '../../components/layout/bottom-nav'
import { Button } from '../../components/ui/button'
import SheetProfile from './components/Sheet'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { TypeUser } from '@/types/type'

export default function ProfilePage() {
    const navigate = useNavigate()

    const [open, setOpen] = useState(false)

    const { data: user } = useQuery<TypeUser>(
        ['user'],
        async () => {
            const res = await api.get('/auth/api/user/profile/')
            return res.data
        },
        {
            staleTime: 5 * 60 * 1000,
            cacheTime: 10 * 60 * 1000,
            refetchOnWindowFocus: false
        }
    )

    const loginOrganizator = async () => {
        const isOrganizer = user?.groups?.some(group => group.name === 'organization')
        const isDistributor = user?.groups?.some(group => group.name === 'distributor')

        if (isOrganizer) {
            navigate('/profile/organization-profile')
        } else {
            navigate('/profile/organization-role')
        }
    }

    const loginDistributor = async () => {
        const isDistributor = user?.groups?.some(group => group.name === 'distributor')

        if (isDistributor) {
            navigate('/profile/organization-profile')
        } else {
            navigate('/profile/distributor-role')
        }
    }

    return (
        <div className='flex flex-col h-screen pb-20 text-white '>
            <main className='h-screen'>
                <div className=' bg-slate-600 h-[180px] w-full mb-6'>
                    <div className='w-full flex justify-end px-4 py-8'>
                        <Button onClick={() => setOpen(true)} className='bg-muted rounded-full w-10 h-10'>
                            <EllipsisVertical className='!min-h-5 !min-w-5 ' />
                        </Button>
                    </div>

                    <div className='flex items-center justify-center w-full'>
                        <div className='mb-4 h-24 w-24 overflow-hidden rounded-full relative top-[30px] bg-muted p-1'>
                            <User className=' h-full w-full rounded-full  p-6  bg-white/40' />
                        </div>
                    </div>
                </div>

                <div className='text-center my-6 mt-20 flex flex-col items-center'>
                    <div>
                        <h1 className='text-xl font-bold text-white'>{user?.first_name}</h1>
                        <p className='text-gray-400'>{user?.email}</p>
                    </div>
                </div>

                <ProfileMenu loginOrganizator={loginOrganizator} loginDistributor={loginDistributor} />
                <SheetProfile open={open} setOpen={setOpen} />
            </main>

            <BottomNav />
        </div>
    )
}
