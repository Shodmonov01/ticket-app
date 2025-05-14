import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle
} from '@/components/ui/sheet'
import api from '@/api/api'
import { useQueryClient } from '@tanstack/react-query'

const formSchema = z.object({
    name: z
        .string()
        .max(250, {
            message: 'Название канала не должно превышать 250 символов.'
        })
        .optional()
        .nullable(),
    urls: z
        .string()
        .max(200, {
            message: 'URL канала не должен превышать 200 символов.'
        })
        .optional()
        .nullable()
})

type ChannelFormValues = z.infer<typeof formSchema>

export function CreateChannelForm({ isOpen, setIsOpen }: any) {
    const queryClient = useQueryClient()

    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<ChannelFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            urls: ''
        }
    })

    async function onSubmit(values: ChannelFormValues) {
        setIsLoading(true)

        try {
            const response = await api.post('/auth/api/telegram/channel/create/', { ...values })

            setIsOpen(false)
            form.reset()
            queryClient.invalidateQueries(['user'])
        } catch (error) {
            console.log('error', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetContent side='bottom' className='sm:max-w-md border-0 bg-[#1c232b]'>
                <SheetHeader>
                    <SheetTitle>Создать Telegram-канал</SheetTitle>
                    <SheetDescription>Создайте новый Telegram-канал с названием и URL.</SheetDescription>
                </SheetHeader>
                <div className='py-4'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Название канала</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Введите название канала'
                                                {...field}
                                                value={field.value || ''}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='urls'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>URL канала</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Введите URL канала'
                                                {...field}
                                                value={field.value || ''}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <SheetFooter className='pt-4'>
                                <SheetClose asChild>
                                    <Button variant='outline' type='button' className='my-3'>
                                        Отмена
                                    </Button>
                                </SheetClose>
                                <Button type='submit' disabled={isLoading}>
                                    {isLoading ? 'Создание...' : 'Создать канал'}
                                </Button>
                            </SheetFooter>
                        </form>
                    </Form>
                </div>
            </SheetContent>
        </Sheet>
    )
}
