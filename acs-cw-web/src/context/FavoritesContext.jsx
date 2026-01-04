/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, useEffect } from 'react';

const FavoritesContext = createContext();

const STORAGE_KEY = 'propertyFavorites';

// Provider component that wraps the app
export function FavoritesProvider({ children }) {
    // Load favorites from localStorage when component mounts
    const [favorites, setFavorites] = useState(function() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                return JSON.parse(stored);
            }
            return [];
        } catch (error) {
            console.warn('Error reading favorites from localStorage:', error);
            return [];
        }
    });

    // Save favorites to localStorage whenever they change
    useEffect(function() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
        } catch (error) {
            console.warn('Error saving favorites to localStorage:', error);
        }
    }, [favorites]);

    // Check if a property is in favorites
    function isFavorite(propertyId) {
        return favorites.some(function(fav) {
            return fav.id === propertyId;
        });
    }

    // Add a property to favorites
    function addFavorite(property) {
        if (!property || !property.id) {
            console.warn('Invalid property');
            return;
        }
        
        setFavorites(function(prev) {
            // Check if already in favorites
            const alreadyExists = prev.some(function(fav) {
                return fav.id === property.id;
            });
            
            if (alreadyExists) {
                return prev;
            }
            return [...prev, property];
        });
    }

    // Remove a property from favorites by ID
    function removeFavorite(id) {
        setFavorites(function(prev) {
            return prev.filter(function(prop) {
                return prop.id !== id;
            });
        });
    }

    // Clear all favorites
    function clearFavorites() {
        setFavorites([]);
    }

    const contextValue = {
        favorites,
        addFavorite,
        removeFavorite,
        clearFavorites,
        isFavorite,
        favoritesCount: favorites.length
    };

    return (
        <FavoritesContext.Provider value={contextValue}>
            {children}
        </FavoritesContext.Provider>
    );
}

// Custom hook to use the favorites context
export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
}
