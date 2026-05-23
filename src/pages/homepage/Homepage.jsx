import { useAuth } from '../../context/AuthContext'
import HomepageGuest from './HomepageGuest.jsx'
import HomepageLoggedIn from './HomepageLoggedIn.jsx'

export default function Homepage() {
    const { isLoggedIn } = useAuth()
    return isLoggedIn ? <HomepageLoggedIn /> : <HomepageGuest />
}