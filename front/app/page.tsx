import Header from "../component/header";
import Styles from "../public/css/Home.module.css"
import Nouveautes from "@/component/nouveau"
import Footer from"../component/footer"
import Loue from "../component/loue"
import Contact from "@/component/contact";
import Actualite from '../component/actualite'

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
      <Loue />
      <Actualite />
    <Footer />
    </>
  );
}
