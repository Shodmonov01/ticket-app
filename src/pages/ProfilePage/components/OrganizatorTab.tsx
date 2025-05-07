import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Check, Clock, Link2, Plus, RefreshCcw, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Offer } from '@/types/type'
import { formatDate } from '@/utils/format'
import api from '@/api/api'
import { getStatusBadge } from '@/utils/get-status'
import CardOffer from './CardOffer'

const OrganizatorTab = () => {
    const [offers, setOffers] = useState<Offer>()
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [totalPages, setTotalPages] = useState(1)
    const [statusFilter, setStatusFilter] = useState<string>('')
    console.log('offers', offers)

    useEffect(() => {
        fetchOffers()
    }, [page, limit, statusFilter])

    const fetchOffers = async () => {
        try {
            const response = await api.get(
                `/api/offer/for/disributor/?page=${page}&limit=${limit}${statusFilter ? `&status=${statusFilter}` : ''}`
            )

            setOffers(response.data.results)
        } catch (error) {
            console.error('Error fetching offers:', error)
        }
    }

    const handleOffer = async (id: number, action: string) => {
        try {
            const res = await api.patch(`/api/offer/${id}/`, {
                OfferChange: {
                    status: action
                }
            })
        } catch (error) {
            console.error('Error handling offer:', error)
        }
    }

    return (
        <div className=' space-y-3 mb-20'>
            {offers?.map((offer: any) => (
                // <Card key={offer.id} className='border-0 bg-[#1c232b]'>
                //     <CardHeader className='pb-2'>
                //         <div className='flex justify-between items-start'>
                //             <div>
                //                 <CardTitle className='text-base'>{offer.event.name}</CardTitle>
                //                 <CardDescription className='flex items-center gap-1 mt-1'>
                //                     <Calendar className='h-3 w-3' />
                //                     {formatDate(offer.create_at)}
                //                 </CardDescription>
                //             </div>
                //             {getStatusBadge(offer.status)}
                //         </div>
                //     </CardHeader>
                //     <CardContent className='pb-2'>
                //         <p className='text-sm line-clamp-2'>{offer.event.description}</p>
                //         <div className='flex items-center gap-2 mt-3'>
                //             <div>
                //                 <p className='text-sm font-medium'>{offer.channel?.name || '-'}</p>
                //                 <a
                //                     href={offer.channel?.urls || '-'}
                //                     target='_blank'
                //                     rel='noopener noreferrer'
                //                     className='text-xs text-muted-foreground flex items-center gap-1 hover:underline'
                //                 >
                //                     <Link2 className='h-3 w-3' />
                //                     {offer.channel?.urls?.replace('https://t.me/', '@') || '-'}
                //                 </a>
                //             </div>
                //         </div>
                //     </CardContent>
                //     <CardFooter>
                //         <div className='flex justify-end gap-2 w-full'>
                //             {offer.status === 'new_offer' && (
                //                 <>
                //                     <Button
                //                         onClick={() => handleOffer(offer.id, 'cancelled')}
                //                         variant='outline'
                //                         size='sm'
                //                     >
                //                         <X className='mr-1 h-4 w-4' />
                //                         Отклонить
                //                     </Button>
                //                     <Button onClick={() => handleOffer(offer.id, 'accepted')} size='sm'>
                //                         <Check className='mr-1 h-4 w-4' />
                //                         Принять
                //                     </Button>
                //                 </>
                //             )}
                //         </div>
                //     </CardFooter>
                // </Card>
                <CardOffer offer={offer} handleOffer={handleOffer} />
            ))}
        </div>
    )
}

export default OrganizatorTab
