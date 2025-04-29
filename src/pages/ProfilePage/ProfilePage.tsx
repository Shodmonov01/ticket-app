import { useEffect, useState } from 'react'

import { User, EllipsisVertical } from 'lucide-react'
import api from '@/api/api'

import ProfileMenu from './components/ProfileMenu'
import { BottomNav } from '../../components/layout/bottom-nav'
import { Button } from '../../components/ui/button'

export default function ProfilePage() {
    const [isLoading, setIsLoading] = useState(false)
    const [initData, setInitData] = useState<string>('')
    const [userInfo, setUserInfo] = useState<any>(null)

    useEffect(() => {
        const webApp = (window as any).Telegram?.WebApp

        if (webApp) {
            webApp.ready()
            webApp.expand()

            // Normal Telegramdan olayotgandek
            setInitData(webApp.initData)
            setUserInfo(webApp.initDataUnsafe?.user || null)
        } else {
            // Test uchun - agar Telegram yo'q bo'lsa
            const fakeUser = {
                id: 123456789,
                first_name: 'Test',
                last_name: 'User',
                username: 'testuser'
            }

            const fakeInitData =
                'auth_date=1234567890&user=%7B%22id%22%3A123456789%2C%22first_name%22%3A%22Test%22%2C%22last_name%22%3A%22User%22%2C%22username%22%3A%22testuser%22%7D'

            setInitData(fakeInitData)
            setUserInfo(fakeUser)
        }
    }, [])

    const handleLogin = async () => {
        setIsLoading(true)

        try {
            await api.post('/auth/api/user/login/', {
                initData: initData
            })
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
