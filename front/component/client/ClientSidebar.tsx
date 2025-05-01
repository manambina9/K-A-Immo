'use client';

import { useState, useEffect } from 'react';
import styles from '../../public/css/userSidebar.module.css';

interface Client {
  id: number;
  username: string;
  name: string;
  email: string;
  phone?: string;
}

interface ClientSidebarProps {
  client: Client;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const ClientSidebar = ({ client, activeFilter, onFilterChange }: ClientSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Ferme le tiroir quand on change de filtre (surtout utile sur mobile)
  const handleFilterChange = (filter: string) => {
    onFilterChange(filter);
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  // Gère l'ouverture/fermeture du tiroir
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Bloque le défilement du corps quand le menu est ouvert sur mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      {/* Bouton pour ouvrir/fermer le tiroir */}
      <button
        className={styles.drawerToggle}
        onClick={toggleSidebar}
        aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
      >
        {isOpen ? '✕' : '☰'}
      </button>
      
      {/* Overlay pour fermer en cliquant à l'extérieur */}
      <div 
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`} 
        onClick={() => setIsOpen(false)}
      />

      {/* La barre latérale */}
      <aside className={`${styles.clientSidebar} ${isOpen ? styles.sidebarVisible : ''}`}>
        <div className={styles.profileSection}>
          <div className={styles.profileImage}>
            {(client.name || client.username).charAt(0).toUpperCase()}
          </div>
          <div className={styles.profileInfo}>
            <h2>{client.name || client.username}</h2>
            <p>{client.email}</p>
            {client.phone && <p>{client.phone}</p>}
          </div>
        </div>
        
        <nav className={styles.sidebarNav}>
          <h3>Filtrer les biens</h3>
          <ul>
            {['all', 'favorites', 'appartement', 'maison', 'studio'].map((filter) => (
              <li key={filter}>
                <button 
                  className={`${styles.navButton} ${activeFilter === filter ? styles.active : ''}`}
                  onClick={() => handleFilterChange(filter)}
                >
                  {filter === 'all' && 'Tous les biens'}
                  {filter === 'favorites' && 'Mes favoris'}
                  {filter === 'appartement' && 'Appartements'}
                  {filter === 'maison' && 'Maisons'}
                  {filter === 'studio' && 'Studios'}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className={styles.contactSection}>
          <h3>Votre conseiller</h3>
          <p>Sophie Martin</p>
          <p>sophie.martin@agence.com</p>
          <p>+33 6 98 76 54 32</p>
          <button className={styles.contactButton}>Envoyer un message</button>
        </div>
      </aside>
    </>
  );
};

export default ClientSidebar;