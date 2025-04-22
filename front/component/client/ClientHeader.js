import styles from '../../styles/user.module.css';

const ClientHeader = ({ client }) => {
  return (
    <header className={styles.clientHeader}>
      <div className={styles.welcomeMessage}>
        <h1>Bonjour, {client.name}</h1>
        <p>Voici les biens qui correspondent à vos critères</p>
      </div>
      
      <div className={styles.clientPreferences}>
        <div className={styles.preferenceTag}>
          <span>Type:</span> {client.preferences.type}
        </div>
        <div className={styles.preferenceTag}>
          <span>Budget:</span> {client.preferences.budget.toLocaleString()} €
        </div>
        <div className={styles.preferenceTag}>
          <span>Localisation:</span> {client.preferences.location}
        </div>
        <div className={styles.preferenceTag}>
          <span>Chambres:</span> {client.preferences.bedrooms}+
        </div>
      </div>
    </header>
  );
};

export default ClientHeader;