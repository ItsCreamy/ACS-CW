// Property Page - Shows details for one property
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useDrag } from 'react-dnd';
import DOMPurify from 'dompurify';
import 'react-tabs/style/react-tabs.css';
import propertiesData from '../data/properties.json';
import { useFavorites } from '../context/FavoritesContext';
import { getImagePath } from '../utils/imagePath';
import './PropertyPage.css';

function PropertyPage() {
    const { id } = useParams();
    const { addFavorite, isFavorite } = useFavorites();
    
    // Find the property from the list
    const property = propertiesData.find(p => p.id === id);
    
    // Track which image is shown
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    
    // Track if lightbox is open
    const [showLightbox, setShowLightbox] = useState(false);

    // Make property info draggable
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'PROPERTY',
        item: { property },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }), [property]);

    // Check if already in favorites
    const isAlreadyFavorite = property ? isFavorite(property.id) : false;

    // Go to next image
    function nextImage() {
        if (property) {
            if (selectedImageIndex === property.images.length - 1) {
                setSelectedImageIndex(0);
            } else {
                setSelectedImageIndex(selectedImageIndex + 1);
            }
        }
    }

    // Go to previous image
    function prevImage() {
        if (property) {
            if (selectedImageIndex === 0) {
                setSelectedImageIndex(property.images.length - 1);
            } else {
                setSelectedImageIndex(selectedImageIndex - 1);
            }
        }
    }

    // Handle keyboard arrows in gallery
    function handleKeyDown(e) {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') setShowLightbox(false);
    }

    // Add to favorites
    function handleAddFavorite() {
        addFavorite(property);
    }

    // Format date nicely
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        });
    }

    // Show error if property not found
    if (!property) {
        return (
            <div className="container property-not-found">
                <div className="not-found-content">
                    <h1>🏠 Property Not Found</h1>
                    <p>The property you're looking for doesn't exist or has been removed.</p>
                    <Link to="/" className="back-btn">← Back to Search</Link>
                </div>
            </div>
        );
    }

    // Clean the description for safety
    const sanitizedDescription = DOMPurify.sanitize(property.longDescription);

    return (
        <div className="container property-details">
            {/* Back button */}
            <nav className="breadcrumb">
                <Link to="/" className="back-link">← Back to Search</Link>
            </nav>

            <div className="property-content">
                {/* Image gallery */}
                <section className="gallery-section">
                    {/* Main image display */}
                    <div 
                        className="main-image-container"
                        onClick={() => setShowLightbox(true)}
                        onKeyDown={handleKeyDown}
                        tabIndex={0}
                    >
                        <img 
                            src={getImagePath(property.images[selectedImageIndex])} 
                            alt={`${property.type} in ${property.location}`}
                            className="main-img"
                        />
                        
                        {/* Previous/Next buttons */}
                        <button 
                            className="gallery-nav prev"
                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        >
                            ‹
                        </button>
                        <button 
                            className="gallery-nav next"
                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        >
                            ›
                        </button>
                        
                        {/* Image counter */}
                        <div className="image-counter">
                            {selectedImageIndex + 1} / {property.images.length}
                        </div>
                        
                        {/* Hint to click */}
                        <div className="expand-hint">
                            🔍 Click to view larger
                        </div>
                    </div>

                    {/* Small thumbnail images */}
                    <div className="thumbnails">{property.images.map((img, index) => (
                            <button
                                key={index}
                                className={`thumbnail ${index === selectedImageIndex ? 'active' : ''}`}
                                onClick={() => setSelectedImageIndex(index)}
                            >
                                <img 
                                    src={getImagePath(img)} 
                                    alt={`Thumbnail ${index + 1}`}
                                    loading="lazy"
                                />
                            </button>
                        ))}
                    </div>
                </section>

                {/* Property information */}
                <section 
                    ref={drag}
                    className={`info-section ${isDragging ? 'dragging' : ''}`}
                    style={{ opacity: isDragging ? 0.7 : 1 }}
                >
                    {/* Price and address */}
                    <div className="info-header">
                        <div className="price-section">
                            <h1 className="property-price">£{property.price.toLocaleString()}</h1>
                            <span className="price-guide">Guide price</span>
                        </div>
                        
                        <h2 className="property-address">{property.address || property.location}</h2>
                        <p className="property-location-detail">📍 {property.location}</p>
                    </div>

                    {/* Key details */}
                    <div className="key-features">
                        <div className="feature">
                            <span className="feature-icon">🏠</span>
                            <span className="feature-label">Type</span>
                            <span className="feature-value">{property.type}</span>
                        </div>
                        <div className="feature">
                            <span className="feature-icon">🛏️</span>
                            <span className="feature-label">Bedrooms</span>
                            <span className="feature-value">{property.bedrooms}</span>
                        </div>
                        <div className="feature">
                            <span className="feature-icon">📮</span>
                            <span className="feature-label">Postcode</span>
                            <span className="feature-value">{property.postcode}</span>
                        </div>
                        <div className="feature">
                            <span className="feature-icon">📅</span>
                            <span className="feature-label">Added</span>
                            <span className="feature-value">{formatDate(property.dateAdded)}</span>
                        </div>
                    </div>

                    {/* Brief description */}
                    <p className="property-summary">{property.description}</p>

                    {/* Add to favorites button */}
                    <div className="action-buttons">
                        <button 
                            onClick={handleAddFavorite}
                            className={`add-fav-btn large ${isAlreadyFavorite ? 'already-added' : ''}`}
                            disabled={isAlreadyFavorite}
                        >
                            {isAlreadyFavorite ? '★ Saved to Favorites' : '♡ Add to Favorites'}
                        </button>
                        <p className="drag-hint-text">
                            💡 You can also drag this section to your favorites
                        </p>
                    </div>
                </section>
            </div>

            {/* Tabs for description, floor plan, and map */}
            <section className="tabs-section">
                <Tabs>
                    <TabList>
                        <Tab>📝 Description</Tab>
                        <Tab>📐 Floor Plan</Tab>
                        <Tab>🗺️ Location</Tab>
                    </TabList>

                    {/* Tab 1: Description */}
                    <TabPanel>
                        <div className="tab-content description-tab">
                            <h3>Full Description</h3>
                            <div 
                                className="long-description"
                                dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
                            />
                            
                            {/* More details */}
                            <div className="property-details-list">
                                <h4>Property Details</h4>
                                <ul>
                                    <li><strong>Property Type:</strong> {property.type}</li>
                                    <li><strong>Bedrooms:</strong> {property.bedrooms}</li>
                                    <li><strong>Tenure:</strong> {property.tenure || 'Freehold'}</li>
                                    <li><strong>Council Tax Band:</strong> {property.councilTaxBand || 'TBC'}</li>
                                    <li><strong>Postcode:</strong> {property.postcode}</li>
                                    <li><strong>Date Added:</strong> {formatDate(property.dateAdded)}</li>
                                </ul>
                            </div>
                        </div>
                    </TabPanel>

                    {/* Tab 2: Floor Plan */}
                    <TabPanel>
                        <div className="tab-content floorplan-tab">
                            <h3>Floor Plan</h3>
                            <div className="floorplan-container">
                                <img 
                                    src={getImagePath(property.floorPlan)} 
                                    alt={`Floor plan for ${property.location}`}
                                    className="floorplan-img"
                                />
                            </div>
                        </div>
                    </TabPanel>

                    {/* Tab 3: Map */}
                    <TabPanel>
                        <div className="tab-content map-tab">
                            <h3>Location</h3>
                            <p className="map-address">📍 {property.address || property.location}</p>
                            {property.mapUrl ? (
                                <div className="map-container">
                                    <iframe 
                                        src={property.mapUrl} 
                                        width="100%" 
                                        height="450" 
                                        style={{ border: 0, borderRadius: '8px' }} 
                                        allowFullScreen 
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title={`Map showing location of ${property.location}`}
                                    />
                                </div>
                            ) : (
                                <div className="map-placeholder">
                                    <p>🗺️ Interactive map not available for this property</p>
                                    <p>Location: {property.location}, {property.postcode}</p>
                                </div>
                            )}
                        </div>
                    </TabPanel>
                </Tabs>
            </section>

            {/* Fullscreen image view (lightbox) */}
            {showLightbox && (
                <div 
                    className="lightbox-overlay" 
                    onClick={() => setShowLightbox(false)}
                    onKeyDown={handleKeyDown}
                >
                    {/* Close button */}
                    <button 
                        className="lightbox-close"
                        onClick={() => setShowLightbox(false)}
                    >
                        ✕
                    </button>
                    
                    {/* Big image */}
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <button 
                            className="lightbox-nav prev"
                            onClick={prevImage}
                        >
                            ‹
                        </button>
                        
                        <img 
                            src={getImagePath(property.images[selectedImageIndex])} 
                            alt={`${property.type} in ${property.location}`}
                            className="lightbox-img"
                        />
                        
                        <button 
                            className="lightbox-nav next"
                            onClick={nextImage}
                        >
                            ›
                        </button>
                    </div>
                    
                    {/* Image counter */}
                    <div className="lightbox-counter">
                        {selectedImageIndex + 1} / {property.images.length}
                    </div>
                    
                    {/* Thumbnails in lightbox */}
                    <div className="lightbox-thumbnails">{property.images.map((img, index) => (
                            <button
                                key={index}
                                className={`lightbox-thumb ${index === selectedImageIndex ? 'active' : ''}`}
                                onClick={(e) => { e.stopPropagation(); setSelectedImageIndex(index); }}
                            >
                                <img src={img} alt={`Thumbnail ${index + 1}`} />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default PropertyPage;