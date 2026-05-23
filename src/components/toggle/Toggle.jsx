import SunIcon from '../../assets/icons/sun-icon.svg?react'
import MoonIcon from '../../assets/icons/moon-icon.svg?react'
import styles from './Toggle.module.css'

export default function Toggle({ isDark, toggleTheme }) {
    return (
        <div className={styles.toggleContainer}>
            <input
                type="checkbox"
                id="theme-toggle"
                className={styles.input}
                onChange={toggleTheme}
                checked={isDark}
            />
            <label htmlFor="theme-toggle" className={styles.label} aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
                <span className={styles.icon}>
                    {isDark ? <MoonIcon /> : <SunIcon />}
                </span>
            </label>
        </div>
    )
}