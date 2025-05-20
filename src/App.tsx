import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useUser } from './context/UserContext'
import IntroPage from './pages/IntroPage'
import HomePage from './pages/HomePage/HomePage'
import ExplorePage from './pages/ExplorePage'
import FavoritesPage from './pages/FavoritesPage'
import TicketsPage from './pages/TicketsPage/TicketsPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import EventCreationForm from './pages/ProfilePage/components/EventCreationForm'
import OrganizationRolePage from './pages/ProfilePage/OrganizationRolePage'
import { OooForm } from './pages/ProfilePage/components/OooForm'
import { IpForm } from './pages/ProfilePage/components/IpForm'
import { SelfEmployedForm } from './pages/ProfilePage/components/SelfEmployedForm'
import OrganizatorProfilePage from './pages/ProfilePage/OrganizatorProfilePage'
import DistributorRolePage from './pages/ProfilePage/DistributorRolePage'
import DistributorProfilePage from './pages/ProfilePage/DistributorProfilePage'
import CategoryPage from './pages/HomePage/CategoryPage'
import EditProfilePage from './pages/ProfilePage/EditPage'

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
            <Route path='/profile/organization-role' element={<OrganizationRolePage />} />
            <Route path='/profile/distributor-role' element={<DistributorRolePage />} />
            <Route path='/ooo-form' element={<OooForm />} />
            <Route path='/ip-form' element={<IpForm />} />
            <Route path='/self-employed-form' element={<SelfEmployedForm />} />
            <Route path='/profile/organization-profile' element={<OrganizatorProfilePage />} />
            <Route path='/profile/distributor-profile' element={<DistributorProfilePage />} />
            <Route path='/category' element={<CategoryPage />} />
            <Route path='/edit-profile' element={<EditProfilePage />} />
        </Routes>
    )
}

export default App
