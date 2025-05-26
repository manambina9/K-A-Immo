'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../../styles/propriete/proprietaire.module.css';

const Sidebar = () => {
  const pathname = usePathname();
  const [userId, setUserId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  type SubmenuType = 'biens' | 'locations' | null;
  const [activeSubmenu, setActiveSubmenu] = useState<SubmenuType>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          const user = JSON.parse(userData);
          setUserId(user.id);
        } catch (error) {
          console.error("Erreur de parsing des données utilisateur :", error);
        }
      }
    }
  }, []);

  const toggleSubmenu = (menu: SubmenuType) => {
    setActiveSubmenu(activeSubmenu === menu ? null : menu);
  };

  const logout = () => { 
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUserId(null);
    window.location.href = '/login';
  }

  return (
    <>
      {/* Bouton hamburger pour mobile */}
      <button 
        className={`${styles.mobileMenuButton} ${isOpen ? styles.open : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.logo}>Propriétaire</h2>
          <p className={styles.userWelcome}>Bienvenue, {userId ? `User #${userId}` : 'Invité'}</p>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {/* Tableau de bord */}
            <li className={`${styles.navItem} ${pathname === '/proprietaire/dashboard' ? styles.active : ''}`}>
              <Link href="/proprietaire/dashboard" className={styles.navLink}>
                <span className={styles.navIcon}>🏠</span>
                <span className={styles.navText}>Tableau de bord</span>
              </Link>
            </li>

            {userId && (
              <>
                {/* Mes biens */}
                <li className={`${styles.navItem} ${pathname.includes('/proprietaire/biens') ? styles.active : ''}`}>
                  <Link 
                    href={`/proprietaire/${userId}/biens`} 
                    className={styles.navLink}
                  >
                    <span className={styles.navIcon}>📦</span>
                    <span className={styles.navText}>Mes biens</span>
                  </Link>
                </li>

                {/* Locations */}
                <li className={`${styles.navItem} ${pathname.includes('/proprietaire/locations') ? styles.active : ''}`}>
                  <div 
                    className={styles.navLink} 
                    onClick={() => toggleSubmenu('locations')}
                  >
                    <span className={styles.navIcon}>💰</span>
                    <span className={styles.navText}>Locations</span>
                    <span className={`${styles.arrow} ${activeSubmenu === 'locations' ? styles.rotate : ''}`}>▼</span>
                  </div>
                  {activeSubmenu === 'locations' && (
                    <ul className={styles.submenu}>
                      <li className={styles.submenuItem}>
                        <Link href={`/proprietaire/${userId}/locations/actives`} className={styles.submenuLink}>
                          Locations actives
                        </Link>
                      </li>
                      <li className={styles.submenuItem}>
                        <Link href={`/proprietaire/${userId}/locations/historique`} className={styles.submenuLink}>
                          Historique
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              </>
            )}

            {/* Profil */}
            <li className={`${styles.navItem} ${pathname.includes('/proprietaire/profile') ? styles.active : ''}`}>
                <Link 
                  href={`/proprietaire/${userId}/profile`} 
                  className={styles.navLink}
                >
                <span className={styles.navIcon}>👤</span>
                <span className={styles.navText}>Profil</span>
              </Link>
            </li>

            {/* Paramètres */}
            <li className={`${styles.navItem} ${pathname === '/proprietaire/parametres' ? styles.active : ''}`}>
              <Link href="/proprietaire/parametres" className={styles.navLink}>
                <span className={styles.navIcon}>⚙️</span>
                <span className={styles.navText}>Paramètres</span>
              </Link>
            </li>

            {/* Support */}
            <li className={`${styles.navItem} ${pathname === '/proprietaire/support' ? styles.active : ''}`}>
              <Link href="/proprietaire/support" className={styles.navLink}>
                <span className={styles.navIcon}>🛟</span>
                <span className={styles.navText}>Support</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles.sidebarFooter} onClick={() => logout()}>
          <div className={styles.logoutButtonContainer}>
            <button className={styles.logoutButton}>
              <span>🚪</span>
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;