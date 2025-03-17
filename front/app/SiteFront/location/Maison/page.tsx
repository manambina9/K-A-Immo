'use client'
import Head from '../../../../component/header';
import Footer from '../../../../component/footer'
import { useState } from 'react';
import styles from '../../../../public/css/VenteMaison.module.css' // Réutilisation du même module CSS
import { useAuth } from '../../../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
 
const SAMPLE_RENTALS = [
  {
    id: 1,
    title: "Appartement lumineux en centre-ville",
    price: 1250,
    location: "Paris, 75009",
    area: 85,
    bedrooms: 2,
    bathrooms: 1,
    image: "/image/location/rental1.jpg",
    tags: ["Meublé", "Balcon", "Parking"]
  },
  {
    id: 2,
    title: "Maison familiale avec jardin",
    price: 1450,
    location: "Lyon, 69008",
    area: 120,
    bedrooms: 4,
    bathrooms: 2,
    image: "/image/location/rental2.jpg",
    tags: ["Jardin", "Garage", "Proche écoles"]
  },
  {
    id: 3,
    title: "Studio design quartier historique",
    price: 780,
    location: "Bordeaux, 33000",
    area: 45,
    bedrooms: 1,
    bathrooms: 1,
    image: "/image/location/rental3.jpg",
    tags: ["Rénové", "Vue", "Équipé"]
  },
  {
    id: 4,
    title: "Duplex avec terrasse panoramique",
    price: 1680,
    location: "Marseille, 13006",
    area: 95,
    bedrooms: 3,
    bathrooms: 2,
    image: "/image/location/rental4.jpg",
    tags: ["Terrasse", "Vue mer", "Climatisation"]
  },
  {
    id: 5,
    title: "Maison contemporaine avec piscine",
    price: 1950,
    location: "Toulouse, 31000",
    area: 150,
    bedrooms: 4,
    bathrooms: 3,
    image: "/image/location/rental5.jpg",
    tags: ["Piscine", "Sécurisé", "Domotique"]
  },
  {
    id: 6,
    title: "Loft industriel en hypercentre",
    price: 1350,
    location: "Lille, 59000",
    area: 90,
    bedrooms: 2,
    bathrooms: 1,
    image: "/image/location/rental6.jpg",
    tags: ["Atypique", "Hauteur sous plafond", "Parking"]
  }
];

export default function LocationHome() {
  const [filteredRentals, setFilteredRentals] = useState(SAMPLE_RENTALS);
  const [priceFilter, setPriceFilter] = useState("");
  const [bedroomsFilter, setBedroomsFilter] = useState("");
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const filtered = SAMPLE_RENTALS.filter(rental => {
      return (!priceFilter || rental.price <= parseInt(priceFilter)) &&
             (!bedroomsFilter || rental.bedrooms >= parseInt(bedroomsFilter));
    });
    setFilteredRentals(filtered);
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleRentalClick = (rentalId: number) => {
    if (!isAuthenticated) {
      setShowLoginMessage(true);
    } else {
      router.push(`/location/${rentalId}`);
    }
  };

  return (
    <>
      <Head />
      <main>
        {/* Hero section */}
        <div className={styles.hero}>
          <div className={styles.container}>
            <h1 className={styles.heroTitle}>Trouvez votre location idéale</h1>
            <p className={styles.heroSubtitle}>
              Découvrez notre sélection de biens à louer dans les quartiers les plus recherchés.
            </p>
          </div>
        </div>

        {/* Filtres de recherche */}
        <div className={styles.container}>
          <div className={styles.filters}>
            <h2 className={styles.filterTitle}>Filtrer les locations</h2>
            <form onSubmit={handleSearch} className={styles.filterForm}>
              <select 
                className={styles.filterSelect}
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
              >
                <option value="">Tous les prix</option>
                <option value="800">Jusqu&apos;à 800 €/mois</option>
                <option value="1200">Jusqu&apos;à 1200 €/mois</option>
                <option value="1500">Jusqu&apos;à 1500 €/mois</option>
                <option value="2000">Jusqu&apos;à 2000 €/mois</option>
              </select>
              <select 
                className={styles.filterSelect}
                value={bedroomsFilter}
                onChange={(e) => setBedroomsFilter(e.target.value)}
              >
                <option value="">Toutes</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
              <button type="submit" className={styles.filterButton}>
                Rechercher
              </button>
            </form>
          </div>

          {/* Liste des locations */}
          <h2 className={styles.filterTitle}>Nos biens à louer ({filteredRentals.length})</h2>
          {filteredRentals.length === 0 ? (
            <div className={styles.filters}>
              <p>Aucune location ne correspond à vos critères de recherche.</p>
            </div>
          ) : (
            <div className={styles.propertiesGrid}>
              {filteredRentals.map((rental) => (
                <div key={rental.id} className={styles.propertyCard}>
                  <div className={styles.propertyImageContainer}>
                    <Image
                      src={rental.image}
                      alt={rental.title}
                      width={500}
                      height={300}
                      className={styles.propertyImage}
                    />
                    <div className={styles.propertyPrice}>{formatPrice(rental.price)}/mois</div>
                  </div>
                  <div className={styles.propertyContent}>
                    <h3 className={styles.propertyTitle}>{rental.title}</h3>
                    <div className={styles.propertyLocation}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {rental.location}
                    </div>
                    <div className={styles.propertyDetails}>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                        </svg>
                        {rental.area} m²
                      </div>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        {rental.bedrooms} ch.
                      </div>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {rental.bathrooms} sdb
                      </div>
                    </div>
                    <div className={styles.propertyTags}>
                      {rental.tags.map((tag, index) => (
                        <span key={index} className={styles.propertyTag}>{tag}</span>
                      ))}
                    </div>
                    <button
                      onClick={() => handleRentalClick(rental.id)}
                      className={styles.propertyButton}
                    >
                      Voir détails
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Message pour inviter à se connecter */}
        {showLoginMessage && (
        <>
          {/* Arrière-plan semi-transparent avec flou */}
          <div className={styles.overlay}></div>

          {/* Message */}
          <div className={styles.loginMessage}>
            <p>Désolé, vous devez d&apos;abord vous connecter pour voir plus d&apos;informations.</p>
            <p>
              Si vous n&apos;avez pas encore de compte,{' '}
              <a href="../../SiteFront/register" className={styles.link}>
                créez-en un ici
              </a>
              .
            </p>
            <button
              onClick={() => setShowLoginMessage(false)}
              className={styles.closeButton}
            >
              Fermer
            </button>
          </div>
        </>
      )}
      </main>
      <Footer />
    </>
  );
}