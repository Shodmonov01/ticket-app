import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Check, Link2, X } from 'lucide-react'
import { getStatusBadge } from '@/utils/get-status'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/utils/format'

const CardOffer = ({ offer, handleOffer }: any) => {
    return (
        <Card key={offer.id} className='border-0 bg-[#1c232b]'>
            <CardHeader className='pb-2'>
                <div className='flex justify-between items-start'>
                    <div>
                        <CardTitle className='text-base'>{offer.event.name}</CardTitle>
                        <CardDescription className='flex items-center gap-1 mt-1'>
                            <Calendar className='h-3 w-3' />
                            {formatDate(offer.create_at)}
                        </CardDescription>
                    </div>
                    {getStatusBadge(offer.status)}
                </div>
            </CardHeader>
            <CardContent className='pb-2'>
                <p className='text-sm line-clamp-2'>{offer.event.description}</p>
                <div className='flex items-center gap-2 mt-3'>
                    <div>
                        <p className='text-sm font-medium'>{offer.channel?.name || '-'}</p>
                        <a
                            href={offer.channel?.urls || '-'}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-xs text-muted-foreground flex items-center gap-1 hover:underline'
                        >
                            <Link2 className='h-3 w-3' />
                            {offer.channel?.urls?.replace('https://t.me/', '@') || '-'}
                        </a>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <div className='flex justify-end gap-2 w-full'>
                    {offer.status === 'new_offer' && offer.status !== 'accepted' && (
                        <>
                            <Button onClick={() => handleOffer(offer.id, 'cancelled')} variant='outline' size='sm'>
                                <X className='mr-1 h-4 w-4' />
                                Отклонить
                            </Button>
                            <Button onClick={() => handleOffer(offer.event.id, 'accepted')} size='sm'>
                                <Check className='mr-1 h-4 w-4' />
                                Принять
                            </Button>
                        </>
                    )}
                </div>
            </CardFooter>
        </Card>
    )
}

export default CardOffer
