import styles from './FormCard.module.css'

export default function FormCard({ title, children }) {
    return (
        <div className={styles.card}>
            <h2>{title}</h2>
            {children}
        </div>
    )
}