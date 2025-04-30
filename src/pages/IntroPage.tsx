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

    // const [referralCode, setReferralCode] = useState<string | null>(null)
    // const [isLoading, setIsLoading] = useState(false)
    // const [user, setUser] = useState<any>(null)
    // const [referralUsed, setReferralUsed] = useState<string | null>(null)
    // const [initDataDebug, setInitDataDebug] = useState<string | null>(null)

    // useEffect(() => {
    //     // Проверяем, что код выполняется в Telegram WebApp
    //     if (window.Telegram && window.Telegram.WebApp) {
    //         const tg = window.Telegram.WebApp

    //         // Инициализация
    //         tg.ready() // Сообщаем Telegram, что приложение готово к отображению
    //         tg.expand() // Разворачиваем приложение на весь экран

    //         const initData = tg.initDataUnsafe
    //         alert(initData)
    //         // Пример использования данных от Telegram
    //         console.log('User data:', tg.initDataUnsafe?.user)
    //         console.log('Theme:', tg.colorScheme)
    //     }
    // }, [])

    // useEffect(() => {
    //     console.log('Telegram:', window.Telegram)

    //     if (window.Telegram?.WebApp) {
    //         const tg = window.Telegram.WebApp
    //         tg.ready()
    //         tg.expand()

    //         const initData = tg.initDataUnsafe
    //         console.log('initDataUnsafe:', initData)
    //         console.log('User:', initData?.user)
    //     } else {
    //         console.log('WebApp not available')
    //     }
    // }, [])

    // useEffect(() => {
    //     // Get initData from either Telegram WebApp or URL
    //     const initData = getInitData()
    //     setInitDataDebug(initData || 'No initData found')
    //     console.log('initData first', initData)

    //     if (!initData) {
    //         console.warn('initData11111111', 'No initData available')
    //         return
    //     }

    //     console.log('initData11111111', initData)

    //     // If we have Telegram WebApp available, use its methods
    //     if (isTelegramWebApp()) {
    //         const tg = window?.Telegram?.WebApp as unknown as any
    //         tg.expand()
    //         tg.ready()
    //     }

    //     const autoLogin = async () => {
    //         setIsLoading(true)

    //         try {
    //             const response = await api.post('/auth/api/user/login/', {
    //                 initData: initData
    //             })

    //             const data = response.data

    //             if (data.access_token) {
    //                 localStorage.setItem('access_token', data.access_token)
    //                 localStorage.setItem('refresh_token', data.refresh_token)

    //                 // If we have Telegram WebApp, get user data from it
    //                 const userData = isTelegramWebApp() ? window?.Telegram?.WebApp.initDataUnsafe?.user : null
    //                 setUser(userData || null)
    //                 setReferralUsed(data.referral_code_used || 'None')

    //                 if (isTelegramWebApp() && typeof window?.Telegram?.WebApp.sendData === 'function') {
    //                     window.Telegram.WebApp.sendData(
    //                         JSON.stringify({
    //                             auth: 'success',
    //                             referral_code: referralCode
    //                         })
    //                     )
    //                 }
    //                 alert('Авторизация прошла успешно!')
    //                 setFirstTimeUser(false)
    //                 navigate('/')
    //             } else {
    //                 throw new Error('No access token received')
    //             }
    //         } catch (error: any) {
    //             console.error('Auto login error:', error)
    //             alert('Login failed: ' + (error.message || 'Unknown error'))
    //         } finally {
    //             setIsLoading(false)
    //         }
    //     }

    //     autoLogin()
    // }, [referralCode, navigate, setFirstTimeUser])

    const [botStatus, setBotStatus] = useState<'checking' | 'valid' | 'invalid'>('checking')
    const [errorDetails, setErrorDetails] = useState<string | null>(null)
    const [initDataReceived, setInitDataReceived] = useState<boolean>(false)
    const [debugInfo, setDebugInfo] = useState<any>({})

    useEffect(() => {
        // Function to safely check Telegram WebApp
        const checkTelegramWebApp = () => {
            try {
                // Check if we're in Telegram
                if (window.Telegram?.WebApp) {
                    const tg = window.Telegram.WebApp

                    // Store debug info
                    setDebugInfo({
                        platform: tg.platform,
                        version: tg.version,
                        colorScheme: tg.colorScheme,
                        themeParams: tg.themeParams,
                        viewportHeight: tg.viewportHeight,
                        viewportStableHeight: tg.viewportStableHeight,
                        isExpanded: tg.isExpanded,
                        initDataUnsafe: tg.initDataUnsafe ? 'Present' : 'Missing',
                        initData: tg.initData ? 'Present' : 'Missing',
                        initDataLength: tg.initData ? tg.initData.length : 0
                    })

                    // Check if initData is available
                    if (tg.initData || tg.initDataUnsafe) {
                        setInitDataReceived(true)

                        // Initialize the WebApp
                        try {
                            tg.ready()
                            tg.expand()

                            // If we get here without errors, the bot is likely valid
                            setBotStatus('valid')
                        } catch (initError: any) {
                            setErrorDetails(`Error initializing WebApp: ${initError.message}`)
                            setBotStatus('invalid')
                        }
                    } else {
                        setErrorDetails('No initData received from Telegram')
                        setBotStatus('invalid')
                    }
                } else {
                    setErrorDetails('Telegram WebApp not available')
                    setBotStatus('invalid')
                }
            } catch (error: any) {
                setErrorDetails(`Error checking Telegram WebApp: ${error.message}`)
                setBotStatus('invalid')
            }
        }

        // Check immediately and then set up a retry if needed
        checkTelegramWebApp()

        // If initial check failed, try again after a short delay
        if (botStatus === 'checking') {
            const retryTimer = setTimeout(() => {
                checkTelegramWebApp()
            }, 1000)

            return () => clearTimeout(retryTimer)
        }
    }, [botStatus])

    // Function to copy debug info to clipboard
    const copyDebugInfo = () => {
        const debugText = JSON.stringify(debugInfo, null, 2)
        navigator.clipboard
            .writeText(debugText)
            .then(() => alert('Debug info copied to clipboard'))
            .catch(err => console.error('Failed to copy debug info:', err))
    }

    return (
        // <div className='flex min-h-screen flex-col items-center justify-center  p-4 text-white'>
        //     <div className='mb-8 flex flex-col items-center'>
        //         <div className='mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary'>
        //             <Ticket className='h-10 w-10 text-white' />
        //         </div>
        //         <h1 className='mb-2 text-center text-3xl font-bold'>Добро пожаловать в EventBot</h1>
        //         <p className='text-center text-gray-400'>Открывайте и исследуйте живые мероприятия рядом с вами</p>
        //     </div>

        //     <div className='mb-10 grid w-full max-w-md gap-6'>
        //         <div className='flex items-start gap-4 rounded-lg bg-muted p-4'>
        //             <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/20'>
        //                 <Calendar className='h-5 w-5 text-primary' />
        //             </div>
        //             <div>
        //                 <h3 className='font-medium'>Найдите мероприятия</h3>
        //                 <p className='text-sm text-gray-400'>Узнайте о предстоящих событиях в вашем регионе</p>
        //             </div>
        //         </div>

        //         <div className='flex items-start gap-4 rounded-lg bg-muted p-4'>
        //             <div className='flex h-10 w-10 items-center justify-center rounded-full bg-secondary/20'>
        //                 <Ticket className='h-5 w-5 text-secondary' />
        //             </div>
        //             <div>
        //                 <h3 className='font-medium'>Покупайте билеты</h3>
        //                 <p className='text-sm text-gray-400'>Легко приобретайте билеты на любимые мероприятия</p>
        //             </div>
        //         </div>

        //         <div className='flex items-start gap-4 rounded-lg bg-muted p-4'>
        //             <div className='flex h-10 w-10 items-center justify-center rounded-full bg-tertiary/20'>
        //                 <Music className='h-5 w-5 text-tertiary' />
        //             </div>
        //             <div>
        //                 <h3 className='font-medium'>Наслаждайтесь шоу</h3>
        //                 <p className='text-sm text-gray-400'>Ощутите потрясающие живые выступления</p>
        //             </div>
        //         </div>
        //     </div>

        //     <Button className='w-full max-w-md' size='lg' onClick={handleGetStarted}>
        //         Начать
        //     </Button>
        // </div>

        <div className='p-4 max-w-md mx-auto'>
            <h1 className='text-xl font-bold mb-4'>Telegram Bot Status</h1>

            {botStatus === 'checking' && (
                <div className='flex items-center space-x-2 mb-4'>
                    <div className='animate-spin h-4 w-4 border-2 border-primary rounded-full border-t-transparent'></div>
                    <p>Checking Telegram bot status...</p>
                </div>
            )}

            {botStatus === 'valid' && (
                <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4'>
                    <p className='font-bold'>Bot is valid!</p>
                    <p>Telegram WebApp initialized successfully.</p>
                </div>
            )}

            {botStatus === 'invalid' && (
                <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
                    <p className='font-bold'>Bot configuration issue detected</p>
                    <p>{errorDetails}</p>
                    <div className='mt-2'>
                        <p className='font-semibold'>Possible solutions:</p>
                        <ul className='list-disc pl-5 mt-1'>
                            <li>Check if your bot is properly configured in BotFather</li>
                            <li>Verify the domain in your app matches what's registered with BotFather</li>
                            <li>Make sure you're opening the app through the bot's menu or inline button</li>
                            <li>Try clearing your browser cache and cookies</li>
                        </ul>
                    </div>
                </div>
            )}

            <div className='mt-4'>
                <h2 className='text-lg font-semibold mb-2'>Debug Information</h2>
                <div className='bg-gray-100 p-3 rounded text-sm font-mono overflow-x-auto'>
                    <p>Init Data Received: {initDataReceived ? 'Yes' : 'No'}</p>
                    <p>Bot Status: {botStatus}</p>
                    <p>Telegram WebApp Available: {window.Telegram?.WebApp ? 'Yes' : 'No'}</p>
                    {Object.entries(debugInfo).map(([key, value]) => (
                        <p key={key}>
                            {key}: {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                        </p>
                    ))}
                </div>
                <Button onClick={copyDebugInfo} className='mt-2'>
                    Copy Debug Info
                </Button>
            </div>
        </div>
    )
}
