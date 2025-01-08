import Styles from '../public/css/lou.module.css'
import Image from 'next/image';

export default function Nouveautes() {
  return (
    <div className={Styles.section}>
      <h2 className={Styles.titrePrincipal}>PROPRIÉTÉS À LOUER</h2>
      <div className={Styles.cardContainer}>
        <div className={Styles.card}>
            <Image 
                src="/image/location/maison2.jfif"
                alt="Avenue des Roses"
                className={Styles.image} 
                width={500}
                height={300}
            />
          <div className={Styles.cardContent}>
            <h4>AVENUE DES ROSES</h4>
            <p>4 pièces</p>
            <p>
              Paragraphe. Cliquez ici pour ajouter votre propre texte. Cliquez sur Modifier Texte pour
              personnaliser les polices.
            </p>
            <p className={Styles.prix}>500 €/mois</p>
          </div>
        </div>
        <div className={Styles.card}>
            <Image
                src="/image/location/maison1.avif"
                alt="Rue de la Chouette"
                className={Styles.image}
                width={500}
                height={300}
            />
          <div className={Styles.cardContent}>
            <h4>RUE DE LA CHOUETTE</h4>
            <p>3 pièces</p>
            <p>
              Paragraphe. Cliquez ici pour ajouter votre propre texte. Cliquez sur Modifier Texte pour
              personnaliser les polices.
            </p>
            <p className={Styles.prix}>450 €/mois</p>
          </div>
        </div>
      </div>
      <button className={Styles.voirPlus}>Voir plus</button>
    </div>
  );
}
