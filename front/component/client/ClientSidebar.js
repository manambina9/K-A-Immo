import styles from '../../styles/user.module.css';

const ClientSidebar = ({ client, activeFilter, onFilterChange }) => {
  return (
    <aside className={styles.clientSidebar}>
      <div className={styles.profileSection}>
        <div className={styles.profileImage}>
          {client.name.charAt(0)}
        </div>
        <h2>{client.name}</h2>
        <p>{client.email}</p>
        <p>{client.phone}</p>
      </div>
      
      <nav className={styles.sidebarNav}>
        <h3>Filtrer les biens</h3>
        <ul>
          <li>
            <button 
              className={`${styles.navButton} ${activeFilter === 'all' ? styles.active : ''}`}
              onClick={() => onFilterChange('all')}
            >
              Tous les biens
            </button>
          </li>
          <li>
            <button 
              className={`${styles.navButton} ${activeFilter === 'favorites' ? styles.active : ''}`}
              onClick={() => onFilterChange('favorites')}
            >
              Mes favoris
            </button>
          </li>
          <li>
            <button 
              className={`${styles.navButton} ${activeFilter === 'appartement' ? styles.active : ''}`}
              onClick={() => onFilterChange('appartement')}
            >
              Appartements
            </button>
          </li>
          <li>
            <button 
              className={`${styles.navButton} ${activeFilter === 'maison' ? styles.active : ''}`}
              onClick={() => onFilterChange('maison')}
            >
              Maisons
            </button>
          </li>
          <li>
            <button 
              className={`${styles.navButton} ${activeFilter === 'studio' ? styles.active : ''}`}
              onClick={() => onFilterChange('studio')}
            >
              Studios
            </button>
          </li>
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
  );
};

export default ClientSidebar;