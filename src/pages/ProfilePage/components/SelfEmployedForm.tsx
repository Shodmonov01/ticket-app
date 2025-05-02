import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ArrowLeft, ChevronRight, Check, Info, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useState } from 'react'

const selfEmployedMainSchema = z.object({
    recipient_full_name: z.string().min(5, { message: 'ФИО должно содержать не менее 5 символов' }),
    inn: z
        .string()
        .length(12, { message: 'ИНН должен содержать 12 цифр' })
        .regex(/^\d+$/, { message: 'ИНН должен содержать только цифры' }),
    phone: z.string().min(10, { message: 'Введите корректный номер телефона' })
})

const selfEmployedBankSchema = z.object({
    checking_account: z
        .string()
        .length(20, { message: 'Расчетный счет должен содержать 20 цифр' })
        .regex(/^\d+$/, { message: 'Расчетный счет должен содержать только цифры' }),
    bank_name: z.string().optional(),
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
        .or(z.literal('')),
    bik: z
        .string()
        .length(9, { message: 'БИК должен содержать 9 цифр' })
        .regex(/^\d+$/, { message: 'БИК должен содержать только цифры' })
        .optional()
        .or(z.literal('')),
    correspondent_account: z
        .string()
        .length(20, { message: 'Корреспондентский счет должен содержать 20 цифр' })
        .regex(/^\d+$/, { message: 'Корреспондентский счет должен содержать только цифры' })
        .optional()
        .or(z.literal(''))
})

export function SelfEmployedForm() {
    const [currentStep, setCurrentStep] = useState(1)

    const onNext = () => {
        setCurrentStep(currentStep + 1)
    }

    const onBack = () => {
        setCurrentStep(currentStep - 1)
    }

    const mainForm = useForm<z.infer<typeof selfEmployedMainSchema>>({
        resolver: zodResolver(selfEmployedMainSchema),
        defaultValues: {
            recipient_full_name: '',
            inn: '',
            phone: ''
        }
    })

    const bankForm = useForm<z.infer<typeof selfEmployedBankSchema>>({
        resolver: zodResolver(selfEmployedBankSchema),
        defaultValues: {
            checking_account: '',
            bank_name: '',
            bank_inn: '',
            bank_kpp: '',
            bik: '',
            correspondent_account: ''
        }
    })

    function onMainSubmit(values: z.infer<typeof selfEmployedMainSchema>) {
        console.log(values)
        onNext()
    }

    function onBankSubmit(values: z.infer<typeof selfEmployedBankSchema>) {
        console.log(values)
        console.log('Form submitted!')
    }

    return (
        <>
            {currentStep === 1 && (
                <Form {...mainForm}>
                    <form onSubmit={mainForm.handleSubmit(onMainSubmit)} className='space-y-4'>
                        <FormField
                            control={mainForm.control}
                            name='recipient_full_name'
                            render={({ field }) => (
                                <FormItem className='space-y-2'>
                                    <FormLabel className='flex items-center gap-1'>
                                        ФИО получателя
                                        <Badge variant='outline' className='ml-2 text-xs font-normal'>
                                            Обязательно
                                        </Badge>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Иванов Иван Иванович'
                                            className='bg-gray-700 border-gray-600 focus:border-amber-500 focus:ring-amber-500 h-12 rounded-lg'
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
                                                        ИНН должен содержать 12 цифр для физического лица
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
                                            placeholder='123456789012'
                                            maxLength={12}
                                            className='bg-gray-700 border-gray-600 focus:border-amber-500 focus:ring-amber-500 h-12 rounded-lg'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className='text-red-400 text-xs' />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={mainForm.control}
                            name='phone'
                            render={({ field }) => (
                                <FormItem className='space-y-2'>
                                    <FormLabel className='flex items-center gap-1'>
                                        Номер телефона
                                        <Badge variant='outline' className='ml-2 text-xs font-normal'>
                                            Обязательно
                                        </Badge>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='+7 (999) 123-45-67'
                                            className='bg-gray-700 border-gray-600 focus:border-amber-500 focus:ring-amber-500 h-12 rounded-lg'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className='text-xs text-gray-400'>
                                        Телефон, привязанный к приложению "Мой налог"
                                    </FormDescription>
                                    <FormMessage className='text-red-400 text-xs' />
                                </FormItem>
                            )}
                        />

                        <div className='bg-amber-900/20 border border-amber-700/30 rounded-lg p-4 flex items-start'>
                            <AlertCircle className='h-5 w-5 text-amber-400 mr-3 mt-0.5' />
                            <p className='text-sm text-gray-200'>
                                Для регистрации в качестве самозанятого необходимо установить приложение "Мой налог" и
                                зарегистрироваться в нем
                            </p>
                        </div>

                        <div className='flex justify-end mt-6'>
                            <Button
                                type='submit'
                                className='bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg flex items-center gap-2'
                            >
                                Далее
                                <ChevronRight className='h-4 w-4' />
                            </Button>
                        </div>
                    </form>
                </Form>
            )}

            {currentStep === 2 && (
                <Form {...bankForm}>
                    <form onSubmit={bankForm.handleSubmit(onBankSubmit)} className='space-y-4'>
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
                                            className='bg-gray-700 border-gray-600 focus:border-amber-500 focus:ring-amber-500 h-12 rounded-lg'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className='text-red-400 text-xs' />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={bankForm.control}
                            name='bank_name'
                            render={({ field }) => (
                                <FormItem className='space-y-2'>
                                    <FormLabel>Название банка</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Сбербанк'
                                            className='bg-gray-700 border-gray-600 focus:border-amber-500 focus:ring-amber-500 h-12 rounded-lg'
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
                                            className='bg-gray-700 border-gray-600 focus:border-amber-500 focus:ring-amber-500 h-12 rounded-lg'
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
                                            className='bg-gray-700 border-gray-600 focus:border-amber-500 focus:ring-amber-500 h-12 rounded-lg'
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
                                            className='bg-gray-700 border-gray-600 focus:border-amber-500 focus:ring-amber-500 h-12 rounded-lg'
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
                                            className='bg-gray-700 border-gray-600 focus:border-amber-500 focus:ring-amber-500 h-12 rounded-lg'
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
                                className='bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg flex items-center gap-2'
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
