import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '@/api/api'
import { getTelegramWebApp } from '@/lib/telegramMock'

export default function IntroPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState<any>(null)
    const [referralUsed, setReferralUsed] = useState<string>('None')
    const [isFirstTimeUser, setFirstTimeUser] = useState(true)
    const navigate = useNavigate()
    const referralCode = 'mock_referral_code' // Замените на реальный код, если нужно

    useEffect(() => {
        const tg = getTelegramWebApp()

        tg.ready()
        tg.expand()

        const initData = tg.initData

        if (!initData) {
            console.error('Telegram initData not found')
            return
        }

        const autoLogin = async () => {
            setIsLoading(true)

            try {
                const payload = {
                    initData: initData
                }

                const response = await api.post('/auth/api/user/login/', payload)

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
                    setFirstTimeUser(false)
                    navigate('/')
                } else {
                    throw new Error('No access token received')
                }
            } catch (error: any) {
                console.error('Auto login error:', error)
            } finally {
                setIsLoading(false)
            }
        }
        autoLogin()
    }, [referralCode, navigate, setFirstTimeUser])

    const handleGetStarted = () => {
        if (!isFirstTimeUser) {
            navigate('/')
        }
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center text-white">
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <h1>Welcome to the App</h1>
                    <button onClick={handleGetStarted}>Get Started</button>
                </div>
            )}
        </div>
    )
}