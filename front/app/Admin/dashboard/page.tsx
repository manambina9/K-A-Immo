'use client';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../../../styles/Admin/dashboard.module.css';
import Sidebar from '../../../component/Admin/sidebar'; 
import Header from '../../../component/Admin/header';

const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  type Property = { id: number; title: string; price: string; status: 'approved' | 'pending' | 'rejected'; date: string };
  type Message = { id: number; name: string; email: string; message: string; date: string };

  const [properties, setProperties] = useState<Property[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [stats, setStats] = useState({
    totalProperties: 0,
    activeListings: 0,
    pendingApprovals: 0,
    totalClients: 0
  });

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);
      // Fermer automatiquement la sidebar en mode mobile
      if (mobile && isSidebarOpen) {
        setIsSidebarOpen(false);
      } 
      // Réouvrir automatiquement la sidebar en mode desktop
      else if (!mobile && !isSidebarOpen) {
        setIsSidebarOpen(true);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Simuler le chargement des données
    setTimeout(() => {
      setStats({
        totalProperties: 124,
        activeListings: 87,
        pendingApprovals: 12,
        totalClients: 56
      });
      
      setProperties([
        { id: 1, title: 'Belle maison à Paris', price: '750 000€', status: 'approved', date: '2023-05-15' },
        { id: 2, title: 'Appartement moderne Lyon', price: '350 000€', status: 'pending', date: '2023-05-18' },
        { id: 3, title: 'Villa avec piscine Nice', price: '1 200 000€', status: 'approved', date: '2023-05-10' },
        { id: 4, title: 'Studio étudiant Bordeaux', price: '180 000€', status: 'rejected', date: '2023-05-20' },
        { id: 5, title: 'Maison de campagne Normandie', price: '320 000€', status: 'approved', date: '2023-05-12' }
      ]);
      
      setMessages([
        { id: 1, name: 'Jean Dupont', email: 'jean.dupont@email.com', message: 'Intéressé par la maison à Paris', date: '2023-05-21' },
        { id: 2, name: 'Marie Martin', email: 'marie.martin@email.com', message: 'Question sur les frais de notaire', date: '2023-05-20' },
        { id: 3, name: 'Pierre Durand', email: 'pierre.durand@email.com', message: 'Disponibilité pour une visite?', date: '2023-05-19' }
      ]);
    }, 1000);
    
    return () => window.removeEventListener('resize', handleResize);
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.dashboardWrapper}>
      <Head>
        <title>Tableau de Bord Admin - Agence Immobilière</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      </Head>
      
      <Header />
      
      <div className={styles.container}>
        <Sidebar 
          isOpen={isSidebarOpen} 
          activeMenu={activeMenu} 
          setActiveMenu={setActiveMenu}
          toggleSidebar={toggleSidebar}
        />
        
        {isMobile && (
          <button 
            className={styles.sidebarToggle} 
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
            <i className={`fas ${isSidebarOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        )}
        
        {/* Contenu principal */}
        <div className={`${styles.mainContent} ${!isSidebarOpen ? styles.expanded : ''}`}>     
          <div className={styles.statsContainer}>
            <div className={`${styles.statCard} ${styles.animatedCard}`}>
              <div className={styles.statIcon}>
                <i className="fas fa-home"></i>
              </div>
              <div className={styles.statValue}>{stats.totalProperties}</div>
              <div className={styles.statLabel}>Biens immobiliers</div>
            </div>
            
            <div className={`${styles.statCard} ${styles.animatedCard}`}>
              <div className={styles.statIcon}>
                <i className="fas fa-check-circle"></i>
              </div>
              <div className={styles.statValue}>{stats.activeListings}</div>
              <div className={styles.statLabel}>Annonces actives</div>
            </div>
            
            <div className={`${styles.statCard} ${styles.animatedCard}`}>
              <div className={styles.statIcon}>
                <i className="fas fa-clock"></i>
              </div>
              <div className={styles.statValue}>{stats.pendingApprovals}</div>
              <div className={styles.statLabel}>En attente</div>
            </div>
            
            <div className={`${styles.statCard} ${styles.animatedCard}`}>
              <div className={styles.statIcon}>
                <i className="fas fa-users"></i>
              </div>
              <div className={styles.statValue}>{stats.totalClients}</div>
              <div className={styles.statLabel}>Clients</div>
            </div>
          </div>
          
          {/* Derniers biens immobiliers */}
          <div className={styles.tableContainer}>
            <div className={styles.tableHeader}>
              <h3>Derniers biens immobiliers</h3>
              <button className={`${styles.btn} ${styles.btnPrimary}`}>
                Voir tout <i className="fas fa-arrow-right"></i>
              </button>
            </div>
            
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Titre</th>
                  <th>Prix</th>
                  <th>Statut</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map(property => (
                  <tr key={property.id}>
                    <td>{property.id}</td>
                    <td>{property.title}</td>
                    <td>{property.price}</td>
                    <td>
                      <span className={`${styles.status} ${styles[property.status]}`}>
                        {property.status === 'approved' ? 'Approuvé' : 
                         property.status === 'pending' ? 'En attente' : 'Rejeté'}
                      </span>
                    </td>
                    <td>{property.date}</td>
                    <td>
                      <button className={`${styles.btn} ${styles.btnSecondary}`} style={{ marginRight: '5px' }}>
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className={`${styles.btn} ${styles.btnPrimary}`}>
                        <i className="fas fa-eye"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Graphique (simulé) */}
          <div className={styles.chartContainer}>
            <div className={styles.chartHeader}>
              <h3>Activité récente</h3>
            </div>
            <div className={styles.chartPlaceholder}>
              <p>Graphique des activités serait affiché ici</p>
            </div>
          </div>
          
          {/* Derniers messages */}
          <div className={styles.tableContainer}>
            <div className={styles.tableHeader}>
              <h3>Derniers messages</h3>
              <button className={`${styles.btn} ${styles.btnPrimary}`}>
                Voir tout <i className="fas fa-arrow-right"></i>
              </button>
            </div>
            
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {messages.map(message => (
                  <tr key={message.id}>
                    <td>{message.name}</td>
                    <td>{message.email}</td>
                    <td>{message.message.substring(0, 50)}...</td>
                    <td>{message.date}</td>
                    <td>
                      <button className={`${styles.btn} ${styles.btnPrimary}`}>
                        <i className="fas fa-reply"></i> Répondre
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;