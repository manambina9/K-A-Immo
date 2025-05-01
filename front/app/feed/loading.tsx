import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--light-bg)] to-[var(--secondary-color)] flex items-center justify-center">
      <div className="flex flex-col items-center space-y-8">
        {/* Maison animée avec effet de "construction" */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Base de la maison */}
          <div className="w-24 h-16 bg-[var(--accent-color)] rounded-t-lg"></div>
          
          {/* Toit */}
          <div className="absolute -top-4 left-0 right-0 flex justify-center">
            <div className="w-0 h-0 border-l-[24px] border-l-transparent border-b-[24px] border-b-[var(--primary-color)] border-r-[24px] border-r-transparent"></div>
          </div>
          
          {/* Porte */}
          <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-8 bg-[var(--secondary-color)] rounded-t-sm"
          ></motion.div>
          
          {/* Fenêtres (clignotantes) */}
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-4 left-4 w-5 h-4 bg-[var(--light-bg)] rounded-sm"
          ></motion.div>
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            className="absolute top-4 right-4 w-5 h-4 bg-[var(--light-bg)] rounded-sm"
          ></motion.div>
        </motion.div>

        {/* Spinner personnalisé */}
        <div className="relative w-20 h-20">
          <div className="animate-spin rounded-full h-full w-full border-t-4 border-b-4 border-[var(--primary-color)] border-opacity-30"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 text-[var(--primary-color)] animate-pulse" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
              />
            </svg>
          </div>
        </div>

        {/* Texte animé */}
        <div className="flex flex-col items-center space-y-2">
          <motion.div
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-xl font-semibold text-[var(--text-color)]"
          >
            Préparation de votre visite
          </motion.div>
          
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  delay: i * 0.3
                }}
                className="w-2 h-2 bg-[var(--primary-color)] rounded-full"
              ></motion.div>
            ))}
          </div>
        </div>

        {/* Barre de progression stylisée */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "60%" }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="h-1.5 bg-gradient-to-r from-[var(--light-bg)] via-[var(--primary-color)] to-[var(--accent-color)] rounded-full"
        ></motion.div>
      </div>
    </div>
  );
}