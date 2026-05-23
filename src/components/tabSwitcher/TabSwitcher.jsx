import styles from './TabSwitcher.module.css'

export default function TabSwitcher({ tabs, activeTab, onTabChange }) {
    return (
        <div className={styles.tabSwitcher}>
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
                    onClick={() => onTabChange(tab.id)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    )
}