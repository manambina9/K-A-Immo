'use client';


import styles from '../../../styles/propriete/proprietaire.module.css'
import { useEffect, useState } from 'react';

 export default function TableauDeBord() {
  const [userId, setUserId] = useState<string | null>(null);
  const [userUsername, setUserUsername] = useState<string | null>(null);


    useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          const user = JSON.parse(userData);
          setUserId(user.id);
        } catch (error) {
          console.error("Erreur de parsing des données utilisateur :", error);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          const user = JSON.parse(userData);
          setUserUsername(user.username);
        } catch (error) {
          console.error("Erreur de parsing des données utilisateur :", error);
        }
      }
    }
  }, []);
  
  return (
    <div>
      <h1>Bienvenue {userUsername} sur votre tableau de bord</h1>
      <p>Utilisez le menu à gauche pour naviguer.</p> 
    </div>
  );
}
