'use client';

import { useEffect, useState } from 'react';
import styles from '../../../../styles/propriete/proprietaire.module.css';

export default function ProfilPage() {
  const [userData, setUserData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Non authentifié');
      }

      const response = await fetch('http://127.0.0.1:8000/api/user/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
      }

      const data = await response.json();
      setUserData(data.user);
      setFormData({
        username: data.user.username || '',
        email: data.user.email || '',
        phone: data.user.phone || '',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Non authentifié');
      }

      // Validation côté client
      if (!formData.username || formData.username.length < 3) {
        throw new Error("Le nom d'utilisateur doit contenir au moins 3 caractères");
      }

      if (formData.phone && !/^[0-9+\s]{10,20}$/.test(formData.phone)) {
        throw new Error("Numéro de téléphone invalide");
      }

      const response = await fetch('http://127.0.0.1:8000/api/user/profile/update', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          phone: formData.phone,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Erreur lors de la mise à jour');
      }

      setUserData(responseData.user);
      setSuccessMessage('Profil mis à jour avec succès');
      setIsEditing(false);
      
      // Rafraîchir les données après un court délai
      setTimeout(fetchUserData, 500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la mise à jour');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    const newPassword = prompt('Entrez votre nouveau mot de passe (min. 8 caractères):');
    if (!newPassword || newPassword.length < 8) {
      alert('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }

    const currentPassword = prompt('Entrez votre mot de passe actuel:');
    if (!currentPassword) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Non authentifié');
      }

      const response = await fetch('http://localhost:8000/api/user/change-password', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors du changement de mot de passe');
      }

      alert('Mot de passe mis à jour avec succès');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erreur lors du changement de mot de passe');
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validation du fichier
    if (!file.type.match('image.*')) {
      alert('Veuillez sélectionner une image valide');
      return;
    }

    if (file.size > 2 * 1024 * 1024) { // 2MB max
      alert('La taille de l\'image ne doit pas dépasser 2MB');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Non authentifié');
      }

      const formData = new FormData();
      formData.append('avatar', file);

      const response = await fetch('http://localhost:8000/api/user/upload-avatar', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Erreur lors du téléversement');
      }

      // Mettre à jour l'état avec la nouvelle URL de l'avatar
      setUserData({ ...userData, avatarUrl: responseData.avatar_url });
      setSuccessMessage('Avatar mis à jour avec succès');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du téléversement');
    }
  };

  if (loading && !userData) {
    return (
      <div className={styles.profileContainer}>
        <div className={styles.loading}>Chargement du profil...</div>
      </div>
    );
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <h1>Mon Profil</h1>
        <div className={styles.actions}>
          {!isEditing ? (
            <button 
              onClick={() => setIsEditing(true)}
              className={styles.editButton}
              disabled={loading}
            >
              ✏️ Modifier le profil
            </button>
          ) : (
            <button 
              onClick={() => {
                setIsEditing(false);
                setError(null);
              }}
              className={styles.cancelButton}
              disabled={loading}
            >
              ❌ Annuler
            </button>
          )}
        </div>
      </div>

      {/* Messages d'erreur/succès */}
      {error && (
        <div className={styles.alertError}>
          {error}
          <button onClick={() => setError(null)} className={styles.closeAlert}>
            ×
          </button>
        </div>
      )}
      
      {successMessage && (
        <div className={styles.alertSuccess}>
          {successMessage}
          <button onClick={() => setSuccessMessage(null)} className={styles.closeAlert}>
            ×
          </button>
        </div>
      )}

      <div className={styles.profileContent}>
        <div className={styles.profileCard}>
          <div className={styles.avatarSection}>
            <div className={styles.avatar}>
              {userData?.avatarUrl ? (
                <img 
                  src={userData.avatarUrl} 
                  alt="Avatar" 
                  className={styles.avatarImage}
                />
              ) : (
                <span className={styles.avatarInitial}>
                  {userData?.username?.charAt(0)?.toUpperCase() || 'P'}
                </span>
              )}
            </div>
            {isEditing && (
              <div className={styles.avatarUpload}>
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  style={{ display: 'none' }}
                />
                <label htmlFor="avatar-upload" className={styles.changeAvatarButton}>
                  {loading ? 'Chargement...' : 'Changer la photo'}
                </label>
                <p className={styles.avatarHint}>Formats acceptés: JPG, PNG (max 2MB)</p>
              </div>
            )}
          </div>

          {!isEditing ? (
            <div className={styles.infoSection}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Nom d'utilisateur:</span>
                <span className={styles.infoValue}>{userData?.username || 'Non renseigné'}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Email:</span>
                <span className={styles.infoValue}>{userData?.email}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Téléphone:</span>
                <span className={styles.infoValue}>{userData?.phone || 'Non renseigné'}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Statut:</span>
                <span className={styles.infoValue}>
                  {userData?.isVerified ? '✓ Vérifié' : 'Non vérifié'}
                </span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.editForm}>
              <div className={styles.formGroup}>
                <label htmlFor="username">Nom d'utilisateur *</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  disabled={loading}
                  required
                  minLength={3}
                  maxLength={255}
                  pattern="[a-zA-Z0-9_]+"
                  title="Lettres, chiffres et underscores seulement"
                />
                <small className={styles.formHint}>3 caractères minimum, lettres, chiffres et underscores</small>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className={styles.disabledInput}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="phone">Téléphone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={loading}
                  pattern="[0-9+\s]{10,20}"
                  title="Numéro de téléphone valide (10-20 chiffres)"
                />
                <small className={styles.formHint}>Format: 034 ** *** **</small>
              </div>
              
              <button 
                type="submit" 
                className={styles.saveButton}
                disabled={loading}
              >
                {loading ? 'Enregistrement...' : '💾 Enregistrer les modifications'}
              </button>
            </form>
          )}
        </div>

        <div className={styles.additionalSections}>
          <div className={styles.sectionCard}>
            <h3>📋 Mes propriétés</h3>
            {userData?.maisons?.length > 0 ? (
              <div className={styles.propertyList}>
                {userData.maisons.map((maison: any) => (
                  <div key={maison.id} className={styles.propertyItem}>
                    <span>{maison.titre}</span>
                    <button className={styles.viewButton}>Voir</button>
                  </div>
                ))}
              </div>
            ) : (
              <p className={styles.noItems}>Aucune propriété enregistrée</p>
            )}
          </div>

          <div className={styles.sectionCard}>
            <h3>🔐 Sécurité</h3>
            <div className={styles.securityActions}>
              <button 
                className={styles.securityButton}
                onClick={handlePasswordChange}
                disabled={loading}
              >
                🔒 Modifier le mot de passe
              </button>
              <button 
                className={styles.securityButton}
                disabled={loading}
              >
                {userData?.isVerified ? '✅ Email vérifié' : '⚠️ Vérifier mon email'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}