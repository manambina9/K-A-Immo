import Image from 'next/image';
import Styles from '../public/css/Nouveaute.module.css';
import Link from 'next/link';
import { FaBed, FaBath, FaRulerCombined, FaBuilding } from 'react-icons/fa';

const Nouveaute = () => {
  return (
    <div className={Styles.nouveaute}>
      <div className={Styles.section}>
        <h2>NOUVEAUTÉS</h2>
        <h3>À acheter</h3>
        <div className={Styles.cardContainer}>
          {/* Carte 1 */}
          <div className={`${Styles.card3} ${Styles.featured}`}>
            <Image
              src="/image/vente/maison1.png"
              alt="Maison à vendre"
              width={350}
              height={200}
              className={Styles.heroImage}
            />
            <h4>47 rue des Couronnes</h4>
            <p className={Styles.price}>850 000 €</p>
            <div className={Styles.details}>
              <span>
                <FaBed /> <p>4 Chambres</p> 
              </span>
              <span>
                <FaBath /> <p>2 Salles de bain </p>
              </span>
              <span>
                <FaBuilding /> <p>3 Étages </p>
              </span>
              <span>
                <FaRulerCombined /> <p>1234 m²</p>
              </span>
              <Link 
                href="/details"
                className={Styles.linkDetails}
              >voir les details</Link>
            </div>
          </div>
          {/* Carte 2 */}
          <div className={Styles.card3}>
            <Image
              src="/image/vente/maison2.png"
              alt="Maison à vendre"
              width={350}
              height={200}
              className={Styles.heroImage}
            />
            <h4>47 rue des Couronnes</h4>
            <p className={Styles.price}>580 000 €</p>
            <div className={Styles.details}>
              <span>
                <FaBed /> <p>4 Chambres </p>
              </span>
              <span>
                <FaBath /> <p>2 Salles de bain </p>
              </span>
              <span>
                <FaBuilding /> <p>3 Étages </p>
              </span>
              <span>
                <FaRulerCombined /> <p>1234 m²</p>
              </span>
              <Link 
                href="/details"
                className={Styles.linkDetails}
              >voir les details</Link>
            </div>
          </div>
          {/* Carte 3 */}
          <div className={Styles.card3}>
            <Image
              src="/image/vente/maison3.png"
              alt="Maison à vendre"
              width={350}
              height={200}
              className={Styles.heroImage}
            />
            <h4>47 rue des Couronnes</h4>
            <p className={Styles.price}>770 000 €</p>
            <div className={Styles.details}>
              <span>
                <FaBed /> <p>4 Chambres </p>
              </span>
              <span>
                <FaBath /> <p>2 Salles de bain </p>
              </span>
              <span>
                <FaBuilding /> <p>2 Étages </p>
              </span>
              <span>
                <FaRulerCombined /> <p>1234 m²</p>
              </span>
              <Link 
                href="/details"
                className={Styles.linkDetails}
              >voir les details</Link>
            </div>
          </div>
        </div>
        <Link href="/Vente/Maison" className={Styles.voirPlus}>
          Voir plus
        </Link>
      </div>
    </div>
  );
};

export default Nouveaute;
