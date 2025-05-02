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
import api from '@/api/api'

const selfEmployedFormSchema = z.object({
    recipient_full_name: z.string().min(5, { message: 'ФИО должно содержать не менее 5 символов' }),

    checking_account: z
        .string()
        .max(20, { message: 'Расчетный счет не должен превышать 20 цифр' })
        .regex(/^\d+$/, { message: 'Расчетный счет должен содержать только цифры' }),

    bank_name: z.string().optional(),

    bank_inn: z
        .string()
        .max(10, { message: 'ИНН банка не должен превышать 10 цифр' })
        .regex(/^\d+$/, { message: 'ИНН банка должен содержать только цифры' })
        .optional()
        .or(z.literal('')),

    bank_kpp: z
        .string()
        .max(9, { message: 'КПП банка не должен превышать 9 цифр' })
        .regex(/^\d+$/, { message: 'КПП банка должен содержать только цифры' })
        .optional()
        .or(z.literal('')),

    bik: z
        .string()
        .max(9, { message: 'БИК не должен превышать 9 цифр' })
        .regex(/^\d+$/, { message: 'БИК должен содержать только цифры' })
        .optional()
        .or(z.literal('')),

    correspondent_account: z
        .string()
        .max(20, { message: 'Корреспондентский счет не должен превышать 20 цифр' })
        .regex(/^\d+$/, { message: 'Корреспондентский счет должен содержать только цифры' })
        .optional()
        .or(z.literal(''))
})

export function SelfEmployedForm() {
    const [currentStep, setCurrentStep] = useState(1)
    const totalSteps = 2

    const form = useForm<z.infer<typeof selfEmployedFormSchema>>({
        resolver: zodResolver(selfEmployedFormSchema),
        defaultValues: {
            recipient_full_name: '',

            checking_account: '',
            bank_name: '',
            bank_inn: '',
            bank_kpp: '',
            bik: '',
            correspondent_account: ''
        },
        mode: 'onChange'
    })

    const onNext = async () => {
        const fieldsToValidate =
            currentStep === 1
                ? ['recipient_full_name', 'checking_account', 'bank_name']
                : ['bank_inn', 'bank_kpp', 'bik', 'correspondent_account']

        const result = await form.trigger(fieldsToValidate as any)

        if (result) {
            setCurrentStep(currentStep + 1)
        }
    }

    const onBack = () => {
        setCurrentStep(currentStep - 1)
    }

    const onSubmit = async (values: z.infer<typeof selfEmployedFormSchema>) => {
        console.log('Form submitted with all values:', values)

        try {
            await api.post('/auth/api/organization/register/llc/', values)
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
                            name='recipient_full_name'
                            render={({ field }) => (
                                <FormItem className='space-y-2'>
                                    <FormLabel className='flex items-center gap-1'>ФИО получателя</FormLabel>
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
                            control={form.control}
                            name='checking_account'
                            render={({ field }) => (
                                <FormItem className='space-y-2'>
                                    <FormLabel className='flex items-center gap-1'>Расчетный счет</FormLabel>
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
                            control={form.control}
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
                            control={form.control}
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
                            control={form.control}
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
                            control={form.control}
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
