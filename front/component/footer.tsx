import Styles from "../public/css/footer.module.css";

export default function Footer() {
  return (
    <footer className={Styles.footer}>
      <div className={Styles.container}>
        <div className={Styles.left}>
          <h3 className={Styles.title}>Nom de la Société</h3>
          <p className={Styles.text}>Des solutions innovantes pour vos projets numériques.</p>
        </div>
        <div className={Styles.middle}>
          <h4 className={Styles.subtitle}>Liens</h4>
          <ul className={Styles.links}>
            <li><a href="#">Accueil</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div className={Styles.right}>
          <h4 className={Styles.subtitle}>Contact</h4>
          <p className={Styles.text}>email@example.com</p>
          <p className={Styles.text}>+1 (234) 567-890</p>
        </div>
      </div>
      <div className={Styles.bottom}>
        <p className={Styles.copy}>© 2025 Nom de la société. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
