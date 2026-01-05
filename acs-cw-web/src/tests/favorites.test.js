/**
 * Favorites Functionality Tests
 */

import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { FavoritesProvider, useFavorites } from '../context/FavoritesContext';

const mockProperty = {
    id: 'test-1',
    type: 'House',
    price: 450000,
    location: 'Test Location'
};

// Test component to access context
const TestComponent = ({ onRender }) => {
    const ctx = useFavorites();
    onRender(ctx);
    return <span data-testid="count">{ctx.favorites.length}</span>;
};

describe('Favorites Context', () => {
    let contextValue;

    beforeEach(() => {
        localStorage.clear();
    });

    test('should add property to favorites', () => {
        render(
            <FavoritesProvider>
                <TestComponent onRender={(ctx) => { contextValue = ctx; }} />
            </FavoritesProvider>
        );

        act(() => {
            contextValue.addFavorite(mockProperty);
        });

        expect(contextValue.favorites.length).toBe(1);
        expect(contextValue.favorites[0].id).toBe('test-1');
    });

    test('should remove property from favorites', () => {
        render(
            <FavoritesProvider>
                <TestComponent onRender={(ctx) => { contextValue = ctx; }} />
            </FavoritesProvider>
        );

        act(() => {
            contextValue.addFavorite(mockProperty);
        });

        act(() => {
            contextValue.removeFavorite('test-1');
        });

        expect(contextValue.favorites.length).toBe(0);
    });
});
