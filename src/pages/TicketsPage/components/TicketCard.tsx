import { useState } from 'react'
import { MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function TicketCard() {
    const [activeTab, setActiveTab] = useState('upcoming')

    return (
        <div className=' mx-auto p-4 bg-[#1c232b] rounded-xl text-white '>
            {activeTab === 'upcoming' && (
                <div className=' overflow-hidden'>
                    <div className=' flex gap-4'>
                        <img
                            src='https://thumbs.dreamstime.com/b/silhouettes-concert-crowd-front-bright-stage-lights-confetti-colourful-background-high-lighted-places-people-holding-83284529.jpg'
                            alt='Concert thumbnail'
                            className='w-20 h-20 rounded-lg object-cover'
                        />
                        <div className='flex-1'>
                            <div className='flex justify-between items-start'>
                                <div className='flex items-center text-gray-400 text-[12px]'>
                                    <svg
                                        className='w-4 h-4 mr-1'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path
                                            d='M12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13Z'
                                            stroke='currentColor'
                                            strokeWidth='2'
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                        />
                                        <path
                                            d='M12 21C16 17 20 13.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 13.4183 8 17 12 21Z'
                                            stroke='currentColor'
                                            strokeWidth='2'
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                        />
                                    </svg>
                                    Bayfront Park, Miami...
                                </div>
                                <div className='bg-[#1b3936] text-[#1aab6d] text-sm font-medium px-3 py-1 rounded-md'>
                                    Paid
                                </div>
                            </div>

                            <h3 className='text-[16px] font-bold mt-2'>David Guetta Ultra Miami 2025 Music Festival</h3>
                            <p className='text-gray-400 text-sm mt-1'>Nov 25, 2025, 02:00 PM</p>
                        </div>
                    </div>

                    <div className=' py-4 flex gap-3'>
                        <div className='bg-[#272b33] text-gray-400 text-sm py-2 px-4 rounded-lg'>3 tickets</div>
                        <div className='bg-[#272b33] text-gray-400 text-sm py-2 px-4 rounded-lg'>12 days left</div>
                    </div>

                    <div className='flex mt-2'>
                        <Button
                            variant='ghost'
                            className='flex-1 bg-[#183748] text-[#0a84ff] py-3  rounded-lg flex items-center justify-center gap-2'
                        >
                            <div className='relative w-6 h-6'>
                                <div className='absolute inset-0 border border-[#0a84ff] rounded-sm'></div>
                                <div className='absolute inset-[3px] border border-[#0a84ff] rounded-sm'></div>
                            </div>
                            Show QR code
                        </Button>
                        <Button variant='ghost' className='w-16 flex items-center justify-center'>
                            <MoreVertical className='w-6 h-6 text-gray-400' />
                        </Button>
                    </div>
                </div>
            )}

            {activeTab === 'past' && (
                <div className='flex flex-col items-center justify-center h-40 text-gray-400'>
                    <p>No past tickets</p>
                </div>
            )}
        </div>
    )
}
