'use client';

import { useState, useEffect } from 'react';
import { Home, Building, Key } from 'lucide-react';
import Header from '../component/header'
export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(progress => (progress >= 100 ? 0 : progress + 1));
    }, 30);
    
    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <> 
    <Header />
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 z-50">
      <div className="relative mb-8">
        <div className="flex items-center space-x-2">
          <Building size={32} className="text-blue-600 animate-bounce" style={{ animationDelay: '0ms' }} />
          <Home size={32} className="text-blue-800 animate-bounce" style={{ animationDelay: '200ms' }} />
          <Key size={32} className="text-blue-600 animate-bounce" style={{ animationDelay: '400ms' }} />
        </div>
        
        <h2 className="mt-4 text-2xl font-bold text-gray-800 text-center">
          Immobilier Premium
        </h2>
      </div>
      
      {/* Barre de progression */}
      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <p className="text-gray-600">
        {progress < 30 && "Chargement des propriétés..."}
        {progress >= 30 && progress < 60 && "Préparation des images..."}
        {progress >= 60 && progress < 90 && "Récupération des détails..."}
        {progress >= 90 && "Presque prêt..."}
      </p>
    </div>
    </>
  );
}