import { useState } from 'react';
import styles from '../../styles/user.module.css';

const PropertyCard = ({ property, isFavorite, onToggleFavorite }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`${styles.propertyCard} ${property.status === 'réservé' ? styles.reserved : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {property.status === 'réservé' && (
        <div className={styles.reservedBadge}>Réservé</div>
      )}
      
      <div className={styles.propertyImage} style={{ backgroundImage: `url(${property.image})` }}>
        <button 
          className={`${styles.favoriteButton} ${isFavorite ? styles.favorited : ''}`}
          onClick={() => onToggleFavorite(property.id)}
          aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          ♥
        </button>
        
        {isHovered && (
          <div className={styles.imageOverlay}>
            <button className={styles.detailsButton}>Voir les détails</button>
          </div>
        )}
      </div>
      
      <div className={styles.propertyInfo}>
        <h3>{property.title}</h3>
        <div className={styles.price}>{property.price.toLocaleString()} €</div>
        <div className={styles.location}>{property.location}</div>
        
        <div className={styles.propertyFeatures}>
          <span>{property.area}m²</span>
          <span>{property.bedrooms} chambres</span>
          <span>{property.bathrooms} sdb</span>
        </div>
        
        <div className={styles.propertyTags}>
          {property.features.map((feature, index) => (
            <span key={index} className={styles.tag}>{feature}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;