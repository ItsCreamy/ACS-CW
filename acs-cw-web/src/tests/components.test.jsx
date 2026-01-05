/**
 * Component Tests
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FavoritesProvider } from '../context/FavoritesContext';

// Mock the imagePath utility to avoid import.meta issues in Jest
jest.mock('../utils/imagePath', () => ({
    getImagePath: (path) => path
}));

import FavoritesList from '../components/FavoritesList';

// Wrapper with all providers
const TestWrapper = ({ children }) => (
    <FavoritesProvider>
        <DndProvider backend={HTML5Backend}>
            <BrowserRouter>
                {children}
            </BrowserRouter>
        </DndProvider>
    </FavoritesProvider>
);

describe('Component Rendering', () => {
    test('should render FavoritesList with heading', () => {
        render(
            <TestWrapper>
                <FavoritesList />
            </TestWrapper>
        );
        
        expect(screen.getByRole('heading', { name: /Favorites/i })).toBeInTheDocument();
    });

    test('should show empty state when no favorites', () => {
        render(
            <TestWrapper>
                <FavoritesList />
            </TestWrapper>
        );
        
        expect(screen.getByText('No favorites yet')).toBeInTheDocument();
    });
});
