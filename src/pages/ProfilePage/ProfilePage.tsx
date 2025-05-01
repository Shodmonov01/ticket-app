// import { useEffect, useState } from 'react'

// import { User, EllipsisVertical } from 'lucide-react'
// import api from '@/api/api'

// import ProfileMenu from './components/ProfileMenu'
// import { BottomNav } from '../../components/layout/bottom-nav'
// import { Button } from '../../components/ui/button'

// export default function ProfilePage() {
//     const tg = window?.Telegram?.WebApp as unknown as any
//     const [referralCode, setReferralCode] = useState<string | null>(null)
//     const [isLoading, setIsLoading] = useState(false)
//     const [user, setUser] = useState<any>(null)
//     const [referralUsed, setReferralUsed] = useState<string | null>(null)

//     const loginOrganizator = async () => {
//         const tg = window.Telegram?.WebApp as unknown as any

//         tg.ready()
//         tg.expand()

//         const initData = tg.initData
//         if (!initData) {
//             console.error('Telegram initData not found')
//             return
//         }

//         try {
//             const initData = window?.Telegram?.WebApp.initData

//             const payload = {
//                 initData: initData
//             }
//             const token = localStorage.getItem('token')

//             const response = await api.post(
//                 '/auth/api/assign/organization/role/',
//                 {},
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 }
//             )
//             const data = response.data

//             if (data.access_token) {
//                 localStorage.setItem('access_token', data.access_token)

//                 const userData = tg.initDataUnsafe?.user
//                 setUser(userData || null)
//                 setReferralUsed(data.referral_code_used || 'None')
//                 if (typeof tg.sendData === 'function') {
//                     tg.sendData(
//                         JSON.stringify({
//                             auth: 'success',
//                             referral_code: referralCode
//                         })
//                     )
//                 }
//                 alert('Авторизация прошла успешно!')
//             } else {
//                 throw new Error('No access token received')
//             }
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     return (
//         <div className='flex min-h-screen flex-col pb-20 text-white '>
//             <main className=''>
//                 <div className=' bg-slate-600 h-[180px] w-full mb-6'>
//                     <div className='w-full flex justify-end px-4 py-8'>
//                         <Button className='bg-muted rounded-full w-10 h-10'>
//                             <EllipsisVertical className='!min-h-5 !min-w-5 ' />
//                         </Button>
//                     </div>

//                     <div className='flex items-center justify-center w-full'>
//                         <div className='mb-4 h-24 w-24 overflow-hidden rounded-full relative top-[30px] bg-muted p-1'>
//                             <User className=' h-full w-full rounded-full  p-6  bg-white/40' />
//                         </div>
//                     </div>
//                 </div>

//                 <div className='text-center my-6 mt-20 flex flex-col items-center'>
//                     <div>
//                         <h1 className='text-xl font-bold text-white'>User Name</h1>
//                         <p className='text-gray-400'>user@example.com</p>
//                     </div>
//                 </div>

//                 <ProfileMenu loginOrganizator={loginOrganizator} />
//             </main>

//             <BottomNav />
//         </div>
//     )
// }


import { useEffect, useState } from 'react'
import { User, EllipsisVertical } from 'lucide-react'
import api from '@/api/api'
import ProfileMenu from './components/ProfileMenu'
import { BottomNav } from '../../components/layout/bottom-nav'
import { Button } from '../../components/ui/button'

// Добавляем типизацию для CloudStorage
declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        CloudStorage?: {
          setItem: (key: string, value: string, callback?: (error?: Error) => void) => void
          getItem: (key: string, callback: (error?: Error, value?: string) => void) => void
        }
        initData?: string
        initDataUnsafe?: {
          user?: {
            id: number
            first_name?: string
            last_name?: string
            username?: string
          }
        }
        ready: () => void
        expand: () => void
        sendData?: (data: string) => void
      }
    }
  }
}

export default function ProfilePage() {
  const [referralCode, setReferralCode] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [referralUsed, setReferralUsed] = useState<string | null>(null)

  // Функция для получения токена из хранилища
  const getToken = async (): Promise<string | null> => {
    const tg = window.Telegram?.WebApp
    
    if (tg?.CloudStorage) {
      return new Promise((resolve) => {
        tg.CloudStorage!.getItem('access_token', (err, value) => {
          if (err) {
            console.error('Ошибка получения токена:', err)
            resolve(null)
          } else {
            resolve(value || null)
          }
        })
      })
    }
    
    // Fallback для других окружений
    return localStorage.getItem('access_token') || sessionStorage.getItem('access_token')
  }

  const loginOrganizator = async () => {
    const tg = window.Telegram?.WebApp
    if (!tg) return

    tg.ready()
    tg.expand()

    try {
      // Получаем токен из хранилища
      const token = await getToken()
      if (!token) {
        throw new Error('Токен не найден')
      }

      const response = await api.post(
        '/auth/api/assign/organization/role/',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const data = response.data

      if (data.access_token) {
        // Сохраняем новый токен
        if (tg.CloudStorage) {
          tg.CloudStorage.setItem('access_token', data.access_token, (err) => {
            if (err) console.error('Ошибка сохранения токена:', err)
          })
        } else {
          localStorage.setItem('access_token', data.access_token)
        }

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
      } else {
        throw new Error('No access token received')
      }
    } catch (error) {
      console.error('Ошибка авторизации:', error)
      alert('Ошибка авторизации')
    }
  }

  // Загружаем данные пользователя при монтировании
  useEffect(() => {
    const loadUserData = async () => {
      const tg = window.Telegram?.WebApp
      if (!tg) return

      const token = await getToken()
      if (token) {
        try {
          // Здесь можно добавить запрос для получения данных пользователя
          const userData = tg.initDataUnsafe?.user
          setUser(userData || null)
        } catch (error) {
          console.error('Ошибка загрузки данных пользователя:', error)
        }
      }
    }

    loadUserData()
  }, [])

  return (
    <div className='flex min-h-screen flex-col pb-20 text-white'>
      <main className=''>
        <div className='bg-slate-600 h-[180px] w-full mb-6'>
          <div className='w-full flex justify-end px-4 py-8'>
            <Button className='bg-muted rounded-full w-10 h-10'>
              <EllipsisVertical className='!min-h-5 !min-w-5' />
            </Button>
          </div>

          <div className='flex items-center justify-center w-full'>
            <div className='mb-4 h-24 w-24 overflow-hidden rounded-full relative top-[30px] bg-muted p-1'>
              <User className='h-full w-full rounded-full p-6 bg-white/40' />
            </div>
          </div>
        </div>

        <div className='text-center my-6 mt-20 flex flex-col items-center'>
          <div>
            <h1 className='text-xl font-bold text-white'>
              {user?.first_name || 'User'} {user?.last_name || 'Name'}
            </h1>
            <p className='text-gray-400'>{user?.username || 'user@example.com'}</p>
          </div>
        </div>

        <ProfileMenu loginOrganizator={loginOrganizator} />
      </main>

      <BottomNav />
    </div>
  )
}