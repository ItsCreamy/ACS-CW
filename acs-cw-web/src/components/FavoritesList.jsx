// FavoritesList Component - Shows user's favorite properties
import React from 'react';
import { Link } from 'react-router-dom';
import { useDrop } from 'react-dnd';
import { useFavorites } from '../context/FavoritesContext';
import { getImagePath } from '../utils/imagePath';
import './FavoritesList.css';

function FavoritesList() {
    const { favorites, removeFavorite, clearFavorites, addFavorite } = useFavorites();

    // Set up drop zone for drag and drop
    const [{ isOver }, drop] = useDrop(function() {
        return {
            accept: 'PROPERTY',
            drop: function(item) {
                addFavorite(item.property);
            },
            collect: function(monitor) {
                return {
                    isOver: !!monitor.isOver()
                };
            }
        };
    }, [addFavorite]);

    // Build class name for drop zone
    let containerClass = 'favorites-container';
    if (isOver) {
        containerClass = containerClass + ' drag-over';
    }

    return (
        <div ref={drop} className={containerClass}>
            <div className="favorites-header">
                <h3>★ Favorites ({favorites.length})</h3>
                {favorites.length > 0 && (
                    <button
                        className="clear-btn" 
                        onClick={clearFavorites}
                        title="Clear all favorites"
                    >
                        Clear All
                    </button>
                )}
            </div>

            {favorites.length === 0 ? (
                <div className="favorites-empty">
                    <p>No favorites yet</p>
                    <p className="drag-hint">Drag properties here to add them</p>
                </div>
            ) : (
                <ul className="favorites-list">
                    {favorites.map(function(property) {
                        return (
                            <li key={property.id} className="favorite-item">
                                <Link to={'/property/' + property.id} className="favorite-link">
                                    <img 
                                        src={getImagePath(property.images[0])} 
                                        alt={property.type}
                                        className="favorite-img"
                                    />
                                    <div className="favorite-info">
                                        <p className="favorite-price">
                                            £{property.price.toLocaleString()}
                                        </p>
                                        <p className="favorite-location">
                                            {property.location}
                                        </p>
                                    </div>
                                </Link>
                                <button 
                                    className="remove-btn"
                                    onClick={function() { removeFavorite(property.id); }}
                                    title="Remove from favorites"
                                >
                                    ×
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

export default FavoritesList;
