'use client'
import Head from '../../../../component/header';
import Footer from '../../../../component/footer'
import { useState } from 'react';
import styles from '../../../../public/css/VenteMaison.module.css'
import { useAuth } from '../../../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
 
const SAMPLE_PROPERTIES = [
  {
    id: 1,
    title: "Villa moderne avec piscine",
    price: 450000,
    location: "Bordeaux, 33000",
    area: 180,
    bedrooms: 4,
    bathrooms: 3,
    image: "/image/vente/property1.jpg",
    tags: ["Piscine", "Jardin", "Garage"]
  },
  {
    id: 2,
    title: "Maison au cœur de la ville",
    price: 295000,
    location: "Lyon, 69002",
    area: 95,
    bedrooms: 3,
    bathrooms: 1,
    image: "/image/vente/property2.jpg",
    tags: ["Balcon", "Parking", "Ascenseur"]
  },
  {
    id: 3,
    title: "Maison familiale proche écoles",
    price: 320000,
    location: "Nantes, 44300",
    area: 140,
    bedrooms: 5,
    bathrooms: 2,
    image: "/image/vente/property3.jpg",
    tags: ["Jardin", "Sous-sol", "Rénové"]
  },
  {
    id: 4,
    title: "Loft industriel rénové",
    price: 385000,
    location: "Paris, 75011",
    area: 110,
    bedrooms: 2,
    bathrooms: 2,
    image: "/image/vente/property4.jpg",
    tags: ["Terrasse", "Vue dégagée", "Design"]
  },
  {
    id: 5,
    title: "Maison contemporaine",
    price: 510000,
    location: "Montpellier, 34000",
    area: 165,
    bedrooms: 4,
    bathrooms: 3,
    image: "/image/vente/property5.jpg",
    tags: ["Éco-friendly", "Domotique"]
  },
  {
    id: 6,
    title: "Charmante maison de village",
    price: 240000,
    location: "Aix-en-Provence, 13100",
    area: 120,
    bedrooms: 3,
    bathrooms: 2,
    image: "/image/vente/property6.jpg",
    tags: ["Pierre", "Cheminée", "Cave à vin"]
  }
];

const SERVICES = [
  {
    id: 1,
    title: "Achat et Vente",
    description: "Nous vous accompagnons dans l'achat ou la vente de votre bien immobilier.",
    icon: "🏠"
  },
  {
    id: 2,
    title: "Location",
    description: "Trouvez la location idéale ou mettez votre bien en location.",
    icon: "🔑"
  },
  {
    id: 3,
    title: "Conseil en investissement",
    description: "Des conseils experts pour maximiser vos investissements immobiliers.",
    icon: "📈"
  }
];

// Données d'exemple pour les avantages
const WHY_CHOOSE_US = [
  {
    id: 1,
    title: "Expertise locale",
    description: "Notre équipe connaît parfaitement le marché immobilier de votre région.",
    icon: "📍"
  },
  {
    id: 2,
    title: "Service personnalisé",
    description: "Nous adaptons notre approche à vos besoins spécifiques.",
    icon: "🤝"
  },
  {
    id: 3,
    title: "Transparence totale",
    description: "Pas de frais cachés, tout est clair dès le début.",
    icon: "🔍"
  }
];

// Données d'exemple pour les partenaires
const PARTNERS = [
  { id: 1, logo: "/api/placeholder/150/50", name: "Partenaire 1" },
  { id: 2, logo: "/api/placeholder/150/50", name: "Partenaire 2" },
  { id: 3, logo: "/api/placeholder/150/50", name: "Partenaire 3" },
  { id: 4, logo: "/api/placeholder/150/50", name: "Partenaire 4" }
];


export default function VenteHome() {
  const [filteredProperties, setFilteredProperties] = useState(SAMPLE_PROPERTIES);
  const [priceFilter, setPriceFilter] = useState("");
  const [bedroomsFilter, setBedroomsFilter] = useState("");
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const filtered = SAMPLE_PROPERTIES.filter(property => {
      return (!priceFilter || property.price <= parseInt(priceFilter)) &&
             (!bedroomsFilter || property.bedrooms >= parseInt(bedroomsFilter));
    });
    setFilteredProperties(filtered);
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handlePropertyClick = (propertyId: number) => {
    if (!isAuthenticated) {
      router.push('../../SiteFront/login');
    } else {
      router.push(`/propriete/${propertyId}`);
    }
  };

  return (
    <>
      <Head />
      <main>
        {/* Hero section */}
        <div className={styles.hero}>
          <div className={styles.container}>
            <h1 className={styles.heroTitle}>Trouvez la maison de vos rêves</h1>
            <p className={styles.heroSubtitle}>
              Découvrez notre sélection exclusive de propriétés de qualité dans les meilleurs quartiers.
            </p>
          </div>
        </div>

        {/* Filtres de recherche */}
        <div className={styles.container}>
          <div className={styles.filters}>
            <h2 className={styles.filterTitle}>Filtrer les propriétés</h2>
            <form onSubmit={handleSearch} className={styles.filterForm}>
              <select 
                className={styles.filterSelect}
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
              >
                <option value="">Tous les prix</option>
                <option value="250000">Jusqu&apos;à 250 000 €</option>
                <option value="350000">Jusqu&apos;à 350 000 €</option>
                <option value="450000">Jusqu&apos;à 450 000 €</option>
                <option value="600000">Jusqu&apos;à 600 000 €</option>
              </select>
              <select 
                className={styles.filterSelect}
                value={bedroomsFilter}
                onChange={(e) => setBedroomsFilter(e.target.value)}
              >
                <option value="">Toutes</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
              <button type="submit" className={styles.filterButton}>
                Rechercher
              </button>
            </form>
          </div>

          {/* Liste des propriétés */}
          <h2 className={styles.filterTitle}>Nos propriétés à vendre ({filteredProperties.length})</h2>
          {filteredProperties.length === 0 ? (
            <div className={styles.filters}>
              <p>Aucune propriété ne correspond à vos critères de recherche.</p>
            </div>
          ) : (
            <div className={styles.propertiesGrid}>
              {filteredProperties.map((property) => (
                <div key={property.id} className={styles.propertyCard}>
                  <div className={styles.propertyImageContainer}>
                    <Image
                      src={property.image}
                      alt={property.title}
                      width={500}
                      height={300}
                      className={styles.propertyImage}
                    />
                    <div className={styles.propertyPrice}>{formatPrice(property.price)}</div>
                  </div>
                  <div className={styles.propertyContent}>
                    <h3 className={styles.propertyTitle}>{property.title}</h3>
                    <div className={styles.propertyLocation}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {property.location}
                    </div>
                    <div className={styles.propertyDetails}>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                        </svg>
                        {property.area} m²
                      </div>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        {property.bedrooms} ch.
                      </div>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {property.bathrooms} sdb
                      </div>
                    </div>
                    <div className={styles.propertyTags}>
                      {property.tags.map((tag, index) => (
                        <span key={index} className={styles.propertyTag}>{tag}</span>
                      ))}
                    </div>
                    <button
                      onClick={() => handlePropertyClick(property.id)}
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
      </main>
      <Footer />
    </>
  );
}