// Footer.jsx
import styles from '../public/css/footer.module.css'
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Logo et Description */}
        <div className={styles.section}>
          <h3 className={styles.logo}>K&A Immo</h3>
          <p className={styles.description}>
            Votre partenaire de confiance dans immobilier depuis 2025.
            <br />
            Expertise • Confiance • Excellence
          </p>
        </div>

        {/* Contact */}
        <div className={styles.section}>
          <h3 className={styles.title}>Contact</h3>
          <ul className={styles.contactList}>
            <li className={styles.contactItem}>
              <span className={styles.icon}>📍</span>
              123 Avenue Example, Paris
            </li>
            <li className={styles.contactItem}>
              <span className={styles.icon}>📞</span>
              +33 1 23 45 67 89
            </li>
            <li className={styles.contactItem}>
              <span className={styles.icon}>✉️</span>
              contact@ka-immo.fr
            </li>
          </ul>
        </div>

        {/* Réseaux Sociaux */}
        <div className={styles.section}>
          <h3 className={styles.title}>Suivez-nous</h3>
          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialLink}>
              <span className={styles.socialIcon}>LinkedIn</span>
            </a>
            <a href="#" className={styles.socialLink}>
              <span className={styles.socialIcon}>Facebook</span>
            </a>
            <a href="#" className={styles.socialLink}>
              <span className={styles.socialIcon}>Instagram</span>
            </a>
          </div>
          <p className={styles.newsletter}>
            Inscrivez-vous à notre newsletter pour suivre nos actualités
          </p>
        </div>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.bottomContainer}>
        <div className={styles.bottom}>
          <p className={styles.copy}>© 2025 K&A Immo. Tous droits réservés.</p>
          <div className={styles.legalLinks}>
            <a href="#" className={styles.legalLink}>Mentions légales</a>
            <span className={styles.separator}>•</span>
            <a href="#" className={styles.legalLink}>Politique de confidentialité</a>
            <span className={styles.separator}>•</span>
            <a href="#" className={styles.legalLink}>CGV</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;