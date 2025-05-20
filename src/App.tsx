import { useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'

import { useUser } from './context/UserContext'

import IntroPage from './pages/IntroPage'
import ExplorePage from './pages/ExplorePage'
import FavoritesPage from './pages/FavoritesPage'
import TicketsPage from './pages/TicketsPage/TicketsPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import EventCreationForm from './pages/ProfilePage/components/forms/EventCreationForm'
import { OooForm } from './pages/ProfilePage/components/forms/OooForm'
import { IpForm } from './pages/ProfilePage/components/forms/IpForm'
import { SelfEmployedForm } from './pages/ProfilePage/components/forms/SelfEmployedForm'
import OrganizatorProfilePage from './pages/ProfilePage/OrganizatorProfilePage'
import DistributorProfilePage from './pages/ProfilePage/DistributorProfilePage'
import EditProfilePage from './pages/ProfilePage/EditPage'
import HomePage from './pages/HomePage'
import PartnerRolePage from './pages/ProfilePage/PartnerRolePage'

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
            <Route path='/profile/organization-role' element={<PartnerRolePage />} />
            <Route path='/ooo-form' element={<OooForm />} />
            <Route path='/ip-form' element={<IpForm />} />
            <Route path='/self-employed-form' element={<SelfEmployedForm />} />
            <Route path='/profile/organization-profile' element={<OrganizatorProfilePage />} />
            <Route path='/profile/distributor-profile' element={<DistributorProfilePage />} />
            <Route path='/edit-profile' element={<EditProfilePage />} />
        </Routes>
    )
}

export default App
