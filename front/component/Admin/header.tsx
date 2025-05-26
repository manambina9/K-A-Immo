'use client';

import { useState } from 'react';
import styles from '../../styles/Admin/header.module.css';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={styles.header}>
      <h1>Tableau de Bord</h1>
      
      <div className={styles.searchBar}>
        <i className="fas fa-search"></i>
        <input type="text" placeholder="Rechercher..." />
      </div>
      
      <div 
        className={styles.userInfo} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src="/api/placeholder/40/40" alt="Admin" />
        <span>Admin</span>
        
        {isOpen && (
          <div className={styles.dropdown}>
            <a href="#profile">Profil</a>
            <a href="#settings">Paramètres</a>
            <a href="#logout">Déconnexion</a>
          </div>
        )}
      </div>
    </header>
  );
}