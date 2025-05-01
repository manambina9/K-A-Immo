'use client';

import React, { useEffect, useState } from 'react';
import ClientHeader from '../../../component/client/ClientHeader';
import ClientSidebar from '../../../component/client/ClientSidebar';
import ApiLocation from '../../../component/VenteMaison';
import styles from '../../../public/css/user.module.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Client = {
  id: number;
  username: string;
  name: string;
  email: string;
  phone?: string;
  favorites: number[];
  preferences: {
    type: string;
    budget: number;
    location: string;
    bedrooms: number;
  };
};

const ClientPage = () => {
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const router = useRouter();

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const userData = localStorage.getItem('user');
        if (!userData) {
          setLoading(false);
          return;
        }

        const user = JSON.parse(userData);

        setClient({
          id: user.id,
          username: user.username,
          name: user.name || user.username,
          email: user.email,
          phone: user.phone,
          favorites: user.favorites || [],
          preferences: user.preferences || {
            type: "appartement",
            budget: 350000,
            location: "Paris",
            bedrooms: 3,
          }
        });
      } catch (error) {
        console.error('Error fetching client data:', error);
        router.push('../login');
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, [router]);

  const handleToggleFavorite = (propertyId: number) => {
    if (!client) return;

    const isFavorite = client.favorites.includes(propertyId);
    const updatedFavorites = isFavorite
      ? client.favorites.filter(id => id !== propertyId)
      : [...client.favorites, propertyId];

    // Update localStorage
    const updatedUser = { 
      ...JSON.parse(localStorage.getItem('user') || '{}'),
      favorites: updatedFavorites 
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));

    setClient({
      ...client,
      favorites: updatedFavorites
    });
  };

  if (loading) {
    return <div className={styles.loading}>Chargement...</div>;
  }

  if (!client) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>Veuillez vous connecter pour accéder à cette page</p>
        <Link href="../SiteFront/login" className={styles.loginLink}>
          Se connecter
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.clientContainer}>
      <ClientSidebar 
        client={client} 
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      <div className={styles.mainContent}>
        <ClientHeader client={client} />
        <ApiLocation 
          showOnlyFavorites={activeFilter === 'favorites'}
          favorites={client.favorites}
          onToggleFavorite={handleToggleFavorite}
        />
      </div>
    </div>
  );
};

export default ClientPage;