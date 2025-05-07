import { useEffect, useState } from 'react'
import { Offer } from '@/types/type'
import api from '@/api/api'
import CardOffer from './CardOffer'

const DistributorTab = () => {
    const [offers, setOffers] = useState<Offer>()
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [statusFilter, setStatusFilter] = useState<string>('')
    console.log('offers', offers)

    useEffect(() => {
        fetchOffers()
    }, [page, limit, statusFilter])

    const fetchOffers = async () => {
        try {
            const response = await api.get(
                `/api/offer/for/organization/?page=${page}&limit=${limit}${
                    statusFilter ? `&status=${statusFilter}` : ''
                }`
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
                <CardOffer offer={offer} handleOffer={handleOffer} />
            ))}
        </div>
    )
}

export default DistributorTab
