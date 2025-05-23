import { useQuery } from '@tanstack/react-query'

import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import api from '@/api/api'

const EventCreateStepOne = ({ form, step, nextStep }: { form: any; step: number; nextStep: any }) => {
    const { data: limits } = useQuery(
        ['limits'],
        async () => {
            const res = await api.get('/api/age/limits/')
            return res.data
        },
        {
            staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
            cacheTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
            refetchOnWindowFocus: false // Prevent refetching when window regains focus
        }
    )

    const { data: category } = useQuery(
        ['category'],
        async () => {
            const res = await api.get('/api/category/')
            return res.data
        },
        {
            staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
            cacheTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
            refetchOnWindowFocus: false // Prevent refetching when window regains focus
        }
    )

    return (
        <>
            {step === 1 && (
                <div className='space-y-6'>
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Название мероприятия*</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='Введите название мероприятия'
                                        className='bg-[#1c232b] border-[#1c232b] text-white'
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='description'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Описание*</FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder='Введите описание мероприятия'
                                        className='bg-[#1c232b] border-[#1c232b] text-white min-h-[100px]'
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='category_id'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Категория</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className='bg-[#1c232b] border-[#1c232b] text-white'>
                                            <SelectValue placeholder='Выберите категорию' />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className='bg-[#1c232b] border-[#1c232b] text-white'>
                                        {category?.map((l: any) => (
                                            <SelectItem key={l.id} value={l.id.toString()}>
                                                {l.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='age_limit'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Возрастное ограничение</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className='bg-[#1c232b] border-[#1c232b] text-white'>
                                                <SelectValue placeholder='Выберите возрастное ограничение' />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className='bg-[#1c232b] border-[#1c232b] text-white'>
                                            {limits?.map((l: any) => (
                                                <SelectItem key={l.id} value={l.id.toString()}>
                                                    {l.age_limit}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type='button'
                        onClick={nextStep}
                        className='w-full bg-[#2AABEE] hover:bg-[#229ED9] text-white'
                    >
                        Далее
                    </Button>
                </div>
            )}
        </>
    )
}

export default EventCreateStepOne
