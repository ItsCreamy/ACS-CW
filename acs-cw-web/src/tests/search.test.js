/**
 * Search Functionality Tests
 */

import propertiesData from '../data/properties.json';

// Search function - filters properties based on criteria
const searchProperties = (properties, filters) => {
    let result = [...properties];

    if (filters.type && filters.type !== 'any') {
        result = result.filter(p => p.type.toLowerCase() === filters.type.toLowerCase());
    }

    if (filters.minPrice) {
        result = result.filter(p => p.price >= filters.minPrice);
    }

    if (filters.maxPrice) {
        result = result.filter(p => p.price <= filters.maxPrice);
    }

    return result;
};

describe('Search Functionality', () => {
    test('should filter properties by type House', () => {
        const filters = { type: 'House' };
        const results = searchProperties(propertiesData, filters);

        expect(results.length).toBeGreaterThan(0);
        results.forEach(p => expect(p.type).toBe('House'));
    });

    test('should filter properties by price range', () => {
        const filters = { minPrice: 300000, maxPrice: 500000 };
        const results = searchProperties(propertiesData, filters);

        expect(results.length).toBeGreaterThan(0);
        results.forEach(p => {
            expect(p.price).toBeGreaterThanOrEqual(300000);
            expect(p.price).toBeLessThanOrEqual(500000);
        });
    });
});
