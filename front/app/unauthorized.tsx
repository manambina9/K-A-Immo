import Login from './(SiteFront)/login/page'
import { motion } from 'framer-motion'
import Head from 'next/head'

export default function Unauthorized() {
  return (
    <>
      <Head>
        <title>Accès non autorisé | K & A Immo</title>
      </Head>
      
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[var(--light-bg)] to-[var(--secondary-color)] p-4">
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full bg-[var(--light-bg)] rounded-xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-[var(--primary-color)] p-6 text-center">
            <motion.h1 
              className="text-3xl font-bold text-white"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Accès Restreint
            </motion.h1>
          </div>
          
          {/* Content */}
          <div className="p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-center mb-6"
            >
              <div className="mx-auto w-24 h-24 bg-[var(--accent-color)] rounded-full flex items-center justify-center mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-12 w-12 text-white" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                  />
                </svg>
              </div>
              
              <h2 className="text-2xl font-semibold text-[var(--text-color)] mb-2">401 - Non Autorisé</h2>
              <p className="text-[var(--text-color)] opacity-80">
                Vous devez être connecté pour accéder à cette page.
              </p>
            </motion.div>
            
            {/* Login Component */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Login />
            </motion.div>
          </div>
          
          {/* Footer */}
          <div className="bg-[var(--secondary-color)] bg-opacity-10 p-4 text-center text-sm text-[var(--text-color)]">
            <p>Vous cherchez un bien immobilier? <a href="/" className="text-[var(--primary-color)] font-medium hover:underline">Retour à l'accueil</a></p>
          </div>
        </motion.div>
        
        {/* Floating houses animation */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-8 opacity-20">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -15, 0] }}
              transition={{ 
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-[var(--primary-color)]"
              style={{ fontSize: '2rem' }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="40" 
                height="40" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M19 9.3V4h-3v2.6L12 3 2 12h3v8h5v-6h4v6h5v-8h3l-3-2.7zm-9 .7c0-1.1.9-2 2-2s2 .9 2 2h-4z"/>
              </svg>
            </motion.div>
          ))}
        </div>
      </main>
    </>
  )
}