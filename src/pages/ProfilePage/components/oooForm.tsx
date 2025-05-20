import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ArrowLeft, ChevronRight, Check, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useState } from 'react'
import api from '@/api/api'
import { useNavigate, useSearchParams } from 'react-router-dom'
import HeaderPartner from '@/components/Headerr'

const oooFormSchema = z.object({
    organization_name: z.string().min(3, { message: 'Название организации должно быть не менее 3 символов' }),
    full_name: z.string().min(5, { message: 'ФИО должно быть не менее 5 символов' }),
    inn: z
        .string()
        .max(10, { message: 'ИНН должен содержать не более 10 цифр' })
        .regex(/^\d+$/, { message: 'ИНН должен содержать только цифры' }),
    kpp: z
        .string()
        .max(9, { message: 'КПП должен содержать не более 9 цифр' })
        .regex(/^\d+$/, { message: 'КПП должен содержать только цифры' })
        .optional()
        .or(z.literal('')),
    ogrn: z
        .string()
        .max(13, { message: 'ОГРН должен содержать не более 13 цифр' })
        .regex(/^\d+$/, { message: 'ОГРН должен содержать только цифры' })
        .optional()
        .or(z.literal('')),
    ogrnip: z
        .string()
        .max(15, { message: 'ОГРНИП должен содержать не более 15 цифр' })
        .regex(/^\d+$/, { message: 'ОГРНИП должен содержать только цифры' })
        .optional()
        .or(z.literal('')),
    legal_address: z.string().optional(),
    postal_address: z.string().optional(),

    email: z.string().email({ message: 'Введите корректный email' }),
    contact_phone: z.string().optional(),
    contact_person: z.string().optional(),
    ceo_full_name: z.string().min(5, { message: 'ФИО руководителя должно быть не менее 5 символов' }),
    recipient_full_name: z.string().optional(),

    bank_name: z.string().optional(),
    bik: z
        .string()
        .max(9, { message: 'БИК должен содержать не более 9 цифр' })
        .regex(/^\d+$/, { message: 'БИК должен содержать только цифры' })
        .optional()
        .or(z.literal('')),
    checking_account: z
        .string()
        .max(20, { message: 'Расчетный счет должен содержать не более 20 цифр' })
        .regex(/^\d+$/, { message: 'Расчетный счет должен содержать только цифры' }),
    correspondent_account: z
        .string()
        .max(20, { message: 'Корреспондентский счет должен содержать не более 20 цифр' })
        .regex(/^\d+$/, { message: 'Корреспондентский счет должен содержать только цифры' })
        .optional()
        .or(z.literal('')),
    bank_inn: z
        .string()
        .max(10, { message: 'ИНН банка должен содержать не более 10 цифр' })
        .regex(/^\d+$/, { message: 'ИНН банка должен содержать только цифры' })
        .optional()
        .or(z.literal('')),
    bank_kpp: z
        .string()
        .max(9, { message: 'КПП банка должен содержать не более 9 цифр' })
        .regex(/^\d+$/, { message: 'КПП банка должен содержать только цифры' })
        .optional()
        .or(z.literal(''))
})

export function OooForm() {
    const navigate = useNavigate()

    const [searchParams] = useSearchParams()

    const role = searchParams.get('role')

    const [currentStep, setCurrentStep] = useState(1)

    const form = useForm<z.infer<typeof oooFormSchema>>({
        resolver: zodResolver(oooFormSchema),
        defaultValues: {
            organization_name: '',
            full_name: '',
            inn: '',
            kpp: '',
            ogrn: '',
            ogrnip: '',
            legal_address: '',
            postal_address: '',

            email: '',
            contact_phone: '',
            contact_person: '',
            ceo_full_name: '',
            recipient_full_name: '',

            bank_name: '',
            bik: '',
            checking_account: '',
            correspondent_account: '',
            bank_inn: '',
            bank_kpp: ''
        },
        mode: 'onChange'
    })

    const onNext = async () => {
        let fieldsToValidate: string[] = []

        if (currentStep === 1) {
            fieldsToValidate = [
                'organization_name',
                'full_name',
                'inn',
                'kpp',
                'ogrn',
                'ogrnip',
                'legal_address',
                'postal_address'
            ]
        } else if (currentStep === 2) {
            fieldsToValidate = ['email', 'contact_phone', 'contact_person', 'ceo_full_name', 'recipient_full_name']
        }

        const result = await form.trigger(fieldsToValidate as any)

        if (result) {
            setCurrentStep(currentStep + 1)
        }
    }

    const onBack = () => {
        setCurrentStep(currentStep - 1)
    }

    const onSubmit = async (values: z.infer<typeof oooFormSchema>) => {
        console.log('Form submitted with all values:', values)
        try {
            await api.post('/auth/api/distributor/assign/llc/', values)
            await api.post('/auth/api/organization/register/llc/', values)

            navigate('/profile/distributor-profile')
        } catch (error) {
            console.log('Error:', error)
        }
    }

    return (
        <div>
            <HeaderPartner title='ООО' path='/profile/organization-role' />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 p-4'>
                    {currentStep === 1 && (
                        <>
                            <FormField
                                control={form.control}
                                name='organization_name'
                                render={({ field }) => (
                                    <FormItem className='space-y-2'>
                                        <FormLabel className='flex items-center gap-1'>Название организации</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='ООО «Компания»'
                                                className='bg-gray-700 border-gray-600 focus:border-emerald-500 focus:ring-emerald-500 h-12 rounded-lg'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription className='text-xs text-gray-400'>
                                            Укажите полное название организации
                                        </FormDescription>
                                        <FormMessage className='text-red-400 text-xs' />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='full_name'
                                render={({ field }) => (
                                    <FormItem className='space-y-2'>
                                        <FormLabel className='flex items-center gap-1'>ФИО ИП</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='ФИО ИП'
                                                className='bg-gray-700 border-gray-600 focus:border-emerald-500 focus:ring-emerald-500 h-12 rounded-lg'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription className='text-xs text-gray-400'>
                                            Укажите полное ФИО
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
                                                        <p className='max-w-xs'>
                                                            ИНН должен содержать 10 цифр для организации
                                                        </p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='1234567890'
                                                maxLength={10}
                                                className='bg-gray-700 border-gray-600 focus:border-emerald-500 focus:ring-emerald-500 h-12 rounded-lg'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='text-red-400 text-xs' />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='kpp'
                                render={({ field }) => (
                                    <FormItem className='space-y-2'>
                                        <FormLabel className='flex items-center gap-1'>
                                            КПП
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
                                                        <p className='max-w-xs'>КПП должен содержать 9 цифр</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='123456789'
                                                maxLength={9}
                                                className='bg-gray-700 border-gray-600 focus:border-emerald-500 focus:ring-emerald-500 h-12 rounded-lg'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='text-red-400 text-xs' />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='ogrn'
                                render={({ field }) => (
                                    <FormItem className='space-y-2'>
                                        <FormLabel>ОГРН</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='1234567890123'
                                                maxLength={13}
                                                className='bg-gray-700 border-gray-600 focus:border-emerald-500 focus:ring-emerald-500 h-12 rounded-lg'
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
                                                className='bg-gray-700 border-gray-600 focus:border-emerald-500 focus:ring-emerald-500 h-12 rounded-lg'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='text-red-400 text-xs' />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='postal_address'
                                render={({ field }) => (
                                    <FormItem className='space-y-2'>
                                        <FormLabel>Почтовый адрес</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='г. Москва, ул. Примерная, д. 1'
                                                className='bg-gray-700 border-gray-600 focus:border-emerald-500 focus:ring-emerald-500 h-12 rounded-lg'
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
                                    <FormItem className='space-y-2'>
                                        <FormLabel className='text-xs text-gray-300'>ОГРНИП</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='ОГРНИП'
                                                className='bg-gray-700 border-gray-600 focus:border-emerald-500 focus:ring-emerald-500 h-12 rounded-lg'
                                                {...field}
                                            />
                                        </FormControl>
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
                                name='email'
                                render={({ field }) => (
                                    <FormItem className='space-y-2'>
                                        <FormLabel className='flex items-center gap-1'>E-mail</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='email'
                                                placeholder='info@company.ru'
                                                className='bg-gray-700 border-gray-600 focus:border-emerald-500 focus:ring-emerald-500 h-12 rounded-lg'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='text-red-400 text-xs' />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='contact_phone'
                                render={({ field }) => (
                                    <FormItem className='space-y-2'>
                                        <FormLabel>Контактный номер телефона</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='+7 (999) 123-45-67'
                                                className='bg-gray-700 border-gray-600 focus:border-emerald-500 focus:ring-emerald-500 h-12 rounded-lg'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='text-red-400 text-xs' />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='contact_person'
                                render={({ field }) => (
                                    <FormItem className='space-y-2'>
                                        <FormLabel>ФИО контактного лица</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Иванов Иван Иванович'
                                                className='bg-gray-700 border-gray-600 focus:border-emerald-500 focus:ring-emerald-500 h-12 rounded-lg'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='text-red-400 text-xs' />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='ceo_full_name'
                                render={({ field }) => (
                                    <FormItem className='space-y-2'>
                                        <FormLabel className='flex items-center gap-1'>
                                            ФИО руководителя организации
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Петров Петр Петрович'
                                                className='bg-gray-700 border-gray-600 focus:border-emerald-500 focus:ring-emerald-500 h-12 rounded-lg'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='text-red-400 text-xs' />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='recipient_full_name'
                                render={({ field }) => (
                                    <FormItem className='space-y-2'>
                                        <FormLabel>ФИО получателя</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Сидоров Сидор Сидорович'
                                                className='bg-gray-700 border-gray-600 focus:border-emerald-500 focus:ring-emerald-500 h-12 rounded-lg'
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

                    {currentStep === 3 && (
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
                                                className='bg-gray-700 border-gray-600 focus:border-emerald-500 focus:ring-emerald-500 h-12 rounded-lg'
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
                                        <FormLabel>БИК банка</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='123456789'
                                                maxLength={9}
                                                className='bg-gray-700 border-gray-600 focus:border-emerald-500 focus:ring-emerald-500 h-12 rounded-lg'
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
                                                className='bg-gray-700 border-gray-600 focus:border-emerald-500 focus:ring-emerald-500 h-12 rounded-lg'
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
                                                className='bg-gray-700 border-gray-600 focus:border-emerald-500 focus:ring-emerald-500 h-12 rounded-lg'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='text-red-400 text-xs' />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='bank_inn'
                                render={({ field }) => (
                                    <FormItem className='space-y-2'>
                                        <FormLabel>ИНН банка</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='1234567890'
                                                maxLength={10}
                                                className='bg-gray-700 border-gray-600 focus:border-emerald-500 focus:ring-emerald-500 h-12 rounded-lg'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='text-red-400 text-xs' />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='bank_kpp'
                                render={({ field }) => (
                                    <FormItem className='space-y-2'>
                                        <FormLabel>КПП банка</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='123456789'
                                                maxLength={9}
                                                className='bg-gray-700 border-gray-600 focus:border-emerald-500 focus:ring-emerald-500 h-12 rounded-lg'
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

                                <Button
                                    type='submit'
                                    className=' text-white px-6 py-2 rounded-lg flex items-center gap-2'
                                >
                                    Создать
                                    <Check className='h-4 w-4' />
                                </Button>
                            </div>
                        </>
                    )}
                </form>
            </Form>
        </div>
    )
}
