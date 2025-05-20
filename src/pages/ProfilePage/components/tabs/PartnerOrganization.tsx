import api from '@/api/Api'
import { useEffect, useState } from 'react'

import CardOffer from '../CardOffer'
import { Loader2 } from 'lucide-react'

const Partner = () => {
    const [offers, setOffers] = useState<any>()
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [statusFilter, setStatusFilter] = useState<string>('')
    const [loading, setLoading] = useState(true)

    const fetchOffers = async () => {
        try {
            setLoading(true)
            const response = await api.get(
                `/api/offer/for/organization/?page=${page}&limit=${limit}${
                    statusFilter ? `&status=${statusFilter}` : ''
                }`
            )

            setOffers(response.data.results)
        } catch (error) {
            console.error('Error fetching offers:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchOffers()
    }, [page, limit, statusFilter])

    if (loading) {
        return (
            <div className='flex justify-center items-center min-h-[200px]'>
                <Loader2 className='h-8 w-8  text-gray-400' />
            </div>
        )
    }

    return (
        <div className=' space-y-3 mb-20'>
            {offers
                ?.filter((offer: any) => offer.status === 'accepted')
                .map((offer: any) => (
                    <CardOffer offer={offer} />
                ))}
        </div>
    )
}

export default Partner
