'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/Admin/sidebar.module.css';

type SidebarProps = {
  isOpen: boolean;
  activeMenu: string;
  setActiveMenu: (menuId: string) => void;
  toggleSidebar: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, activeMenu, setActiveMenu, toggleSidebar }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: 'fas fa-th-large', href: '/admin' },
    { id: 'properties', label: 'Biens Immobiliers', icon: 'fas fa-home', href: '/admin/properties' },
    { id: 'clients', label: 'Clients', icon: 'fas fa-users', href: '/admin/clients' },
    { id: 'messages', label: 'Messages', icon: 'fas fa-envelope', href: '/admin/messages' },
    { id: 'settings', label: 'Paramètres', icon: 'fas fa-cog', href: '/admin/settings' },
  ];

  return (
    <>
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.logo}>
          <i className={`${styles.logoIcon} fas fa-building`}></i>
          <h2>ImmoAdmin</h2>
        </div>
        
        <nav className={styles.navigation}>
          {menuItems.map((item) => (
            <Link 
              href={item.href} 
              key={item.id}
              className={`${styles.navItem} ${activeMenu === item.id ? styles.active : ''}`}
              onClick={() => setActiveMenu(item.id)}
            >
              <span className={styles.navIcon}>
                <i className={item.icon}></i>
              </span>
              <span className={styles.navLabel}>{item.label}</span>
            </Link>
          ))}
          
          <div className={styles.divider}></div>
          
          <Link 
            href="/admin/analytics" 
            className={`${styles.navItem} ${activeMenu === 'analytics' ? styles.active : ''}`}
            onClick={() => setActiveMenu('analytics')}
          >
            <span className={styles.navIcon}>
              <i className="fas fa-chart-line"></i>
            </span>
            <span className={styles.navLabel}>Statistiques</span>
          </Link>
          
          <Link 
            href="/admin/help" 
            className={`${styles.navItem} ${activeMenu === 'help' ? styles.active : ''}`}
            onClick={() => setActiveMenu('help')}
          >
            <span className={styles.navIcon}>
              <i className="fas fa-question-circle"></i>
            </span>
            <span className={styles.navLabel}>Aide</span>
          </Link>
        </nav>
        
        <div className={styles.userSection}>
          <img src="/api/placeholder/40/40" alt="Admin" className={styles.userAvatar} />
          <div className={styles.userInfo}>
            <p className={styles.userName}>Admin User</p>
            <p className={styles.userRole}>Administrateur</p>
          </div>
        </div>
      </aside>
      
      {/* Bouton pour ouvrir/fermer le sidebar en mobile */}
      <button 
        className={styles.toggleButton} 
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
      </button>
    </>
  );
};

export default Sidebar;