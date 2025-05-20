import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const HeaderPartner = ({ path, title }: { path: string; title: string }) => {
    const navigate = useNavigate()

    return (
        <header className='flex gap-3 items-center bg-[#1c232b] px-4 h-16'>
            <button
                onClick={() => {
                    navigate(path)
                }}
                className='p-2 rounded-full hover:bg-[#232e3c] transition-colors'
            >
                <ChevronLeft className='h-6 w-6' />
            </button>
            <p className='text-2xl font-bold'>{title}</p>
        </header>
    )
}

export default HeaderPartner
