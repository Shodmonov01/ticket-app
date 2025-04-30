import { Button } from '../components/ui/button'
import { useUser } from '../context/user-context'
import { useNavigate } from 'react-router-dom'
import { Ticket, Music, Calendar } from 'lucide-react'
import api from '@/api/api'
import { useEffect, useState } from 'react'

export default function IntroPage() {
    const { setFirstTimeUser } = useUser()
    const navigate = useNavigate()

    const handleGetStarted = () => {
        setFirstTimeUser(false)
        navigate('/')
    }

    const tg = window?.Telegram?.WebApp as unknown as any
    const [referralCode, setReferralCode] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState<any>(null)
    const [referralUsed, setReferralUsed] = useState<string | null>(null)

    useEffect(() => {
        const tg = window?.Telegram?.WebApp as unknown as any

        // Инициализация
        tg.ready() // Сообщаем Telegram, что приложение готово к отображению
        tg.expand() // Разворачиваем приложение на весь экран

        const initData = tg.initDataUnsafe
        // alert(initData)
        // alert(tg.initDataUnsafe)

        if (!initData) {
            console.error('Telegram initData not found')
            return
        }

        const autoLogin = async () => {
            setIsLoading(true)

            try {
                const response = await api.post('/auth/api/user/login/', {
                    initData: initData
                })

                const data = response.data

                if (data.access_token) {
                    localStorage.setItem('access_token', data.access_token)
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
                    alert('Авторизация прошла успешно!')
                    setFirstTimeUser(false)
                    navigate('/')
                } else {
                    throw new Error('No access token received')
                }
            } catch (error: any) {
                console.error('Auto login error:', error)
                alert('Telegram initData not found')
            } finally {
                setIsLoading(false)
            }
        }
        autoLogin()
    }, [referralCode, navigate, setFirstTimeUser])

    return (
        <div className='flex min-h-screen flex-col items-center justify-center  p-4 text-white'>
            <div className='mb-8 flex flex-col items-center'>
                <div className='mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary'>
                    <Ticket className='h-10 w-10 text-white' />
                </div>
                <h1 className='mb-2 text-center text-3xl font-bold'>Добро пожаловать в EventBot</h1>
                <p className='text-center text-gray-400'>Открывайте и исследуйте живые мероприятия рядом с вами</p>
            </div>

            <div className='mb-10 grid w-full max-w-md gap-6'>
                <div className='flex items-start gap-4 rounded-lg bg-muted p-4'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/20'>
                        <Calendar className='h-5 w-5 text-primary' />
                    </div>
                    <div>
                        <h3 className='font-medium'>Найдите мероприятия</h3>
                        <p className='text-sm text-gray-400'>Узнайте о предстоящих событиях в вашем регионе</p>
                    </div>
                </div>

                <div className='flex items-start gap-4 rounded-lg bg-muted p-4'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-secondary/20'>
                        <Ticket className='h-5 w-5 text-secondary' />
                    </div>
                    <div>
                        <h3 className='font-medium'>Покупайте билеты</h3>
                        <p className='text-sm text-gray-400'>Легко приобретайте билеты на любимые мероприятия</p>
                    </div>
                </div>

                <div className='flex items-start gap-4 rounded-lg bg-muted p-4'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-tertiary/20'>
                        <Music className='h-5 w-5 text-tertiary' />
                    </div>
                    <div>
                        <h3 className='font-medium'>Наслаждайтесь шоу</h3>
                        <p className='text-sm text-gray-400'>Ощутите потрясающие живые выступления</p>
                    </div>
                </div>
            </div>

            <Button className='w-full max-w-md' size='lg' onClick={handleGetStarted}>
                Начать
            </Button>
        </div>
    )
}
