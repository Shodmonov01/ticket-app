import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ArrowLeft, ChevronRight, Check, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useState } from 'react'
import api from '@/api/api'
import { useNavigate, useSearchParams } from 'react-router-dom'

const ipFormSchema = z.object({
    full_name: z.string().min(5, { message: 'ФИО должно содержать не менее 5 символов' }),
    inn: z
        .string()
        .max(10, { message: 'ИНН должен содержать 10 цифр' })
        .regex(/^\d+$/, { message: 'ИНН должен содержать только цифры' }),
    ogrnip: z
        .string()
        .max(15, { message: 'ОГРНИП должен содержать 15 цифр' })
        .regex(/^\d+$/, { message: 'ОГРНИП должен содержать только цифры' })
        .optional()
        .or(z.literal('')),
    legal_address: z.string().optional(),

    bank_name: z.string().optional(),
    bik: z
        .string()
        .max(9, { message: 'БИК должен содержать 9 цифр' })
        .regex(/^\d+$/, { message: 'БИК должен содержать только цифры' })
        .optional()
        .or(z.literal('')),
    checking_account: z
        .string()
        .max(20, { message: 'Расчетный счет должен содержать 20 цифр' })
        .regex(/^\d+$/, { message: 'Расчетный счет должен содержать только цифры' }),
    correspondent_account: z
        .string()
        .max(20, { message: 'Корреспондентский счет должен содержать 20 цифр' })
        .regex(/^\d+$/, { message: 'Корреспондентский счет должен содержать только цифры' })
        .optional()
        .or(z.literal(''))
})

export function IpForm() {
    const navigate = useNavigate()

    const [searchParams] = useSearchParams()

    const role = searchParams.get('role')

    const [currentStep, setCurrentStep] = useState(1)

    const form = useForm<z.infer<typeof ipFormSchema>>({
        resolver: zodResolver(ipFormSchema),
        defaultValues: {
            full_name: '',
            inn: '',
            ogrnip: '',
            legal_address: '',

            bank_name: '',
            bik: '',
            checking_account: '',
            correspondent_account: ''
        },
        mode: 'onChange'
    })

    const onNext = async () => {
        const fieldsToValidate =
            currentStep === 1
                ? ['full_name', 'inn', 'ogrnip', 'legal_address']
                : ['checking_account', 'bank_name', 'bik', 'correspondent_account']

        const result = await form.trigger(fieldsToValidate as any)

        if (result) {
            setCurrentStep(currentStep + 1)
        }
    }

    const onBack = () => {
        setCurrentStep(currentStep - 1)
    }

    const onSubmit = async (values: z.infer<typeof ipFormSchema>) => {
        console.log('Form submitted with all values:', values)
        try {
            let endpoint = ''

            if (role === 'distributor') {
                endpoint = '/auth/api/distributor/assign/ip/'
            } else {
                endpoint = '/auth/api/organization/register/ip/'
            }

            await api.post(endpoint, values)

            navigate('/profile')
        } catch (error) {
            console.log('Error:', error)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 p-4'>
                {currentStep === 1 && (
                    <>
                        <FormField
                            control={form.control}
                            name='full_name'
                            render={({ field }) => (
                                <FormItem className='space-y-2'>
                                    <FormLabel className='flex items-center gap-1'>ФИО ИП</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Иванов Иван Иванович'
                                            className='bg-gray-700 border-gray-600 focus:border-blue-500 focus:ring-blue-500 h-12 rounded-lg'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className='text-xs text-gray-400'>
                                        Укажите полное имя, как в паспорте
                                    </FormDescription>
                                    <FormMessage className='text-red-400 text-xs' />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='inn'
                            render={({ field }) => (
                                <FormItem className='space-y-2'>
                                    <FormLabel className='flex items-center gap-1'>
                                        ИНН
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant='ghost'
                                                        size='icon'
                                                        className='h-5 w-5 rounded-full p-0 ml-1'
                                                    >
                                                        <Info className='h-3.5 w-3.5' />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p className='max-w-xs'>ИНН должен содержать 10 цифр для ИП</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='1234567890'
                                            maxLength={10}
                                            className='bg-gray-700 border-gray-600 focus:border-blue-500 focus:ring-blue-500 h-12 rounded-lg'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className='text-red-400 text-xs' />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='ogrnip'
                            render={({ field }) => (
                                <FormItem className='space-y-2 flex flex-col'>
                                    <FormLabel className='flex items-center gap-1'>ОГРНИП</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='123456789012345'
                                            maxLength={15}
                                            className='bg-gray-700 border-gray-600 focus:border-blue-500 focus:ring-blue-500 h-12 rounded-lg'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className='text-red-400 text-xs' />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='legal_address'
                            render={({ field }) => (
                                <FormItem className='space-y-2'>
                                    <FormLabel>Юридический адрес</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='г. Москва, ул. Примерная, д. 1'
                                            className='bg-gray-700 border-gray-600 focus:border-blue-500 focus:ring-blue-500 h-12 rounded-lg'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className='text-red-400 text-xs' />
                                </FormItem>
                            )}
                        />

                        <div className='flex justify-end mt-6'>
                            <Button
                                type='button'
                                onClick={onNext}
                                className=' text-white px-6 py-2 rounded-lg flex items-center gap-2'
                            >
                                Далее
                                <ChevronRight className='h-4 w-4' />
                            </Button>
                        </div>
                    </>
                )}

                {currentStep === 2 && (
                    <>
                        <FormField
                            control={form.control}
                            name='bank_name'
                            render={({ field }) => (
                                <FormItem className='space-y-2'>
                                    <FormLabel>Название банка</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Сбербанк'
                                            className='bg-gray-700 border-gray-600 focus:border-blue-500 focus:ring-blue-500 h-12 rounded-lg'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className='text-red-400 text-xs' />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='bik'
                            render={({ field }) => (
                                <FormItem className='space-y-2'>
                                    <FormLabel className='flex items-center gap-1'>
                                        БИК банка
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant='ghost'
                                                        size='icon'
                                                        className='h-5 w-5 rounded-full p-0 ml-1'
                                                    >
                                                        <Info className='h-3.5 w-3.5' />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p className='max-w-xs'>БИК должен содержать 9 цифр</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='123456789'
                                            maxLength={9}
                                            className='bg-gray-700 border-gray-600 focus:border-blue-500 focus:ring-blue-500 h-12 rounded-lg'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className='text-red-400 text-xs' />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='checking_account'
                            render={({ field }) => (
                                <FormItem className='space-y-2'>
                                    <FormLabel className='flex items-center gap-1'>Расчетный счет</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='12345678901234567890'
                                            maxLength={20}
                                            className='bg-gray-700 border-gray-600 focus:border-blue-500 focus:ring-blue-500 h-12 rounded-lg'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className='text-red-400 text-xs' />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='correspondent_account'
                            render={({ field }) => (
                                <FormItem className='space-y-2'>
                                    <FormLabel>Корреспондентский счет</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='12345678901234567890'
                                            maxLength={20}
                                            className='bg-gray-700 border-gray-600 focus:border-blue-500 focus:ring-blue-500 h-12 rounded-lg'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className='text-red-400 text-xs' />
                                </FormItem>
                            )}
                        />

                        <div className='flex justify-between mt-6'>
                            <Button
                                type='button'
                                onClick={onBack}
                                variant='outline'
                                className='border-gray-600 text-gray-300 hover:bg-gray-700 px-6 py-2 rounded-lg flex items-center gap-2'
                            >
                                <ArrowLeft className='h-4 w-4' />
                                Назад
                            </Button>

                            <Button type='submit' className='text-white px-6 py-2 rounded-lg flex items-center gap-2'>
                                Создать
                                <Check className='h-4 w-4' />
                            </Button>
                        </div>
                    </>
                )}
            </form>
        </Form>
    )
}
