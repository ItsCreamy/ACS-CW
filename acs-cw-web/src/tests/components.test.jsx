/**
 * Component Integration Tests
 * 
 * Tests React component rendering and basic interactions:
 * - PropertyCard component rendering
 * - SearchFilter component rendering
 * - FavoritesList component rendering
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FavoritesProvider } from '../context/FavoritesContext';

// Import components
import PropertyCard from '../components/PropertyCard';
import FavoritesList from '../components/FavoritesList';
import SearchFilter from '../components/SearchFilter';

// Mock property for testing
const mockProperty = {
    id: 'test-prop-1',
    type: 'House',
    price: 450000,
    bedrooms: 4,
    dateAdded: '2025-10-15',
    postcode: 'BR1',
    location: 'Test Location, London',
    description: 'A beautiful test property with great features.',
    images: ['https://example.com/image1.jpg']
};

// Test wrapper with all required providers
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
    describe('PropertyCard Component', () => {
        test('should render property location', () => {
            render(
                <TestWrapper>
                    <PropertyCard property={mockProperty} />
                </TestWrapper>
            );
            
            expect(screen.getByText('Test Location, London')).toBeInTheDocument();
        });

        test('should render formatted price', () => {
            render(
                <TestWrapper>
                    <PropertyCard property={mockProperty} />
                </TestWrapper>
            );
            
            expect(screen.getByText('£450,000')).toBeInTheDocument();
        });

        test('should render property type badge', () => {
            render(
                <TestWrapper>
                    <PropertyCard property={mockProperty} />
                </TestWrapper>
            );
            
            expect(screen.getByText('House')).toBeInTheDocument();
        });

        test('should render bedroom count', () => {
            render(
                <TestWrapper>
                    <PropertyCard property={mockProperty} />
                </TestWrapper>
            );
            
            expect(screen.getByText(/4 beds/)).toBeInTheDocument();
        });

        test('should render View Details link', () => {
            render(
                <TestWrapper>
                    <PropertyCard property={mockProperty} />
                </TestWrapper>
            );
            
            expect(screen.getByText('View Details')).toBeInTheDocument();
            expect(screen.getByRole('link', { name: /View details/i })).toHaveAttribute(
                'href',
                '/property/test-prop-1'
            );
        });

        test('should render Save button', () => {
            render(
                <TestWrapper>
                    <PropertyCard property={mockProperty} />
                </TestWrapper>
            );
            
            expect(screen.getByRole('button', { name: /Save/i })).toBeInTheDocument();
        });
    });

    describe('FavoritesList Component', () => {
        test('should render favorites heading', () => {
            render(
                <TestWrapper>
                    <FavoritesList />
                </TestWrapper>
            );
            
            expect(screen.getByRole('heading', { name: /Favorites/i })).toBeInTheDocument();
        });

        test('should render empty state message', () => {
            render(
                <TestWrapper>
                    <FavoritesList />
                </TestWrapper>
            );
            
            expect(screen.getByText('No favorites yet')).toBeInTheDocument();
        });

        test('should render drag hint', () => {
            render(
                <TestWrapper>
                    <FavoritesList />
                </TestWrapper>
            );
            
            expect(screen.getByText(/Drag properties here/i)).toBeInTheDocument();
        });
    });

    describe('SearchFilter Component', () => {
        const mockFilters = {
            type: 'any',
            minPrice: 100000,
            maxPrice: 1000000,
            minBeds: 0,
            maxBeds: 10,
            dateFrom: null,
            dateTo: null,
            postcode: ''
        };
        const mockSetFilters = jest.fn();
        const mockHandleSearch = jest.fn();

        test('should render filter heading', () => {
            render(
                <TestWrapper>
                    <SearchFilter 
                        filters={mockFilters} 
                        setFilters={mockSetFilters}
                        handleSearch={mockHandleSearch}
                    />
                </TestWrapper>
            );
            
            expect(screen.getByText('Filter Properties')).toBeInTheDocument();
        });

        test('should render property type filter', () => {
            render(
                <TestWrapper>
                    <SearchFilter 
                        filters={mockFilters} 
                        setFilters={mockSetFilters}
                        handleSearch={mockHandleSearch}
                    />
                </TestWrapper>
            );
            
            expect(screen.getByText('Property Type:')).toBeInTheDocument();
        });

        test('should render price range display', () => {
            render(
                <TestWrapper>
                    <SearchFilter 
                        filters={mockFilters} 
                        setFilters={mockSetFilters}
                        handleSearch={mockHandleSearch}
                    />
                </TestWrapper>
            );
            
            expect(screen.getByText('Price Range:')).toBeInTheDocument();
        });

        test('should render bedrooms filter', () => {
            render(
                <TestWrapper>
                    <SearchFilter 
                        filters={mockFilters} 
                        setFilters={mockSetFilters}
                        handleSearch={mockHandleSearch}
                    />
                </TestWrapper>
            );
            
            expect(screen.getByText('Bedrooms:')).toBeInTheDocument();
        });

        test('should render date added filter', () => {
            render(
                <TestWrapper>
                    <SearchFilter 
                        filters={mockFilters} 
                        setFilters={mockSetFilters}
                        handleSearch={mockHandleSearch}
                    />
                </TestWrapper>
            );
            
            expect(screen.getByText('Date Added:')).toBeInTheDocument();
        });

        test('should render postcode filter', () => {
            render(
                <TestWrapper>
                    <SearchFilter 
                        filters={mockFilters} 
                        setFilters={mockSetFilters}
                        handleSearch={mockHandleSearch}
                    />
                </TestWrapper>
            );
            
            expect(screen.getByText('Postcode Area:')).toBeInTheDocument();
        });

        test('should render search button', () => {
            render(
                <TestWrapper>
                    <SearchFilter 
                        filters={mockFilters} 
                        setFilters={mockSetFilters}
                        handleSearch={mockHandleSearch}
                    />
                </TestWrapper>
            );
            
            expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
        });

        test('should render reset button', () => {
            render(
                <TestWrapper>
                    <SearchFilter 
                        filters={mockFilters} 
                        setFilters={mockSetFilters}
                        handleSearch={mockHandleSearch}
                    />
                </TestWrapper>
            );
            
            expect(screen.getByRole('button', { name: /Reset/i })).toBeInTheDocument();
        });
    });
});
