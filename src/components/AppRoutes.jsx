import { Routes, Route } from 'react-router'
import App from '../App.jsx'
import Homepage from '../pages/homepage/Homepage.jsx'

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<Homepage />} />
                
            </Route>
        </Routes>
    )
}

/*
import Login from '../pages/user/login/Login.jsx'
import Register from '../pages/user/register/Register.jsx'
import Account from '../pages/user/account/Account.jsx'
import CharacterOverview from '../pages/character/overview/CharacterOverview.jsx'
import CharacterDetail from '../pages/character/detail/CharacterDetail.jsx'
import CharacterCreate from '../pages/character/create/CharacterCreate.jsx'
import CampaignOverview from '../pages/campaign/overview/CampaignOverview.jsx'
import NotFound from '../pages/notFound/NotFound.jsx'

<Route path="login" element={<Login />} />
<Route path="register" element={<Register />} />
<Route path="account" element={<Account />} />
<Route path="characters" element={<CharacterOverview />} />
<Route path="characters/:id" element={<CharacterDetail />} />
<Route path="characters/create" element={<CharacterCreate />} />
<Route path="campaigns" element={<CampaignOverview />} />
<Route path="*" element={<NotFound />} />
*/