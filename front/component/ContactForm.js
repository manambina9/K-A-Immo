// components/ContactForm.js
'use client'
import { useForm } from "react-hook-form";
import { useState } from "react";
import styles from '../public/css/contactForm.module.css';
import Image from 'next/image';

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  
  const [success, setSuccess] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState('');

  const subjects = [
    "Information générale",
    "Demande de devis",
    "Réclamation",
    "Partenariat"
  ];

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/contact', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSuccess("Message envoyé avec succès !");
        reset();
        // Réinitialiser le formulaire après 5 secondes
        setTimeout(() => {
          setSuccess(null);
        }, 5000);
      } else {
        setSuccess("Une erreur est survenue. Veuillez réessayer.");
      }
    } catch (error) {
      if (error instanceof TypeError){
        setSuccess("Une erreur de connexion est survenue. Veuillez vérifier votre connexion internet.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.leftPanel}>
          <h2 className={styles.title}>Contactez-nous</h2>
          <p className={styles.subtitle}>Nous sommes à votre écoute. Remplissez le formulaire et notre équipe vous répondra dans les meilleurs délais.</p>
          <Image
              src="/image/logo.png"
              alt="Maison à vendre"
              width={350}
              height={200}
            />
          <div className={styles.contactInfo}>
            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.icon}>
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              <div>
                <h4>Téléphone</h4>
                <p>+261 34 84 856 35</p>
              </div>
            </div>
            
            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.icon}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <h4>Email</h4>
                <p>kellymanambina@gmail.com</p>
              </div>
            </div>
            
            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.icon}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <h4>Adresse</h4>
                <p>IVB 767 Ambohimanala</p>
              </div>
            </div>
          </div>
          
          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialIcon} aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            <a href="#" className={styles.socialIcon} aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
              </svg>
            </a>
            <a href="#" className={styles.socialIcon} aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="#" className={styles.socialIcon} aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>
        
        <div className={styles.rightPanel}>
          {success && (
            <div className={`${styles.notification} ${success.includes('succès') ? styles.success : styles.error}`}>
              <p>{success}</p>
              <button 
                onClick={() => setSuccess(null)}
                className={styles.closeNotification}
                aria-label="Fermer la notification"
              >
                ×
              </button>
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>Nom complet</label>
              <div className={styles.inputWrapper}>
                <input
                  id="name"
                  type="text"
                  placeholder="Votre nom"
                  {...register("name", { 
                    required: "Le nom est requis",
                    minLength: {
                      value: 2,
                      message: "Le nom doit contenir au moins 2 caractères"
                    }
                  })}
                  className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                />
                <div className={styles.inputIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              </div>
              {errors.name && <p className={styles.errorMessage}>{errors.name.message}</p>}
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>Email</label>
                <div className={styles.inputWrapper}>
                  <input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    {...register("email", { 
                      required: "L'email est requis",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Adresse email invalide"
                      }
                    })}
                    className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                  />
                  <div className={styles.inputIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                </div>
                {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone" className={styles.label}>Téléphone</label>
                <div className={styles.inputWrapper}>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="034 34 334 34"
                    {...register("phone", { 
                      pattern: {
                        value: /^[0-9+\s()-]{8,15}$/,
                        message: "Numéro de téléphone invalide"
                      }
                    })}
                    className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                  />
                  <div className={styles.inputIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                </div>
                {errors.phone && <p className={styles.errorMessage}>{errors.phone.message}</p>}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="subject" className={styles.label}>Sujet</label>
              <div className={styles.selectWrapper}>
                <select
                  id="subject"
                  {...register("subject", { required: "Le sujet est requis" })}
                  className={`${styles.select} ${errors.subject ? styles.inputError : ''}`}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  value={selectedSubject}
                >
                  <option value="" disabled>Sélectionnez un sujet</option>
                  {subjects.map((subject, index) => (
                    <option key={index} value={subject}>{subject}</option>
                  ))}
                </select>
                <div className={styles.selectIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>
              {errors.subject && <p className={styles.errorMessage}>{errors.subject.message}</p>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>Message</label>
              <textarea
                id="message"
                placeholder="Détaillez votre demande ici..."
                {...register("message", { 
                  required: "Le message est requis",
                  minLength: {
                    value: 10,
                    message: "Le message doit contenir au moins 10 caractères"
                  }
                })}
                className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                rows="5"
              />
              {errors.message && <p className={styles.errorMessage}>{errors.message.message}</p>}
            </div>

            <div className={styles.formGroup}>
              <div className={styles.checkboxWrapper}>
                <input
                  id="consent"
                  type="checkbox"
                  {...register("consent", { 
                    required: "Vous devez accepter la politique de confidentialité"
                  })}
                  className={styles.checkbox}
                />
                <label htmlFor="consent" className={styles.checkboxLabel}>
                  Jaccepte que mes données soient traitées conformément à la <a href="#" className={styles.link}>politique de confidentialité</a>
                </label>
              </div>
              {errors.consent && <p className={styles.errorMessage}>{errors.consent.message}</p>}
            </div>

            <button 
              type="submit" 
              className={styles.button}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className={styles.loadingSpinner}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" opacity="0.25" />
                    <path d="M12 2a10 10 0 1 0 10 10" />
                  </svg>
                  Envoi en cours...
                </span>
              ) : (
                <>
                  Envoyer le message
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.buttonIcon}>
                    <path d="M22 2L11 13" />
                    <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}