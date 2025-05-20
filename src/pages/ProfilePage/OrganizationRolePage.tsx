import { useNavigate } from 'react-router-dom'
import { User, Briefcase, UserCheck } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { BottomNav } from '@/components/layout/BottomNav'
import HeaderPartner from '@/components/Headerr'

const OrganizationRolePage = () => {
    const navigate = useNavigate()

    return (
        <div className='flex flex-col min-h-screen bg-gray-950 text-white'>
            {/* <header className='flex items-center justify-between p-4'>
                <h1 className='text-xl font-bold'>Выберите тип</h1>
            </header> */}

            <HeaderPartner title='Выберите тип' path='/profile' />

            <div className='flex-1 px-4 space-y-4 mb-20 mt-10'>
                <Card
                    className='bg-gray-900 border-none overflow-hidden cursor-pointer'
                    onClick={() => navigate('/ip-form')}
                >
                    <CardContent className='p-0'>
                        <div className='flex items-start p-4'>
                            <div className='h-16 w-16 rounded-lg bg-blue-900 flex items-center justify-center mr-3'>
                                <User className='h-8 w-8 text-cyan-400' />
                            </div>
                            <div className='flex-1'>
                                <div className='flex justify-between items-start'>
                                    <div>
                                        <h3 className='font-bold text-xl'>ИП</h3>
                                        <div className='flex items-center text-gray-400 text-sm mt-1'>
                                            <span>Индивидуальный предприниматель</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card
                    className='bg-gray-900 border-none overflow-hidden cursor-pointer'
                    onClick={() => navigate('/ooo-form')}
                >
                    <CardContent className='p-0'>
                        <div className='flex items-start p-4'>
                            <div className='h-16 w-16 rounded-lg bg-blue-900 flex items-center justify-center mr-3'>
                                <Briefcase className='h-8 w-8 text-cyan-400' />
                            </div>
                            <div className='flex-1'>
                                <div className='flex justify-between items-start'>
                                    <div>
                                        <h3 className='font-bold text-xl'>ООО</h3>
                                        <div className='flex items-center text-gray-400 text-sm mt-1'>
                                            <span>Общество с ограниченной ответственностью</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card
                    className='bg-gray-900 border-none overflow-hidden cursor-pointer'
                    onClick={() => navigate('/self-employed-form')}
                >
                    <CardContent className='p-0'>
                        <div className='flex items-start p-4'>
                            <div className='h-16 w-16 rounded-lg bg-blue-900 flex items-center justify-center mr-3'>
                                <UserCheck className='h-8 w-8 text-cyan-400' />
                            </div>
                            <div className='flex-1'>
                                <div className='flex justify-between items-start'>
                                    <div>
                                        <h3 className='font-bold text-xl'>Самозанятый</h3>
                                        <div className='flex items-center text-gray-400 text-sm mt-1'>
                                            <span>Плательщик налога на профессиональный доход</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <BottomNav />
        </div>
    )
}

export default OrganizationRolePage
