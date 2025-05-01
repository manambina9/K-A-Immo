'use client'
import Head from '../../../../component/header';
import Footer from '../../../../component/footer'
import { useState } from 'react';
import styles from '../../../../public/css/VenteMaison.module.css' // Base des styles
import terrainStyles from '../../../../public/css/VenteTerrain.module.css' // Styles spécifiques aux terrains
import { useAuth } from '../../../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
 
const SAMPLE_LANDS = [
  {
    id: 1,
    title: "Terrain constructible vue dégagée",
    price: 125000,
    location: "Aix-en-Provence, 13090",
    area: 850,
    image: "/image/vente/terrain/terrain1.jpg",
    tags: ["Viabilisé", "Vue dégagée", "Plat"]
  },
  {
    id: 2,
    title: "Parcelle boisée proche rivière",
    price: 95000,
    location: "Montpellier, 34070",
    area: 1200,
    image: "/image/vente/terrain/terrain2.jpg",
    tags: ["Arboré", "Eau à proximité", "CU positif"]
  },
  {
    id: 3,
    title: "Terrain à bâtir en lotissement",
    price: 89000,
    location: "Toulouse, 31500",
    area: 600,
    image: "/image/vente/terrain/terrain3.jpg",
    tags: ["Lotissement", "Viabilisé", "Écoles"]
  },
  {
    id: 4,
    title: "Grande parcelle divisible",
    price: 180000,
    location: "Nantes, 44300",
    area: 1800,
    image: "/image/vente/terrain/terrain4.jpg",
    tags: ["Divisible", "Plat", "Résidentiel"]
  },
  {
    id: 5,
    title: "Terrain avec permis de construire",
    price: 145000,
    location: "Lyon, 69009",
    area: 750,
    image: "/image/vente/terrain/terrain5.jpg",
    tags: ["PC accepté", "Viabilisé", "Vue"]
  },
  {
    id: 6,
    title: "Terrain agricole convertible",
    price: 78000,
    location: "Bordeaux, 33200",
    area: 2500,
    image: "/image/vente/terrain/terrain6.jpg",
    tags: ["Agricole", "Potentiel", "Eau"]
  }
];

export default function VenteTerrain() {
  const [filteredLands, setFilteredLands] = useState(SAMPLE_LANDS);
  const [priceFilter, setPriceFilter] = useState("");
  const [areaFilter, setAreaFilter] = useState("");
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const filtered = SAMPLE_LANDS.filter(land => {
      return (!priceFilter || land.price <= parseInt(priceFilter)) &&
             (!areaFilter || land.area >= parseInt(areaFilter));
    });
    setFilteredLands(filtered);
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleLandClick = (landId: number) => {
    if (!isAuthenticated) {
      setShowLoginMessage(true);
    } else {
      router.push(`/terrain/${landId}`);
    }
  };

  return (
    <>
      <Head />
      <main>
        {/* Hero section avec design différent */}
        <div className={terrainStyles.terrainHero}>
          <div className={styles.container}>
            <h1 className={terrainStyles.terrainHeroTitle}>Terrains à vendre</h1>
            <p className={terrainStyles.terrainHeroSubtitle}>
              Construisez votre avenir sur l&apos;un de nos terrains soigneusement sélectionnés
            </p>
          </div>
        </div>

        {/* Introduction supplémentaire */}
        <div className={`${styles.container} ${terrainStyles.introSection}`}>
          <h2 className={terrainStyles.introTitle}>Pourquoi acheter un terrain ?</h2>
          <div className={terrainStyles.introGrid}>
            <div className={terrainStyles.introCard}>
              <div className={terrainStyles.introCardIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3>Liberté de construction</h3>
              <p>Concevez et construisez la maison qui correspond exactement à vos besoins et à vos goûts.</p>
            </div>
            <div className={terrainStyles.introCard}>
              <div className={terrainStyles.introCardIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3>Investissement sûr</h3>
              <p>Le foncier est une valeur refuge dont le prix tend à augmenter avec le temps.</p>
            </div>
            <div className={terrainStyles.introCard}>
              <div className={terrainStyles.introCardIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3>Choix de l&apos; emplacement</h3>
              <p>Sélectionnez l&apos;environnement idéal pour votre futur lieu de vie.</p>
            </div>
          </div>
        </div>

        {/* Filtres de recherche avec design modifié */}
        <div className={`${styles.container} ${terrainStyles.terrainContainer}`}>
          <div className={terrainStyles.terrainFilters}>
            <h2 className={terrainStyles.terrainFilterTitle}>Rechercher un terrain</h2>
            <form onSubmit={handleSearch} className={terrainStyles.terrainFilterForm}>
              <div className={terrainStyles.terrainFilterGroup}>
                <label htmlFor="priceFilter">Budget maximum</label>
                <select 
                  id="priceFilter"
                  className={terrainStyles.terrainFilterSelect}
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                >
                  <option value="">Tous les prix</option>
                  <option value="80000">Jusqu&apos;à 80 000 €</option>
                  <option value="100000">Jusqu&apos;à 100 000 €</option>
                  <option value="150000">Jusqu&apos;à 150 000 €</option>
                  <option value="200000">Jusqu&apos;à 200 000 €</option>
                </select>
              </div>
              <div className={terrainStyles.terrainFilterGroup}>
                <label htmlFor="areaFilter">Surface minimum</label>
                <select 
                  id="areaFilter"
                  className={terrainStyles.terrainFilterSelect}
                  value={areaFilter}
                  onChange={(e) => setAreaFilter(e.target.value)}
                >
                  <option value="">Toutes surfaces</option>
                  <option value="500">500 m² et +</option>
                  <option value="800">800 m² et +</option>
                  <option value="1000">1000 m² et +</option>
                  <option value="2000">2000 m² et +</option>
                </select>
              </div>
              <button type="submit" className={terrainStyles.terrainFilterButton}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Rechercher
              </button>
            </form>
          </div>

          {/* Liste des terrains avec nouveau design */}
          <h2 className={terrainStyles.terrainResultTitle}>
            Nos terrains disponibles 
            <span className={terrainStyles.terrainResultCount}>({filteredLands.length})</span>
          </h2>
          
          {filteredLands.length === 0 ? (
            <div className={terrainStyles.terrainEmptyResults}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>Aucun terrain ne correspond à vos critères de recherche.</p>
              <button 
                onClick={() => {setPriceFilter(""); setAreaFilter("");}}
                className={terrainStyles.terrainResetButton}
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <div className={terrainStyles.terrainGrid}>
              {filteredLands.map((land) => (
                <div key={land.id} className={terrainStyles.terrainCard}>
                  <div className={terrainStyles.terrainImageContainer}>
                    <Image
                      src={land.image}
                      alt={land.title}
                      width={500}
                      height={300}
                      className={terrainStyles.terrainImage}
                    />
                    <div className={terrainStyles.terrainPrice}>{formatPrice(land.price)}</div>
                  </div>
                  <div className={terrainStyles.terrainContent}>
                    <h3 className={terrainStyles.terrainTitle}>{land.title}</h3>
                    <div className={terrainStyles.terrainLocation}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {land.location}
                    </div>
                    <div className={terrainStyles.terrainArea}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                      </svg>
                      {land.area} m²
                    </div>
                    <div className={terrainStyles.terrainTags}>
                      {land.tags.map((tag, index) => (
                        <span key={index} className={terrainStyles.terrainTag}>{tag}</span>
                      ))}
                    </div>
                    <div className={terrainStyles.terrainActions}>
                      <button
                        onClick={() => handleLandClick(land.id)}
                        className={terrainStyles.terrainDetailsButton}
                      >
                        Voir détails
                      </button>
                      <button className={terrainStyles.terrainContactButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Contacter
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Message de connexion requis */}
        {showLoginMessage && (
          <div className={terrainStyles.loginMessageOverlay}>
            <div className={terrainStyles.loginMessage}>
              <h3>Connexion requise</h3>
              <p>Vous devez être connecté pour accéder aux détails du terrain.</p>
              <div className={terrainStyles.loginMessageActions}>
                <button 
                  onClick={() => router.push('/connexion')}
                  className={terrainStyles.loginMessageButton}
                >
                  Se connecter
                </button>
                <button 
                  onClick={() => setShowLoginMessage(false)}
                  className={terrainStyles.loginMessageButtonSecondary}
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}