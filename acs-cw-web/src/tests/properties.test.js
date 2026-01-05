/**
 * Properties Data Tests
 * 
 * Tests the properties JSON data to ensure:
 * - Correct number of properties
 * - Required fields exist
 * - Data variety for search functionality
 * - Image requirements (6-8 per property)
 */

import propertiesData from '../data/properties.json';

describe('Properties Data', () => {
    describe('Data Structure', () => {
        test('should have exactly 7 properties', () => {
            expect(propertiesData.length).toBe(7);
        });

        test('each property should have all required fields', () => {
            const requiredFields = [
                'id', 'type', 'price', 'bedrooms',
                'dateAdded', 'postcode', 'location',
                'description', 'longDescription', 'images',
                'floorPlan', 'mapUrl'
            ];

            propertiesData.forEach((property) => {
                requiredFields.forEach(field => {
                    expect(property).toHaveProperty(field);
                });
            });
        });

        test('each property should have unique ID', () => {
            const ids = propertiesData.map(p => p.id);
            const uniqueIds = [...new Set(ids)];
            expect(ids.length).toBe(uniqueIds.length);
        });
    });

    describe('Property Type Variety', () => {
        test('should have both House and Flat property types', () => {
            const types = [...new Set(propertiesData.map(p => p.type))];
            expect(types).toContain('House');
            expect(types).toContain('Flat');
        });

        test('should have multiple properties of each type', () => {
            const houses = propertiesData.filter(p => p.type === 'House');
            const flats = propertiesData.filter(p => p.type === 'Flat');
            expect(houses.length).toBeGreaterThan(1);
            expect(flats.length).toBeGreaterThan(1);
        });
    });

    describe('Price Variety', () => {
        test('should have properties across different price ranges', () => {
            const prices = propertiesData.map(p => p.price);
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);

            // Should have significant price variety (at least 200k range)
            expect(maxPrice - minPrice).toBeGreaterThan(200000);
        });

        test('all prices should be valid numbers', () => {
            propertiesData.forEach(property => {
                expect(typeof property.price).toBe('number');
                expect(property.price).toBeGreaterThan(0);
            });
        });
    });

    describe('Bedroom Variety', () => {
        test('should have properties with different bedroom counts', () => {
            const bedroomCounts = [...new Set(propertiesData.map(p => p.bedrooms))];
            // Should have at least 4 different bedroom counts
            expect(bedroomCounts.length).toBeGreaterThanOrEqual(4);
        });

        test('should have properties ranging from 1 to 6+ bedrooms', () => {
            const bedrooms = propertiesData.map(p => p.bedrooms);
            expect(Math.min(...bedrooms)).toBeLessThanOrEqual(2);
            expect(Math.max(...bedrooms)).toBeGreaterThanOrEqual(5);
        });
    });

    describe('Postcode Variety', () => {
        test('should have properties in multiple postcode areas', () => {
            const postcodes = [...new Set(propertiesData.map(p => p.postcode))];
            // Should have at least 3 different postcode areas
            expect(postcodes.length).toBeGreaterThanOrEqual(3);
        });

        test('should include expected postcodes', () => {
            const postcodes = propertiesData.map(p => p.postcode);
            expect(postcodes).toContain('BR1');
            expect(postcodes).toContain('NW1');
            expect(postcodes).toContain('SE1');
        });
    });

    describe('Date Variety', () => {
        test('should have properties added on different dates', () => {
            const dates = [...new Set(propertiesData.map(p => p.dateAdded))];
            // Should have at least 5 different dates
            expect(dates.length).toBeGreaterThanOrEqual(5);
        });

        test('all dates should be valid date strings', () => {
            propertiesData.forEach(property => {
                const date = new Date(property.dateAdded);
                expect(date.toString()).not.toBe('Invalid Date');
            });
        });
    });

    describe('Images', () => {
        test('each property should have at least 6 images', () => {
            propertiesData.forEach(property => {
                expect(property.images.length).toBeGreaterThanOrEqual(6);
            });
        });

        test('each property should have at most 8 images', () => {
            propertiesData.forEach(property => {
                expect(property.images.length).toBeLessThanOrEqual(8);
            });
        });

        test('all image URLs should be valid strings', () => {
            propertiesData.forEach(property => {
                property.images.forEach(img => {
                    expect(typeof img).toBe('string');
                    expect(img.length).toBeGreaterThan(0);
                });
            });
        });

        test('each property should have a floor plan', () => {
            propertiesData.forEach(property => {
                expect(typeof property.floorPlan).toBe('string');
                expect(property.floorPlan.length).toBeGreaterThan(0);
            });
        });
    });

    describe('Content Quality', () => {
        test('each property should have a non-empty description', () => {
            propertiesData.forEach(property => {
                expect(property.description.length).toBeGreaterThan(20);
            });
        });

        test('each property should have a detailed long description', () => {
            propertiesData.forEach(property => {
                expect(property.longDescription.length).toBeGreaterThan(100);
            });
        });

        test('each property should have a location', () => {
            propertiesData.forEach(property => {
                expect(property.location.length).toBeGreaterThan(0);
            });
        });
    });
});
