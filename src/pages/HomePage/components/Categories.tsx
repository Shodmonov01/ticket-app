import { useNavigate } from 'react-router-dom'

const Categories = () => {
    const navigate = useNavigate()

    return (
        <div className='grid grid-cols-2 gap-3'>
            <div onClick={() => navigate('/category')} className='flex items-center gap-3 rounded-lg bg-[#1c232b] p-3'>
                <div className='h-12 w-12 overflow-hidden rounded-xl'>
                    <img
                        src='https://thumbs.dreamstime.com/b/silhouettes-concert-crowd-front-bright-stage-lights-confetti-colourful-background-high-lighted-places-people-holding-83284529.jpg'
                        alt='Tourism'
                        className='h-full w-full object-cover'
                    />
                </div>
                <span className='font-medium text-white'>Tourism</span>
            </div>
            <div className='flex items-center gap-3 rounded-lg bg-[#1c232b] p-3'>
                <div className='h-12 w-12 overflow-hidden rounded-xl'>
                    <img
                        src='https://thumbs.dreamstime.com/b/silhouettes-concert-crowd-front-bright-stage-lights-confetti-colourful-background-high-lighted-places-people-holding-83284529.jpg'
                        alt='Live Shows'
                        className='h-full w-full object-cover'
                    />
                </div>
                <span className='font-medium text-white'>Live Shows</span>
            </div>
        </div>
    )
}

export default Categories
