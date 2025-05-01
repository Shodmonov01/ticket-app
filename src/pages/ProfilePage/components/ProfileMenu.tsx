import { ChevronRight, Headphones, IdCard, MapPin, Ticket, User2 } from 'lucide-react'

const ProfileMenu = ({ loginOrganizator }: { loginOrganizator?: () => void }) => {
    return (
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

                    <div onClick={loginOrganizator} className='flex items-center cursor-pointer justify-between p-4 '>
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
    )
}

export default ProfileMenu
