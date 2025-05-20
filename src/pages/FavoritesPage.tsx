import { Header } from '../components/layout/Header'
import { BottomNav } from '../components/layout/BottomNav'

export default function FavoritesPage() {
    return (
        <div className='flex min-h-screen flex-col items-center justify-center  pb-20 pt-16 text-white'>
            <Header />

            <main className='container max-w-md px-4 py-4'>
                <h1 className='mb-6 text-2xl font-bold text-white'>Your Favorites</h1>

                <div className='flex h-[60vh] items-center justify-center rounded-lg bg-muted'>
                    <p className='text-center text-gray-400'>You haven't added any events to your favorites yet</p>
                </div>
            </main>

            <BottomNav />
        </div>
    )
}
