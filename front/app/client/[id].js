import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ClientHeader from '../../component/client/ClientHeader';
import PropertyCard from '../../component/client/PropertyCard';
import ClientSidebar from '../../component/client/ClientSidebar';
import styles from '../../public/css/user.module.css';

const ClientPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [client, setClient] = useState(null);
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    // Simuler un appel API pour récupérer les données du client
    const fetchClientData = async () => {
      try {
        // En production, vous feriez un appel API réel ici
        const mockClient = {
          id: id,
          name: "Jean Dupont",
          email: "jean.dupont@example.com",
          phone: "+33 6 12 34 56 78",
          preferences: {
            type: "appartement",
            budget: 350000,
            location: "Paris",
            bedrooms: 3
          },
          favorites: [101, 103]
        };

        const mockProperties = [
          {
            id: 101,
            title: "Appartement spacieux dans le Marais",
            type: "appartement",
            price: 325000,
            location: "Paris 4e",
            bedrooms: 3,
            bathrooms: 2,
            area: 85,
            description: "Magnifique appartement rénové avec vue sur cour arborée.",
            image: "/property1.jpg",
            features: ["Balcon", "Ascenseur", "Cave"],
            status: "disponible"
          },
          {
            id: 102,
            title: "Maison de ville avec jardin",
            type: "maison",
            price: 420000,
            location: "Montreuil",
            bedrooms: 4,
            bathrooms: 2,
            area: 120,
            description: "Maison lumineuse avec jardin clos et terrasse.",
            image: "/property2.jpg",
            features: ["Jardin", "Parking", "Cuisine équipée"],
            status: "disponible"
          },
          {
            id: 103,
            title: "Studio moderne près de la Défense",
            type: "studio",
            price: 185000,
            location: "Nanterre",
            bedrooms: 1,
            bathrooms: 1,
            area: 32,
            description: "Studio neuf avec kitchenette et espace rangement optimisé.",
            image: "/property3.jpg",
            features: ["Neuf", "Gardien", "Proche transports"],
            status: "disponible"
          },
          {
            id: 104,
            title: "Loft d'artiste à Montmartre",
            type: "loft",
            price: 550000,
            location: "Paris 18e",
            bedrooms: 2,
            bathrooms: 1,
            area: 95,
            description: "Espace unique avec hauteur sous plafond et grande luminosité.",
            image: "/property4.jpg",
            features: ["Hauteur sous plafond", "Atelier", "Terrasse"],
            status: "réservé"
          }
        ];

        setClient(mockClient);
        setProperties(mockProperties);
        setFilteredProperties(mockProperties);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching client data:", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchClientData();
    }
  }, [id]);

  const filterProperties = (filter) => {
    setActiveFilter(filter);
    if (filter === 'all') {
      setFilteredProperties(properties);
    } else if (filter === 'favorites') {
      const favs = properties.filter(prop => client.favorites.includes(prop.id));
      setFilteredProperties(favs);
    } else {
      const filtered = properties.filter(prop => prop.type === filter);
      setFilteredProperties(filtered);
    }
  };

  const toggleFavorite = (propertyId) => {
    const isFavorite = client.favorites.includes(propertyId);
    let updatedFavorites;
    
    if (isFavorite) {
      updatedFavorites = client.favorites.filter(id => id !== propertyId);
    } else {
      updatedFavorites = [...client.favorites, propertyId];
    }
    
    setClient({
      ...client,
      favorites: updatedFavorites
    });
    
    // Mettre à jour les favoris dans le filtre si actif
    if (activeFilter === 'favorites') {
      const favs = properties.filter(prop => updatedFavorites.includes(prop.id));
      setFilteredProperties(favs);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Chargement...</div>;
  }

  if (!client) {
    return <div className={styles.error}>Client non trouvé</div>;
  }

  return (
    <div className={styles.clientContainer}>
      <ClientSidebar 
        client={client} 
        activeFilter={activeFilter} 
        onFilterChange={filterProperties} 
      />
      
      <div className={styles.mainContent}>
        <ClientHeader client={client} />
        
        <div className={styles.propertyGrid}>
          {filteredProperties.length > 0 ? (
            filteredProperties.map(property => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                isFavorite={client.favorites.includes(property.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))
          ) : (
            <div className={styles.noResults}>
              <h3>Aucun bien ne correspond à vos critères</h3>
              <p>Essayez de modifier vos filtres ou contactez votre conseiller pour plus d'options.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientPage;