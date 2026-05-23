import { useState } from 'react'
import styles from './HomepageGuest.module.css'
import FeaturePanel from '../../components/featurePanel/FeaturePanel.jsx'

const tabs = [
    { id: 'character', label: 'Character Creator' },
    { id: 'campaign', label: 'Campaign Creator' },
]

const tabContent = {
    character: {
        heading: 'Bring Your Character to Life',
        description: 'In TTRPG, the only limit is your imagination. Sheet Herder gives you the tools to build and manage your characters so you can focus on the adventure:',
        bullets: [
            'Create a character in minutes',
            'Keep your sheets organised across sessions',
            'Access your characters anywhere',
        ],
        ctaLabel: 'Create A Character →',
        ctaTo: '/login',
    },
    campaign: {
        heading: 'Run Your Campaign Your Way',
        description: 'Every great adventure needs a great Game Master. Sheet Herder helps keep track of players and their characters so nothing gets lost between sessions:',
        bullets: [
            'Gather your players in one place',
            'Track characters across your campaign',
            'Stay organised, session after session',
        ],
        ctaLabel: 'Start A Campaign →',
        ctaTo: '/login',
    },
}

export default function HomepageGuest() {
    const [activeTab, setActiveTab] = useState('character')
    const content = tabContent[activeTab]

    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <h1>Sheet Herder</h1>
                <p className={styles.heroSubtitle}>
                    Your digital companion for tabletop adventures. Manage characters and campaigns in one place.
                </p>
            </section>
            <section className={styles.features}>
                <FeaturePanel
                    heading={content.heading}
                    description={content.description}
                    bullets={content.bullets}
                    ctaLabel={content.ctaLabel}
                    ctaTo={content.ctaTo}
                    tabs={tabs}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />
            </section>
        </div>
    )
}