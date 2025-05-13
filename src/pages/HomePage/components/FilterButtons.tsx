import { Calendar, LayoutGrid, SlidersHorizontal, X } from 'lucide-react'

const FilterButtons = ({
    toggleDateModal,
    toggleCategoriesModal,
    toggleSortModal,
    selectedCategories,
    removeCategory
}: any) => {
    return (
        <div className='px-4 flex gap-2 mb-6'>
            <button onClick={toggleDateModal} className='flex items-center gap-2 bg-[#2a2d31] py-2 px-4 rounded-full'>
                <Calendar size={18} />
                <span>Date</span>
            </button>

            <button
                onClick={toggleCategoriesModal}
                className={`flex items-center gap-2 py-2 px-4 rounded-full ${
                    selectedCategories.includes('Tourism') ? 'bg-white text-black' : 'bg-[#2a2d31]'
                }`}
            >
                <LayoutGrid size={18} />
                <span>Tourism</span>
                {selectedCategories.includes('Tourism') && (
                    <button
                        onClick={e => {
                            e.stopPropagation()
                            removeCategory('Tourism')
                        }}
                    >
                        <X size={16} />
                    </button>
                )}
            </button>

            <button onClick={toggleSortModal} className='flex items-center gap-2 bg-[#2a2d31] py-2 px-4 rounded-full'>
                <SlidersHorizontal size={18} />
                <span>Sort</span>
            </button>
        </div>
    )
}

export default FilterButtons
