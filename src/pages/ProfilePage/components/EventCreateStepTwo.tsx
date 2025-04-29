import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Upload, X } from 'lucide-react'

const EventCreateStepTwo = ({
    form,
    step,
    nextStep,
    handleImageChange,
    imageFiles,
    removeImage
}: {
    form: any
    step: number
    nextStep: any
    handleImageChange: any
    imageFiles: any
    removeImage: any
}) => {
    return (
        <>
            {step === 2 && (
                <div className='space-y-6'>
                    <FormField
                        control={form.control}
                        name='city_id'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Город</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className='bg-[#1c232b] border-[#1c232b] text-white'>
                                            <SelectValue placeholder='Выберите город' />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className='bg-[#1c232b] border-[#1c232b] text-white'>
                                        <SelectItem value='1'>Москва</SelectItem>
                                        <SelectItem value='2'>Санкт-Петербург</SelectItem>
                                        <SelectItem value='3'>Казань</SelectItem>
                                        <SelectItem value='4'>Новосибирск</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='area'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Район</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className='bg-[#1c232b] border-[#1c232b] text-white'>
                                            <SelectValue placeholder='Выберите район' />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className='bg-[#1c232b] border-[#1c232b] text-white'>
                                        <SelectItem value='1'>Центральный</SelectItem>
                                        <SelectItem value='2'>Северный</SelectItem>
                                        <SelectItem value='3'>Южный</SelectItem>
                                        <SelectItem value='4'>Западный</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className='space-y-2'>
                        <Label>Изображения мероприятия</Label>
                        <div className={`border-2 border-dashed rounded-lg p-6 transition-colors `}>
                            <div className='flex flex-col items-center justify-center space-y-2 text-center'>
                                <Upload className='h-10 w-10 text-[#2AABEE]' />
                                <div className='text-sm'>
                                    {/* <p>Выберите изображения сюда или</p> */}
                                    <label
                                        htmlFor='image-upload'
                                        className='text-[#2AABEE] hover:text-[#229ED9] cursor-pointer font-medium'
                                    >
                                        Выберите изображения
                                    </label>
                                </div>
                                <p className='text-xs text-gray-400'>PNG, JPG до 10MB</p>
                                <input
                                    id='image-upload'
                                    type='file'
                                    accept='image/*'
                                    onChange={handleImageChange}
                                    className='hidden'
                                    multiple
                                />
                            </div>
                        </div>

                        {imageFiles.length > 0 && (
                            <div className='mt-4 space-y-4'>
                                <div className='text-sm font-medium'>Загруженные изображения ({imageFiles.length})</div>
                                <div className='grid grid-cols-2 gap-4'>
                                    {imageFiles.map((file: any, index: number) => (
                                        <div key={index} className='relative group'>
                                            <div className='relative h-32 w-full overflow-hidden rounded-md'>
                                                <img
                                                    src={file.preview || '/placeholder.svg'}
                                                    alt={`Изображение ${index + 1}`}
                                                    className='object-cover'
                                                />
                                            </div>
                                            <button
                                                type='button'
                                                onClick={() => removeImage(index)}
                                                className='absolute top-1 right-1 bg-black/50 rounded-full p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity'
                                            >
                                                <X className='h-4 w-4' />
                                            </button>
                                        </div>
                                    ))}
                                    <label
                                        htmlFor='image-upload'
                                        className='flex flex-col items-center justify-center h-32 w-full border-2 border-dashed border-[#1c232b] rounded-md cursor-pointer hover:border-[#2AABEE] transition-colors'
                                    >
                                        <Plus className='h-8 w-8 text-[#2AABEE]' />
                                        <span className='mt-1 text-sm text-gray-400'>Добавить ещё</span>
                                    </label>
                                </div>
                            </div>
                        )}
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

export default EventCreateStepTwo
