import Header from "../component/header";
import Styles from "../public/css/Home.module.css"
import Nouveautes from "@/component/nouveau";

export default function Home() {
  return (
    <>
      <Header/>
      <div className={Styles.first}>
        <div className={Styles.hero}>
          <h5>Maison Moderne à Vendre</h5>
          <p className={Styles.card}>
            Découvrez cette maison moderne située dans un quartier calme. Idéale pour les familles, elle offre de grands espaces et un design contemporain.
            Profitez d’un cadre de vie agréable à proximité de toutes commodités.
          </p>
          <a href="#" className={Styles.btn}>Voir les détails</a>
        </div>
      </div>
      
      <div className={Styles.services}>
        <h2>Nos Services</h2>
        <div className={Styles.cardsContainer}>
          <div className={Styles.card1}>
            <h3>Achat</h3>
          </div>
          <div className={Styles.card2}>
            <h3>Vente</h3>
          </div>
        </div>
      </div>
      
      <Nouveautes />

    <div className={Styles.section}>
      <h2>NOUVEAUTÉS</h2>
      <h3>À louer</h3>
      <div className={Styles.cardContainer}>
        <div className={Styles.card3}>
          <h4>Carte 1</h4>
          <p>Description de la carte.</p>
        </div>
        <div className={Styles.card3}>
          <h4>Carte 2</h4>
          <p>Description de la carte.</p>
        </div>
        <div className={Styles.card3}>
          <h4>Carte 3</h4>
          <p>Description de la carte.</p>
        </div>
      </div>
      <button className={Styles.voirPlus}>Voir plus</button>
    </div>
    </>
  );
}
