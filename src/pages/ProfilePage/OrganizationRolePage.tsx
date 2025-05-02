import { useNavigate } from 'react-router-dom'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { User } from 'lucide-react'
import { BottomNav } from '@/components/layout/bottom-nav'

const OrganizationRolePage = () => {
    const navigate = useNavigate()

    return (
        <div>
            <Card className='bg-gray-800 border-gray-700 mb-4 overflow-hidden my-10'>
                <CardHeader className='bg-gradient-to-r from-blue-900 to-indigo-900 pb-8'>
                    <CardTitle className='text-xl text-white'>Выберите тип организации</CardTitle>
                    <CardDescription className='text-blue-100'>
                        Выберите подходящий тип для регистрации вашей организации
                    </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4 pt-6 -mt-4'>
                    <div className='flex items-center gap-3' onClick={() => navigate('/ip-form')}>
                        <div>
                            <User className='h-6 w-6 text-cyan-400' />
                        </div>
                        <div>
                            <p className='font-bold text-xl text-white'>ИП</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-3' onClick={() => navigate('/ooo-form')}>
                        <div>
                            <User className='h-6 w-6 text-cyan-400' />
                        </div>
                        <div>
                            <p className='font-bold text-xl text-white'>ООО</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-3' onClick={() => navigate('/self-employed-form')}>
                        <div>
                            <User className='h-6 w-6 text-cyan-400' />
                        </div>
                        <div>
                            <p className='font-bold text-xl text-white'>Самозанятый</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <BottomNav />
        </div>
    )
}

export default OrganizationRolePage
