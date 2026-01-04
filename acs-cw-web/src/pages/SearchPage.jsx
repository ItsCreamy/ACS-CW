// Search Page - Shows all properties with filters and favorites
import React, { useState } from 'react';
import propertiesData from '../data/properties.json';
import PropertyCard from '../components/PropertyCard';
import SearchFilter from '../components/SearchFilter';
import FavoritesList from '../components/FavoritesList';
import './SearchPage.css';

function SearchPage() {
    // Store all properties
    const [properties] = useState(propertiesData);
    
    // Store filtered results
    const [filteredProps, setFilteredProps] = useState(propertiesData);
    
    // Count how many results we have
    const [resultCount, setResultCount] = useState(propertiesData.length);
    
    // Track if user has searched
    const [hasSearched, setHasSearched] = useState(false);
    
    // Store filter values
    const [filters, setFilters] = useState({
        type: 'any',
        minPrice: 100000,
        maxPrice: 1000000,
        minBeds: 0,
        maxBeds: 10,
        dateFrom: null,
        dateTo: null,
        postcode: ''
    });

    // Search function - filters properties based on criteria
    function handleSearch() {
        let result = [...properties];

        // Filter by type (House/Flat)
        if (filters.type && filters.type !== 'any') {
            result = result.filter(property => 
                property.type.toLowerCase() === filters.type.toLowerCase()
            );
        }
        
        // Filter by minimum price
        if (filters.minPrice) {
            result = result.filter(property => 
                property.price >= filters.minPrice
            );
        }
        
        // Filter by maximum price
        if (filters.maxPrice) {
            result = result.filter(property => 
                property.price <= filters.maxPrice
            );
        }
        
        // Filter by minimum bedrooms
        if (filters.minBeds > 0) {
            result = result.filter(property => 
                property.bedrooms >= filters.minBeds
            );
        }
        
        // Filter by maximum bedrooms
        if (filters.maxBeds < 10) {
            result = result.filter(property => 
                property.bedrooms <= filters.maxBeds
            );
        }
        
        // Filter by postcode
        if (filters.postcode && filters.postcode.trim() !== '') {
            result = result.filter(property => 
                property.postcode.toLowerCase() === filters.postcode.toLowerCase()
            );
        }

        // Filter by date from
        if (filters.dateFrom) {
            const fromDate = new Date(filters.dateFrom);
            fromDate.setHours(0, 0, 0, 0);
            result = result.filter(property => {
                const propertyDate = new Date(property.dateAdded);
                propertyDate.setHours(0, 0, 0, 0);
                return propertyDate >= fromDate;
            });
        }

        // Filter by date to
        if (filters.dateTo) {
            const toDate = new Date(filters.dateTo);
            toDate.setHours(23, 59, 59, 999);
            result = result.filter(property => {
                const propertyDate = new Date(property.dateAdded);
                return propertyDate <= toDate;
            });
        }

        // Update the results
        setFilteredProps(result);
        setResultCount(result.length);
        setHasSearched(true);
    }

    return (
        <div className="container search-page-layout">
            {/* Filters on the left */}
            <aside className="sidebar-left">
                <SearchFilter 
                    filters={filters} 
                    setFilters={setFilters} 
                    handleSearch={handleSearch} 
                />
            </aside>
            
            {/* Property cards in the middle */}
            <main className="results-section">
                <div className="results-header">
                    <h2>Properties for Sale</h2>
                    <p className="results-count">
                        {hasSearched 
                            ? `${resultCount} ${resultCount === 1 ? 'property' : 'properties'} found`
                            : `Showing all ${resultCount} properties`
                        }
                    </p>
                </div>
                
                {/* Show property cards */}
                <div className="results-grid">
                    {filteredProps.length > 0 ? (
                        filteredProps.map(property => (
                            <PropertyCard key={property.id} property={property} />
                        ))
                    ) : (
                        <div className="no-results">
                            <div className="no-results-icon">🏠</div>
                            <h3>No properties found</h3>
                            <p>Try adjusting your search criteria to find more properties.</p>
                        </div>
                    )}
                </div>
            </main>

            {/* Favorites on the right */}
            <aside className="sidebar-right">
                <FavoritesList />
            </aside>
        </div>
    );
}

export default SearchPage;