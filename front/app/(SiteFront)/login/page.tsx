'use client'
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Header from '../../../component/header';
import Footer from '../../../component/footer';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ConnexionPage() {
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, login } = useAuth();
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        router.push(`/client/${user.id}`);
      }
    }
  }, [isAuthenticated, router]);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      login(data.token, data.user);
      router.push(`/client/${data.user.id}`);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };
 
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <Header />
      <div className="flex min-h-[calc(100vh-200px)] flex-col md:flex-row justify-center items-center px-6 py-12 max-w-7xl mx-auto">
        {/* Image Section */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden md:block w-full md:w-1/2 p-8"
        >
          <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D35400]/80 to-[#2C3E50]/50 z-10 rounded-xl"></div>
            <Image 
              src="/image/login.png" 
              alt="Luxury real estate" 
              layout="fill" 
              objectFit="cover"
              className="rounded-xl"
            />
            <div className="absolute bottom-0 left-0 p-6 z-20 text-white">
              <h2 className="text-3xl font-bold mb-2">Trouvez votre propriété de rêve</h2>
              <p className="text-lg">Connectez-vous pour accéder à nos offres exclusives</p>
            </div>
          </div>
        </motion.div>

        {/* Login Form Section */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full md:w-1/2 max-w-md bg-white rounded-xl shadow-xl p-8 md:ml-8"
        >
          <div className="text-center mb-8">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="inline-block p-2 rounded-full bg-[#D35400]/10 mb-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#D35400]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </motion.div>
            <h2 className="text-2xl font-bold text-[#2C3E50]">Bienvenue</h2>
            <p className="text-gray-500 mt-1">Connectez-vous à votre espace client</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <label htmlFor="email" className="block text-sm font-medium text-[#2C3E50] mb-2">
                Adresse email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={username}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-[#D35400] focus:border-[#D35400] text-[#2C3E50] transition-all duration-200"
                  placeholder="exemple@email.com"
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-[#2C3E50]">
                  Mot de passe
                </label>
                <div className="text-sm">
                  <a href="../../reset" className="font-medium text-[#D35400] hover:text-[#e67e22] transition-colors duration-200">
                    Mot de passe oublié ?
                  </a>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-[#D35400] focus:border-[#D35400] text-[#2C3E50] transition-all duration-200"
                  placeholder="••••••••"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="pt-2"
            >
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-md text-white bg-gradient-to-r from-[#D35400] to-[#e67e22] hover:from-[#e67e22] hover:to-[#D35400] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D35400] transition-all duration-300 transform hover:scale-105 ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Connexion en cours...
                  </>
                ) : (
                  'Se connecter'
                )}
              </button>
            </motion.div>
          </form>
          
          {error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200"
            >
              <p className="text-center text-red-600 text-sm">{error}</p>
            </motion.div>
          )}
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-500">
              Pas encore inscrit ?{' '}
              <a href="../register" className="font-medium text-[#D35400] hover:text-[#e67e22] transition-colors duration-200">
                Créer un compte
              </a>
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="mt-8 pt-6 border-t border-gray-200"
          >
            <p className="text-xs text-center text-gray-500">
              En vous connectant, vous acceptez nos{' '}
              <a href="#" className="underline text-gray-600 hover:text-[#D35400]">conditions d'utilisation</a>{' '}
              et notre{' '}
              <a href="#" className="underline text-gray-600 hover:text-[#D35400]">politique de confidentialité</a>.
            </p>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}