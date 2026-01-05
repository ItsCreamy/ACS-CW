import React from 'react';
import { Link } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import { useFavorites } from '../context/FavoritesContext';
import DOMPurify from 'dompurify';
import './PropertyCard.css';

// Helper to get correct image path with base URL
function getImagePath(path) {
    const base = import.meta.env.BASE_URL || '/';
    // Remove leading slash from path if base already ends with /
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return base + cleanPath;
}

function PropertyCard({ property }) {
    const { addFavorite, isFavorite } = useFavorites();
    
    // Check if this property is already in favorites
    const isAlreadyFavorite = isFavorite(property.id);

    // Set up drag functionality
    const [{ isDragging }, drag] = useDrag(function() {
        return {
            type: 'PROPERTY',
            item: { property },
            collect: function(monitor) {
                return {
                    isDragging: !!monitor.isDragging()
                };
            }
        };
    }, [property]);

    // Handle adding to favorites
    function handleAddFavorite(e) {
        e.preventDefault();
        e.stopPropagation();
        addFavorite(property);
    }

    // Format the date for display
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', { 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric' 
        });
    }

    // Clean the description to prevent XSS attacks
    const sanitizedDescription = DOMPurify.sanitize(property.description);

    // Build the class name
    let cardClass = 'property-card';
    if (isDragging) {
        cardClass = cardClass + ' dragging';
    }
    if (isAlreadyFavorite) {
        cardClass = cardClass + ' is-favorite';
    }

    return (
        <article 
            ref={drag} 
            className={cardClass}
            style={{ opacity: isDragging ? 0.6 : 1 }}
        >
            {/* Favorite Badge */}
            {isAlreadyFavorite && (
                <div className="favorite-badge">
                    ★
                </div>
            )}
            
            {/* Property Image */}
            <div className="card-image-container">
                <img 
                    src={getImagePath(property.images[0])} 
                    alt={property.type + ' in ' + property.location}
                    className="card-img"
                />
                <span className="property-type-badge">{property.type}</span>
            </div>
            
            {/* Property Details */}
            <div className="card-details">
                <p className="price">£{property.price.toLocaleString()}</p>
                
                <h3 className="property-location">{property.location}</h3>
                
                <div className="property-stats">
                    <span className="stat">
                        <span className="stat-icon">🛏️</span>
                        {property.bedrooms} {property.bedrooms === 1 ? 'bed' : 'beds'}
                    </span>
                    <span className="stat">
                        <span className="stat-icon">📍</span>
                        {property.postcode}
                    </span>
                </div>
                
                <p 
                    className="property-description"
                    dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
                />
                
                <p className="date-added">
                    Added: {formatDate(property.dateAdded)}
                </p>
                
                {/* Action Buttons */}
                <div className="card-actions">
                    <Link 
                        to={'/property/' + property.id} 
                        className="view-btn"
                    >
                        View Details
                    </Link>
                    <button 
                        onClick={handleAddFavorite}
                        className={'add-fav-btn' + (isAlreadyFavorite ? ' already-added' : '')}
                        disabled={isAlreadyFavorite}
                    >
                        {isAlreadyFavorite ? '★ Saved' : '♡ Save'}
                    </button>
                </div>
            </div>
            
            {/* Drag Handle Hint */}
            <div className="drag-hint">
                <span>⋮⋮ Drag to add to favorites</span>
            </div>
        </article>
    );
}

export default PropertyCard;
