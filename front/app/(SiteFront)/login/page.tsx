'use client'
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Header from '../../../component/header';
import Footer from '../../../component/footer';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from '../../../public/css/login.module.css';

export default function ConnexionPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState('');
  const { login, isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && user) {
      redirectBasedOnRole(user);
    }
  }, [isAuthenticated, user, router]);

  const redirectBasedOnRole = (user: { id: number; roles: string[] }) => {
    if (user.roles.includes('ROLE_ADMIN')) {
      router.push('/Admin/dashboard');
    } else if (user.roles.includes('ROLE_PROPRIETAIRE')) {
      router.push(`/proprietaire/${user.id}`);
    } else if (user.roles.includes('ROLE_USER')) {
      router.push(`/client/${user.id}`);
    } else {
      router.push('/');
    }
  };
  
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
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Échec de la connexion');
      }

      login(data.token, data.user);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };
 
  if (isAuthenticated) {
    // Afficher un loader pendant la redirection
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className={styles.loginContainer}>
      {/* Background Image with Overlay */}
      <div className={styles.backgroundImage}>
        <Image 
          src="/image/login.png" 
          alt="Luxury real estate background" 
          layout="fill" 
          objectFit="cover"
          priority
        />
        <div className={styles.overlay}></div>
      </div>

      <Header />
      
      <div className={styles.contentContainer}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.loginCard}
        >
          {/* Card Header with Branding */}
          <div className={styles.cardHeader}>
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={styles.logoContainer}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </motion.div>
            <h2 className="text-2xl font-bold">Bienvenue</h2>
            <p className="text-sm opacity-90 mt-1">Connectez-vous à votre espace client</p>
          </div>

          {/* Login Form */}
          <div className={styles.formContainer}>
            <form onSubmit={handleSubmit}>
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className={styles.inputGroup}
              >
                <label htmlFor="email" className={styles.inputLabel}>
                  Adresse email
                </label>
                <div className="relative">
                  <div className={styles.inputIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.inputField}
                    placeholder="exemple@email.com"
                  />
                </div>
              </motion.div>

              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className={styles.inputGroup}
              >
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className={styles.inputLabel}>
                    Mot de passe
                  </label>
                  <div>
                    <a href="../../reset" className={styles.forgotPassword}>
                      Oublié ?
                    </a>
                  </div>
                </div>
                <div className="relative">
                  <div className={styles.inputIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                    className={styles.inputField}
                    placeholder="••••••••"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="mt-6"
              >
                <button
                  type="submit"
                  disabled={loading}
                  className={styles.submitButton}
                >
                  {loading ? (
                    <>
                      <svg className={styles.spinner} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
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
                className={styles.errorMessage}
              >
                <p className={styles.errorText}>{error}</p>
              </motion.div>
            )}
          </div>

          {/* Card Footer */}
          <div className={styles.cardFooter}>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className={styles.registerLink}
            >
              <p className={styles.registerText}>
                Pas encore inscrit ?{' '}
                <a href="../register" className={styles.linkHighlight}>
                  Créer un compte
                </a>
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <div className={styles.divider}></div>
              <p className={styles.legalText}>
                En vous connectant, vous acceptez nos{' '}
                <a href="#" className={styles.linkHighlight}>conditions d'utilisation</a>{' '}
                et notre{' '}
                <a href="#" className={styles.linkHighlight}>politique de confidentialité</a>.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}