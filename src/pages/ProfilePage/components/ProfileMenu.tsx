import { ChevronRight, Headphones, IdCard, MapPin, Ticket, User2 } from 'lucide-react'

const ProfileMenu = ({ loginOrganizator }: { loginOrganizator?: () => void }) => {
    const items = [
        {
            icon: <MapPin className='h-5 w-5 text-white' />,
            title: 'Локация',
            subtitle: 'Изменить город',
            onClick: () => console.log('Локация')
        },
        {
            icon: <Ticket className='h-5 w-5 text-white' />,
            title: 'Мои билеты',
            subtitle: 'Все билеты из ваших покупок',
            onClick: () => console.log('Мои билеты')
        },
        {
            icon: <Headphones className='h-5 w-5 text-white' />,
            title: 'Поддержка',
            subtitle: 'Быстрая помощь',
            onClick: () => console.log('Поддержка')
        },
        {
            icon: <User2 className='h-5 w-5 text-white' />,
            title: 'Аккаунт',
            subtitle: 'Редактировать профиль / Выйти',
            onClick: () => console.log('Аккаунт ')
        },
        {
            icon: <IdCard className='h-5 w-5 text-white' />,
            title: 'Способы оплаты',
            subtitle: 'Добавить или изменить способ оплаты',
            onClick: () => console.log('Способы оплаты')
        },
        {
            icon: <User2 className='h-5 w-5 text-white' />,
            title: 'Пригласить друзей',
            subtitle: 'Получите бонусы за приглашение',
            onClick: () => console.log('Пригласить друзей')
        },
        {
            icon: <User2 className='h-5 w-5 text-white' />,
            title: 'Стать партнером',
            onClick: loginOrganizator
        }
    ]

    return (
        <div className='flex flex-col w-full max-w-md mx-auto text-white p-4'>
            <div className='mb-4'>
                <div className=' bg-[#1c232b] rounded-xl'>
                    {items.map((item, index) => (
                        <div
                            key={index}
                            onClick={item.onClick}
                            className='flex items-center cursor-pointer justify-between p-4 '
                        >
                            <div className='flex items-center gap-3'>
                                <div>{item.icon}</div>
                                <div>
                                    <h3 className='font-medium'>{item.title}</h3>
                                    {item.subtitle && <p className='text-sm text-gray-400'>{item.subtitle}</p>}
                                </div>
                            </div>
                            <ChevronRight className='h-5 w-5 text-gray-400' />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProfileMenu
