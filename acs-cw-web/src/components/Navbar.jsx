// Navbar Component - Shows the header with navigation links
import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import './Navbar.css';

function Navbar() {
    // Get favorites count from context
    const { favoritesCount } = useFavorites();
    
    return (
        <header className="app-header">
            <div className="header-content">
                {/* Logo and site name */}
                <Link to="/" className="logo-link">
                    <h1 className="app-title">
                        <span className="logo-icon">🏠</span>
                        Property Pro
                    </h1>
                </Link>
                
                {/* Navigation links */}
                <nav className="header-nav">
                    <Link to="/" className="nav-link">
                        🔍 Search
                    </Link>
                    <span className="nav-favorites">
                        ★ Favorites
                        {favoritesCount > 0 && (
                            <span className="favorites-badge">{favoritesCount}</span>
                        )}
                    </span>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;
