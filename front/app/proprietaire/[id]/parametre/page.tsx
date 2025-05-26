'use client';

import { useState } from 'react';
import styles from '../../../../styles/propriete/proprietaire.module.css';

export default function ParametresPage() {
  const [activeTab, setActiveTab] = useState('compte');
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });
  const [language, setLanguage] = useState('fr');
  const [darkMode, setDarkMode] = useState(false);

  const handleNotificationChange = (type: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <div className={styles.settingsContainer}>
      <h1 className={styles.settingsTitle}>Paramètres</h1>
      
      <div className={styles.settingsLayout}>
        {/* Menu latéral */}
        <div className={styles.settingsSidebar}>
          <button 
            className={`${styles.settingsTab} ${activeTab === 'compte' ? styles.active : ''}`}
            onClick={() => setActiveTab('compte')}
          >
            ⚙️ Compte
          </button>
          <button 
            className={`${styles.settingsTab} ${activeTab === 'notifications' ? styles.active : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            🔔 Notifications
          </button>
          <button 
            className={`${styles.settingsTab} ${activeTab === 'affichage' ? styles.active : ''}`}
            onClick={() => setActiveTab('affichage')}
          >
            🎨 Affichage
          </button>
          <button 
            className={`${styles.settingsTab} ${activeTab === 'securite' ? styles.active : ''}`}
            onClick={() => setActiveTab('securite')}
          >
            🔐 Sécurité
          </button>
          <button 
            className={`${styles.settingsTab} ${activeTab === 'facturation' ? styles.active : ''}`}
            onClick={() => setActiveTab('facturation')}
          >
            💳 Facturation
          </button>
        </div>

        {/* Contenu principal */}
        <div className={styles.settingsContent}>
          {activeTab === 'compte' && (
            <div className={styles.settingsSection}>
              <h2>Paramètres du compte</h2>
              <div className={styles.formGroup}>
                <label>Visibilité du profil</label>
                <select className={styles.settingsSelect}>
                  <option value="public">Public</option>
                  <option value="private">Privé</option>
                  <option value="contacts">Contacts uniquement</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Type de compte</label>
                <div className={styles.accountType}>
                  <span>Propriétaire Professionnel</span>
                  <button className={styles.upgradeButton}>Mettre à niveau</button>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Connecter des services</label>
                <div className={styles.connectedServices}>
                  <div className={styles.serviceItem}>
                    <span>Google</span>
                    <button className={styles.connectButton}>Connecté</button>
                  </div>
                  <div className={styles.serviceItem}>
                    <span>Facebook</span>
                    <button className={styles.connectButton}>Non connecté</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className={styles.settingsSection}>
              <h2>Préférences de notifications</h2>
              
              <div className={styles.notificationItem}>
                <div>
                  <h3>Notifications par email</h3>
                  <p>Recevoir les alertes et rappels par email</p>
                </div>
                <label className={styles.toggleSwitch}>
                  <input 
                    type="checkbox" 
                    checked={notifications.email}
                    onChange={() => handleNotificationChange('email')}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>

              <div className={styles.notificationItem}>
                <div>
                  <h3>Notifications SMS</h3>
                  <p>Recevoir les alertes importantes par SMS</p>
                </div>
                <label className={styles.toggleSwitch}>
                  <input 
                    type="checkbox" 
                    checked={notifications.sms}
                    onChange={() => handleNotificationChange('sms')}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>

              <div className={styles.notificationItem}>
                <div>
                  <h3>Notifications push</h3>
                  <p>Recevoir les notifications sur l'application</p>
                </div>
                <label className={styles.toggleSwitch}>
                  <input 
                    type="checkbox" 
                    checked={notifications.push}
                    onChange={() => handleNotificationChange('push')}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>
            </div>
          )}

          {activeTab === 'affichage' && (
            <div className={styles.settingsSection}>
              <h2>Préférences d'affichage</h2>
              
              <div className={styles.displayOption}>
                <h3>Langue</h3>
                <select 
                  className={styles.settingsSelect}
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                </select>
              </div>

              <div className={styles.displayOption}>
                <h3>Thème</h3>
                <div className={styles.themeOptions}>
                  <button 
                    className={`${styles.themeButton} ${!darkMode ? styles.active : ''}`}
                    onClick={() => setDarkMode(false)}
                  >
                    ☀️ Clair
                  </button>
                  <button 
                    className={`${styles.themeButton} ${darkMode ? styles.active : ''}`}
                    onClick={() => setDarkMode(true)}
                  >
                    🌙 Sombre
                  </button>
                </div>
              </div>

              <div className={styles.displayOption}>
                <h3>Densité d'affichage</h3>
                <div className={styles.densityOptions}>
                  <button className={styles.densityButton}>Compact</button>
                  <button className={`${styles.densityButton} ${styles.active}`}>Normal</button>
                  <button className={styles.densityButton}>Spacieux</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'securite' && (
            <div className={styles.settingsSection}>
              <h2>Sécurité et confidentialité</h2>
              
              <div className={styles.securityItem}>
                <h3>Authentification à deux facteurs</h3>
                <p>Ajoutez une couche de sécurité supplémentaire à votre compte</p>
                <button className={styles.securityActionButton}>
                  {false ? 'Désactiver' : 'Activer'} la 2FA
                </button>
              </div>

              <div className={styles.securityItem}>
                <h3>Changer le mot de passe</h3>
                <p>Mettez à jour votre mot de passe régulièrement</p>
                <button className={styles.securityActionButton}>
                  Modifier le mot de passe
                </button>
              </div>

              <div className={styles.securityItem}>
                <h3>Appareils connectés</h3>
                <p>Gérez les appareils ayant accès à votre compte</p>
                <button className={styles.securityActionButton}>
                  Voir les appareils
                </button>
              </div>
            </div>
          )}

          {activeTab === 'facturation' && (
            <div className={styles.settingsSection}>
              <h2>Abonnement et facturation</h2>
              
              <div className={styles.billingCard}>
                <h3>Votre abonnement actuel</h3>
                <div className={styles.planInfo}>
                  <span className={styles.planName}>Gratuit</span>
                  <span className={styles.planPrice}>0€/mois</span>
                </div>
                <ul className={styles.planFeatures}>
                  <li>✔️ 5 biens maximum</li>
                  <li>✔️ Notifications de base</li>
                  <li>❌ Statistiques avancées</li>
                  <li>❌ Support prioritaire</li>
                </ul>
                <button className={styles.upgradeButton}>
                  Passer à la version Premium
                </button>
              </div>

              <div className={styles.paymentMethod}>
                <h3>Méthode de paiement</h3>
                <div className={styles.cardInfo}>
                  <span>**** **** **** 4242</span>
                  <span>Expire le 04/25</span>
                </div>
                <button className={styles.changePaymentButton}>
                  Changer de carte
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}