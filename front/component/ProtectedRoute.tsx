'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const ProtectedRoute = ({
  children,
  requiredRole,
}: {
  children: React.ReactNode;
  requiredRole?: string;
}) => {
  const { isAuthenticated, hasRole, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/login');
      } else if (requiredRole && !hasRole(requiredRole)) {
        router.push('/unauthorized');
      }
    }
  }, [isLoading, isAuthenticated, requiredRole, router, hasRole]);

  if (isLoading) {
    // Facultatif : afficher un loader pendant le chargement
    return <div>Chargement...</div>;
  }

  if (!isAuthenticated || (requiredRole && !hasRole(requiredRole))) {
    return null;
  }

  return <>{children}</>;
};
