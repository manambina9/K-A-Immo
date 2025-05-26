'use client';

import React, { useEffect, useState } from 'react';
import { ArrowLeft, Save, Upload, X, Home, MapPin, Ruler, Bed, DollarSign, Calendar, FileText, Camera, Plus } from 'lucide-react';

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

const ModificationBienPage = () => {
  const [bien, setBien] = useState<Maison>({
    id: 1,
    nom: 'Appartement T3 Centre-ville',
    adresse: '15 rue de la République',
    ville: 'Lyon',
    description: 'Magnifique appartement T3 situé en plein centre-ville, proche de tous les commerces et transports. Rénové récemment avec des finitions de qualité.',
    prix: 1200,
    surface: 75,
    nbChambres: 2,
    disponible: true,
    imagePrincipale: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=800'
    ],
    type: 'Appartement',
    codePostal: '69002',
    dateDisponibilite: '2024-06-01'
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [previewImages, setPreviewImages] = useState<string[]>(bien.images);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setBien(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              type === 'number' ? parseFloat(value) || 0 : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!bien.nom.trim()) newErrors.nom = 'Le nom est requis';
    if (!bien.adresse.trim()) newErrors.adresse = 'L\'adresse est requise';
    if (!bien.ville.trim()) newErrors.ville = 'La ville est requise';
    if (!bien.codePostal.trim()) newErrors.codePostal = 'Le code postal est requis';
    if (bien.prix <= 0) newErrors.prix = 'Le prix doit être supérieur à 0';
    if (bien.surface <= 0) newErrors.surface = 'La surface doit être supérieure à 0';
    if (bien.nbChambres < 0) newErrors.nbChambres = 'Le nombre de chambres ne peut être négatif';
    if (!bien.dateDisponibilite) newErrors.dateDisponibilite = 'La date de disponibilité est requise';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulation d'une requête API
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Bien modifié:', bien);
      alert('Bien modifié avec succès !');
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la modification du bien');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImage = event.target?.result as string;
        setPreviewImages(prev => [...prev, newImage]);
        setBien(prev => ({
          ...prev,
          images: [...prev.images, newImage],
          imagePrincipale: prev.imagePrincipale || newImage
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    const imageToRemove = previewImages[index];
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
    setBien(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
      imagePrincipale: prev.imagePrincipale === imageToRemove ? 
        (prev.images.length > 1 ? prev.images.find(img => img !== imageToRemove) || null : null) : 
        prev.imagePrincipale
    }));
  };

  const setAsMainImage = (image: string) => {
    setBien(prev => ({ ...prev, imagePrincipale: image }));
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      padding: '2rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem',
          backgroundColor: '#ffffff',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#2C3E50',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#34495e'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2C3E50'}>
              <ArrowLeft size={18} />
              Retour
            </button>
            <div>
              <h1 style={{
                color: '#2C3E50',
                fontSize: '1.8rem',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Home size={28} color="#D35400" />
                Modifier le bien
              </h1>
              <p style={{ color: '#7f8c8d', margin: '0.25rem 0 0 0', fontSize: '0.9rem' }}>
                Modifiez les informations de votre propriété
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '2rem' }}>
            {/* Main Form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Informations générales */}
              <div style={{
                backgroundColor: '#ffffff',
                padding: '1.5rem',
                borderRadius: '12px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{
                  color: '#2C3E50',
                  fontSize: '1.2rem',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <FileText size={20} color="#D35400" />
                  Informations générales
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem', 
                      color: '#2C3E50',
                      fontWeight: '500',
                      fontSize: '0.9rem'
                    }}>
                      Nom du bien *
                    </label>
                    <input
                      type="text"
                      name="nom"
                      value={bien.nom}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: errors.nom ? '2px solid #e74c3c' : '2px solid #ecf0f1',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        transition: 'border-color 0.2s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#D35400'}
                      onBlur={(e) => e.target.style.borderColor = errors.nom ? '#e74c3c' : '#ecf0f1'}
                    />
                    {errors.nom && <span style={{ color: '#e74c3c', fontSize: '0.8rem' }}>{errors.nom}</span>}
                  </div>
                  
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem', 
                      color: '#2C3E50',
                      fontWeight: '500',
                      fontSize: '0.9rem'
                    }}>
                      Type de bien
                    </label>
                    <select
                      name="type"
                      value={bien.type}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #ecf0f1',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        backgroundColor: 'white'
                      }}
                    >
                      <option value="Appartement">Appartement</option>
                      <option value="Maison">Maison</option>
                      <option value="Studio">Studio</option>
                      <option value="Loft">Loft</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    color: '#2C3E50',
                    fontWeight: '500',
                    fontSize: '0.9rem'
                  }}>
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={bien.description}
                    onChange={handleInputChange}
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #ecf0f1',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      resize: 'vertical',
                      fontFamily: 'inherit'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#D35400'}
                    onBlur={(e) => e.target.style.borderColor = '#ecf0f1'}
                  />
                </div>
              </div>

              {/* Localisation */}
              <div style={{
                backgroundColor: '#ffffff',
                padding: '1.5rem',
                borderRadius: '12px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{
                  color: '#2C3E50',
                  fontSize: '1.2rem',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <MapPin size={20} color="#D35400" />
                  Localisation
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem', 
                      color: '#2C3E50',
                      fontWeight: '500',
                      fontSize: '0.9rem'
                    }}>
                      Adresse *
                    </label>
                    <input
                      type="text"
                      name="adresse"
                      value={bien.adresse}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: errors.adresse ? '2px solid #e74c3c' : '2px solid #ecf0f1',
                        borderRadius: '8px',
                        fontSize: '0.9rem'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#D35400'}
                      onBlur={(e) => e.target.style.borderColor = errors.adresse ? '#e74c3c' : '#ecf0f1'}
                    />
                    {errors.adresse && <span style={{ color: '#e74c3c', fontSize: '0.8rem' }}>{errors.adresse}</span>}
                  </div>
                  
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem', 
                      color: '#2C3E50',
                      fontWeight: '500',
                      fontSize: '0.9rem'
                    }}>
                      Code postal *
                    </label>
                    <input
                      type="text"
                      name="codePostal"
                      value={bien.codePostal}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: errors.codePostal ? '2px solid #e74c3c' : '2px solid #ecf0f1',
                        borderRadius: '8px',
                        fontSize: '0.9rem'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#D35400'}
                      onBlur={(e) => e.target.style.borderColor = errors.codePostal ? '#e74c3c' : '#ecf0f1'}
                    />
                    {errors.codePostal && <span style={{ color: '#e74c3c', fontSize: '0.8rem' }}>{errors.codePostal}</span>}
                  </div>
                </div>

                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    color: '#2C3E50',
                    fontWeight: '500',
                    fontSize: '0.9rem'
                  }}>
                    Ville *
                  </label>
                  <input
                    type="text"
                    name="ville"
                    value={bien.ville}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: errors.ville ? '2px solid #e74c3c' : '2px solid #ecf0f1',
                      borderRadius: '8px',
                      fontSize: '0.9rem'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#D35400'}
                    onBlur={(e) => e.target.style.borderColor = errors.ville ? '#e74c3c' : '#ecf0f1'}
                  />
                  {errors.ville && <span style={{ color: '#e74c3c', fontSize: '0.8rem' }}>{errors.ville}</span>}
                </div>
              </div>

              {/* Caractéristiques */}
              <div style={{
                backgroundColor: '#ffffff',
                padding: '1.5rem',
                borderRadius: '12px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{
                  color: '#2C3E50',
                  fontSize: '1.2rem',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Home size={20} color="#D35400" />
                  Caractéristiques
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.5rem', 
                      color: '#2C3E50',
                      fontWeight: '500',
                      fontSize: '0.9rem'
                    }}>
                      <Ruler size={16} color="#D35400" />
                      Surface (m²) *
                    </label>
                    <input
                      type="number"
                      name="surface"
                      value={bien.surface}
                      onChange={handleInputChange}
                      min="1"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: errors.surface ? '2px solid #e74c3c' : '2px solid #ecf0f1',
                        borderRadius: '8px',
                        fontSize: '0.9rem'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#D35400'}
                      onBlur={(e) => e.target.style.borderColor = errors.surface ? '#e74c3c' : '#ecf0f1'}
                    />
                    {errors.surface && <span style={{ color: '#e74c3c', fontSize: '0.8rem' }}>{errors.surface}</span>}
                  </div>
                  
                  <div>
                    <label style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.5rem', 
                      color: '#2C3E50',
                      fontWeight: '500',
                      fontSize: '0.9rem'
                    }}>
                      <Bed size={16} color="#D35400" />
                      Chambres *
                    </label>
                    <input
                      type="number"
                      name="nbChambres"
                      value={bien.nbChambres}
                      onChange={handleInputChange}
                      min="0"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: errors.nbChambres ? '2px solid #e74c3c' : '2px solid #ecf0f1',
                        borderRadius: '8px',
                        fontSize: '0.9rem'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#D35400'}
                      onBlur={(e) => e.target.style.borderColor = errors.nbChambres ? '#e74c3c' : '#ecf0f1'}
                    />
                    {errors.nbChambres && <span style={{ color: '#e74c3c', fontSize: '0.8rem' }}>{errors.nbChambres}</span>}
                  </div>
                  
                  <div>
                    <label style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.5rem', 
                      color: '#2C3E50',
                      fontWeight: '500',
                      fontSize: '0.9rem'
                    }}>
                      <DollarSign size={16} color="#D35400" />
                      Prix (€/mois) *
                    </label>
                    <input
                      type="number"
                      name="prix"
                      value={bien.prix}
                      onChange={handleInputChange}
                      min="1"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: errors.prix ? '2px solid #e74c3c' : '2px solid #ecf0f1',
                        borderRadius: '8px',
                        fontSize: '0.9rem'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#D35400'}
                      onBlur={(e) => e.target.style.borderColor = errors.prix ? '#e74c3c' : '#ecf0f1'}
                    />
                    {errors.prix && <span style={{ color: '#e74c3c', fontSize: '0.8rem' }}>{errors.prix}</span>}
                  </div>
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <label style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.5rem', 
                    color: '#2C3E50',
                    fontWeight: '500',
                    fontSize: '0.9rem'
                  }}>
                    <Calendar size={16} color="#D35400" />
                    Date de disponibilité *
                  </label>
                  <input
                    type="date"
                    name="dateDisponibilite"
                    value={bien.dateDisponibilite}
                    onChange={handleInputChange}
                    style={{
                      width: '300px',
                      padding: '0.75rem',
                      border: errors.dateDisponibilite ? '2px solid #e74c3c' : '2px solid #ecf0f1',
                      borderRadius: '8px',
                      fontSize: '0.9rem'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#D35400'}
                    onBlur={(e) => e.target.style.borderColor = errors.dateDisponibilite ? '#e74c3c' : '#ecf0f1'}
                  />
                  {errors.dateDisponibilite && <span style={{ color: '#e74c3c', fontSize: '0.8rem', display: 'block', marginTop: '0.25rem' }}>{errors.dateDisponibilite}</span>}
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <label style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#2C3E50',
                    fontWeight: '500',
                    fontSize: '0.9rem'
                  }}>
                    <input
                      type="checkbox"
                      name="disponible"
                      checked={bien.disponible}
                      onChange={handleInputChange}
                      style={{ marginRight: '0.5rem' }}
                    />
                    Bien actuellement disponible
                  </label>
                </div>
              </div>
            </div>

            {/* Sidebar - Images */}
            <div style={{
              backgroundColor: '#ffffff',
              padding: '1.5rem',
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              height: 'fit-content',
              position: 'sticky',
              top: '2rem'
            }}>
              <h3 style={{
                color: '#2C3E50',
                fontSize: '1.2rem',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Camera size={20} color="#D35400" />
                Images
              </h3>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '2rem',
                  border: '2px dashed #D35400',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backgroundColor: '#fdf5f3'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fef7f5'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fdf5f3'}>
                  <Upload size={24} color="#D35400" />
                  <span style={{ color: '#D35400', fontWeight: '500', marginTop: '0.5rem' }}>
                    Ajouter des images
                  </span>
                  <span style={{ color: '#7f8c8d', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                    JPG, PNG jusqu'à 5MB
                  </span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>

              {previewImages.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {previewImages.map((image, index) => (
                    <div key={index} style={{
                      position: 'relative',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: bien.imagePrincipale === image ? '3px solid #D35400' : '2px solid #ecf0f1'
                    }}>
                      <img
                        src={image}
                        alt={`Preview ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '120px',
                          objectFit: 'cover'
                        }}
                      />
                      <div style={{
                        position: 'absolute',
                        top: '0.5rem',
                        right: '0.5rem',
                        display: 'flex',
                        gap: '0.25rem'
                      }}>
                        {bien.imagePrincipale !== image && (
                          <button
                            type="button"
                            onClick={() => setAsMainImage(image)}
                            style={{
                              padding: '0.25rem',
                              backgroundColor: 'rgba(255,255,255,0.9)',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center'
                            }}
                            title="Définir comme image principale"
                          >
                            <Home size={14} color="#D35400" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          style={{
                            padding: '0.25rem',
                            backgroundColor: 'rgba(255,255,255,0.9)',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <X size={14} color="#e74c3c" />
                        </button>
                      </div>
                      {bien.imagePrincipale === image && (
                        <div style={{
                          position: 'absolute',
                          bottom: '0.5rem',
                          left: '0.5rem',
                          backgroundColor: '#D35400',
                          color: 'white',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          fontSize: '0.7rem',
                          fontWeight: '500'
                        }}>
                          Image principale
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ 
                marginTop: '2rem', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '0.75rem' 
              }}>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.875rem',
                    backgroundColor: loading ? '#bdc3c7' : '#D35400',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    if (!loading) e.currentTarget.style.backgroundColor = '#e67e22';
                  }}
                  onMouseOut={(e) => {
                    if (!loading) e.currentTarget.style.backgroundColor = '#D35400';
                  }}
                >
                  {loading ? (
                    <>
                      <div style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid transparent',
                        borderTop: '2px solid white',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }} />
                      Sauvegarde...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      Sauvegarder les modifications
                    </>
                  )}
                </button>

                <button
                  type="button"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.875rem',
                    backgroundColor: 'transparent',
                    color: '#2C3E50',
                    border: '2px solid #ecf0f1',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#ecf0f1';
                    e.currentTarget.style.borderColor = '#bdc3c7';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = '#ecf0f1';
                  }}
                >
                  <X size={18} />
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        input:focus,
        textarea:focus,
        select:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(211, 84, 0, 0.1);
        }
        
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        
        input[type="number"] {
          -moz-appearance: textfield;
        }
        
        @media (max-width: 1024px) {
          .grid-container {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ModificationBienPage;