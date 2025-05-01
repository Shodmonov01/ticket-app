import { Button } from '@/components/ui/button'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { Share2, User, LogOut } from 'lucide-react'

export default function SheetProfile({ open, setOpen }: { open: boolean; setOpen: (value: boolean) => void }) {
    return (
        <div className='flex h-screen items-center justify-center bg-zinc-900 p-4'>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side='bottom' className='bg-black text-white border-t border-zinc-800 rounded-t-xl p-0'>
                    <div className='flex flex-col'>
                        <div className='space-y-4 p-4 rounded-xl bg-[#1c232b]'>
                            <button className='flex w-full items-center gap-3 rounded-lg p-2 hover:bg-zinc-800'>
                                <div className='flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800'>
                                    <Share2 className='h-5 w-5 text-blue-400' />
                                </div>
                                <span className='text-base font-medium'>Поделиться профилем</span>
                            </button>

                            {/* jefhjerbf */}
                            <button className='flex w-full items-center gap-3 rounded-lg p-2 hover:bg-zinc-800'>
                                <div className='flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800'>
                                    <User className='h-5 w-5 text-white' />
                                </div>
                                <span className='text-base font-medium'>Редактировать профиль</span>
                            </button>

                            <button className='flex w-full items-center gap-3 rounded-lg p-2 hover:bg-zinc-800'>
                                <div className='flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800'>
                                    <LogOut className='h-5 w-5 text-red-400' />
                                </div>
                                <span className='text-base font-medium'>Выйти</span>
                            </button>
                        </div>

                        <Button
                            variant='ghost'
                            className='bg-[#1c232b] p-4 text-center text-blue-400'
                            onClick={() => setOpen(false)}
                        >
                            Отмена
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}
