import { Button } from '@/components/ui/button'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { Share2, User, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function SheetProfile({ open, setOpen }: { open: boolean; setOpen: (value: boolean) => void }) {
    const navigate = useNavigate()

    return (
        <div className='flex items-center justify-center bg-zinc-900 p-3'>
            <Sheet open={open} onOpenChange={setOpen}>
                <div className='rounded-t-xl !p-3'>
                    <SheetContent side='bottom' className=' text-white  border-0 bg-transparent p-0 '>
                        <div className='flex flex-col gap-3 p-3'>
                            <div className=' rounded-xl bg-[#1c232b] p-2'>
                                <button className='flex w-full items-center gap-3 rounded-lg p-3 '>
                                    <div className='flex h-9 w-9 items-center justify-center bg-[#29333d] rounded-lg'>
                                        <Share2 className='h-5 w-5 text-white' />
                                    </div>
                                    <span className='text-base font-semibold'>Поделиться профилем</span>
                                </button>

                                <button
                                    onClick={() => navigate('/edit-profile')}
                                    className='flex w-full items-center gap-3 rounded-lg p-3 '
                                >
                                    <div className='flex h-9 w-9 items-center justify-center bg-[#29333d] rounded-lg'>
                                        <User className='h-5 w-5 text-white' />
                                    </div>
                                    <span className='text-base font-semibold'>Редактировать профиль</span>
                                </button>

                                <button className='flex w-full items-center gap-3 rounded-lg p-3   '>
                                    <div className='flex h-9 w-9 items-center justify-center bg-[#29333d] rounded-lg'>
                                        <LogOut className='h-5 w-5 text-red-500' />
                                    </div>
                                    <span className='text-base font-semibold'>Выйти</span>
                                </button>
                            </div>

                            <Button
                                variant='ghost'
                                className='bg-[#1c232b] p-4 text-center text-blue-400 h-14 text-md rounded-xl'
                                onClick={() => setOpen(false)}
                            >
                                Отмена
                            </Button>
                        </div>
                    </SheetContent>
                </div>
            </Sheet>
        </div>
    )
}
