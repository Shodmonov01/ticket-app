import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '@/api/Api'

const formSchema = z.object({
    first_name: z
        .string()
        .max(150, {
            message: 'Имя не должно превышать 150 символов'
        })
        .optional(),
    last_name: z
        .string()
        .max(150, {
            message: 'Фамилия не должна превышать 150 символов'
        })
        .optional(),
    email: z
        .string()
        .email({
            message: 'Пожалуйста, введите корректный email'
        })
        .max(254)
        .optional(),
    phone_number: z.string().max(15, {
        message: 'Номер телефона не должен превышать 15 символов'
    })
})

export default function EditProfilePage() {
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            first_name: '',
            last_name: '',
            email: '',
            phone_number: ''
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        try {
            await api.put('/auth/api/user/profile/', { values })
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='min-h-screen  text-white'>
            <div className='max-w-md mx-auto px-4 py-8'>
                <div className='flex items-center mb-6'>
                    <Link to='/profile' className='mr-4'>
                        <ChevronLeft className='h-6 w-6' />
                    </Link>
                    <h1 className='text-xl font-semibold'>Редактировать Профиль</h1>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                        <FormField
                            control={form.control}
                            name='first_name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Имя</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Введите ваше имя' {...field} className='bg-[#1c232b] ' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='last_name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Фамилия</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Введите вашу фамилию'
                                            {...field}
                                            className='bg-[#1c232b] '
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>E-mail</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='example@domain.com'
                                            type='email'
                                            {...field}
                                            className='bg-[#1c232b] '
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='phone_number'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Номер телефона</FormLabel>
                                    <FormControl>
                                        <Input placeholder='+7 (999) 123-45-67' {...field} className='bg-[#1c232b] ' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className='w-full flex justify-center '>
                            <Button type='submit' className='w-full !h-[45px]' disabled={isLoading}>
                                {isLoading ? 'Сохранение...' : 'Сохранить изменения'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}
