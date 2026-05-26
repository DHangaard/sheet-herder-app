import styles from './Field.module.css'

export default function Field({ label, id, type = 'text', value, onChange, onBlur, error, autoComplete }) {
    return (
        <div className={styles.field}>
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                autoComplete={autoComplete}
            />
            {error && <span className={styles.error}>{error}</span>}
        </div>
    )
}