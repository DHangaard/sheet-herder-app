import { useNavigate } from 'react-router'
import ImagePlaceholder from '../imagePlaceholder/ImagePlaceholder.jsx'
import styles from './FeatureCard.module.css'

export default function FeatureCard({ title, description, to }) {
    const navigate = useNavigate()

    return (
        <div className={styles.card} onClick={() => navigate(to)}>
            <ImagePlaceholder />
            <div className={styles.overlay}>
                <h5 className={styles.title}>{title}</h5>
                <small className={styles.description}>{description}</small>
            </div>
        </div>
    )
}