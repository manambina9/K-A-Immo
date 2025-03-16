'use client'
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function PropertyDetails({ params }: { params: { id: string } }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    router.push('/connexion'); // Rediriger si l'utilisateur n'est pas connecté
    return null;
  }

  return (
    <div>
      <h1>Détails de la propriété {params.id}</h1>
      {/* Ajoute ici les détails de la propriété */}
    </div>
  );
}