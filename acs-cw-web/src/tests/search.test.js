/**
 * Search Functionality Tests
 * 
 * Tests the property search logic including:
 * - Filtering by property type
 * - Filtering by price range
 * - Filtering by number of bedrooms
 * - Filtering by date added
 * - Filtering by postcode
 * - Combining multiple filters
 */

import propertiesData from '../data/properties.json';

/**
 * Search function - mirrors the logic in SearchPage.jsx
 * This is extracted for unit testing purposes
 */
const searchProperties = (properties, filters) => {
    let result = [...properties];

    // Filter by property type
    if (filters.type && filters.type !== 'any') {
        result = result.filter(property =>
            property.type.toLowerCase() === filters.type.toLowerCase()
        );
    }

    // Filter by minimum price
    if (filters.minPrice !== undefined && filters.minPrice !== null) {
        result = result.filter(property =>
            property.price >= filters.minPrice
        );
    }

    // Filter by maximum price
    if (filters.maxPrice !== undefined && filters.maxPrice !== null) {
        result = result.filter(property =>
            property.price <= filters.maxPrice
        );
    }

    // Filter by minimum bedrooms
    if (filters.minBeds !== undefined && filters.minBeds !== null && filters.minBeds > 0) {
        result = result.filter(property =>
            property.bedrooms >= filters.minBeds
        );
    }

    // Filter by maximum bedrooms
    if (filters.maxBeds !== undefined && filters.maxBeds !== null && filters.maxBeds < 10) {
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

    // Filter by date added - from date
    if (filters.dateFrom) {
        const fromDate = new Date(filters.dateFrom);
        fromDate.setHours(0, 0, 0, 0);
        result = result.filter(property => {
            const propertyDate = new Date(property.dateAdded);
            propertyDate.setHours(0, 0, 0, 0);
            return propertyDate >= fromDate;
        });
    }

    // Filter by date added - to date
    if (filters.dateTo) {
        const toDate = new Date(filters.dateTo);
        toDate.setHours(23, 59, 59, 999);
        result = result.filter(property => {
            const propertyDate = new Date(property.dateAdded);
            return propertyDate <= toDate;
        });
    }

    return result;
};

describe('Search Functionality', () => {
    // Default filters with no restrictions
    const defaultFilters = {
        type: 'any',
        minPrice: 100000,
        maxPrice: 1000000,
        minBeds: 0,
        maxBeds: 10,
        dateFrom: null,
        dateTo: null,
        postcode: ''
    };

    describe('Filter by Property Type', () => {
        test('should return all properties when type is "any"', () => {
            const result = searchProperties(propertiesData, { ...defaultFilters, type: 'any' });
            expect(result.length).toBe(propertiesData.length);
        });

        test('should filter properties by type "House"', () => {
            const result = searchProperties(propertiesData, { ...defaultFilters, type: 'House' });
            expect(result.every(p => p.type === 'House')).toBe(true);
            expect(result.length).toBeGreaterThan(0);
        });

        test('should filter properties by type "Flat"', () => {
            const result = searchProperties(propertiesData, { ...defaultFilters, type: 'Flat' });
            expect(result.every(p => p.type === 'Flat')).toBe(true);
            expect(result.length).toBeGreaterThan(0);
        });

        test('should be case-insensitive for type filter', () => {
            const result1 = searchProperties(propertiesData, { ...defaultFilters, type: 'house' });
            const result2 = searchProperties(propertiesData, { ...defaultFilters, type: 'HOUSE' });
            expect(result1.length).toBe(result2.length);
        });
    });

    describe('Filter by Price Range', () => {
        test('should filter properties within price range', () => {
            const result = searchProperties(propertiesData, {
                ...defaultFilters,
                minPrice: 300000,
                maxPrice: 500000
            });
            expect(result.every(p => p.price >= 300000 && p.price <= 500000)).toBe(true);
        });

        test('should return no properties for impossible price range', () => {
            const result = searchProperties(propertiesData, {
                ...defaultFilters,
                minPrice: 10000000,
                maxPrice: 20000000
            });
            expect(result.length).toBe(0);
        });

        test('should handle exact price match', () => {
            const result = searchProperties(propertiesData, {
                ...defaultFilters,
                minPrice: 450000,
                maxPrice: 450000
            });
            expect(result.every(p => p.price === 450000)).toBe(true);
        });
    });

    describe('Filter by Bedrooms', () => {
        test('should filter properties with minimum bedrooms', () => {
            const result = searchProperties(propertiesData, {
                ...defaultFilters,
                minBeds: 4
            });
            expect(result.every(p => p.bedrooms >= 4)).toBe(true);
        });

        test('should filter properties with maximum bedrooms', () => {
            const result = searchProperties(propertiesData, {
                ...defaultFilters,
                maxBeds: 2
            });
            expect(result.every(p => p.bedrooms <= 2)).toBe(true);
        });

        test('should filter properties within bedroom range', () => {
            const result = searchProperties(propertiesData, {
                ...defaultFilters,
                minBeds: 2,
                maxBeds: 4
            });
            expect(result.every(p => p.bedrooms >= 2 && p.bedrooms <= 4)).toBe(true);
        });
    });

    describe('Filter by Postcode', () => {
        test('should filter properties by postcode BR1', () => {
            const result = searchProperties(propertiesData, {
                ...defaultFilters,
                postcode: 'BR1'
            });
            expect(result.every(p => p.postcode === 'BR1')).toBe(true);
            expect(result.length).toBeGreaterThan(0);
        });

        test('should filter properties by postcode NW1', () => {
            const result = searchProperties(propertiesData, {
                ...defaultFilters,
                postcode: 'NW1'
            });
            expect(result.every(p => p.postcode === 'NW1')).toBe(true);
        });

        test('should be case-insensitive for postcode filter', () => {
            const result1 = searchProperties(propertiesData, { ...defaultFilters, postcode: 'br1' });
            const result2 = searchProperties(propertiesData, { ...defaultFilters, postcode: 'BR1' });
            expect(result1.length).toBe(result2.length);
        });
    });

    describe('Filter by Date Added', () => {
        test('should filter properties added after a specific date', () => {
            const result = searchProperties(propertiesData, {
                ...defaultFilters,
                dateFrom: new Date('2025-11-01')
            });
            result.forEach(p => {
                expect(new Date(p.dateAdded) >= new Date('2025-11-01')).toBe(true);
            });
        });

        test('should filter properties added before a specific date', () => {
            const result = searchProperties(propertiesData, {
                ...defaultFilters,
                dateTo: new Date('2025-10-01')
            });
            result.forEach(p => {
                expect(new Date(p.dateAdded) <= new Date('2025-10-01')).toBe(true);
            });
        });

        test('should filter properties within date range', () => {
            const result = searchProperties(propertiesData, {
                ...defaultFilters,
                dateFrom: new Date('2025-10-01'),
                dateTo: new Date('2025-11-15')
            });
            result.forEach(p => {
                const date = new Date(p.dateAdded);
                expect(date >= new Date('2025-10-01') && date <= new Date('2025-11-15')).toBe(true);
            });
        });
    });

    describe('Multiple Criteria Search', () => {
        test('should filter by type AND price range', () => {
            const result = searchProperties(propertiesData, {
                ...defaultFilters,
                type: 'Flat',
                minPrice: 200000,
                maxPrice: 400000
            });
            expect(result.every(p =>
                p.type === 'Flat' &&
                p.price >= 200000 &&
                p.price <= 400000
            )).toBe(true);
        });

        test('should filter by type, price, AND bedrooms', () => {
            const result = searchProperties(propertiesData, {
                ...defaultFilters,
                type: 'House',
                minPrice: 400000,
                maxPrice: 700000,
                minBeds: 3
            });
            expect(result.every(p =>
                p.type === 'House' &&
                p.price >= 400000 &&
                p.price <= 700000 &&
                p.bedrooms >= 3
            )).toBe(true);
        });

        test('should filter by all five criteria simultaneously', () => {
            const result = searchProperties(propertiesData, {
                type: 'House',
                minPrice: 400000,
                maxPrice: 700000,
                minBeds: 3,
                maxBeds: 5,
                dateFrom: new Date('2025-09-01'),
                dateTo: new Date('2025-11-01'),
                postcode: 'BR1'
            });
            result.forEach(p => {
                expect(p.type).toBe('House');
                expect(p.price).toBeGreaterThanOrEqual(400000);
                expect(p.price).toBeLessThanOrEqual(700000);
                expect(p.bedrooms).toBeGreaterThanOrEqual(3);
                expect(p.bedrooms).toBeLessThanOrEqual(5);
                expect(p.postcode).toBe('BR1');
            });
        });
    });
});
