import { NavLink, Link } from 'react-router'
import { useAuth } from '../../context/AuthContext'
import { useAuthActions } from '../../context/AuthContext'
import styles from './Header.module.css'
import Toggle from '../toggle/Toggle.jsx'

const navLinks = [
    { label: 'My Characters', to: '/characters' },
    { label: 'My Campaigns', to: '/campaigns' },
];

export default function Header({ isDark, toggleTheme }) {
    const { currentUser, isLoggedIn } = useAuth();
    const { logout } = useAuthActions();

    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                <div className={styles.left}>
                    <Link to="/" className={styles.logo}>Sheet Herder</Link>
                    <nav aria-label="Main navigation">
                        <ul className={styles.navList}>
                            {navLinks.map((link) => (
                                <li key={link.to}>
                                    <NavLink
                                        to={link.to}
                                        className={({ isActive }) =>
                                            isActive
                                                ? `${styles.navLink} ${styles.navLinkActive}`
                                                : styles.navLink
                                        }
                                    >
                                        {link.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                <div className={styles.right}>
                    {isLoggedIn ? (
                        <>
                            <Link to="/account" className={styles.username}>
                                {currentUser.username}
                            </Link>
                            <button className={styles.logoutButton} onClick={logout}>
                                Log out
                            </button>
                        </>
                    ) : (
                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                isActive
                                    ? `${styles.navLink} ${styles.navLinkActive}`
                                    : styles.navLink
                            }
                        >
                            Log in
                        </NavLink>
                    )}
                    <Toggle isDark={isDark} toggleTheme={toggleTheme} />
                </div>
            </div>
        </header>
    );
}