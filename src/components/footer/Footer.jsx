import styles from './Footer.module.css'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p className={styles.text}>
                © 2026 Sheet Herder — School project by{' '}
                <a
                    href="https://github.com/dhangaard"
                    target="_blank"
                    rel="noreferrer"
                >
                    D. Hangaard
                </a>
            </p>
        </footer>
    );
}