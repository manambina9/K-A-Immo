'use client';

import { useEffect, useState } from 'react';
import styles from '../../../public/css/house.module.css';
import Header from '../../../component/header';

interface Maison {
  id: number;
  nom: string;
  description: string;
  ville: string;
  prix: number;
  surface: number;
  disponible: boolean;
  chambres?: number;
  adresse?: string;
  dateDisponibilite?: string;
  type?: string;
  latitude?: number;
  longitude?: number;
  image?: string;
  images?: string[]; // Ajout pour stocker plusieurs images
  codePostal?: string;
  caracteristiques?: string[];
  sallesDeBain?: number;
  etage?: number;
}

export default function ApiLocation() {
  const [allMaisons, setAllMaisons] = useState<Maison[]>([]);
  const [displayedMaisons, setDisplayedMaisons] = useState<Maison[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [selectedMaison, setSelectedMaison] = useState<Maison | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryMode, setIsGalleryMode] = useState(false);

  const toggleImageZoom = () => {
    setIsImageZoomed((prev) => !prev);
    setIsGalleryMode(false); // Fermer la galerie si ouverte
  };

  const toggleGalleryMode = () => {
    setIsGalleryMode((prev) => !prev);
    setIsImageZoomed(false); // Fermer le zoom si ouvert
  };

  useEffect(() => {
    const fetchMaisons = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('http://127.0.0.1:8000/api/maisons', {
          headers: {
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          throw new Error(`Réponse non-JSON: ${text.substring(0, 100)}...`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("La réponse de l'API n'est pas un tableau");
        }

        // Formater les données pour ajouter le tableau d'images si non présent
        const formattedData = data.map(maison => ({
          ...maison,
          // Si maison.image existe mais pas maison.images, on crée un tableau avec l'image principale
          images: maison.images || (maison.image ? [maison.image] : [])
        }));

        setAllMaisons(formattedData);
      } catch (err) {
        console.error('Erreur lors de la récupération des maisons:', err);
        setError(err instanceof Error ? err.message : 'Une erreur inconnue est survenue');
        setAllMaisons([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMaisons();
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedMaisons(allMaisons.slice(startIndex, endIndex));
  }, [currentPage, allMaisons, itemsPerPage]);

  const formatPrix = (prix: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(prix);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Non spécifié';
    try {
      return new Date(dateString).toLocaleDateString('fr-FR');
    } catch {
      return 'Date invalide';
    }
  };

  const openModal = (maison: Maison) => {
    setSelectedMaison(maison);
    setIsModalOpen(true);
    setCurrentImageIndex(0); // Réinitialiser l'index de l'image
    setIsImageZoomed(false); // Réinitialiser le zoom
    setIsGalleryMode(false); // Réinitialiser le mode galerie
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMaison(null);
    setIsImageZoomed(false);
    setIsGalleryMode(false);
    document.body.style.overflow = 'auto';
  };

  const handleImageClick = () => {
    if (!isGalleryMode) {
      toggleImageZoom();
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedMaison && selectedMaison.images && selectedMaison.images.length > 0) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === selectedMaison.images!.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedMaison && selectedMaison.images && selectedMaison.images.length > 0) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? selectedMaison.images!.length - 1 : prevIndex - 1
      );
    }
  };

  const getImageUrl = (imagePath?: string) => {
    if (!imagePath) return '';
    return imagePath.startsWith('http') ? imagePath : `http://127.0.0.1:8000${imagePath}`;
  };

  const totalPages = Math.ceil(allMaisons.length / itemsPerPage);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, currentPage + 2);

      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push('...');
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push('...');
        }
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const deleteMaison = async (id: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/maisons/${id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Erreur lors de la suppression : ${response.status}`);
      }
  
      // Mettre à jour la liste des maisons après suppression
      setAllMaisons((prev) => prev.filter((maison) => maison.id !== id));
      alert('Maison supprimée avec succès.');
    } catch (err) {
      console.error('Erreur lors de la suppression de la maison:', err);
      alert('Une erreur est survenue lors de la suppression.');
    }
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>Nos Maisons en Location</h1>

        {error ? (
          <div className={styles.errorContainer}>
            <p className={styles.errorMessage}>Erreur : {error}</p>
            <button
              className={styles.retryButton}
              onClick={() => window.location.reload()}
            >
              Réessayer
            </button>
          </div>
        ) : isLoading ? (
          <div className={styles.loaderContainer}>
            <div className={styles.loader}></div>
            <p>Chargement des propriétés...</p>
          </div>
        ) : allMaisons.length === 0 ? (
          <div className={styles.noResults}>
            <p>Aucune propriété disponible pour le moment</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {displayedMaisons.map((maison) => (
              <div key={maison.id} className={`${styles.card} ${styles.fadeIn}`}>
                <div className={styles.cardHeader}>
                  <h2 className={styles.cardTitle}>{maison.nom}</h2>
                  <span
                    className={
                      maison.disponible ? styles.available : styles.unavailable
                    }
                  >
                    {maison.disponible ? 'Disponible' : 'Loué'}
                  </span>
                </div>
                {maison.image && (
                  <div className={styles.cardImageContainer}>
                    <img
                      src={getImageUrl(maison.image)}
                      alt={maison.nom}
                      className={styles.cardImage}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    {maison.images && maison.images.length > 1 && (
                      <span className={styles.imageCount}>
                        {maison.images.length} photos
                      </span>
                    )}
                  </div>
                )}
                <p className={styles.cardDescription}>
                  {maison.description?.substring(0, 100) || 'Aucune description disponible'}
                  ...
                </p>
                <div className={styles.details}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Ville :</span>
                    <span>{maison.ville}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Prix :</span>
                    <span className={styles.price}>{formatPrix(maison.prix)}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Surface :</span>
                    <span>{maison.surface} m²</span>
                  </div>
                </div>
                <div className={styles.cardFooter}>
                  <div className={styles.buttonRow}>
                    <button
                      className={`${styles.button} ${styles.primary}`}
                      onClick={() => openModal(maison)}
                    >
                      Voir les détails
                    </button>
                    {maison.disponible && (
                      <button className={`${styles.button} ${styles.secondary}`}>
                        Contacter
                      </button>
                    )}
                  </div>
                  <div className={styles.buttonRow}>
                    <button
                      className={`${styles.button} ${styles.editButton}`}
                      onClick={() => {
                        window.location.href = `/Admin/apiLocation/edit/${maison.id}`;
                      }}
                    >
                      Modifier
                    </button>
                    <button
                      className={`${styles.button} ${styles.deleteButton}`}
                      onClick={async () => {
                        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette maison ?')) {
                          try {
                            console.log('ID de la maison à supprimer :', maison.id);

                            const response = await fetch(`http://127.0.0.1:8000/api/maisons/${maison.id}`, {
                              method: 'DELETE',
                              headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({ id: maison.id }), // Ajoutez ceci si nécessaire
                            });

                            if (!response.ok) {
                              const errorText = await response.text();
                              console.error(`Erreur lors de la suppression : ${response.status}`, errorText);
                              throw new Error(`Erreur lors de la suppression : ${response.status}`);
                            }

                            // Mettre à jour la liste des maisons après suppression
                            setAllMaisons((prev) => prev.filter((m) => m.id !== maison.id));
                            alert('Maison supprimée avec succès.');
                          } catch (err) {
                            console.error('Erreur lors de la suppression de la maison:', err);
                            alert('Une erreur est survenue lors de la suppression.');
                          }
                        }
                      }}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              className={`${styles.pageButton} ${currentPage === 1 ? styles.disabled : ''}`}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              &laquo; Précédent
            </button>

            {getPageNumbers().map((page, index) => (
              <span key={index}>
                {page === '...' ? (
                  <span className={styles.ellipsis}>...</span>
                ) : (
                  <button
                    className={`${styles.pageButton} ${currentPage === page ? styles.active : ''}`}
                    onClick={() => setCurrentPage(Number(page))}
                  >
                    {page}
                  </button>
                )}
              </span>
            ))}

            <button
              className={`${styles.pageButton} ${currentPage === totalPages ? styles.disabled : ''}`}
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Suivant &raquo;
            </button>
          </div>
        )}

        {isModalOpen && selectedMaison && (
          <div className={styles.modalOverlay} onClick={closeModal}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <button className={styles.modalClose} onClick={closeModal}>
                &times;
              </button>

              <h2 className={styles.modalTitle}>{selectedMaison.nom}</h2>

              <div className={styles.modalGrid}>
                <div className={styles.modalMain}>
                  {!isGalleryMode ? (
                    /* Affichage normal avec une seule image principale */
                    <div 
                      className={`${styles.modalImageContainer} ${isImageZoomed ? styles.zoomedImageContainer : ''}`}
                      onClick={handleImageClick}
                    >
                      {selectedMaison.images && selectedMaison.images.length > 0 ? (
                        <>
                          <img
                            src={getImageUrl(selectedMaison.images[currentImageIndex])}
                            alt={`${selectedMaison.nom} - Image ${currentImageIndex + 1}`}
                            className={`${styles.modalImage} ${isImageZoomed ? styles.zoomedImage : ''}`}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                          {selectedMaison.images.length > 1 && !isImageZoomed && (
                            <>
                              <button 
                                className={`${styles.imageNavButton} ${styles.prevButton}`}
                                onClick={prevImage}
                                aria-label="Image précédente"
                              >
                                &lt;
                              </button>
                              <button 
                                className={`${styles.imageNavButton} ${styles.nextButton}`}
                                onClick={nextImage}
                                aria-label="Image suivante"
                              >
                                &gt;
                              </button>
                              <div className={styles.imageCounter}>
                                {currentImageIndex + 1} / {selectedMaison.images.length}
                              </div>
                            </>
                          )}
                        </>
                      ) : (
                        <div className={styles.noImage}>Image non disponible</div>
                      )}
                    </div>
                  ) : (
                    /* Affichage en mode galerie */
                    <div className={styles.galleryGrid}>
                      {selectedMaison.images && selectedMaison.images.length > 0 ? (
                        selectedMaison.images.map((image, index) => (
                          <div 
                            key={index} 
                            className={styles.galleryItem}
                            onClick={() => {
                              setCurrentImageIndex(index);
                              setIsGalleryMode(false);
                              setIsImageZoomed(true);
                            }}
                          >
                            <img 
                              src={getImageUrl(image)} 
                              alt={`${selectedMaison.nom} - Image ${index + 1}`}
                              className={styles.galleryImage}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                target.parentElement!.classList.add(styles.imageError);
                              }}
                            />
                            <div className={styles.galleryImageNumber}>{index + 1}</div>
                          </div>
                        ))
                      ) : (
                        <div className={styles.noImage}>Aucune image disponible</div>
                      )}
                    </div>
                  )}

                  {/* Boutons pour basculer entre les modes d'affichage et voir toutes les images */}
                  {selectedMaison.images && selectedMaison.images.length > 1 && (
                    <div className={styles.viewOptions}>
                      <button 
                        className={`${styles.viewButton} ${!isGalleryMode ? styles.activeViewMode : ''}`}
                        onClick={() => setIsGalleryMode(false)}
                      >
                        Mode standard
                      </button>
                      <button 
                        className={`${styles.viewButton} ${isGalleryMode ? styles.activeViewMode : ''}`}
                        onClick={toggleGalleryMode}
                      >
                        Voir toutes les images ({selectedMaison.images.length})
                      </button>
                    </div>
                  )}

                  {!isGalleryMode && selectedMaison.images && selectedMaison.images.length > 1 && (
                    <div className={styles.thumbnailsContainer}>
                      {selectedMaison.images.map((image, index) => (
                        <div 
                          key={index}
                          className={`${styles.thumbnail} ${index === currentImageIndex ? styles.activeThumbnail : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex(index);
                          }}
                        >
                          <img 
                            src={getImageUrl(image)}
                            alt={`Miniature ${index + 1}`}
                            className={styles.thumbnailImage}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  <p className={styles.modalDescription}>
                    {selectedMaison.description || 'Aucune description disponible'}
                  </p>

                  <div className={styles.modalFeatures}>
                    <h3>Caractéristiques</h3>
                    <ul>
                      {selectedMaison.type && <li>Type: {selectedMaison.type}</li>}
                      {selectedMaison.chambres && <li>Chambres: {selectedMaison.chambres}</li>}
                      {selectedMaison.codePostal && <li>Code postal: {selectedMaison.codePostal}</li>}
                      {selectedMaison.caracteristiques?.length ? (
                        selectedMaison.caracteristiques.map((caract, index) => (
                          <li key={index}>{caract}</li>
                        ))
                      ) : (
                        <li>Aucune caractéristique spécifiée</li>
                      )}
                    </ul>
                  </div>
                </div>

                <div className={styles.modalSidebar}>
                  <div className={styles.modalDetails}>
                    <h3>Détails</h3>
                    <div className={styles.detailItem}>
                      <span>Ville :</span>
                      <span>{selectedMaison.ville}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span>Adresse :</span>
                      <span>{selectedMaison.adresse || 'Non spécifiée'}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span>Prix :</span>
                      <span className={styles.price}>{formatPrix(selectedMaison.prix)}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span>Surface :</span>
                      <span>{selectedMaison.surface} m²</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span>Chambres :</span>
                      <span>{selectedMaison.chambres || 'Non spécifié'}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span>Salles de bain :</span>
                      <span>{selectedMaison.sallesDeBain || 'Non spécifié'}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span>Étage :</span>
                      <span>{selectedMaison.etage !== undefined ? selectedMaison.etage : 'Non spécifié'}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span>Disponible :</span>
                      <span>{selectedMaison.disponible ? 'Oui' : 'Non'}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span>Date disponibilité :</span>
                      <span>{formatDate(selectedMaison.dateDisponibilite)}</span>
                    </div>
                    {selectedMaison.latitude && selectedMaison.longitude && (
                      <div className={styles.detailItem}>
                        <span>Coordonnées :</span>
                        <span>{selectedMaison.latitude}, {selectedMaison.longitude}</span>
                      </div>
                    )}
                  </div>

                  <div className={styles.modalActions}>
                    <button className={`${styles.button} ${styles.primary}`}>
                      Contacter le propriétaire
                    </button>
                    <button
                      className={`${styles.button} ${styles.secondary}`}
                      onClick={closeModal}
                    >
                      Fermer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {isImageZoomed && selectedMaison && (
          <div className={styles.zoomedOverlay} onClick={toggleImageZoom}>
            <button className={styles.zoomedClose} onClick={toggleImageZoom}>
              &times;
            </button>
            <div className={styles.zoomedImageWrapper}>
              <img
                src={getImageUrl(selectedMaison.images?.[currentImageIndex] || selectedMaison.image)}
                alt={selectedMaison.nom}
                className={styles.fullZoomedImage}
                onClick={(e) => e.stopPropagation()}
              />
              {selectedMaison.images && selectedMaison.images.length > 1 && (
                <>
                  <button 
                    className={`${styles.zoomedNavButton} ${styles.zoomedPrevButton}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage(e);
                    }}
                    aria-label="Image précédente"
                  >
                    &lt;
                  </button>
                  <button 
                    className={`${styles.zoomedNavButton} ${styles.zoomedNextButton}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage(e);
                    }}
                    aria-label="Image suivante"
                  >
                    &gt;
                  </button>
                  <div className={styles.zoomedCounter}>
                    {currentImageIndex + 1} / {selectedMaison.images.length}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        <div className={styles.actions}>
          <a href="/Admin/apiLocation/create" className={`${styles.button} ${styles.createButton}`}>
            Ajouter une nouvelle propriété
          </a>
          <a href="/" className={`${styles.button} ${styles.homeButton}`}>
            Retour à l'accueil
          </a>
        </div>
      </div>
    </>
  );
}