import { useEffect, useState } from 'react'
import { Offer } from '@/types/type'
import api from '@/api/api'
import CardOffer from '../CardOffer'
import { useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'

const OrganizatorTab = () => {
    const queryClient = useQueryClient()

    const [offers, setOffers] = useState<any>()
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
            setLoading(true)
            const response = await api.get(
                `/api/offer/for/organization/?page=${page}&limit=${limit}${
                    statusFilter ? `&status=${statusFilter}` : ''
                }`
            )

            setOffers(response?.data?.results)
        } catch (error) {
            console.error('Error fetching offers:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleOffer = async (id: number, action: string) => {
        try {
            const res = await api.patch(`/api/offer/${id}/`, {
                OfferChange: {
                    status: action
                }
            })
            queryClient.invalidateQueries(['events'])
            queryClient.invalidateQueries(['eventsE'])
        } catch (error) {
            console.error('Error handling offer:', error)
        }
    }

    if (loading) {
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

export default OrganizatorTab
