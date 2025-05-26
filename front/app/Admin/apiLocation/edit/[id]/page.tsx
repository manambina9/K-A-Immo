// app/edit/[id]/page.tsx
'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Image from 'next/image';
import styles from '../../../../../public/css/edit.module.css';

interface Maison {
  id: number;
  nom: string;
  description: string;
  ville: string;
  prix: number;
  surface: number;
  disponible: boolean;
  nbChambres: number;
  adresse: string;
  codePostal: string;
  type: string;
  image?: string;
  images?: string[];
}

export default function EditMaison() {
  const { id } = useParams();
  const router = useRouter();
  const [maison, setMaison] = useState<Maison | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/maisons/${id}`);
        if (!response.ok) throw new Error('Échec du chargement des données');
        const data = await response.json();
        setMaison(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMaison(prev => ({
      ...prev!,
      [name]: ['prix', 'surface', 'nbChambres'].includes(name) 
        ? parseFloat(value) || 0 
        : value
    }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setMaison(prev => ({
      ...prev!,
      [name]: checked
    }));
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', e.target.files[0]);

      const response = await fetch('http://localhost:8000/api/maisons/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Échec de l\'upload');
      
      const { url } = await response.json();
      
      setMaison(prev => ({
        ...prev!,
        images: [...(prev?.images || []), url],
        image: url
      }));

      toast.success('Image téléchargée avec succès');
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    if (!maison?.images) return;

    const newImages = [...maison.images];
    newImages.splice(index, 1);

    setMaison(prev => ({
      ...prev!,
      images: newImages,
      image: newImages[0] || ''
    }));
  };

  const setMainImage = (img: string) => {
    setMaison(prev => ({
      ...prev!,
      image: img
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!maison) return;

    setIsSubmitting(true);
    
    try {
      const response = await fetch(`http://localhost:8000/api/maisons/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(maison),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Échec de la mise à jour');
      }

      toast.success('Maison mise à jour avec succès');
      router.push('/maisons');
    } catch (err) {
      toast.error((err as Error).message);
      setError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className={styles.loading}>Chargement en cours...</div>;
  if (error) return <div className={styles.error}>Erreur: {error}</div>;
  if (!maison) return <div className={styles.loading}>Maison non trouvée</div>;

  return (
    <div className={styles.container}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className={styles.pageTitle}>Modifier la maison</h1>
        
        <form onSubmit={handleSubmit} className={`${styles.formContainer} ${styles.animate}`}>
          <div className={`${styles.formSection} ${styles.formGrid} ${styles.formGrid2}`}>
            <div>
              <label className={styles.formLabel}>Nom*</label>
              <input
                type="text"
                name="nom"
                value={maison.nom}
                onChange={handleChange}
                className={styles.formInput}
                required
              />
            </div>

            <div>
              <label className={styles.formLabel}>Type*</label>
              <input
                type="text"
                name="type"
                value={maison.type}
                onChange={handleChange}
                className={styles.formInput}
                required
              />
            </div>
          </div>

          <div className={styles.formSection}>
            <label className={styles.formLabel}>Description</label>
            <textarea
              name="description"
              value={maison.description}
              onChange={handleChange}
              className={styles.formTextarea}
              rows={4}
            />
          </div>

          <div className={`${styles.formSection} ${styles.formGrid} ${styles.formGrid3}`}>
            <div>
              <label className={styles.formLabel}>Prix (€)*</label>
              <input
                type="number"
                name="prix"
                value={maison.prix}
                onChange={handleChange}
                className={styles.formInput}
                required
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className={styles.formLabel}>Surface (m²)*</label>
              <input
                type="number"
                name="surface"
                value={maison.surface}
                onChange={handleChange}
                className={styles.formInput}
                required
                min="0"
              />
            </div>

            <div>
              <label className={styles.formLabel}>Chambres*</label>
              <input
                type="number"
                name="nbChambres"
                value={maison.nbChambres}
                onChange={handleChange}
                className={styles.formInput}
                required
                min="0"
              />
            </div>
          </div>

          <div className={`${styles.formSection} ${styles.formGrid} ${styles.formGrid2}`}>
            <div>
              <label className={styles.formLabel}>Ville*</label>
              <input
                type="text"
                name="ville"
                value={maison.ville}
                onChange={handleChange}
                className={styles.formInput}
                required
              />
            </div>

            <div>
              <label className={styles.formLabel}>Code Postal*</label>
              <input
                type="text"
                name="codePostal"
                value={maison.codePostal}
                onChange={handleChange}
                className={styles.formInput}
                required
              />
            </div>
          </div>

          <div className={styles.formSection}>
            <label className={styles.formLabel}>Adresse*</label>
            <input
              type="text"
              name="adresse"
              value={maison.adresse}
              onChange={handleChange}
              className={styles.formInput}
              required
            />
          </div>

          {/* Section Images */}
          <div className={styles.formSection}>
            <label className={styles.formLabel}>Images</label>
            
            {maison.images && maison.images.length > 0 && (
              <div className={styles.imageGallery}>
                {maison.images.map((img, index) => (
                  <div 
                    key={index} 
                    className={`${styles.imageContainer} ${maison.image === img ? styles.mainImage : ''}`}
                    onClick={() => setMainImage(img)}
                  >
                    <div className="relative h-full w-full">
                      <Image
                        src={img}
                        alt={`Image ${index + 1}`}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(index);
                      }}
                      className={styles.deleteButton}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    {maison.image === img && (
                      <span className={styles.mainImageBadge}>
                        Principale
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className={styles.formSection}>
              <label className={styles.uploadButton}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                <span>
                  {uploading ? 'Téléchargement en cours...' : 'Ajouter une image'}
                </span>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
              </label>
              <p className={styles.uploadHelp}>
                Cliquez sur une image pour la définir comme principale
              </p>
            </div>
          </div>

          <div className={`${styles.formSection} ${styles.checkbox}`}>
            <input
              type="checkbox"
              name="disponible"
              checked={maison.disponible}
              onChange={handleCheckboxChange}
              className={styles.checkboxInput}
              id="disponible"
            />
            <label htmlFor="disponible" className={styles.checkboxLabel}>Disponible</label>
          </div>

          <div className={styles.buttonContainer}>
            <button
              type="button"
              onClick={() => router.push('/maisons')}
              className={styles.cancelButton}
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting || uploading}
              className={styles.submitButton}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enregistrement...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Enregistrer
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}