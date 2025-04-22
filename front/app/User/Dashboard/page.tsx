'use client';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import styles from '../../../public/css/user.module.css';

export default function ClientDashboard() {
  // État pour les données client et propriétés
  interface Client {
    id: number;
    name: string;
    email: string;
    phone: string;
    photo: string;
    lastLogin: string;
    preferences: {
      propertyTypes: string[];
      locations: string[];
      budget: number;
    };
  }

  const [client, setClient] = useState<Client | null>(null);
  const [properties, setProperties] = useState<Array<{
    id: number;
    title: string;
    price: number;
    formattedPrice: string;
    location: string;
    surface: number;
    rooms: number;
    bedrooms: number;
    bathrooms: number;
    image: string;
    type: string;
    status: string;
    features: string[];
    createdAt: string;
  }>>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState('disponibles');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    minSurface: '',
    maxSurface: '',
    bedrooms: '',
    location: ''
  });

  // Simuler le chargement des données client (remplacer par appel API)
  useEffect(() => {
    // Délai fictif pour simuler le chargement
    setTimeout(() => {
      setClient({
        id: 123,
        name: 'Jean Dupont',
        email: 'jean.dupont@example.com',
        phone: '06 12 34 56 78',
        photo: '/api/placeholder/100/100',
        lastLogin: '2025-04-19T10:30:00',
        preferences: {
          propertyTypes: ['Appartement', 'Maison'],
          locations: ['Paris', 'Lyon'],
          budget: 800000
        }
      });

      // Simuler le chargement des propriétés (remplacer par appel API)
      setProperties([
        {
          id: 1,
          title: 'Villa de luxe avec vue sur mer',
          price: 1250000,
          formattedPrice: '1 250 000 €',
          location: 'Cannes, France',
          surface: 280,
          rooms: 5,
          bedrooms: 3,
          bathrooms: 3,
          image: '/api/placeholder/400/300',
          type: 'Villa',
          status: 'Disponible',
          features: ['Piscine', 'Jardin', 'Garage', 'Vue mer'],
          createdAt: '2025-03-12T15:30:00'
        },
        {
          id: 2,
          title: 'Appartement rénové au centre-ville',
          price: 450000,
          formattedPrice: '450 000 €',
          location: 'Paris, France',
          surface: 95,
          rooms: 3,
          bedrooms: 2,
          bathrooms: 1,
          image: '/api/placeholder/400/300',
          type: 'Appartement',
          status: 'Disponible',
          features: ['Balcon', 'Parking', 'Ascenseur'],
          createdAt: '2025-03-20T09:45:00'
        },
        {
          id: 3,
          title: 'Maison familiale avec jardin',
          price: 585000,
          formattedPrice: '585 000 €',
          location: 'Lyon, France',
          surface: 180,
          rooms: 6,
          bedrooms: 4,
          bathrooms: 2,
          image: '/api/placeholder/400/300',
          type: 'Maison',
          status: 'Disponible',
          features: ['Jardin', 'Terrasse', 'Garage double'],
          createdAt: '2025-04-05T14:15:00'
        },
        {
          id: 4,
          title: 'Loft moderne en centre-ville',
          price: 720000,
          formattedPrice: '720 000 €',
          location: 'Bordeaux, France',
          surface: 160,
          rooms: 4,
          bedrooms: 2,
          bathrooms: 2,
          image: '/api/placeholder/400/300',
          type: 'Loft',
          status: 'Disponible',
          features: ['Terrasse sur toit', 'Cave à vin', 'Domotique'],
          createdAt: '2025-04-15T11:20:00'
        },
        {
          id: 5,
          title: 'Studio avec terrasse proche plage',
          price: 265000,
          formattedPrice: '265 000 €',
          location: 'Nice, France',
          surface: 45,
          rooms: 1,
          bedrooms: 1,
          bathrooms: 1,
          image: '/api/placeholder/400/300',
          type: 'Studio',
          status: 'Disponible',
          features: ['Terrasse', 'Vue mer', 'Climatisation'],
          createdAt: '2025-04-18T16:40:00'
        },
      ]);

      // Simuler des favoris
      setFavorites([1, 3]); // IDs des propriétés en favoris
      
      setLoading(false);
    }, 1000);
  }, []);

  // Filtrer les propriétés selon la recherche et les filtres
  const filteredProperties = properties.filter(property => {
    // Recherche textuelle
    if (searchTerm && !property.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !property.location.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filtres
    if (filters.type && property.type !== filters.type) return false;
    if (filters.minPrice && property.price < parseInt(filters.minPrice)) return false;
    if (filters.maxPrice && property.price > parseInt(filters.maxPrice)) return false;
    if (filters.minSurface && property.surface < parseInt(filters.minSurface)) return false;
    if (filters.maxSurface && property.surface > parseInt(filters.maxSurface)) return false;
    if (filters.bedrooms && property.bedrooms < parseInt(filters.bedrooms)) return false;
    if (filters.location && !property.location.includes(filters.location)) return false;
    
    return true;
  });

  // Propriétés favorites
  const favoriteProperties = properties.filter(property => favorites.includes(property.id));
  
  // Fonction pour basculer une propriété en favori
const toggleFavorite = (propertyId: number): void => {
    if (favorites.includes(propertyId)) {
        setFavorites(favorites.filter((id: number) => id !== propertyId));
    } else {
        setFavorites([...favorites, propertyId]);
    }
};

  // Fonction pour réinitialiser les filtres
  const resetFilters = () => {
    setFilters({
      type: '',
      minPrice: '',
      maxPrice: '',
      minSurface: '',
      maxSurface: '',
      bedrooms: '',
      location: ''
    });
    setSearchTerm('');
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <p className={styles.loadingText}>Chargement de votre espace personnel...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Tableau de bord | ImmoExcellence</title>
        <meta name="description" content="Votre espace client personnalisé chez ImmoExcellence" />
      </Head>

      <header className={styles.dashboardHeader}>
        <div className={styles.logoContainer}>
          <h1 className={styles.logo}>ImmoExcellence</h1>
        </div>

        <div className={styles.headerSearchContainer}>
          <input
            type="text"
            placeholder="Rechercher une propriété..."
            className={styles.headerSearchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className={styles.headerSearchButton}>
            <span>🔍</span>
          </button>
        </div>

        <div className={styles.userProfile}>
          <div className={styles.userInfo}>
            <p className={styles.welcomeText}>Bienvenue,</p>
            <p className={styles.userName}>{client?.name || 'Utilisateur'}</p>
          </div>
          <div className={styles.userAvatar}>
            <img src={client?.photo || '/default-avatar.png'} alt={client?.name || 'Utilisateur'} />
          </div>
          <div className={styles.userMenu}>
            <button className={styles.menuButton}>
              <span>⌄</span>
            </button>
          </div>
        </div>
      </header>

      <div className={styles.dashboardLayout}>
        <aside className={styles.sidebar}>
          <nav className={styles.sidebarNav}>
            <div className={styles.sidebarHeader}>
              <h2 className={styles.sidebarTitle}>Menu</h2>
            </div>

            <ul className={styles.sidebarMenu}>
              <li className={`${styles.sidebarMenuItem} ${styles.active}`}>
                <a href="#dashboard">
                  <span className={styles.menuIcon}>🏠</span>
                  <span className={styles.menuText}>Tableau de bord</span>
                </a>
              </li>
              <li className={styles.sidebarMenuItem}>
                <a href="#properties">
                  <span className={styles.menuIcon}>🔍</span>
                  <span className={styles.menuText}>Recherche de biens</span>
                </a>
              </li>
              <li className={styles.sidebarMenuItem}>
                <a href="#favorites">
                  <span className={styles.menuIcon}>❤️</span>
                  <span className={styles.menuText}>Mes favoris</span>
                </a>
              </li>
              <li className={styles.sidebarMenuItem}>
                <a href="#alerts">
                  <span className={styles.menuIcon}>🔔</span>
                  <span className={styles.menuText}>Mes alertes</span>
                </a>
              </li>
              <li className={styles.sidebarMenuItem}>
                <a href="#appointments">
                  <span className={styles.menuIcon}>📅</span>
                  <span className={styles.menuText}>Mes rendez-vous</span>
                </a>
              </li>
              <li className={styles.sidebarMenuItem}>
                <a href="#messages">
                  <span className={styles.menuIcon}>✉️</span>
                  <span className={styles.menuText}>Messagerie</span>
                </a>
              </li>
              <li className={styles.sidebarMenuItem}>
                <a href="#profile">
                  <span className={styles.menuIcon}>👤</span>
                  <span className={styles.menuText}>Mon profil</span>
                </a>
              </li>
            </ul>

            <div className={styles.sidebarFooter}>
              <button className={styles.logoutButton}>
                <span className={styles.menuIcon}>🚪</span>
                <span className={styles.menuText}>Déconnexion</span>
              </button>
            </div>
          </nav>
        </aside>

        <main className={styles.dashboardContent}>
          <motion.section 
            className={styles.welcomeSection}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <div className={styles.welcomeCard}>
              <div className={styles.welcomeInfo}>
                <h2 className={styles.welcomeTitle}>Bonjour {client?.name || 'Utilisateur'},</h2>
                <p className={styles.welcomeSubtitle}>
                  Ravi de vous revoir sur votre espace personnel.
                  <br />
                  Dernière connexion: {client && new Date(client.lastLogin).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <div className={styles.statCards}>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>{properties.length}</div>
                  <div className={styles.statLabel}>Biens disponibles</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>{favorites.length}</div>
                  <div className={styles.statLabel}>Biens favoris</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>0</div>
                  <div className={styles.statLabel}>Visites prévues</div>
                </div>
              </div>
            </div>
          </motion.section>

          <section className={styles.propertiesSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Propriétés</h2>
              <div className={styles.tabsContainer}>
                <button 
                  className={`${styles.tabButton} ${activeTab === 'disponibles' ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab('disponibles')}
                >
                  Disponibles
                </button>
                <button 
                  className={`${styles.tabButton} ${activeTab === 'favoris' ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab('favoris')}
                >
                  Mes Favoris
                </button>
              </div>
            </div>

            <div className={styles.filterSection}>
              <div className={styles.filterHeader}>
                <h3 className={styles.filterTitle}>Filtres</h3>
                <button className={styles.resetButton} onClick={resetFilters}>
                  Réinitialiser
                </button>
              </div>
              <div className={styles.filterGrid}>
                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Type de bien</label>
                  <select 
                    className={styles.filterSelect}
                    value={filters.type}
                    onChange={(e) => setFilters({...filters, type: e.target.value})}
                  >
                    <option value="">Tous</option>
                    <option value="Appartement">Appartement</option>
                    <option value="Maison">Maison</option>
                    <option value="Villa">Villa</option>
                    <option value="Loft">Loft</option>
                    <option value="Studio">Studio</option>
                  </select>
                </div>
                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Prix min</label>
                  <input 
                    type="number" 
                    className={styles.filterInput}
                    placeholder="€"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                  />
                </div>
                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Prix max</label>
                  <input 
                    type="number" 
                    className={styles.filterInput}
                    placeholder="€"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                  />
                </div>
                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Surface min</label>
                  <input 
                    type="number" 
                    className={styles.filterInput}
                    placeholder="m²"
                    value={filters.minSurface}
                    onChange={(e) => setFilters({...filters, minSurface: e.target.value})}
                  />
                </div>
                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Chambres min</label>
                  <select 
                    className={styles.filterSelect}
                    value={filters.bedrooms}
                    onChange={(e) => setFilters({...filters, bedrooms: e.target.value})}
                  >
                    <option value="">Tous</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                  </select>
                </div>
                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Localisation</label>
                  <input 
                    type="text" 
                    className={styles.filterInput}
                    placeholder="Ville"
                    value={filters.location}
                    onChange={(e) => setFilters({...filters, location: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <motion.div 
              className={styles.propertiesGrid}
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {(activeTab === 'disponibles' ? filteredProperties : favoriteProperties).map(property => (
                <motion.div 
                  key={property.id}
                  className={styles.propertyCard}
                  variants={fadeIn}
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                >
                  <div className={styles.propertyImageContainer}>
                    <img src={property.image} alt={property.title} className={styles.propertyImage} />
                    <button 
                      className={`${styles.favoriteButton} ${favorites.includes(property.id) ? styles.favoriteActive : ''}`}
                      onClick={() => toggleFavorite(property.id)}
                    >
                      {favorites.includes(property.id) ? '❤️' : '🤍'}
                    </button>
                    <div className={styles.propertyTypeTag}>{property.type}</div>
                  </div>
                  <div className={styles.propertyInfo}>
                    <h3 className={styles.propertyTitle}>{property.title}</h3>
                    <p className={styles.propertyPrice}>{property.formattedPrice}</p>
                    <p className={styles.propertyLocation}>{property.location}</p>
                    <div className={styles.propertyDetails}>
                      <span className={styles.detailItem}>{property.surface} m²</span>
                      <span className={styles.detailSeparator}>•</span>
                      <span className={styles.detailItem}>{property.rooms} pièces</span>
                      <span className={styles.detailSeparator}>•</span>
                      <span className={styles.detailItem}>{property.bedrooms} ch.</span>
                    </div>
                    <div className={styles.propertyFeatures}>
                      {property.features.slice(0, 3).map((feature, index) => (
                        <span key={index} className={styles.featureTag}>{feature}</span>
                      ))}
                      {property.features.length > 3 && (
                        <span className={styles.featureMore}>+{property.features.length - 3}</span>
                      )}
                    </div>
                    <div className={styles.propertyActions}>
                      <button className={styles.propertyActionButton}>Voir détails</button>
                      <button className={styles.propertyActionButton}>Prendre RDV</button>
                    </div>
                  </div>
                </motion.div>
              ))}

              {(activeTab === 'disponibles' && filteredProperties.length === 0) || 
               (activeTab === 'favoris' && favoriteProperties.length === 0) ? (
                <div className={styles.noResults}>
                  <div className={styles.noResultsIcon}>🔍</div>
                  <h3 className={styles.noResultsTitle}>
                    {activeTab === 'disponibles' ? 'Aucun bien ne correspond à vos critères' : 'Vous n\'avez pas encore de favoris'}
                  </h3>
                  <p className={styles.noResultsText}>
                    {activeTab === 'disponibles' 
                      ? 'Essayez de modifier vos filtres pour voir plus de résultats.' 
                      : 'Ajoutez des propriétés à vos favoris pour les retrouver facilement.'}
                  </p>
                  {activeTab === 'disponibles' && (
                    <button className={styles.resetFiltersButton} onClick={resetFilters}>
                      Réinitialiser les filtres
                    </button>
                  )}
                </div>
              ) : null}
            </motion.div>
          </section>

          <section className={styles.recentActivitySection}>
            <h2 className={styles.sectionTitle}>Activité récente</h2>
            <div className={styles.timeline}>
              <div className={styles.timelineItem}>
                <div className={styles.timelineIcon}>📅</div>
                <div className={styles.timelineContent}>
                  <h3 className={styles.timelineTitle}>Nouvelle propriété disponible</h3>
                  <p className={styles.timelineText}>Une nouvelle villa correspond à vos critères de recherche.</p>
                  <p className={styles.timelineDate}>Aujourd'hui, 09:45</p>
                </div>
              </div>
              <div className={styles.timelineItem}>
                <div className={styles.timelineIcon}>✉️</div>
                <div className={styles.timelineContent}>
                  <h3 className={styles.timelineTitle}>Message de votre conseiller</h3>
                  <p className={styles.timelineText}>Thomas Martin vous a envoyé un message concernant votre recherche.</p>
                  <p className={styles.timelineDate}>Hier, 16:30</p>
                </div>
              </div>
              <div className={styles.timelineItem}>
                <div className={styles.timelineIcon}>🏠</div>
                <div className={styles.timelineContent}>
                  <h3 className={styles.timelineTitle}>Changement de prix</h3>
                  <p className={styles.timelineText}>Le prix de l'appartement à Paris a été baissé de 5%.</p>
                  <p className={styles.timelineDate}>20 avril 2025</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <footer className={styles.dashboardFooter}>
        <div className={styles.footerContent}>
          <p className={styles.copyright}>© 2025 ImmoExcellence. Tous droits réservés.</p>
          <div className={styles.footerLinks}>
            <a href="#help" className={styles.footerLink}>Aide</a>
            <a href="#contact" className={styles.footerLink}>Contact</a>
            <a href="#privacy" className={styles.footerLink}>Confidentialité</a>
            <a href="#terms" className={styles.footerLink}>Conditions d'utilisation</a>
          </div>
        </div>
      </footer>
    </div>
  );
}