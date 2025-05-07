import { Badge } from '@/components/ui/badge'

export const getStatusBadge = (status: string) => {
    switch (status) {
        case 'new_offer':
            return (
                <Badge variant='outline' className='bg-blue-50 text-blue-700 hover:bg-blue-50'>
                    Новое
                </Badge>
            )
        case 'accepted':
            return (
                <Badge variant='outline' className='bg-green-50 text-green-700 hover:bg-green-50'>
                    Принято
                </Badge>
            )
        case 'cancelled':
            return (
                <Badge variant='outline' className='bg-red-50 text-red-700 hover:bg-red-50'>
                    Отменено
                </Badge>
            )
        default:
            return <Badge variant='outline'>Неизвестно</Badge>
    }
}
