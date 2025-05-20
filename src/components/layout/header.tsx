import { Bell, ChevronDown, MapPin } from 'lucide-react'
import { Button } from '../ui/button'
import { useState, useEffect } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { useQuery } from '@tanstack/react-query'
import api from '@/api/Api'

export function Header() {
    const [location, setLocation] = useState<string>('')

    const { data: cities, isLoading: isCitiesLoading } = useQuery<{ id: number; name: string }[]>({
        queryKey: ['cities'],
        queryFn: async () => {
            const res = await api.get('/api/cities/')
            return res.data
        }
    })

    // Устанавливаем первый город как выбранный по умолчанию
    useEffect(() => {
        if (cities && cities.length > 0 && !location) {
            setLocation(cities[0].name)
        }
    }, [cities, location])

    return (
        <div className='fixed top-0 left-0 right-0 z-50 flex h-16 w-full items-center justify-between bg-[#1c232b] px-4'>
            <div className='flex items-center gap-2'>
                <MapPin className='h-5 w-5 text-gray-400' />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='ghost' className='flex items-center gap-1 p-0'>
                            <span className='text-white'>
                                {isCitiesLoading ? 'Loading...' : location || 'Select city'}
                            </span>
                            <ChevronDown className='h-4 w-4 text-gray-400' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='start'>
                        {isCitiesLoading ? (
                            <DropdownMenuItem>Loading cities...</DropdownMenuItem>
                        ) : (
                            cities?.map(city => (
                                <DropdownMenuItem key={city.id} onClick={() => setLocation(city.name)}>
                                    {city.name}
                                </DropdownMenuItem>
                            ))
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <Button variant='ghost' size='icon' className='text-white'>
                <Bell className='h-5 w-5' />
            </Button>
        </div>
    )
}
