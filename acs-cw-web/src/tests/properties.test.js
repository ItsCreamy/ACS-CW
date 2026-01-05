/**
 * Properties Data Tests
 */

import propertiesData from '../data/properties.json';

describe('Properties Data', () => {
    test('should have 7 properties with required fields', () => {
        expect(propertiesData.length).toBe(7);

        propertiesData.forEach(property => {
            expect(property).toHaveProperty('id');
            expect(property).toHaveProperty('type');
            expect(property).toHaveProperty('price');
            expect(property).toHaveProperty('bedrooms');
            expect(property).toHaveProperty('images');
        });
    });

    test('should have both House and Flat types', () => {
        const types = [...new Set(propertiesData.map(p => p.type))];
        expect(types).toContain('House');
        expect(types).toContain('Flat');
    });
});
