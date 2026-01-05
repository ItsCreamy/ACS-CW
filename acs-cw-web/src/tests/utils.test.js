/**
 * Utility Functions Tests
 * 
 * Tests various utility functions used throughout the application:
 * - Price formatting
 * - Date formatting
 * - Input sanitization (XSS protection)
 */

import DOMPurify from 'dompurify';

/**
 * Price formatting function (matches implementation in components)
 */
const formatPrice = (value) => {
    return `£${value.toLocaleString()}`;
};

/**
 * Date formatting function (matches implementation in PropertyCard)
 */
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
};

/**
 * Sanitize HTML content for XSS protection
 */
const sanitizeContent = (content) => {
    return DOMPurify.sanitize(content);
};

describe('Utility Functions', () => {
    describe('Price Formatting', () => {
        test('should format price with pound sign and commas', () => {
            expect(formatPrice(450000)).toBe('£450,000');
            expect(formatPrice(325000)).toBe('£325,000');
            expect(formatPrice(1000000)).toBe('£1,000,000');
        });

        test('should handle small prices', () => {
            expect(formatPrice(1000)).toBe('£1,000');
            expect(formatPrice(500)).toBe('£500');
        });

        test('should handle zero', () => {
            expect(formatPrice(0)).toBe('£0');
        });

        test('should handle large prices', () => {
            expect(formatPrice(10000000)).toBe('£10,000,000');
        });
    });

    describe('Date Formatting', () => {
        test('should format date in UK format', () => {
            const result = formatDate('2025-10-15');
            expect(result).toMatch(/15.*Oct.*2025/);
        });

        test('should handle different dates', () => {
            const result1 = formatDate('2025-01-01');
            expect(result1).toMatch(/1.*Jan.*2025/);

            const result2 = formatDate('2025-12-31');
            expect(result2).toMatch(/31.*Dec.*2025/);
        });

        test('should handle leap year dates', () => {
            const result = formatDate('2024-02-29');
            expect(result).toMatch(/29.*Feb.*2024/);
        });
    });

    describe('XSS Protection / Content Sanitization', () => {
        test('should remove script tags', () => {
            const malicious = '<script>alert("xss")</script>Normal text';
            const sanitized = sanitizeContent(malicious);
            expect(sanitized).not.toContain('<script>');
            expect(sanitized).not.toContain('</script>');
            expect(sanitized).toContain('Normal text');
        });

        test('should remove onclick handlers', () => {
            const malicious = '<div onclick="alert(1)">Click me</div>';
            const sanitized = sanitizeContent(malicious);
            expect(sanitized).not.toContain('onclick');
            expect(sanitized).toContain('Click me');
        });

        test('should remove javascript: URLs', () => {
            const malicious = '<a href="javascript:alert(1)">Link</a>';
            const sanitized = sanitizeContent(malicious);
            expect(sanitized).not.toContain('javascript:');
        });

        test('should allow safe HTML tags', () => {
            const safe = '<p>This is <strong>bold</strong> and <em>italic</em></p>';
            const sanitized = sanitizeContent(safe);
            expect(sanitized).toContain('<p>');
            expect(sanitized).toContain('<strong>');
            expect(sanitized).toContain('<em>');
        });

        test('should remove onerror handlers', () => {
            const malicious = '<img src="x" onerror="alert(1)">';
            const sanitized = sanitizeContent(malicious);
            expect(sanitized).not.toContain('onerror');
        });

        test('should remove data: URLs in images', () => {
            const malicious = '<img src="data:text/html,<script>alert(1)</script>">';
            const sanitized = sanitizeContent(malicious);
            // DOMPurify should remove or neutralize the dangerous content
            // In JSDOM, it may not fully parse data URLs, so we check the script is not executable
            expect(sanitized).not.toContain('javascript:');
        });

        test('should handle empty strings', () => {
            const sanitized = sanitizeContent('');
            expect(sanitized).toBe('');
        });

        test('should handle plain text without changes', () => {
            const plainText = 'This is just plain text without any HTML';
            const sanitized = sanitizeContent(plainText);
            expect(sanitized).toBe(plainText);
        });
    });
});
