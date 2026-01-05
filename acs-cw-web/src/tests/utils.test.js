/**
 * Utility Functions Tests
 */

import DOMPurify from 'dompurify';

// Price formatting function
const formatPrice = (value) => {
    return `£${value.toLocaleString()}`;
};

// Sanitize HTML content for XSS protection
const sanitizeContent = (content) => {
    return DOMPurify.sanitize(content);
};

describe('Utility Functions', () => {
    test('should format price with pound sign and commas', () => {
        expect(formatPrice(450000)).toBe('£450,000');
        expect(formatPrice(1000000)).toBe('£1,000,000');
    });

    test('should remove malicious script tags from content', () => {
        const malicious = '<script>alert("xss")</script>Safe text';
        const sanitized = sanitizeContent(malicious);

        expect(sanitized).not.toContain('<script>');
        expect(sanitized).toContain('Safe text');
    });
});
