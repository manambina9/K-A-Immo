'use client';

import React, { useState, useEffect } from 'react';
import { useRouter , useParams} from 'next/navigation';
import { Home, MapPin, Ruler, Bed, DollarSign, ArrowLeft, Save, Image as ImageIcon, X, Plus, Trash2, Check } from 'lucide-react';
import styles from '../../../../../styles/propriete/proprietaire.module.css';  

interface Maison {
  id: number;
  nom: string;
  adresse: string;
  ville: string;
  description: string;
  prix: number;
  surface: number;
  nbChambres: number;
  disponible: boolean;
  imagePrincipale: string | null;
  images: string[];
  type: string;
  codePostal: string;
  dateDisponibilite: string;
}

const ModifierBienPage = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [maison, setMaison] = useState<Maison | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [newImages, setNewImages] = useState<File[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!params?.id) return;

    const fetchBien = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/maisons/${params.id}`);
        if (!response.ok) throw new Error('Erreur lors du chargement du bien');
        const data = await response.json();
        setMaison(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchBien();
  }, [params?.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMaison(prev => prev ? { ...prev, [name]: name === 'prix' || name === 'surface' || name === 'nbChambres' 
      ? Number(value) 
      : value 
    } : null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setNewImages(prev => [...prev, ...files]);
    }
  };

  const removeNewImage = (index: number) => {
    setNewImages(prev => prev.filter((_, i) => i !== index));
  };

  const markImageForDeletion = (imageUrl: string) => {
    setImagesToDelete(prev => [...prev, imageUrl]);
    if (maison) {
      setMaison({
        ...maison,
        images: maison.images.filter(img => img !== imageUrl),
        imagePrincipale: maison.imagePrincipale === imageUrl ? null : maison.imagePrincipale
      });
    }
  };

  const setAsMainImage = (imageUrl: string) => {
    if (maison) {
      setMaison({ ...maison, imagePrincipale: imageUrl });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!maison) return;

    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      
      // Ajouter les données textuelles
      formData.append('nom', maison.nom);
      formData.append('adresse', maison.adresse);
      formData.append('ville', maison.ville);
      formData.append('description', maison.description);
      formData.append('prix', maison.prix.toString());
      formData.append('surface', maison.surface.toString());
      formData.append('nbChambres', maison.nbChambres.toString());
      formData.append('disponible', maison.disponible.toString());
      formData.append('type', maison.type);
      formData.append('codePostal', maison.codePostal);
      formData.append('dateDisponibilite', maison.dateDisponibilite);
      
      if (maison.imagePrincipale) {
        formData.append('imagePrincipale', maison.imagePrincipale);
      }
       
      imagesToDelete.forEach(img => formData.append('imagesToDelete[]', img));
       
      newImages.forEach((file, index) => {
        formData.append(`newImages[${index}]`, file);
      });

      const response = await fetch(`http://127.0.0.1:8000/api/maisons/${params.id}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Erreur lors de la mise à jour');

      const data = await response.json();
      setSuccess('Bien mis à jour avec succès!');
      setTimeout(() => router.push('/proprietaire/biens'), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Chargement du bien...</p>
      </div>
    );
  }

  if (!maison) {
    return (
      <div className={styles.errorContainer}>
        <p>Impossible de charger les détails du bien.</p>
        <button 
          onClick={() => router.push('/proprietaire/biens')}
          className={styles.primaryButton}
        >
          <ArrowLeft size={16} /> Retour à la liste
        </button>
      </div>
    );
  }

  return (
    <div className={styles.mainContentContainer}>
      <div className={styles.headerSection}>
        <button 
          onClick={() => router.push('/proprietaire/biens')}
          className={styles.backButton}
        >
          <ArrowLeft size={20} /> Retour
        </button>
        <h1 className={styles.pageTitle}>
          <Home size={28} className={styles.headerIcon} />
          Modifier le bien: {maison.nom}
        </h1>
      </div>

      {error && (
        <div className={styles.alertError}>
          <X size={18} /> {error}
        </div>
      )}

      {success && (
        <div className={styles.alertSuccess}>
          <Check size={18} /> {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.editForm}>
        <div className={styles.formGrid}>
          {/* Section Informations de base */}
          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>
              <Home size={20} className={styles.sectionIcon} />
              Informations de base
            </h2>
            
            <div className={styles.formGroup}>
              <label htmlFor="nom">Nom du bien</label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={maison.nom}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="type">Type de bien</label>
              <select
                id="type"
                name="type"
                value={maison.type}
                onChange={handleChange}
                required
              >
                <option value="">Sélectionner un type</option>
                <option value="maison">Maison</option>
                <option value="appartement">Appartement</option>
                <option value="studio">Studio</option>
                <option value="loft">Loft</option>
                <option value="villa">Villa</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={maison.description}
                onChange={handleChange}
                rows={5}
              />
            </div>
          </div>

          {/* Section Localisation */}
          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>
              <MapPin size={20} className={styles.sectionIcon} />
              Localisation
            </h2>
            
            <div className={styles.formGroup}>
              <label htmlFor="adresse">Adresse</label>
              <input
                type="text"
                id="adresse"
                name="adresse"
                value={maison.adresse}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="ville">Ville</label>
              <input
                type="text"
                id="ville"
                name="ville"
                value={maison.ville}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="codePostal">Code postal</label>
              <input
                type="text"
                id="codePostal"
                name="codePostal"
                value={maison.codePostal}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Section Caractéristiques */}
          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>
              <Ruler size={20} className={styles.sectionIcon} />
              Caractéristiques
            </h2>
            
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="surface">Surface (m²)</label>
                <input
                  type="number"
                  id="surface"
                  name="surface"
                  value={maison.surface}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="nbChambres">Nombre de chambres</label>
                <input
                  type="number"
                  id="nbChambres"
                  name="nbChambres"
                  value={maison.nbChambres}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="prix">Prix mensuel (€)</label>
              <input
                type="number"
                id="prix"
                name="prix"
                value={maison.prix}
                onChange={handleChange}
                min="1"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="dateDisponibilite">Date de disponibilité</label>
              <input
                type="date"
                id="dateDisponibilite"
                name="dateDisponibilite"
                value={maison.dateDisponibilite}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroupCheckbox}>
              <input
                type="checkbox"
                id="disponible"
                name="disponible"
                checked={maison.disponible}
                onChange={(e) => setMaison({...maison, disponible: e.target.checked})}
              />
              <label htmlFor="disponible">Disponible à la location</label>
            </div>
          </div>

          {/* Section Images */}
          <div className={styles.formSectionFull}>
            <h2 className={styles.sectionTitle}>
              <ImageIcon size={20} className={styles.sectionIcon} />
              Images du bien
            </h2>
            
            <div className={styles.imagesSection}>
              <div className={styles.existingImages}>
                <h3 className={styles.subSectionTitle}>Images existantes</h3>
                {maison.images.length > 0 ? (
                  <div className={styles.imagesGrid}>
                    {maison.images.map((image, index) => (
                      <div key={index} className={styles.imageContainer}>
                        <img 
                          src={image} 
                          alt={`Bien ${index + 1}`} 
                          className={`${styles.imageThumbnail} ${maison.imagePrincipale === image ? styles.mainImage : ''}`}
                        />
                        <div className={styles.imageActions}>
                          {maison.imagePrincipale !== image && (
                            <button
                              type="button"
                              className={styles.imageActionButton}
                              onClick={() => setAsMainImage(image)}
                            >
                              Définir comme principale
                            </button>
                          )}
                          <button
                            type="button"
                            className={styles.imageActionButtonDanger}
                            onClick={() => markImageForDeletion(image)}
                          >
                            <Trash2 size={16} /> Supprimer
                          </button>
                        </div>
                        {maison.imagePrincipale === image && (
                          <div className={styles.mainImageBadge}>Image principale</div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className={styles.noImagesText}>Aucune image existante</p>
                )}
              </div>

              <div className={styles.newImages}>
                <h3 className={styles.subSectionTitle}>Nouvelles images</h3>
                <div className={styles.uploadArea}>
                  <label htmlFor="file-upload" className={styles.uploadLabel}>
                    <Plus size={24} />
                    <span>Ajouter des images</span>
                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className={styles.uploadInput}
                    />
                  </label>
                  <p className={styles.uploadHint}>Formats acceptés: JPG, PNG, WEBP (max 5Mo)</p>
                </div>

                {newImages.length > 0 && (
                  <div className={styles.newImagesPreview}>
                    {newImages.map((file, index) => (
                      <div key={index} className={styles.newImageContainer}>
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Nouvelle image ${index + 1}`}
                          className={styles.newImageThumbnail}
                        />
                        <button
                          type="button"
                          className={styles.removeNewImageButton}
                          onClick={() => removeNewImage(index)}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.formActions}>
          <button
            type="button"
            onClick={() => router.push('/proprietaire/biens')}
            className={styles.cancelButton}
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.submitButton}
          >
            {isSubmitting ? (
              <span className={styles.spinnerSmall}></span>
            ) : (
              <>
                <Save size={18} /> Enregistrer les modifications
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModifierBienPage;