import { BottomNav } from '../components/layout/bottom-nav'
import { Button } from '../components/ui/button'

import { User, EllipsisVertical, ChevronRight, MapPin, Ticket, Headphones, User2, IdCard } from 'lucide-react'

export default function ProfilePage() {
    return (
        <div className='flex min-h-screen flex-col pb-20 text-white'>
            {/* <Header /> */}

            <main className=''>
                <div className=' bg-slate-600 h-[180px] w-full mb-6'>
                    <div className='w-full flex justify-end px-4 py-8'>
                        <Button className='bg-muted rounded-full w-10 h-10'>
                            <EllipsisVertical className='!min-h-5 !min-w-5 ' />
                        </Button>
                    </div>

                    <div className='flex items-center justify-center w-full'>
                        <div className='mb-4 h-24 w-24 overflow-hidden rounded-full relative top-[30px] bg-muted p-1'>
                            <User className=' h-full w-full rounded-full  p-6  bg-white/40' />
                        </div>
                    </div>
                </div>

                <div className='text-center my-6 mt-20 flex flex-col items-center'>
                    <div>
                        <h1 className='text-xl font-bold text-white'>User Name</h1>
                        <p className='text-gray-400'>user@example.com</p>
                    </div>
                </div>

                <div className='flex flex-col w-full max-w-md mx-auto text-white p-4'>
                    <div className='mb-4'>
                        <div className=' bg-[#1c232b] rounded-xl'>
                            <div className='flex items-center justify-between p-4 '>
                                <div className='flex items-center gap-3'>
                                    <div className=''>
                                        <MapPin className='h-5 w-5 text-white' />
                                    </div>
                                    <div>
                                        <h3 className='font-medium'>Локация</h3>
                                        <p className='text-sm text-gray-400'>Изменить город</p>
                                    </div>
                                </div>
                                <ChevronRight className='h-5 w-5 text-gray-400' />
                            </div>

                            <div className='flex items-center justify-between  p-4 '>
                                <div className='flex items-center gap-3'>
                                    <div className=''>
                                        <Ticket className='h-5 w-5 text-white' />
                                    </div>
                                    <div>
                                        <h3 className='font-medium'>Мои билеты</h3>
                                        <p className='text-sm text-gray-400'>Все билеты из ваших покупок</p>
                                    </div>
                                </div>
                                <ChevronRight className='h-5 w-5 text-gray-400' />
                            </div>

                            <div className='flex items-center justify-between  p-4 '>
                                <div className='flex items-center gap-3'>
                                    <div className=''>
                                        <Headphones className='h-5 w-5 text-white' />
                                    </div>
                                    <div>
                                        <h3 className='font-medium'>Поддержка</h3>
                                        <p className='text-sm text-gray-400'>Быстрая помощь</p>
                                    </div>
                                </div>
                                <ChevronRight className='h-5 w-5 text-gray-400' />
                            </div>

                            <div className='flex items-center justify-between p-4 '>
                                <div className='flex items-center gap-3'>
                                    <div className=''>
                                        <User2 className='h-5 w-5 text-white' />
                                    </div>
                                    <div>
                                        <h3 className='font-medium'>Аккаунт</h3>
                                        <p className='text-sm text-gray-400'>Редактировать профиль / Выйти</p>
                                    </div>
                                </div>
                                <ChevronRight className='h-5 w-5 text-gray-400' />
                            </div>

                            <div className='flex items-center justify-between p-4 '>
                                <div className='flex items-center gap-3'>
                                    <div className=''>
                                        <IdCard className='h-5 w-5 text-white' />
                                    </div>
                                    <div>
                                        <h3 className='font-medium'>Способы оплаты</h3>
                                        <p className='text-sm text-gray-400'>Добавить или изменить способ оплаты</p>
                                    </div>
                                </div>
                                <ChevronRight className='h-5 w-5 text-gray-400' />
                            </div>

                            <div className='flex items-center justify-between p-4 '>
                                <div className='flex items-center gap-3'>
                                    <div className=''>
                                        <User2 className='h-5 w-5 text-white' />
                                    </div>
                                    <div>
                                        <h3 className='font-medium'>Пригласить друзей</h3>
                                        <p className='text-sm text-gray-400'>Получите бонусы за приглашение</p>
                                    </div>
                                </div>
                                <ChevronRight className='h-5 w-5 text-gray-400' />
                            </div>

                            <div className='flex items-center justify-between p-4 '>
                                <div className='flex items-center gap-3'>
                                    <div className=''>
                                        <User2 className='h-5 w-5 text-white' />
                                    </div>
                                    <div>
                                        <h3 className='font-medium'>Войти как организатор</h3>
                                    </div>
                                </div>
                                <ChevronRight className='h-5 w-5 text-gray-400' />
                            </div>

                            <div className='flex items-center justify-between p-4 '>
                                <div className='flex items-center gap-3'>
                                    <div className=''>
                                        <User2 className='h-5 w-5 text-white' />
                                    </div>
                                    <div>
                                        <h3 className='font-medium'>Войти как распространитель</h3>
                                    </div>
                                </div>
                                <ChevronRight className='h-5 w-5 text-gray-400' />
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <BottomNav />
        </div>
    )
}
