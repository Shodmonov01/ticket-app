import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { ExternalLink, Loader2 } from 'lucide-react'

import api from '@/api/Api'

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import DistTabModal from './DistTabModal'

const DistTab = () => {
    const [selectedChannel, setSelectedChannel] = useState<any>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const { data: channels, isLoading: loading } = useQuery(['channels'], async () => {
        const res = await api.get('/api/telegram/channles/all/')
        return res.data
    })

    const handleOpenModal = (channel: any) => {
        setSelectedChannel(channel)
        setIsModalOpen(true)
    }

    if (loading) {
        return (
            <div className='flex justify-center items-center min-h-[200px]'>
                <Loader2 className='h-8 w-8 animate-spin text-gray-400' />
            </div>
        )
    }

    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 mb-20'>
                {channels.map((channel: any) => (
                    <Card key={channel.id} className='bg-[#1c232b] text-white border-0'>
                        <CardHeader className='pb-2'>
                            <CardTitle className='text-lg'>{channel.name || 'Без названия'}</CardTitle>
                        </CardHeader>
                        <CardContent className='pb-2'>
                            <div className='space-y-2'>
                                <div className='flex justify-between'>
                                    <span className='text-gray-400'>Ссылка:</span>
                                    {channel.urls ? (
                                        <a
                                            href={
                                                channel.urls.startsWith('http')
                                                    ? channel.urls
                                                    : `https://${channel.urls}`
                                            }
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='flex items-center text-blue-400 hover:underline'
                                        >
                                            {channel.urls}
                                            <ExternalLink className='h-3 w-3 ml-1' />
                                        </a>
                                    ) : (
                                        <span>—</span>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                variant='outline'
                                className='w-full text-white mt-5'
                                onClick={() => handleOpenModal(channel)}
                            >
                                Разместить рекламу
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <DistTabModal selectedChannel={selectedChannel} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </>
    )
}

export default DistTab
