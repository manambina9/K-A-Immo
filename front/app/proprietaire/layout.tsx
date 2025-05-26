'use client';
import Sidebar from '../../component/proprietaire/Sidebar';
import styles from '../../styles/propriete/proprietaire.module.css';  
import React, { useState } from 'react';

export default function ProprietaireLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar/>
      <div className={`${styles.dashboardContent} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.contentWrapper}>
          {children}
        </div>
      </div>
      {sidebarOpen && (
        <div className={styles.overlay} onClick={toggleSidebar} />
      )}
    </div>
  );
}