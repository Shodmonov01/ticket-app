import { useState } from 'react'

import { User, EllipsisVertical } from 'lucide-react'
import api from '@/api/api'

import ProfileMenu from './components/ProfileMenu'
import { BottomNav } from '../../components/layout/bottom-nav'
import { Button } from '../../components/ui/button'
import SheetProfile from './components/Sheet'
import { useNavigate } from 'react-router-dom'

export default function ProfilePage() {
    const navigate = useNavigate()

    const tg = window?.Telegram?.WebApp as unknown as any
    const [referralCode, setReferralCode] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState<any>(null)
    const [referralUsed, setReferralUsed] = useState<string | null>(null)
    const [open, setOpen] = useState(false)

    const loginOrganizator = async () => {
        // const tg = window.Telegram?.WebApp as unknown as any

        // tg.ready()
        // tg.expand()

        // try {
        //     const initData = window?.Telegram?.WebApp.initData

        //     const payload = {
        //         initData: initData
        //     }
        //     const token = localStorage.getItem('token')

        //     const response = await api.post('/auth/api/assign/organization/role/')
        //     const data = response.data

        //     if (data.access_token) {
        //         localStorage.setItem('access_token', data.access_token)

        //         const userData = tg.initDataUnsafe?.user
        //         setUser(userData || null)
        //         setReferralUsed(data.referral_code_used || 'None')
        //         if (typeof tg.sendData === 'function') {
        //             tg.sendData(
        //                 JSON.stringify({
        //                     auth: 'success',
        //                     referral_code: referralCode
        //                 })
        //             )
        //         }
        //         alert('Авторизация прошла успешно!')
        //     } else {
        //         throw new Error('No access token received')
        //     }
        // } catch (error) {
        //     console.log(error)
        // }
        navigate('/profile/organization-role')
    }

    return (
        <div className='flex min-h-screen flex-col pb-20 text-white '>
            <main className=''>
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
                        <h1 className='text-xl font-bold text-white'>User Name</h1>
                        <p className='text-gray-400'>user@example.com</p>
                    </div>
                </div>

                <ProfileMenu loginOrganizator={loginOrganizator} />
                <SheetProfile open={open} setOpen={setOpen} />
            </main>

            <BottomNav />
        </div>
    )
}
