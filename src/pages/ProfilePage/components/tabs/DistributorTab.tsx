import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import api from '@/api/Api'

import { Loader2 } from 'lucide-react'

import CardOffer from '../CardOffer'

const DistributorTab = () => {
    const queryClient = useQueryClient()

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [statusFilter, setStatusFilter] = useState<string>('')

    const { data: offers, isLoading } = useQuery({
        queryKey: ['offersDist', page, limit, statusFilter],
        queryFn: async () => {
            const res = await api.get(
                `/api/offer/for/disributor/?page=${page}&limit=${limit}${statusFilter ? `&status=${statusFilter}` : ''}`
            )
            return res?.data?.results
        }
    })

    const handleOffer = async (id: number, action: string) => {
        try {
            const res = await api.patch(`/api/offer/${id}/`, {
                OfferChange: {
                    status: action
                }
            })
            queryClient.invalidateQueries(['events'])
        } catch (error) {
            console.error('Error handling offer:', error)
        }
    }

    if (isLoading) {
        return (
            <div className='flex justify-center items-center min-h-[200px]'>
                <Loader2 className='h-8 w-8  text-gray-400' />
            </div>
        )
    }

    return (
        <div className=' space-y-3 mb-20'>
            {offers?.map((offer: any) => (
                <CardOffer offer={offer} handleOffer={handleOffer} />
            ))}
        </div>
    )
}

export default DistributorTab
