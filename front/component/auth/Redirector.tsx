'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const Redirector = () => {
  const { user} = useAuth();
  const router = useRouter();
  const loading = false;

  useEffect(() => {
    if (!loading && user) {
      if (user.roles.includes('ROLE_ADMIN')) {
        router.push('/admin/dashboard');
      } else if (user.roles.includes('ROLE_PROPRIETAIRE')) {
        router.push(`/proprietaire/${user.id}`);
      } else if (user.roles.includes('ROLE_USER')) {
        router.push(`/client/${user.id}`);
      } else {
        // Redirection par défaut si le rôle n'est pas reconnu
        router.push('/login');
      }
    } else if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  return null; // Ce composant ne rend rien
};

export default Redirector;