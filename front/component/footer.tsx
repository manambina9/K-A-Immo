import Styles from "../public/css/footer.module.css";

export default function Footer() {
  return (
    <footer className={Styles.footer}>
      <div className={Styles.bottom}>
        <p className={Styles.copy}>© 2025 Nom de la société. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
