import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const EventCreateStepThree = ({ form, step, nextStep }: { form: any; step: number; nextStep: any }) => {
    return (
        <>
            {step === 3 && (
                <div className='space-y-6'>
                    <div className='bg-[#1c232b] p-4 rounded-md'>
                        <h3 className='font-medium mb-3'>Информация о билетах</h3>
                        <div className='space-y-4'>
                            <FormField
                                control={form.control}
                                name='event_category.name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Название билета</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder='например, VIP'
                                                className='bg-[#17212b] border-[#17212b] text-white'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='event_category.quantity'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Количество</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type='number'
                                                placeholder='например, 50'
                                                className='bg-[#17212b] border-[#17212b] text-white'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='event_category.price'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Цена</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type='number'
                                                placeholder='например, 100000'
                                                className='bg-[#17212b] border-[#17212b] text-white'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='event_category.explanation'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Описание</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder='например, рядом со сценой'
                                                className='bg-[#17212b] border-[#17212b] text-white'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

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

export default EventCreateStepThree
