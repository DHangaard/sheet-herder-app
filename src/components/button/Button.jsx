import styles from './Button.module.css'

export default function Button({ variant = 'primary', type = 'button', onClick, disabled = false, children }) {
    return (
        <button
            type={type}
            className={`${styles.button} ${styles[variant]}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}