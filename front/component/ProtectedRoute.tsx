'use client'
import { ReactNode } from 'react'; 
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; 

interface ProtectedRouteProps {
  children: ReactNode; // Type explicite pour les enfants
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();
  
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      router.push('/../SiteFront/login')
    }
  }, [router]);

  return <>{children}</>;
};

export default ProtectedRoute;
