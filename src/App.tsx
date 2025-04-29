'use client'

import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useUser } from './context/user-context'
import IntroPage from './pages/IntroPage'
import HomePage from './pages/HomePage'
import ExplorePage from './pages/ExplorePage'
import FavoritesPage from './pages/FavoritesPage'
import TicketsPage from './pages/TicketsPage/TicketsPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import EventCreationForm from './pages/ProfilePage/components/EventCreationForm'

function App() {
    const { isFirstTimeUser } = useUser()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (isFirstTimeUser && location.pathname !== '/intro') {
            navigate('/intro')
        }
    }, [isFirstTimeUser, navigate, location.pathname])

    return (
        <Routes>
            <Route path='/intro' element={<IntroPage />} />
            <Route path='/' element={<HomePage />} />
            <Route path='/explore' element={<ExplorePage />} />
            <Route path='/favorites' element={<FavoritesPage />} />
            <Route path='/tickets' element={<TicketsPage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/profile/create-event' element={<EventCreationForm />} />
        </Routes>
    )
}

export default App
