import styles from './StatusMessage.module.css'

export default function StatusMessage({ type, message }) {
    if (!message) {
        return null;
    }

    return (
        <div className={`${styles.statusMessage} ${styles[type]}`}>
            <div className={styles.accent} />
            <p>{message}</p>
        </div>
    )
}