import api from '@/api/api'
import { Offer } from '@/types/type'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Link2 } from 'lucide-react'
import { formatDate } from '@/utils/format'
import { Badge } from '@/components/ui/badge'
import { getStatusBadge } from '@/utils/get-status'
import CardOffer from './CardOffer'

const Partner = () => {
    const [offers, setOffers] = useState<any>()
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [statusFilter, setStatusFilter] = useState<string>('')

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

    useEffect(() => {
        fetchOffers()
    }, [page, limit, statusFilter])

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
