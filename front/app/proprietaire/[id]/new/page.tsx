'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Upload, X } from 'lucide-react';
import styles from '../../../../styles/propriete/proprietaire.module.css';

interface FileWithPreview extends File {
  preview: string;
}

interface MaisonFormData {
  nom: string;
  adresse: string;
  ville: string;
  codePostal: string;
  description: string;
  prix: number;
  surface: number;
  nbChambres: number;
  disponible: boolean;
  images: FileWithPreview[];
  type: string;
  dateDisponibilite: string;
}

const AjouterBienPage = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<MaisonFormData, 'images'> & { images: FileWithPreview[] }>({
    nom: '',
    adresse: '',
    ville: '',
    codePostal: '',
    description: '',
    prix: 0,
    surface: 0,
    nbChambres: 1,
    disponible: true,
    images: [],
    type: '',
    dateDisponibilite: new Date().toISOString().split('T')[0],
  });
 
  useEffect(() => {
    return () => {
      formData.images.forEach(image => URL.revokeObjectURL(image.preview));
    };
  }, [formData.images]);
 
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleImageChange(e.dataTransfer.files);
    }
  };

  const handleImageChange = (files: FileList) => {
    const newImages = Array.from(files)
      .filter(file => file.type.startsWith('image/'))
      .map(file => {
        return Object.assign(file, {
          preview: URL.createObjectURL(file)
        });
      });
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages].slice(0, 10) // Limite à 10 images
    }));
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleImageChange(e.target.files);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...formData.images];
    URL.revokeObjectURL(newImages[index].preview);
    newImages.splice(index, 1);
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]:
        name === 'prix' || name === 'surface' || name === 'nbChambres'
          ? Number(value)
          : name === 'disponible'
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const userData = localStorage.getItem('user');
      const proprietaireId = userData ? JSON.parse(userData).id : null;

      if (!proprietaireId) {
        throw new Error('Vous devez être connecté pour ajouter un bien');
      }

      if (formData.images.length === 0) {
        throw new Error('Veuillez ajouter au moins une image');
      }

      // Étape 1 : Upload des images
      const uploadedImages = await Promise.all(
        formData.images.map(async (image) => {
          const formData = new FormData();
          formData.append('file', image);

          const response = await fetch('http://127.0.0.1:8000/api/maisons/upload/proprietaire', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erreur upload image: ${response.statusText} - ${errorText}`);
          }

          return await response.json();
        })
      );

      // Étape 2 : Création du bien
      const payload = {
        ...formData,
        images: uploadedImages.map(img => img.url),
        proprietaire: `/api/utilisateurs/${proprietaireId}`,
      };

      const response = await fetch('http://127.0.0.1:8000/api/maisons/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la création du bien');
      }

      router.push('/proprietaire/biens');
    } catch (err) {
      console.error('Erreur:', err);
      setError(err instanceof Error ? err.message : 'Une erreur inattendue est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.mainContentContainer}>
      <div className={styles.headerSection}>
        <h2 className={styles.pageTitle}>Ajouter un nouveau bien</h2>
        <Link href="/proprietaire/biens" className={styles.backButton}>
          &larr; Retour à la liste
        </Link>
      </div>

      <form onSubmit={handleSubmit} className={styles.addPropertyForm}>
        {error && (
          <div className={styles.errorMessage}>
            <div className={styles.errorIcon}>!</div>
            <div>{error}</div>
          </div>
        )}

        <div className={styles.formGrid}>
          <div className={styles.formColumn}>
            <div className={styles.formGroup}>
              <label htmlFor="nom">Nom du bien *</label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="type">Type de bien *</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className={styles.formInput}
              >
                <option value="">Sélectionner un type</option>
                <option value="appartement">Appartement</option>
                <option value="maison">Maison</option>
                <option value="villa">Villa</option>
                <option value="studio">Studio</option>
                <option value="loft">Loft</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="adresse">Adresse *</label>
              <input
                type="text"
                id="adresse"
                name="adresse"
                value={formData.adresse}
                onChange={handleChange}
                required
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="ville">Ville *</label>
              <input
                type="text"
                id="ville"
                name="ville"
                value={formData.ville}
                onChange={handleChange}
                required
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="codePostal">Code postal *</label>
              <input
                type="text"
                id="codePostal"
                name="codePostal"
                value={formData.codePostal}
                onChange={handleChange}
                required
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                required
                className={styles.formTextarea}
              />
            </div>
          </div>

          <div className={styles.formColumn}>
            <div className={styles.formGroup}>
              <label htmlFor="prix">Prix mensuel (€) *</label>
              <input
                type="number"
                id="prix"
                name="prix"
                value={formData.prix}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="surface">Surface (m²) *</label>
              <input
                type="number"
                id="surface"
                name="surface"
                value={formData.surface}
                onChange={handleChange}
                min="0"
                required
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="nbChambres">Nombre de chambres *</label>
              <input
                type="number"
                id="nbChambres"
                name="nbChambres"
                value={formData.nbChambres}
                onChange={handleChange}
                min="1"
                required
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="dateDisponibilite">Date de disponibilité *</label>
              <input
                type="date"
                id="dateDisponibilite"
                name="dateDisponibilite"
                value={formData.dateDisponibilite}
                onChange={handleChange}
                required
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="disponible"
                  checked={formData.disponible}
                  onChange={handleChange}
                  className={styles.checkboxInput}
                />
                <span>Disponible à la location</span>
              </label>
            </div>

            <div className={styles.formGroup}>
              <label>Images du bien *</label>
              <div 
                className={`${styles.imageUploadArea} ${isDragging ? styles.dragging : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                {formData.images.length === 0 ? (
                  <div className={styles.uploadPrompt}>
                    <Upload size={24} className={styles.uploadIcon} />
                    <p>Glissez-déposez des images ici</p>
                    <p>ou cliquez pour sélectionner</p>
                    <p className={styles.fileTypes}>JPG, PNG, WEBP (max. 10)</p>
                  </div>
                ) : (
                  <div className={styles.imagePreviews}>
                    {formData.images.map((image, index) => (
                      <div key={index} className={styles.imagePreviewItem}>
                        <img 
                          src={image.preview} 
                          alt={`Preview ${index}`} 
                          className={styles.previewImage}
                        />
                        <button 
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage(index);
                          }}
                          className={styles.removeImageButton}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <input
                  type="file"
                  id="images"
                  ref={fileInputRef}
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={handleFileInputChange}
                  className={styles.hiddenFileInput}
                />
              </div>
              {formData.images.length > 0 && (
                <div className={styles.imageCounter}>
                  {formData.images.length} image(s) sélectionnée(s) • Maximum 10
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.formActions}>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting || formData.images.length === 0}
          >
            {isSubmitting ? (
              <>
                <span className={styles.spinner}></span>
                Enregistrement...
              </>
            ) : (
              'Enregistrer le bien'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AjouterBienPage;