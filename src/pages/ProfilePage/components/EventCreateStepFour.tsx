import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const EventCreateStepFour = ({ form, step, nextStep }: { form: any; step: number; nextStep: any }) => {
    return (
        <>
            {step === 4 && (
                <div className='space-y-6'>
                    <div className='bg-[#242f3d] p-4 rounded-md'>
                        <h3 className='font-medium mb-3'>Время проведения</h3>
                        <div className='space-y-4'>
                            <FormField
                                control={form.control}
                                name='event_time.date'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Дата</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type='date'
                                                className='bg-[#17212b] border-[#17212b] text-white'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='event_time.start_time'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Время начала</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type='time'
                                                className='bg-[#17212b] border-[#17212b] text-white'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='event_time.end_time'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Время окончания</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type='time'
                                                className='bg-[#17212b] border-[#17212b] text-white'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <Button type='submit' className='w-full bg-[#2AABEE] hover:bg-[#229ED9] text-white'>
                        Создать мероприятие
                    </Button>
                </div>
            )}
        </>
    )
}

export default EventCreateStepFour
