


import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@/context/user-context'
import api from '@/api/api'
import { getTelegramWebApp, isTelegramEnv } from '@/lib/telegramMock'

export default function IntroPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState<any>(null)
    const [referralUsed, setReferralUsed] = useState<string>('None')
    const { setIsFirstTimeUser } = useUser()
    const navigate = useNavigate()
    const referralCode = 'query_id=AAGzzMo2AAAAALPMyjbD_vfp&user=%7B%22id%22%3A919260339%2C%22first_name%22%3A%22%D0%90%D0%BC%D0%B8%D1%80%22%2C%22last_name%22%3A%22%D0%A8%D0%BE%D0%B4%D0%BC%D0%BE%D0%BD%D0%BE%D0%B2%22%2C%22username%22%3A%22a_shodmonov60%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FofQvVPKvTSdiEBT2LTidZ9awJyIWfIOprti3vZQIlbs.svg%22%7D&auth_date=1746512619&signature=jub90UW3mx0gPJy8HsHm93ZnjztmKJ-qYyFcBjoZMe9L8G3XGwI0XrNmfnT-18vn9HS8oGCRiKNnyZLn6c1GCA&hash=cbbe93453851eff57fadaec5b045a62bd6305a53173894a1807e1a0d4a3db93b' // Замените на реальный реферальный код, если есть

    useEffect(() => {
        const tg = getTelegramWebApp()

        console.log('Telegram WebApp:', tg)
        console.log('initData:', tg.initData)

        tg.ready()
        tg.expand()

        const initData = tg.initData

        if (!initData && isTelegramEnv()) {
            console.error('Telegram initData not found')
            navigate('/error')
            return
        }

        const autoLogin = async () => {
            setIsLoading(true)

            try {
                const payload = {
                    initData: initData
                }

                console.log('Sending login payload:', payload)

                const response = await api.post('/auth/api/user/login/', payload)

                console.log('Login response:', response.data)

                const data = response.data

                if (data.access_token) {
                    localStorage.setItem('token', data.access_token)
                    localStorage.setItem('refresh_token', data.refresh_token)

                    const userData = tg.initDataUnsafe?.user
                    setUser(userData || null)
                    setReferralUsed(data.referral_code_used || 'None')

                    if (typeof tg.sendData === 'function') {
                        tg.sendData(
                            JSON.stringify({
                                auth: 'success',
                                referral_code: referralCode
                            })
                        )
                    }
                    setIsFirstTimeUser(false)
                    console.log('Navigating to /')
                    navigate('/', { replace: true })
                } else {
                    throw new Error('No access token received')
                }
            } catch (error: any) {
                console.error('Auto login error:', error)
                navigate('/error')
            } finally {
                setIsLoading(false)
            }
        }
        autoLogin()
    }, [referralCode, navigate, setIsFirstTimeUser])

    const handleGetStarted = () => {
        console.log('HandleGetStarted: Navigating to /')
        navigate('/', { replace: true })
    }

    return (
        <div className='flex min-h-screen flex-col items-center justify-center text-white bg-[#1c232b]'>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div className='text-center'>
                    <h1 className='text-2xl font-bold mb-4'>Добро пожаловать</h1>
                    <button
                        className='px-4 py-2 bg-primary text-white rounded-lg'
                        onClick={handleGetStarted}
                    >
                        Начать
                    </button>
                </div>
            )}
        </div>
    )
}