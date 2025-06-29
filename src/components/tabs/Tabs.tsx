import { Suspense, useState } from 'react';
import Loader from '../ui/loader/Loader';
import { Tab } from '@/types/navigation';
import styles from './Tabs.module.scss';

interface TabsProps {
  tabs: Tab[];
}
const Tabs = ({ tabs }:TabsProps) => {
  const [activeTab, setActiveTab] = useState<number>(tabs[0].id);
  return (
    <>
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles["tab-button"]} ${activeTab === tab.id 
                ? styles.active
                : ""
            }`}
            onClick={() => setActiveTab(tab.id)}>
            {tab.label}
          </button>
        ))}
      </div>
      <div className={styles["tab-content"]}>
        {tabs.map((tab) =>
          tab.id === activeTab 
          ? <Suspense fallback={<Loader color="blue" size="sm" />} key={tab.id}>
                <tab.component />
            </Suspense>
          : null
        )}
      </div>
    </>
  );
};

export default Tabs;
