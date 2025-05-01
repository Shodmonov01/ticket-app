import type React from 'react'
import { useState } from 'react'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { ChevronLeft } from 'lucide-react'

import api from '@/api/api'

import { Form } from '@/components/ui/form'
import EventCreateStepOne from './EventCreateStepOne'
import EventCreateStepTwo from './EventCreateStepTwo'
import EventCreateStepThree from './EventCreateStepThree'
import EventCreateStepFour from './EventCreateStepFour'
import { BottomNav } from '@/components/layout/bottom-nav'
import { Header } from '@/components/layout/header'

const formSchema = z.object({
    name: z.string().min(2, { message: 'Название должно содержать минимум 2 символа' }),
    description: z.string().min(10, { message: 'Описание должно содержать минимум 10 символов' }),
    category_id: z.string().optional(),
    age_limit: z.string().optional(),
    city_id: z.string().optional(),
    area: z.string().optional(),
    image: z.any().optional(),
    event_category: z.object({
        name: z.string().min(1, { message: 'Укажите название билета' }),
        quantity: z.string().min(1, { message: 'Укажите количество' }),
        price: z.string().min(1, { message: 'Укажите цену' }),
        explanation: z.string().optional()
    }),
    event_time: z.object({
        date: z.string().min(1, { message: 'Укажите дату' }),
        start_time: z.string().min(1, { message: 'Укажите время начала' }),
        end_time: z.string().min(1, { message: 'Укажите время окончания' })
    })
})

type FormValues = z.infer<typeof formSchema>

interface ImageFile {
    file: File
    preview: string
}

const EventCreationForm = () => {
    const [step, setStep] = useState(1)
    const [imageFiles, setImageFiles] = useState<ImageFile[]>([])

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            description: '',
            category_id: '',
            age_limit: '',
            city_id: '',
            area: '',
            event_category: {
                name: '',
                quantity: '',
                price: '',
                explanation: ''
            },
            event_time: {
                date: '',
                start_time: '',
                end_time: ''
            }
        }
    })

    const nextStep = () => {
        if (step === 1) {
            form.trigger(['name', 'description', 'category_id', 'age_limit']).then(isValid => {
                if (isValid) setStep(step + 1)
            })
        } else if (step === 2) {
            form.trigger(['city_id', 'area']).then(isValid => {
                if (isValid) setStep(step + 1)
            })
        } else if (step === 3) {
            form.trigger(['event_category']).then(isValid => {
                if (isValid) setStep(step + 1)
            })
        } else {
            setStep(step + 1)
        }
    }

    const prevStep = () => setStep(step - 1)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles: ImageFile[] = []

            Array.from(e.target.files).forEach(file => {
                newFiles.push({
                    file,
                    preview: URL.createObjectURL(file)
                })
            })

            setImageFiles([...imageFiles, ...newFiles])
        }
    }

    const removeImage = (index: number) => {
        const newImageFiles = [...imageFiles]
        URL.revokeObjectURL(newImageFiles[index].preview)
        newImageFiles.splice(index, 1)
        setImageFiles(newImageFiles)
    }

    const onSubmit = async (data: FormValues) => {
        const formData = new FormData()

        Object.entries(data).forEach(([key, value]: [string, any]) => {
            if (key === 'event_category') {
                formData.append(key, JSON.stringify([value]))
            } else if (key === 'event_time') {
                formData.append(key, JSON.stringify([value]))
            } else if (['category_id', 'age_limit', 'city_id', 'area'].includes(key)) {
                formData.append(key, String(Number(value)))
            } else if (key === 'image') {
                value.forEach((file: any) => {
                    formData.append('image', file)
                })
            } else {
                formData.append(key, String(value))
            }
        })
        console.log('form', formData)

        try {
            const res = await api.post('/api/event/for/owner/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            console.log(res.data)
            alert('Мероприятие успешно создано!')
        } catch (error) {
            console.error('Error submitting form:', error)
            alert('Произошла ошибка')
        }
    }

    return (
        <div>
            <Header />
            <div className='max-w-md mx-auto p-4 pt-20 h-full pb-20'>
                <div className='flex items-center mb-6'>
                    <button
                        onClick={prevStep}
                        disabled={step === 1}
                        className='p-2 rounded-full hover:bg-[#232e3c] transition-colors'
                    >
                        <ChevronLeft className='h-6 w-6' />
                    </button>
                    <h1 className='text-2xl font-bold ml-4'>Создание мероприятия</h1>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                        <EventCreateStepOne form={form} step={step} nextStep={nextStep} />
                        <EventCreateStepTwo
                            form={form}
                            step={step}
                            nextStep={nextStep}
                            handleImageChange={handleImageChange}
                            imageFiles={imageFiles}
                            removeImage={removeImage}
                        />
                        <EventCreateStepThree form={form} step={step} nextStep={nextStep} />
                        <EventCreateStepFour form={form} step={step} nextStep={nextStep} />
                    </form>
                </Form>
            </div>
            <BottomNav />
        </div>
    )
}

export default EventCreationForm
