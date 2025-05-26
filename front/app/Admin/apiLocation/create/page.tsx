'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation'; 
import { Check, MapPin, Home, Camera, ArrowRight, Upload, X } from 'lucide-react';

interface FileWithPreview extends File {
  preview: string;
}

export default function AddMaison() {
  const router = useRouter(); 
  const [nom, setNom] = useState('');
  const [adresse, setAdresse] = useState('');
  const [ville, setVille] = useState('');
  const [prix, setPrix] = useState('');
  const [codePostal, setCodePostal] = useState('');
  const [description, setDescription] = useState('');
  const [surface, setSurface] = useState('');
  const [nbChambres, setNbChambres] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [type, setType] = useState('');
  const [images, setImages] = useState<FileWithPreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formVisible, setFormVisible] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
 
  const primaryColor = '#D35400'; 
  const secondaryColor = '#2C3E50';  

  useEffect(() => { 
    setTimeout(() => {
      setFormVisible(true);
    }, 300);
 
    return () => {
      images.forEach(image => URL.revokeObjectURL(image.preview));
    };
  }, [images]);

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
    const newImages = Array.from(files).map(file => {
      return Object.assign(file, {
        preview: URL.createObjectURL(file)
      });
    });
    
    setImages(prev => [...prev, ...newImages].slice(0, 10)); 
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleImageChange(e.target.files);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    URL.revokeObjectURL(newImages[index].preview);
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
        // Étape 1 : Uploader les images et récupérer leurs URLs
        const uploadedImages = await Promise.all(
            images.map(async (image) => {
                const formData = new FormData();
                formData.append('file', image);

                const response = await fetch('http://127.0.0.1:8000/api/maisons/upload', { 
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('Erreur lors de l\'upload des images');
                }

                const result = await response.json();
                return result.url; // L'URL retournée par le backend
            })
        );

        // Étape 2 : Envoyer les données principales
        const payload = {
            nom,
            adresse,
            ville,
            prix: parseFloat(prix),
            codePostal,
            description,
            surface: parseFloat(surface),
            nbChambres: parseInt(nbChambres, 10),
            latitude: latitude ? parseFloat(latitude) : null,
            longitude: longitude ? parseFloat(longitude) : null,
            disponible: true,
            type,
            dateDisponibilite: new Date().toISOString(),
            images: uploadedImages,
        };

        console.log('Payload envoyé :', payload);

        const response = await fetch('http://127.0.0.1:8000/api/maisons/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erreur lors de la création de la maison: ${response.statusText} - ${errorText}`);
        }

        const result = await response.json();
        console.log('Maison créée :', result);

        router.push('http://127.0.0.1:3000/Admin/apiLocation');
    } catch (error) {
        console.error('Erreur:', error);
    } finally {
        setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setNom('');
    setAdresse('');
    setVille('');
    setPrix('');
    setCodePostal('');
    setDescription('');
    setSurface('');
    setNbChambres('');
    setLatitude('');
    setLongitude('');
    setType('');
    setImages([]);
    setCurrentStep(1);
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-white mb-6">Informations principales</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative group">
                <label className="block text-sm font-medium text-white mb-1">Nom de la propriété</label>
                <input
                  placeholder="Villa des Roses"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white text-gray-800"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-1">Type de propriété</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white text-gray-800"
                  required
                >
                  <option value="">Sélectionnez le type</option>
                  <option value="Maison">Maison</option>
                  <option value="Appartement">Appartement</option>
                  <option value="Villa">Villa</option>
                  <option value="Studio">Studio</option>
                  <option value="Loft">Loft</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">Description</label>
              <textarea
                placeholder="Une magnifique propriété avec vue sur..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white text-gray-800"
                rows={4}
                required
              ></textarea>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-1">Prix (€)</label>
                <input
                  type="number"
                  placeholder="250000"
                  value={prix}
                  onChange={(e) => setPrix(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white text-gray-800"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-1">Surface (m²)</label>
                <input
                  type="number"
                  placeholder="85"
                  value={surface}
                  onChange={(e) => setSurface(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white text-gray-800"
                  required
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-1">Nombre de chambres</label>
                <input
                  type="number"
                  placeholder="3"
                  value={nbChambres}
                  onChange={(e) => setNbChambres(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white text-gray-800"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-1">Images de la propriété</label>
                <div 
                  className={`w-full min-h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all ${
                    isDragging ? 'border-orange-500 bg-orange-50' : 'border-gray-300 bg-white'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {images.length === 0 ? (
                    <>
                      <Upload className="text-gray-400 mb-2" size={24} />
                      <p className="text-sm text-gray-500">Glissez des images ou cliquez pour parcourir</p>
                      <p className="text-xs text-gray-400 mt-1">JPG, PNG ou GIF (max 10)</p>
                    </>
                  ) : (
                    <div className="w-full p-2">
                      <div className="grid grid-cols-3 gap-2">
                        {images.map((image, index) => (
                          <div key={index} className="relative aspect-square">
                            <img 
                              src={image.preview} 
                              alt={`Aperçu ${index}`} 
                              className="w-full h-full object-cover rounded-lg" 
                            />
                            <button 
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeImage(index);
                              }}
                              className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md"
                            >
                              <X size={16} className="text-red-500" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileInputChange}
                    ref={fileInputRef}
                    className="hidden"
                  />
                </div>
                {images.length > 0 && (
                  <p className="text-xs text-gray-300 mt-1">
                    {images.length} image(s) sélectionnée(s) - {10 - images.length} restante(s)
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-white mb-6">Localisation</h2>
            <div>
              <label className="block text-sm font-medium text-white mb-1">Adresse</label>
              <input
                placeholder="123 rue du Bonheur"
                value={adresse}
                onChange={(e) => setAdresse(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white text-gray-800"
                required
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-1">Ville</label>
                <input
                  placeholder="Paris"
                  value={ville}
                  onChange={(e) => setVille(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white text-gray-800"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-1">Code Postal</label>
                <input
                  placeholder="75001"
                  value={codePostal}
                  onChange={(e) => setCodePostal(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white text-gray-800"
                  required
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-1">Latitude</label>
                <input
                  placeholder="48.8566"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white text-gray-800"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-1">Longitude</label>
                <input
                  placeholder="2.3522"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white text-gray-800"
                  required
                />
              </div>
            </div>
            <div className="bg-orange-100 p-4 rounded-lg border border-orange-200 flex items-start">
              <MapPin className="text-orange-500 mr-2 flex-shrink-0 mt-1" size={20} />
              <p className="text-sm text-orange-800">
                Vous pouvez trouver les coordonnées géographiques (latitude et longitude) en utilisant Google Maps. 
                Faites un clic droit sur l'emplacement et sélectionnez "Quelles sont ces coordonnées?".
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Animation CSS
  const fadeIn = {
    opacity: formVisible ? 1 : 0,
    transform: formVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 0.5s ease, transform 0.5s ease'
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: secondaryColor }}>
      <div 
        className="max-w-3xl mx-auto rounded-xl shadow-xl overflow-hidden"
        style={{ ...fadeIn, backgroundColor: secondaryColor }}
      >
        {/* En-tête */}
        <div style={{ backgroundColor: primaryColor }} className="py-6 px-8">
          <div className="flex items-center">
            <Home className="text-white mr-3" size={28} />
            <h1 className="text-3xl font-bold text-white">Ajouter une nouvelle propriété</h1>
          </div>
          <p className="text-white opacity-80 mt-2">Ajoutez votre bien immobilier à notre catalogue</p>
        </div>

        {/* Progression */}
        <div className="px-8 pt-8">
          <div className="flex items-center mb-8">
            <div 
              className={`flex items-center justify-center w-10 h-10 rounded-full text-white font-bold transition-colors duration-300`}
              style={{ backgroundColor: currentStep >= 1 ? primaryColor : 'rgba(255,255,255,0.2)' }}
            >
              1
            </div>
            <div 
              className={`flex-1 h-1 mx-2 transition-colors duration-500`}
              style={{ backgroundColor: currentStep >= 2 ? primaryColor : 'rgba(255,255,255,0.2)' }}
            ></div>
            <div 
              className={`flex items-center justify-center w-10 h-10 rounded-full text-white font-bold transition-colors duration-300`}
              style={{ backgroundColor: currentStep >= 2 ? primaryColor : 'rgba(255,255,255,0.2)' }}
            >
              2
            </div>
          </div>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="px-8 pb-8">
          {renderStep()}

          {/* Contrôles de navigation */}
          <div className="mt-8 flex justify-between">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors duration-300 flex items-center"
              >
                <ArrowRight className="mr-2 rotate-180" size={18} />
                Précédent
              </button>
            )}
            
            {currentStep < 2 ? (
              <button
                type="button"
                onClick={nextStep}
                style={{ backgroundColor: primaryColor }}
                className="ml-auto px-5 py-2 hover:opacity-90 text-white rounded-lg transition-colors duration-300 flex items-center"
              >
                Suivant
                <ArrowRight className="ml-2" size={18} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting || images.length === 0}
                style={{ backgroundColor: primaryColor }}
                className={`ml-auto px-6 py-3 hover:opacity-90 text-white rounded-lg transition-all duration-300 flex items-center ${
                  isSubmitting || images.length === 0 ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enregistrement...
                  </>
                ) : (
                  <>
                    Publier la propriété
                    <Check className="ml-2" size={18} />
                  </>
                )}
              </button>
            )}
          </div>
        </form>

        {/* Message de confirmation */}
        {showSuccess && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-8 max-w-md animate-bounce-in">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full" style={{ backgroundColor: 'rgba(211, 84, 0, 0.2)' }}>
                <Check style={{ color: primaryColor }} size={32} />
              </div>
              <h3 className="text-2xl font-bold text-center text-gray-800 mb-2">Propriété ajoutée avec succès!</h3>
              <p className="text-center text-gray-600 mb-6">Votre propriété a été ajoutée à notre catalogue.</p>
              <button
                onClick={() => setShowSuccess(false)}
                style={{ backgroundColor: primaryColor }}
                className="w-full py-3 hover:opacity-90 text-white rounded-lg transition-colors duration-300"
              >
                Fermer
              </button>
            </div>
          </div>
        )}

        {/* Prévisualisation de la propriété */}
        {nom && (
          <div className="mt-6 mb-8 mx-8 p-4 border border-gray-700 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
            <h3 className="text-lg font-medium text-white mb-2">Prévisualisation</h3>
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="h-48 bg-gray-200 relative">
                {images.length > 0 ? (
                  <img src={images[0].preview} alt={nom} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Camera size={32} className="text-gray-400" />
                  </div>
                )}
                <div className="absolute top-0 right-0 text-white py-1 px-3 m-2 rounded-lg" style={{ backgroundColor: primaryColor }}>
                  {type || 'Propriété'}
                </div>
                {images.length > 1 && (
                  <div className="absolute bottom-0 right-0 text-white py-1 px-3 m-2 rounded-lg" style={{ backgroundColor: primaryColor }}>
                    +{images.length - 1} photo(s)
                  </div>
                )}
              </div>
              <div className="p-4">
                <h4 className="text-xl font-semibold text-gray-800">{nom}</h4>
                <div className="flex items-center text-gray-600 mt-1">
                  <MapPin size={16} className="mr-1" />
                  <span>{ville || 'Ville'} {codePostal || 'Code postal'}</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="font-bold text-xl" style={{ color: primaryColor }}>{prix ? `${parseInt(prix).toLocaleString()} €` : '-'}</div>
                  <div className="text-gray-600">{surface ? `${surface} m²` : '-'}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes bounceIn {
          0% { transform: scale(0.8); opacity: 0; }
          70% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-bounce-in {
          animation: bounceIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}