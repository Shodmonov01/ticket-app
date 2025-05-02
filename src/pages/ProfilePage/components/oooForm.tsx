import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ArrowLeft, ChevronRight, Check, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Checkbox } from '@/components/ui/checkbox'
import { useState } from 'react'

const oooMainSchema = z.object({
    organization_name: z.string().min(3, { message: 'Название организации должно содержать не менее 3 символов' }),
    inn: z
        .string()
        .length(10, { message: 'ИНН должен содержать 10 цифр' })
        .regex(/^\d+$/, { message: 'ИНН должен содержать только цифры' }),
    kpp: z
        .string()
        .length(9, { message: 'КПП должен содержать 9 цифр' })
        .regex(/^\d+$/, { message: 'КПП должен содержать только цифры' })
        .optional()
        .or(z.literal('')),
    ogrn: z
        .string()
        .length(13, { message: 'ОГРН должен содержать 13 цифр' })
        .regex(/^\d+$/, { message: 'ОГРН должен содержать только цифры' })
        .optional()
        .or(z.literal('')),
    legal_address: z.string().optional(),
    postal_address: z.string().optional(),
    same_address: z.boolean().optional()
})

const oooContactsSchema = z.object({
    email: z.string().email({ message: 'Введите корректный email' }),
    contact_phone: z.string().optional(),
    contact_person: z.string().optional(),
    ceo_full_name: z.string().min(5, { message: 'ФИО руководителя должно содержать не менее 5 символов' }),
    recipient_full_name: z.string().optional()
})

const oooBankSchema = z.object({
    bank_name: z.string().optional(),
    bik: z
        .string()
        .length(9, { message: 'БИК должен содержать 9 цифр' })
        .regex(/^\d+$/, { message: 'БИК должен содержать только цифры' })
        .optional()
        .or(z.literal('')),
    checking_account: z
        .string()
        .length(20, { message: 'Расчетный счет должен содержать 20 цифр' })
        .regex(/^\d+$/, { message: 'Расчетный счет должен содержать только цифры' }),
    correspondent_account: z
        .string()
        .length(20, { message: 'Корреспондентский счет должен содержать 20 цифр' })
        .regex(/^\d+$/, { message: 'Корреспондентский счет должен содержать только цифры' })
        .optional()
        .or(z.literal('')),
    bank_inn: z
        .string()
        .length(10, { message: 'ИНН банка должен содержать 10 цифр' })
        .regex(/^\d+$/, { message: 'ИНН банка должен содержать только цифры' })
        .optional()
        .or(z.literal('')),
    bank_kpp: z
        .string()
        .length(9, { message: 'КПП банка должен содержать 9 цифр' })
        .regex(/^\d+$/, { message: 'КПП банка должен содержать только цифры' })
        .optional()
        .or(z.literal(''))
})

export function OooForm() {
    const [currentStep, setCurrentStep] = useState(1)

    const onNext = () => {
        setCurrentStep(currentStep + 1)
    }

    const onBack = () => {
        setCurrentStep(currentStep - 1)
    }

    const isLastStep = currentStep === 3

    const mainForm = useForm<z.infer<typeof oooMainSchema>>({
        resolver: zodResolver(oooMainSchema),
        defaultValues: {
            organization_name: '',
            inn: '',
            kpp: '',
            ogrn: '',
            legal_address: '',
            postal_address: '',
            same_address: false
        }
    })

    const contactsForm = useForm<z.infer<typeof oooContactsSchema>>({
        resolver: zodResolver(oooContactsSchema),
        defaultValues: {
            email: '',
            contact_phone: '',
            contact_person: '',
            ceo_full_name: '',
            recipient_full_name: ''
        }
    })

    const bankForm = useForm<z.infer<typeof oooBankSchema>>({
        resolver: zodResolver(oooBankSchema),
        defaultValues: {
            bank_name: '',
            bik: '',
            checking_account: '',
            correspondent_account: '',
            bank_inn: '',
            bank_kpp: ''
        }
    })

    function onMainSubmit(values: z.infer<typeof oooMainSchema>) {
        console.log(values)
        onNext()
    }

    function onContactsSubmit(values: z.infer<typeof oooContactsSchema>) {
        console.log(values)
        onNext()
    }

    function onBankSubmit(values: z.infer<typeof oooBankSchema>) {
        console.log(values)
        // Submit final form
        console.log('Form submitted!')
    }

    return (
        <>
            {currentStep === 1 && (
                <Form {...mainForm}>
                    <form onSubmit={mainForm.handleSubmit(onMainSubmit)} className='space-y-4'>
                        <FormField
                            control={mainForm.control}
                            name='organization_name'
                            render={({ field }) => (
                                <FormItem className='space-y-2'>
                                    <FormLabel className='flex items-center gap-1'>
                                        Название организации
                                        <Badge variant='outline' className='ml-2 text-xs font-normal'>
                                            Обязательно
                                        </Badge>
                                    </FormLabel>
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
                            control={mainForm.control}
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
                                        <Badge variant='outline' className='ml-2 text-xs font-normal'>
                                            Обязательно
                                        </Badge>
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
                            control={mainForm.control}
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
                            control={mainForm.control}
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
                            control={mainForm.control}
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
                            control={mainForm.control}
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
                            control={mainForm.control}
                            name='same_address'
                            render={({ field }) => (
                                <FormItem className='flex items-center space-x-2 space-y-0'>
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            className='data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500'
                                        />
                                    </FormControl>
                                    <FormLabel className='text-xs text-gray-300'>Совпадает с юридическим</FormLabel>
                                </FormItem>
                            )}
                        />

                        <div className='flex justify-end mt-6'>
                            <Button
                                type='submit'
                                className='bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg flex items-center gap-2'
                            >
                                Далее
                                <ChevronRight className='h-4 w-4' />
                            </Button>
                        </div>
                    </form>
                </Form>
            )}

            {currentStep === 2 && (
                <Form {...contactsForm}>
                    <form onSubmit={contactsForm.handleSubmit(onContactsSubmit)} className='space-y-4'>
                        <FormField
                            control={contactsForm.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem className='space-y-2'>
                                    <FormLabel className='flex items-center gap-1'>
                                        E-mail
                                        <Badge variant='outline' className='ml-2 text-xs font-normal'>
                                            Обязательно
                                        </Badge>
                                    </FormLabel>
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
                            control={contactsForm.control}
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
                            control={contactsForm.control}
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
                            control={contactsForm.control}
                            name='ceo_full_name'
                            render={({ field }) => (
                                <FormItem className='space-y-2'>
                                    <FormLabel className='flex items-center gap-1'>
                                        ФИО руководителя организации
                                        <Badge variant='outline' className='ml-2 text-xs font-normal'>
                                            Обязательно
                                        </Badge>
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
                            control={contactsForm.control}
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
                                type='submit'
                                className='bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg flex items-center gap-2'
                            >
                                Далее
                                <ChevronRight className='h-4 w-4' />
                            </Button>
                        </div>
                    </form>
                </Form>
            )}

            {currentStep === 3 && (
                <Form {...bankForm}>
                    <form onSubmit={bankForm.handleSubmit(onBankSubmit)} className='space-y-4'>
                        <FormField
                            control={bankForm.control}
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
                            control={bankForm.control}
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
                            control={bankForm.control}
                            name='checking_account'
                            render={({ field }) => (
                                <FormItem className='space-y-2'>
                                    <FormLabel className='flex items-center gap-1'>
                                        Расчетный счет
                                        <Badge variant='outline' className='ml-2 text-xs font-normal'>
                                            Обязательно
                                        </Badge>
                                    </FormLabel>
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
                            control={bankForm.control}
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
                            control={bankForm.control}
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
                            control={bankForm.control}
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
                                className='bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg flex items-center gap-2'
                            >
                                Создать
                                <Check className='h-4 w-4' />
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </>
    )
}
