import styles from './FeaturePanel.module.css'
import Button from '../button/Button.jsx'
import ImagePlaceholder from '../imagePlaceholder/ImagePlaceholder.jsx'
import TabSwitcher from '../tabSwitcher/TabSwitcher.jsx'
import { useNavigate } from 'react-router'

export default function FeaturePanel({ heading, description, bullets, ctaLabel, ctaTo, tabs, activeTab, onTabChange }) {
    const navigate = useNavigate()

    return (
        <div className={styles.panel}>
            <div className={styles.content}>
                <TabSwitcher
                    tabs={tabs}
                    activeTab={activeTab}
                    onTabChange={onTabChange}
                />
                <div className={styles.text}>
                    <h3 className={styles.heading}>{heading}</h3>
                    <p className={styles.description}>{description}</p>
                    <ul className={styles.bullets}>
                        {bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                        ))}
                    </ul>
                </div>
                <Button onClick={() => navigate(ctaTo)}>{ctaLabel}</Button>
            </div>
            <div className={styles.image}>
                <ImagePlaceholder />
            </div>
        </div>
    )
}