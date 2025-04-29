import { useEffect, useState } from 'react'

import { User, EllipsisVertical } from 'lucide-react'
import api from '@/api/api'

import ProfileMenu from './components/ProfileMenu'
import { BottomNav } from '../../components/layout/bottom-nav'
import { Button } from '../../components/ui/button'

export default function ProfilePage() {
    const tg = window?.Telegram?.WebApp as unknown as any
    const [referralCode, setReferralCode] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState<any>(null)
    const [referralUsed, setReferralUsed] = useState<string | null>(null)

    useEffect(() => {
        tg?.expand()

        const startParam = tg?.initDataUnsafe?.start_param
        if (startParam) {
            console.log('Referral code from start_param:', startParam)
            setReferralCode(startParam)
        } else {
            const urlParams = new URLSearchParams(window.location.search)
            const ref = urlParams.get('ref')
            if (ref) {
                console.log('Referral code from URL:', ref)
                setReferralCode(ref)
            } else {
                console.log('No referral code found.')
            }
        }
    }, [tg])

    const handleLogin = async () => {
        const initData = tg.initData
        if (!initData) {
            alert("Telegram data not found! Please make sure you're running inside Telegram.")
            return
        }

        setIsLoading(true)

        try {
            const response = await api.post('/auth/api/user/login/', {
                initData: initData,
                referral_code: referralCode
            })

            const data = await response.data

            if (data.access_token) {
                localStorage.setItem('access_token', data.access_token)
                localStorage.setItem('refresh_token', data.refresh_token)

                const userData = tg.initDataUnsafe?.user
                setUser(userData || null)
                setReferralUsed(data.referral_code_used || 'None')

                if (tg.sendData) {
                    tg.sendData(
                        JSON.stringify({
                            auth: 'success',
                            referral_code: referralCode
                        })
                    )
                }
            } else {
                throw new Error('Authentication failed: ' + (data.error || 'No access token received'))
            }
        } catch (error: any) {
            console.error('Error:', error)
            alert('Error during authentication: ' + error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='flex min-h-screen flex-col pb-20 text-white '>
            <main className=''>
                <div className=' bg-slate-600 h-[180px] w-full mb-6'>
                    <div className='w-full flex justify-end px-4 py-8'>
                        <Button className='bg-muted rounded-full w-10 h-10'>
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

                <ProfileMenu handleLogin={handleLogin} />
            </main>

            <BottomNav />
        </div>
    )
}
