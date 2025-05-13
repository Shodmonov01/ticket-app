const TrendingCard = () => {
    return (
        <div className='flex gap-3 !w-full  overflow-x-auto scrollbar-hide'>
            <div className=' relative !rounded-xl !min-w-[150px] h-[200px]'>
                <img
                    src='https://thumbs.dreamstime.com/b/silhouettes-concert-crowd-front-bright-stage-lights-confetti-colourful-background-high-lighted-places-people-holding-83284529.jpg'
                    alt='Skydiving'
                    width={150}
                    height={200}
                    className='w-full h-full object-cover !rounded-xl'
                />
                <div className='absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent'>
                    <div className='text-lg font-bold'>$300</div>
                    <div className='text-xs text-gray-300'>Adventure Tourism</div>
                    <div className='text-sm font-medium'>Skydiving over the Grand Canyon</div>
                </div>
            </div>
            <div className=' relative !rounded-xl min-w-[150px] h-[200px]'>
                <img
                    src='https://thumbs.dreamstime.com/b/silhouettes-concert-crowd-front-bright-stage-lights-confetti-colourful-background-high-lighted-places-people-holding-83284529.jpg'
                    alt='Skydiving'
                    width={150}
                    height={200}
                    className='w-full h-full object-cover !rounded-xl'
                />
                <div className='absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent'>
                    <div className='text-lg font-bold'>$300</div>
                    <div className='text-xs text-gray-300'>Adventure Tourism</div>
                    <div className='text-sm font-medium'>Skydiving over the Grand Canyon</div>
                </div>
            </div>{' '}
            <div className='relative !rounded-xl min-w-[150px] h-[200px]'>
                <img
                    src='https://thumbs.dreamstime.com/b/silhouettes-concert-crowd-front-bright-stage-lights-confetti-colourful-background-high-lighted-places-people-holding-83284529.jpg'
                    alt='Skydiving'
                    width={150}
                    height={200}
                    className='w-full h-full object-cover !rounded-xl'
                />
                <div className='absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent'>
                    <div className='text-lg font-bold'>$300</div>
                    <div className='text-xs text-gray-300'>Adventure Tourism</div>
                    <div className='text-sm font-medium'>Skydiving over the Grand Canyon</div>
                </div>
            </div>{' '}
            <div className='relative !rounded-xl min-w-[150px] h-[200px]'>
                <img
                    src='https://thumbs.dreamstime.com/b/silhouettes-concert-crowd-front-bright-stage-lights-confetti-colourful-background-high-lighted-places-people-holding-83284529.jpg'
                    alt='Skydiving'
                    width={150}
                    height={200}
                    className='w-full h-full object-cover !rounded-xl'
                />
                <div className='absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent'>
                    <div className='text-lg font-bold'>$300</div>
                    <div className='text-xs text-gray-300'>Adventure Tourism</div>
                    <div className='text-sm font-medium'>Skydiving over the Grand Canyon</div>
                </div>
            </div>
        </div>
    )
}

export default TrendingCard
