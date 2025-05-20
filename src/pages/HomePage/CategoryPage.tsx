import { useState } from 'react'
import { ArrowLeft, ChevronLeft, ChevronRight, Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'
import PopularCard from './components/PopularCard'
import FilterButtons from './components/FilterButtons'
import TrendingCard from './components/TrendingCard'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'

export default function CategoryPage() {
    const navigate = useNavigate()

    const [showDateModal, setShowDateModal] = useState(false)
    const [showCategoriesModal, setShowCategoriesModal] = useState(false)
    const [showSortModal, setShowSortModal] = useState(false)
    const [selectedDate, setSelectedDate] = useState<number | null>(7)
    const [selectedCategories, setSelectedCategories] = useState<string[]>(['Tourism'])
    const [selectedSort, setSelectedSort] = useState<string>('Popularity')

    const toggleDateModal = () => {
        setShowDateModal(!showDateModal)
        setShowCategoriesModal(false)
        setShowSortModal(false)
    }

    const toggleCategoriesModal = () => {
        setShowCategoriesModal(!showCategoriesModal)
        setShowDateModal(false)
        setShowSortModal(false)
    }

    const toggleSortModal = () => {
        setShowSortModal(!showSortModal)
        setShowDateModal(false)
        setShowCategoriesModal(false)
    }

    const removeCategory = (category: string) => {
        setSelectedCategories(selectedCategories.filter(c => c !== category))
    }

    return (
        <div className='min-h-screen text-white'>
            {/* Header */}
            <header className='p-4 flex items-center gap-4'>
                <button onClick={() => navigate('/')} className='text-white'>
                    <ArrowLeft size={24} />
                </button>
                <h1 className='text-xl font-semibold flex-1 text-center'>Search results</h1>
            </header>

            <div className='px-4 mb-4'>
                <div className='relative'>
                    <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
                    <input
                        type='text'
                        placeholder='Discover city tours, restaurants ...'
                        className='w-full bg-[#2a2d31] text-gray-300 py-3 pl-10 pr-4 rounded-lg focus:outline-none'
                    />
                </div>
            </div>

            <FilterButtons
                toggleDateModal={toggleDateModal}
                toggleCategoriesModal={toggleCategoriesModal}
                toggleSortModal={toggleSortModal}
                selectedCategories={selectedCategories}
                removeCategory={removeCategory}
            />

            <div className='px-4 mb-6'>
                <h2 className='text-xl font-bold mb-4'>Trending events</h2>
                <TrendingCard />
            </div>

            <div className='px-4'>
                <h2 className='text-xl font-bold mb-4'>Search result</h2>

                <PopularCard />
            </div>

            {/* Date Modal */}
            {showDateModal && (
                <div className='fixed inset-0 bg-black/60 z-50 flex items-end'>
                    <div className='bg-[#1a1d21] w-full rounded-t-3xl p-6 animate-slide-up'>
                        <h2 className='text-xl font-bold text-center mb-4'>Date</h2>
                        {/* 
                        <div className='flex justify-between items-center mb-6'>
                            <button className='p-2'>
                                <ChevronLeft size={24} />
                            </button>
                            <h3 className='text-lg font-medium'>May 2025</h3>
                            <button className='p-2'>
                                <ChevronRight size={24} />
                            </button>
                        </div> */}

                        <Calendar className='text-xl' />

                        <button
                            className='w-full bg-[#0099ff] text-white py-4 rounded-lg font-medium'
                            onClick={toggleDateModal}
                        >
                            Apply
                        </button>
                    </div>
                </div>
            )}

            {/* Categories Modal */}
            {showCategoriesModal && (
                <div className='fixed inset-0 bg-black/60 z-50 flex items-end'>
                    <div className='bg-[#1a1d21] w-full rounded-t-3xl p-6 animate-slide-up'>
                        <h2 className='text-xl font-bold text-center mb-6'>Categories</h2>

                        <div className='space-y-4'>
                            {[
                                'Tourism',
                                'Live Shows',
                                'Activities',
                                'Cinema',
                                'Meetups',
                                'Festivals',
                                'Seminars',
                                'Exhibitions',
                                'Nightlife'
                            ].map(category => (
                                <div key={category} className='flex items-center gap-4'>
                                    <div className='w-12 h-12 bg-gray-700 rounded-lg overflow-hidden'>
                                        <img
                                            src='/placeholder.svg?height=48&width=48'
                                            alt={category}
                                            width={48}
                                            height={48}
                                            className='w-full h-full object-cover'
                                        />
                                    </div>
                                    <span className='text-lg'>{category}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Sort Modal */}
            {showSortModal && (
                <div className='fixed inset-0 bg-black/60 z-50 flex items-end'>
                    <div className='bg-[#1a1d21] w-full rounded-t-3xl p-6 animate-slide-up'>
                        <h2 className='text-xl font-bold text-center mb-6'>Sort</h2>

                        <div className='space-y-6 mb-6'>
                            {[
                                'Popularity',
                                'Rating',
                                'Price: Low to High',
                                'Price: High to Low',
                                'Number of views'
                            ].map(option => (
                                <div
                                    key={option}
                                    className='flex items-center justify-between'
                                    onClick={() => setSelectedSort(option)}
                                >
                                    <span className='text-lg'>{option}</span>
                                    {selectedSort === option && (
                                        <div className='w-6 h-6 rounded-full bg-[#0099ff] flex items-center justify-center'>
                                            <svg
                                                width='14'
                                                height='10'
                                                viewBox='0 0 14 10'
                                                fill='none'
                                                xmlns='http://www.w3.org/2000/svg'
                                            >
                                                <path
                                                    d='M1 5L5 9L13 1'
                                                    stroke='white'
                                                    strokeWidth='2'
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <button
                            className='w-full bg-[#0099ff] text-white py-4 rounded-lg font-medium'
                            onClick={toggleSortModal}
                        >
                            Apply
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
