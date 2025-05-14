import { useState } from 'react'

export function TicketInfo({ event, onClose }) {
    const [favorites, setFavorites] = useState(appState.eventsFavorites)
    const [fullDescription, setFullDescription] = useState(false)
    const [selectedDate, setSelectedDate] = useState(appState.selectedDate)
    const [selectedTimeline, setSelectedTimeline] = useState(appState.selectedTimeline)

    const toggleFavorite = () => {
        if (favorites.includes(event)) {
            setFavorites(favorites.filter(item => item !== event))
        } else {
            setFavorites([...favorites, event])
        }
    }

    const openOptions = () => {
        alert('Options modal opened (e.g., share, report, etc.)')
    }

    return (
        <div className='fixed inset-0 bg-gray-900 text-white flex flex-col overflow-y-auto z-50'>
            {/* Header Image Section */}
            <div className='relative w-full h-[382px]'>
                <img src={event.image} alt='Event' className='w-full h-[380px] object-cover' />
                <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900/90 flex flex-col justify-between'>
                    <div className='flex justify-between p-4 pt-12'>
                        <button onClick={onClose} className='bg-black/40 p-2 rounded-full'>
                            <svg className='w-6 h-6' fill='none' stroke='white' viewBox='0 0 24 24'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M15 19l-7-7 7-7'
                                />
                            </svg>
                        </button>
                        <div className='flex space-x-2'>
                            <button onClick={toggleFavorite} className='bg-black/40 p-2 rounded-full'>
                                <svg
                                    className='w-6 h-6'
                                    fill={favorites.includes(event) ? 'red' : 'none'}
                                    stroke='white'
                                    viewBox='0 0 24 24'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                                    />
                                </svg>
                            </button>
                            <button onClick={openOptions} className='bg-black/40 p-2 rounded-full'>
                                <svg className='w-6 h-6' fill='none' stroke='white' viewBox='0 0 24 24'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z'
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className='p-4'>
                        <h1 className='text-2xl font-bold'>{event.name}</h1>
                        <p className='text-sm text-gray-400'>
                            {event.event_time[0]?.date} · {event.location}
                        </p>
                    </div>
                </div>
            </div>

            {/* Organizer Section */}
            <div className='px-4 py-6'>
                <div className='bg-gray-800 rounded-lg p-4 flex justify-between items-center'>
                    <div className='flex items-center space-x-4'>
                        <img src='https://via.placeholder.com/50' alt='Organizer' className='w-12 h-12 rounded-full' />
                        <div>
                            <p className='font-semibold'>Ultra Music Festival</p>
                            <p className='text-sm text-gray-400'>220K Followers</p>
                        </div>
                    </div>
                    <button className='bg-blue-600 text-white px-4 py-2 rounded-lg'>Follow</button>
                </div>
            </div>

            {/* About Section */}
            <div className='px-4 py-6'>
                <h2 className='text-xl font-bold'>About</h2>
                <p className='mt-2 text-sm'>{fullDescription ? event.descr : `${event.descr.slice(0, 200)}...`}</p>
                <button onClick={() => setFullDescription(!fullDescription)} className='text-blue-500 mt-2'>
                    {fullDescription ? 'Show less' : 'Read more'}
                </button>
            </div>

            {/* General Information Section */}
            <div className='px-4 py-6'>
                <h2 className='text-xl font-bold'>General Information</h2>
                <p className='mt-2 text-sm'>
                    📅 Date: Sunday & Thursdays (select your date below)
                    <br />
                    🕒 Time: 3:30 p.m.
                    <br />
                    ⏳ Duration: 3.5 hours
                    <br />
                    📍 Meeting point: The Swiss Clock in Leicester Square next to the M&M's store
                    <br />
                    👤 Age requirement: 18+ with valid ID
                </p>
                <div className='mt-6 flex items-center'>
                    <p className='text-3xl font-bold'>4.9</p>
                    <div className='ml-4'>
                        <div className='flex space-x-1'>
                            {[...Array(5)].map((_, i) => (
                                <svg
                                    key={i}
                                    className='w-5 h-5 text-yellow-400'
                                    fill='currentColor'
                                    viewBox='0 0 20 20'
                                >
                                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.357 2.44a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.538 1.118l-3.357-2.44a1 1 0 00-1.175 0l-3.357 2.44c-.783.57-1.838-.197-1.538-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.56 9.397c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.97z' />
                                </svg>
                            ))}
                        </div>
                        <p className='text-sm text-gray-400'>Based on 245 reviews</p>
                    </div>
                </div>
            </div>

            {/* Comments Section */}
            <div className='py-6'>
                <div className='flex space-x-4 overflow-x-auto px-4'>
                    {appState.commentsList.map(comment => (
                        <div key={comment.id} className='bg-gray-800 rounded-lg p-4 w-64 flex-shrink-0'>
                            <p className='text-sm'>{comment.text}</p>
                            <p className='text-xs text-gray-400 mt-2'>— {comment.author}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Date and Session Selection */}
            <div className='px-4 py-6'>
                <h2 className='text-xl font-bold'>Select your date and session</h2>
                <div className='mt-4 bg-gray-800 rounded-lg p-4'>
                    <p className='text-sm'>Calendar Placeholder (Selected: {selectedDate.toDateString()})</p>
                </div>
                <div className='mt-4 flex space-x-2 overflow-x-auto'>
                    {appState.timeline.map(time => (
                        <button
                            key={time}
                            onClick={() => setSelectedTimeline(time)}
                            className={`px-4 py-2 rounded-lg border ${
                                selectedTimeline === time
                                    ? 'border-blue-500 text-blue-500'
                                    : 'border-gray-600 text-white'
                            }`}
                        >
                            {time}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tickets Section */}
            <div className='px-4 py-6'>
                {appState.tickets.map((ticket, index) => (
                    <div key={ticket.id} className='bg-gray-800 rounded-lg p-4 mb-4'>
                        <p className='font-semibold'>{ticket.type}</p>
                        <p className='text-sm text-gray-400'>{ticket.price}</p>
                        <div className='flex justify-between mt-4 space-x-2'>
                            <button
                                className='flex-1 bg-blue-600 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-700'
                                onClick={() => console.log(`Buy ticket ${ticket.id}`)}
                            >
                                Buy Ticket
                            </button>
                            <button
                                className='flex-1 bg-gray-600 text-white px-3 py-2 rounded-md text-sm hover:bg-gray-700'
                                onClick={() => console.log(`Share ticket ${ticket.id}`)}
                            >
                                Share
                            </button>
                            <button
                                className='flex-1 bg-green-600 text-white px-3 py-2 rounded-md text-sm hover:bg-green-700'
                                onClick={() => console.log(`Save ticket ${ticket.id}`)}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Warning Section */}
            <div className='px-4 py-6'>
                <div className='bg-yellow-900/20 rounded-lg p-4 flex items-start'>
                    <svg className='w-7 h-7 text-yellow-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                        />
                    </svg>
                    <div className='ml-3'>
                        <p className='font-semibold text-yellow-600'>Hurry Up! Tickets Are Selling Fast</p>
                        <p className='text-sm text-yellow-600'>
                            Tickets are in high demand and availability is limited.
                        </p>
                    </div>
                </div>
            </div>

            {/* Gallery Section */}
            <div className='px-4 py-6'>
                <h2 className='text-xl font-bold'>Gallery</h2>
                <div className='grid grid-cols-3 gap-2 mt-4'>
                    {[
                        'https://via.placeholder.com/110',
                        'https://via.placeholder.com/110',
                        'https://via.placeholder.com/110',
                        'https://via.placeholder.com/110',
                        'https://via.placeholder.com/110',
                        'https://via.placeholder.com/110'
                    ].map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`Gallery ${index + 1}`}
                            className='w-full h-[110px] object-cover rounded-lg'
                        />
                    ))}
                </div>
            </div>

            {/* Location Section */}
            <div className='px-4 py-6'>
                <h2 className='text-xl font-bold'>Location</h2>
                <p className='text-sm text-gray-400 mt-2'>{event.fullLocation}</p>
                <div className='mt-4 relative rounded-lg overflow-hidden'>
                    <img
                        src='https://via.placeholder.com/600x200'
                        alt='Map'
                        className='w-full h-[200px] object-cover'
                    />
                    <div className='absolute inset-0 bg-black/50'></div>
                </div>
            </div>

            {/* Recommended Events Section */}
            <div className='px-4 py-6'>
                <h2 className='text-xl font-bold'>You'll love it</h2>
                <div className='flex space-x-4 overflow-x-auto mt-4'>
                    {appState.events.map(event => (
                        <div key={event.id} className='bg-gray-800 rounded-lg p-4 w-64 flex-shrink-0'>
                            <img src={event.img} alt={event.title} className='w-full h-32 object-cover rounded-lg' />
                            <p className='mt-2 font-semibold'>{event.title}</p>
                            <p className='text-sm text-gray-400'>{event.date}</p>
                            <div className='flex justify-between mt-4 space-x-2'>
                                <button
                                    className='flex-1 bg-blue-600 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-700'
                                    onClick={() => console.log(`Buy ticket for event ${event.id}`)}
                                >
                                    Buy Ticket
                                </button>
                                <button
                                    className='flex-1 bg-gray-600 text-white px-3 py-2 rounded-md text-sm hover:bg-gray-700'
                                    onClick={() => console.log(`Share event ${event.id}`)}
                                >
                                    Share
                                </button>
                                <button
                                    className='flex-1 bg-green-600 text-white px-3 py-2 rounded-md text-sm hover:bg-green-700'
                                    onClick={() => console.log(`Save event ${event.id}`)}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer / Get Tickets */}
            <div className='border-t border-gray-700 bg-gray-800 p-4 flex justify-between items-center'>
                <p className='text-xl font-bold'>{event.event_category[0]?.price}</p>
                <button
                    onClick={() => alert('Navigate to checkout page')}
                    className='bg-blue-600 text-white px-6 py-3 rounded-lg w-1/2'
                >
                    Get Tickets
                </button>
            </div>
        </div>
    )
}
