'use client'
import { useState, useEffect } from 'react';
import styles from '../../public/css/user.module.css';
import { useRouter } from 'next/navigation';
import EditProfileModal from './EditProfileModal';
import { Client } from '../../types/types';

const ClientHeader = ({ client, onProfileUpdate }: { client: Client, onProfileUpdate: (updatedClient: Client) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const router = useRouter();
 
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
 
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownOpen && !(event.target as HTMLElement).closest(`.${styles.profileDropdown}`)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData')
    setDropdownOpen(false);
    router.push('/');
    router.refresh();
  };

  const handleEditProfile = () => {
    setDropdownOpen(false);
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = async (updatedData: any) => {
    try {
      const token = localStorage.getItem('token');
      console.log('Using token:', token?.substring(0, 20) + '...'); 
  
      if (!token) {
        console.error('No token - redirecting to login');
        router.push('/login');
        return;
      }
  
      const response = await fetch('http://localhost:8000/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include', 
        body: JSON.stringify(updatedData)
      });
  
      if (response.status === 401) {
        const errorData = await response.json();
        console.error('Auth failed:', errorData);
        localStorage.clear();
        router.push('/login');
        throw new Error('Session expired. Please log in again.');
      }
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Update failed');
      }
  
      const data = await response.json();
      localStorage.setItem('user', JSON.stringify(data.user));
 
      onProfileUpdate(data.user);

      return data.user;
  
    } catch (error) {
      console.error('Update error:', error);
      throw error;
    }
  };
  return (
    <>
      <header className={`${styles.clientHeader} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.headerContent}>
          <div className={styles.welcomeSection}>
            <h1 className={styles.welcomeHeading}>
              Bonjour, <span className={styles.clientName}>{client.name || client.username}</span>
            </h1>
            <p className={styles.welcomeSubtext}>Voici les biens qui correspondent à vos critères</p>
          </div>

          <button 
            className={`${styles.mobileMenuButton} ${isMobileMenuOpen ? styles.active : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </button>

          <div className={`${styles.userControls} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
            <div className={styles.profileDropdown}>
              <button 
                className={styles.profileButton} 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-expanded={dropdownOpen}
              >
                <span className={styles.avatarCircle}>
                  {(client.name || client.username).charAt(0).toUpperCase()}
                </span>
                <span className={styles.username}>{client.username}</span>
                <span className={`${styles.dropdownArrow} ${dropdownOpen ? styles.open : ''}`}>▼</span>
              </button>
              
              {dropdownOpen && (
                <div className={styles.dropdownMenu}>
                  <div className={styles.dropdownHeader}>
                    <span className={styles.dropdownAvatar}>
                      {(client.name || client.username).charAt(0).toUpperCase()}
                    </span>
                    <div className={styles.dropdownUserInfo}>
                      <span className={styles.dropdownName}>{client.name}</span>
                      <span className={styles.dropdownEmail}>{client.email}</span>
                    </div>
                  </div>
                  <button 
                    className={`${styles.dropdownItem} ${styles.animatedItem}`}
                    onClick={handleEditProfile}
                  >
                    <span className={styles.itemIcon}>👤</span>
                    Modifier mes informations
                  </button>
                  <hr className={styles.dropdownDivider} />
                  <button 
                    className={`${styles.logoutButton} ${styles.animatedItem}`}
                    onClick={handleLogout}
                  >
                    <span className={styles.itemIcon}>🚪</span>
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Modal de modification de profil */}
      {isEditModalOpen && (
        <EditProfileModal
          client={client}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveProfile}
        />
      )}
    </>
  );
};

export default ClientHeader;