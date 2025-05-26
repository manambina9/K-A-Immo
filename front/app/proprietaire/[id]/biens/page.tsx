'use client';

import React, { useEffect, useState } from 'react';
import styles from '../../../../styles/propriete/proprietaire.module.css';
import Link from 'next/link';
import { Edit, Trash2, Eye, Check, X, Home, MapPin, Ruler, Bed, DollarSign } from 'lucide-react';

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

const BiensPage = () => {
  const [biens, setBiens] = useState<Maison[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfirmDelete, setShowConfirmDelete] = useState<number | null>(null);
  const [selectedBien, setSelectedBien] = useState<Maison | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => { 
    fetchBiens();
  }, []);

  const fetchBiens = () => {
    const userData = localStorage.getItem('user');
    const proprietaireId = userData ? JSON.parse(userData).id : null;
    
    if (proprietaireId) {
      fetch(`http://127.0.0.1:8000/api/maisons/proprietaire/${proprietaireId}/biens`) 
        .then(response => {
          if (!response.ok) throw new Error('Erreur réseau');
          return response.json();
        })
        .then(data => {
          setBiens(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Erreur:', error);
          setLoading(false);
        });
    } else {
      console.error('ID propriétaire introuvable');
      setLoading(false);
    }
  };

  const filteredBiens = biens.filter(maison => 
    maison.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    maison.ville.toLowerCase().includes(searchTerm.toLowerCase()) ||
    maison.adresse.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: number) => {
    fetch(`http://127.0.0.1:8000/api/maisons/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setBiens(biens.filter(maison => maison.id !== id));
          setShowConfirmDelete(null);
        } else {
          throw new Error('Erreur lors de la suppression');
        }
      })
      .catch(error => {
        console.error('Erreur:', error);
        alert('Erreur lors de la suppression du bien');
      });
  };

  const toggleAvailability = (id: number, currentStatus: boolean) => {
    fetch(`http://127.0.0.1:8000/api/maisons/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ disponible: !currentStatus }),
    })
      .then(response => {
        if (response.ok) {
          setBiens(biens.map(maison => 
            maison.id === id ? {...maison, disponible: !maison.disponible} : maison
          ));
        } else {
          throw new Error('Erreur lors de la mise à jour');
        }
      })
      .catch(error => {
        console.error('Erreur:', error);
        alert('Erreur lors de la mise à jour du statut');
      });
  };

  const handleViewDetails = (maison: Maison) => {
    setSelectedBien(maison);
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedBien(null);
  };

  return (
    <div className={styles.mainContentContainer}>
      <div className={styles.headerSection}>
        <h1 className={styles.pageTitle}>
          <Home size={28} className={styles.headerIcon} />
          Mes Biens Immobiliers
        </h1>
        <div className={styles.actionsContainer}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Rechercher un bien..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link href="/proprietaire/biens/new" className={styles.addButton}>
            + Ajouter un bien
          </Link>
        </div>
      </div>

      {loading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Chargement de vos biens...</p>
        </div>
      ) : (
        <div className={styles.propertiesGrid}>
          {filteredBiens.length === 0 ? (
            <div className={styles.noBiensContainer}>
              <Home size={48} className={styles.noDataIcon} />
              <p>Aucun bien disponible pour le moment.</p>
              <Link href="/proprietaire/biens/new" className={styles.addFirstButton}>
                Ajouter votre premier bien
              </Link>
            </div>
          ) : (
            filteredBiens.map((maison) => (
              <div className={styles.propertyCard} key={maison.id}>
                <div className={styles.propertyCardInner}>
                  <div className={styles.propertyImageContainer}>
                    <img
                      src={maison.imagePrincipale || maison.images?.[0] || '/images/maison-placeholder.jpg'}
                      alt={maison.nom}
                      className={styles.propertyImage}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/maison-placeholder.jpg';
                      }}
                    />
                    <span className={`${styles.propertyStatusBadge} ${maison.disponible ? styles.statusAvailable : styles.statusRented}`}>
                      {maison.disponible ? 'Disponible' : 'Loué'}
                    </span>
                  </div>
                  <div className={styles.propertyContent}>
                    <h3 className={styles.propertyTitle}>{maison.nom}</h3>
                    <div className={styles.propertyLocation}>
                      <MapPin size={16} className={styles.locationIcon} />
                      <span>{maison.ville} - {maison.adresse}</span>
                    </div>
                    <div className={styles.propertyFeatures}>
                      <div className={styles.featureItem}>
                        <Ruler size={16} className={styles.featureIcon} />
                        <span>{maison.surface} m²</span>
                      </div>
                      <div className={styles.featureItem}>
                        <Bed size={16} className={styles.featureIcon} />
                        <span>{maison.nbChambres} chambres</span>
                      </div>
                      <div className={styles.featureItem}>
                        <DollarSign size={16} className={styles.featureIcon} />
                        <span>{maison.prix.toLocaleString()} €/mois</span>
                      </div>
                    </div>
                    <div className={styles.propertyActions}>
                      <button 
                        className={styles.viewButton}
                        onClick={() => handleViewDetails(maison)}
                      >
                        <Eye size={16} /> Voir
                      </button>
                      <Link 
                        href={`/proprietaire/biens/${maison.id}/modifier`} 
                        className={styles.editButton}
                      >
                        <Edit size={16} /> Modifier
                      </Link>
                      <button 
                        className={styles.deleteButton}
                        onClick={() => setShowConfirmDelete(maison.id)}
                      >
                        <Trash2 size={16} /> Supprimer
                      </button>
                      <button 
                        className={`${styles.availabilityButton} ${maison.disponible ? styles.rentButton : styles.freeButton}`}
                        onClick={() => toggleAvailability(maison.id, maison.disponible)}
                      >
                        {maison.disponible ? (
                          <>
                            <X size={16} /> Marquer loué
                          </>
                        ) : (
                          <>
                            <Check size={16} /> Disponible
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {showConfirmDelete === maison.id && (
                  <div className={styles.confirmDeleteOverlay}>
                    <div className={styles.confirmDeleteModal}>
                      <h4>Confirmer la suppression</h4>
                      <p>Êtes-vous sûr de vouloir supprimer <strong>{maison.nom}</strong> ?</p>
                      <p>Cette action est irréversible.</p>
                      <div className={styles.confirmActions}>
                        <button 
                          className={styles.cancelButton}
                          onClick={() => setShowConfirmDelete(null)}
                        >
                          Annuler
                        </button>
                        <button 
                          className={styles.confirmButton}
                          onClick={() => handleDelete(maison.id)}
                        >
                          Confirmer
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {showDetailsModal && selectedBien && (
        <div className={styles.detailsModalOverlay} onClick={closeDetailsModal}>
          <div className={styles.detailsModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.detailsModalHeader}>
              <h3 className={styles.detailsModalTitle}>
                <Home size={24} className={styles.detailsIcon} />
                {selectedBien.nom}
              </h3>
              <button 
                className={styles.closeModalButton}
                onClick={closeDetailsModal}
              >
                ✕
              </button>
            </div>
            
            <div className={styles.detailsModalContent}>
              <div className={styles.detailsImageContainer}>
                <img
                  src={selectedBien.imagePrincipale || selectedBien.images?.[0] || '/images/maison-placeholder.jpg'}
                  alt={selectedBien.nom}
                  className={styles.detailsImage}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/maison-placeholder.jpg';
                  }}
                />
                <span className={`${styles.detailsStatusBadge} ${selectedBien.disponible ? styles.statusAvailable : styles.statusRented}`}>
                  {selectedBien.disponible ? 'Disponible' : 'Loué'}
                </span>
              </div>
              
              <div className={styles.detailsInfo}>
                <div className={styles.detailsSection}>
                  <h4 className={styles.detailsSectionTitle}>
                    <MapPin size={18} className={styles.sectionIcon} />
                    Localisation
                  </h4>
                  <p className={styles.detailsText}>
                    <strong>Adresse :</strong> {selectedBien.adresse}
                  </p>
                  <p className={styles.detailsText}>
                    <strong>Ville :</strong> {selectedBien.ville}
                  </p>
                  <p className={styles.detailsText}>
                    <strong>Code postal :</strong> {selectedBien.codePostal}
                  </p>
                </div>

                <div className={styles.detailsSection}>
                  <h4 className={styles.detailsSectionTitle}>
                    <Home size={18} className={styles.sectionIcon} />
                    Caractéristiques
                  </h4>
                  <div className={styles.detailsFeatures}>
                    <div className={styles.detailsFeatureItem}>
                      <Ruler size={16} className={styles.featureIcon} />
                      <span><strong>Surface :</strong> {selectedBien.surface} m²</span>
                    </div>
                    <div className={styles.detailsFeatureItem}>
                      <Bed size={16} className={styles.featureIcon} />
                      <span><strong>Chambres :</strong> {selectedBien.nbChambres}</span>
                    </div>
                    <div className={styles.detailsFeatureItem}>
                      <DollarSign size={16} className={styles.featureIcon} />
                      <span><strong>Prix :</strong> {selectedBien.prix.toLocaleString()} €/mois</span>
                    </div>
                    <div className={styles.detailsFeatureItem}>
                      <span><strong>Type :</strong> {selectedBien.type}</span>
                    </div>
                    <div className={styles.detailsFeatureItem}>
                      <span><strong>Disponible à partir du :</strong> {selectedBien.dateDisponibilite}</span>
                    </div>
                  </div>
                </div>

                <div className={styles.detailsSection}>
                  <h4 className={styles.detailsSectionTitle}>
                    <span className={styles.sectionIcon}>📝</span>
                    Description
                  </h4>
                  <p className={styles.detailsDescription}>
                    {selectedBien.description || 'Aucune description disponible.'}
                  </p>
                </div>

                {selectedBien.images && selectedBien.images.length > 0 && (
                  <div className={styles.detailsSection}>
                    <h4 className={styles.detailsSectionTitle}>
                      <span className={styles.sectionIcon}>🖼️</span>
                      Galerie d'images
                    </h4>
                    <div className={styles.detailsGallery}>
                      {selectedBien.images.map((image, index) => (
                        <div key={index} className={styles.galleryImageContainer}>
                          <img
                            src={image}
                            alt={`${selectedBien.nom} - Image ${index + 1}`}
                            className={styles.galleryImage}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.detailsModalActions}>
              <Link 
                href={`/proprietaire/biens/${selectedBien.id}/modifier`} 
                className={styles.detailsEditButton}
              >
                <Edit size={16} /> Modifier
              </Link>
              <button 
                className={`${styles.detailsToggleButton} ${selectedBien.disponible ? styles.rentButton : styles.freeButton}`}
                onClick={() => {
                  toggleAvailability(selectedBien.id, selectedBien.disponible);
                  setSelectedBien({...selectedBien, disponible: !selectedBien.disponible});
                }}
              >
                {selectedBien.disponible ? (
                  <><X size={16} /> Marquer comme loué</>
                ) : (
                  <><Check size={16} /> Marquer comme disponible</>
                )}
              </button>
              <button 
                className={styles.detailsCloseButton}
                onClick={closeDetailsModal}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BiensPage;