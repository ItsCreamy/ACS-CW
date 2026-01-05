/**
 * Favorites Functionality Tests
 * 
 * Tests the favorites context including:
 * - Adding properties to favorites
 * - Preventing duplicate additions
 * - Removing properties from favorites
 * - Clearing all favorites
 * - Checking if property is favorite
 */

import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritesProvider, useFavorites } from '../context/FavoritesContext';

// Mock property data for testing
const mockProperty1 = {
    id: 'test-prop-1',
    type: 'House',
    price: 450000,
    bedrooms: 4,
    location: 'Test Location 1',
    postcode: 'TE1'
};

const mockProperty2 = {
    id: 'test-prop-2',
    type: 'Flat',
    price: 325000,
    bedrooms: 2,
    location: 'Test Location 2',
    postcode: 'TE2'
};

// Test component that exposes favorites context
const TestComponent = ({ onRender }) => {
    const favoritesContext = useFavorites();
    onRender(favoritesContext);
    return (
        <div>
            <span data-testid="favorites-count">{favoritesContext.favoritesCount}</span>
            <ul>
                {favoritesContext.favorites.map(fav => (
                    <li key={fav.id} data-testid={`fav-${fav.id}`}>{fav.location}</li>
                ))}
            </ul>
        </div>
    );
};

describe('Favorites Context', () => {
    let contextValue;

    beforeEach(() => {
        // Clear localStorage before each test
        localStorage.clear();
        contextValue = null;
    });

    const renderWithProvider = () => {
        return render(
            <FavoritesProvider>
                <TestComponent onRender={(ctx) => { contextValue = ctx; }} />
            </FavoritesProvider>
        );
    };

    describe('Initial State', () => {
        test('should start with empty favorites list', () => {
            renderWithProvider();
            expect(screen.getByTestId('favorites-count').textContent).toBe('0');
        });

        test('should provide all required context methods', () => {
            renderWithProvider();
            expect(typeof contextValue.addFavorite).toBe('function');
            expect(typeof contextValue.removeFavorite).toBe('function');
            expect(typeof contextValue.clearFavorites).toBe('function');
            expect(typeof contextValue.isFavorite).toBe('function');
        });
    });

    describe('Adding Favorites', () => {
        test('should add a property to favorites', () => {
            renderWithProvider();

            act(() => {
                contextValue.addFavorite(mockProperty1);
            });

            expect(contextValue.favorites.length).toBe(1);
            expect(contextValue.favorites[0].id).toBe('test-prop-1');
        });

        test('should add multiple properties to favorites', () => {
            renderWithProvider();

            act(() => {
                contextValue.addFavorite(mockProperty1);
                contextValue.addFavorite(mockProperty2);
            });

            expect(contextValue.favorites.length).toBe(2);
        });

        test('should prevent duplicate additions', () => {
            renderWithProvider();

            act(() => {
                contextValue.addFavorite(mockProperty1);
                contextValue.addFavorite(mockProperty1); // Try to add again
            });

            expect(contextValue.favorites.length).toBe(1);
        });

        test('should handle invalid property gracefully', () => {
            renderWithProvider();

            act(() => {
                contextValue.addFavorite(null);
                contextValue.addFavorite(undefined);
                contextValue.addFavorite({});
            });

            expect(contextValue.favorites.length).toBe(0);
        });
    });

    describe('Removing Favorites', () => {
        test('should remove a property from favorites by ID', () => {
            renderWithProvider();

            act(() => {
                contextValue.addFavorite(mockProperty1);
                contextValue.addFavorite(mockProperty2);
            });

            expect(contextValue.favorites.length).toBe(2);

            act(() => {
                contextValue.removeFavorite('test-prop-1');
            });

            expect(contextValue.favorites.length).toBe(1);
            expect(contextValue.favorites[0].id).toBe('test-prop-2');
        });

        test('should handle removing non-existent property gracefully', () => {
            renderWithProvider();

            act(() => {
                contextValue.addFavorite(mockProperty1);
            });

            act(() => {
                contextValue.removeFavorite('non-existent-id');
            });

            expect(contextValue.favorites.length).toBe(1);
        });
    });

    describe('Clearing Favorites', () => {
        test('should clear all favorites', () => {
            renderWithProvider();

            act(() => {
                contextValue.addFavorite(mockProperty1);
                contextValue.addFavorite(mockProperty2);
            });

            expect(contextValue.favorites.length).toBe(2);

            act(() => {
                contextValue.clearFavorites();
            });

            expect(contextValue.favorites.length).toBe(0);
        });

        test('should handle clearing empty list gracefully', () => {
            renderWithProvider();

            act(() => {
                contextValue.clearFavorites();
            });

            expect(contextValue.favorites.length).toBe(0);
        });
    });

    describe('Checking Favorites', () => {
        test('should correctly identify if property is favorite', () => {
            renderWithProvider();

            act(() => {
                contextValue.addFavorite(mockProperty1);
            });

            expect(contextValue.isFavorite('test-prop-1')).toBe(true);
            expect(contextValue.isFavorite('test-prop-2')).toBe(false);
        });

        test('should update isFavorite after removal', () => {
            renderWithProvider();

            act(() => {
                contextValue.addFavorite(mockProperty1);
            });

            expect(contextValue.isFavorite('test-prop-1')).toBe(true);

            act(() => {
                contextValue.removeFavorite('test-prop-1');
            });

            expect(contextValue.isFavorite('test-prop-1')).toBe(false);
        });
    });

    describe('Favorites Count', () => {
        test('should correctly track favorites count', () => {
            renderWithProvider();

            expect(contextValue.favoritesCount).toBe(0);

            act(() => {
                contextValue.addFavorite(mockProperty1);
            });

            expect(contextValue.favoritesCount).toBe(1);

            act(() => {
                contextValue.addFavorite(mockProperty2);
            });

            expect(contextValue.favoritesCount).toBe(2);

            act(() => {
                contextValue.removeFavorite('test-prop-1');
            });

            expect(contextValue.favoritesCount).toBe(1);
        });
    });
});
