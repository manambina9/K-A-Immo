// pages/auth.js
'use client'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head'; 
import styles from '../../public/css/testlogin.module.css';
export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Effet de suivi de la souris pour l'animation du fond
  useEffect(() => {
    interface MousePosition {
      x: number;
      y: number;
    }

    const handleMouseMove = (e: MouseEvent): void => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

interface FormData {
    email: string;
    password: string;
    name?: string;
}

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulation d'une requête
    await new Promise<void>(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    // Logique de connexion/inscription à implémenter
    const formData: FormData = { email, password, name: isLogin ? undefined : name };
    console.log(isLogin ? 'Connexion' : 'Inscription', formData);
};

  return (
    <>
      <Head>
        <title>{isLogin ? 'Connexion' : 'Inscription'} | VotreSite</title>
      </Head>
      
      <div className={styles.authContainer}>
        {/* Cercles d'animation de fond */}
        <div className={styles.backgroundEffects}>
          <motion.div 
            className={styles.backgroundBlobPurple}
            animate={{
              x: mousePosition.x * 0.02,
              y: mousePosition.y * 0.02,
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div 
            className={styles.backgroundBlobIndigo}
            animate={{
              x: mousePosition.x * -0.02,
              y: mousePosition.y * -0.02,
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
          <motion.div 
            className={styles.backgroundBlobPink}
            animate={{
              x: mousePosition.x * 0.015,
              y: mousePosition.y * -0.015,
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className={styles.formCard}
        >
          <div className={styles.cardContent}>
            {/* En-tête */}
            <div className={styles.cardHeader}>
              <div className={styles.headerBackground}>
                <motion.div 
                  className={styles.headerPattern}
                  animate={{ 
                    backgroundPosition: ['0% 0%', '100% 100%'],
                    opacity: [0.7, 0.5, 0.7],
                  }}
                  transition={{ 
                    duration: 15,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                />
                <div className={styles.headerOverlay}></div>
              </div>
              <div className={styles.avatarWrapper}>
                <motion.div 
                  className={styles.avatar}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className={styles.avatarInner}>
                    <svg className={styles.avatarIcon} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path>
                    </svg>
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* Onglets */}
            <div className={styles.tabs}>
              <div className={styles.tabsContainer}>
                <motion.button
                  onClick={() => setIsLogin(true)}
                  className={`${styles.tabButton} ${isLogin ? styles.activeTab : ''}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Connexion
                  {isLogin && (
                    <motion.div 
                      className={styles.activeTabIndicator}
                      layoutId="activeTab"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
                <motion.button
                  onClick={() => setIsLogin(false)}
                  className={`${styles.tabButton} ${!isLogin ? styles.activeTab : ''}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Inscription
                  {!isLogin && (
                    <motion.div 
                      className={styles.activeTabIndicator}
                      layoutId="activeTab"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              </div>
            </div>
            
            {/* Formulaire */}
            <div className={styles.formContainer}>
              <AnimatePresence mode="wait">
                <motion.form 
                  key={isLogin ? 'login' : 'register'}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  onSubmit={handleSubmit}
                  className={styles.form}
                >
                  {!isLogin && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className={styles.formGroup}
                    >
                      <label htmlFor="name" className={styles.label}>Nom</label>
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={styles.inputWrapper}
                      >
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className={styles.input}
                          placeholder="Votre nom complet"
                          required={!isLogin}
                        />
                      </motion.div>
                    </motion.div>
                  )}
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>Email</label>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={styles.inputWrapper}
                    >
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.input}
                        placeholder="votre@email.com"
                        required
                      />
                    </motion.div>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.label}>Mot de passe</label>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={styles.inputWrapper}
                    >
                      <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                        placeholder="••••••••"
                        required
                      />
                    </motion.div>
                  </div>
                  
                  {isLogin && (
                    <div className={styles.optionsContainer}>
                      <div className={styles.checkboxContainer}>
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          className={styles.checkbox}
                        />
                        <label htmlFor="remember-me" className={styles.checkboxLabel}>
                          Se souvenir de moi
                        </label>
                      </div>
                      
                      <div className={styles.forgotPassword}>
                        <a href="#" className={styles.link}>
                          Mot de passe oublié?
                        </a>
                      </div>
                    </div>
                  )}
                  
                  <motion.button
                    type="submit"
                    className={styles.submitButton}
                    whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.4)" }}
                    whileTap={{ scale: 0.97 }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <motion.svg 
                        className={styles.loadingIcon}
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </motion.svg>
                    ) : null}
                    {isLogin ? 'Se connecter' : 'S\'inscrire'}
                  </motion.button>
                </motion.form>
              </AnimatePresence>
            </div>
            
            {/* Pied de page */}
            <div className={styles.footer}>
              <p className={styles.switchText}>
                {isLogin ? 'Pas encore de compte? ' : 'Déjà un compte? '}
                <motion.button 
                  onClick={() => setIsLogin(!isLogin)} 
                  className={styles.switchLink}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isLogin ? 'S\'inscrire' : 'Se connecter'}
                </motion.button>
              </p>
              
              <div className={styles.socialButtons}>
                <motion.button
                  className={styles.socialButton}
                  whileHover={{ scale: 1.05, boxShadow: "0 4px 6px -1px rgba(255, 255, 255, 0.1)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                  </svg>
                  Google
                </motion.button>
                
                <motion.button
                  className={styles.socialButton}
                  whileHover={{ scale: 1.05, boxShadow: "0 4px 6px -1px rgba(255, 255, 255, 0.1)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                  </svg>
                  Facebook
                </motion.button>
              </div>
            </div>
          </div>
          
          {/* Éclats de lumière */}
          <div className={styles.lightEffect1}></div>
          <div className={styles.lightEffect2}></div>
        </motion.div>
      </div>
    </>
  );
}