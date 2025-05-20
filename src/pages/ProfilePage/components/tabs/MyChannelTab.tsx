import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import api from '@/api/Api'

import { Link2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { CreateChannelForm } from '../modals/CreateChannelSheet'

const MyChannelTab = () => {
    const [isOpen, setIsOpen] = useState(false)

    const { data: user } = useQuery<any>(
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

    return (
        <div className='mb-20'>
            <Button onClick={() => setIsOpen(true)} className='w-full my-4'>
                Добавить канал
            </Button>
            <div className=' space-y-3'>
                {user?.telegram_channels?.map((i: any) => (
                    <div key={i.id} className='bg-[#1c232b] rounded-xl p-5'>
                        <p className='text-sm line-clamp-2'>{i?.name || '-'}</p>
                        <div className='flex items-center gap-2 mt-3'>
                            <div>
                                <p className='text-sm font-medium'>{i?.name || '-'}</p>
                                {i?.urls ? (
                                    <a
                                        href={i.urls}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='text-xs text-muted-foreground flex items-center gap-1 hover:underline'
                                    >
                                        <Link2 className='h-3 w-3' />
                                        {i.urls.replace('https://t.me/', '@')}
                                    </a>
                                ) : (
                                    <p className='text-xs text-muted-foreground'>Нет ссылки</p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <CreateChannelForm isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    )
}

export default MyChannelTab
