import { useAuth } from '../../context/AuthContext'
import FeatureCard from '../../components/featureCard/FeatureCard.jsx'
import styles from './HomepageLoggedIn.module.css'

const cards = [
    {
        id: 'characters',
        title: 'My Characters',
        description: 'Build and manage your heroes in one place',
        to: '/characters',
    },
    {
        id: 'campaigns',
        title: 'My Campaigns',
        description: 'Gather your players and track every session',
        to: '/campaigns',
    },
]

export default function HomepageLoggedIn() {
    const { currentUser } = useAuth()

    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <h1>Herd Your Sheets</h1>
                <p className={styles.heroSubtitle}>
                    Welcome back, {currentUser.username}! Continue where you left off.
                </p>
            </section>
            <section className={styles.cards}>
                {cards.map((card) => (
                    <FeatureCard
                        key={card.id}
                        title={card.title}
                        description={card.description}
                        to={card.to}
                    />
                ))}
            </section>
        </div>
    )
}