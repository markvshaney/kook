/**
 * Example Test File
 * 
 * This file demonstrates how to write tests using Jest and TypeScript.
 * It shows different testing techniques and best practices.
 */

import { describe, expect, test } from '@jest/globals';

// A simple utility function to test
function formatNumber(num: number): string {
    return new Intl.NumberFormat().format(num);
}

// Another utility function with conditional logic
function classifyNumber(num: number): string {
    if (num > 0) return 'positive';
    if (num < 0) return 'negative';
    return 'zero';
}

// Example of grouping related tests
describe('Number utilities', () => {
    // Simple test case
    test('formatNumber formats numbers with commas', () => {
        expect(formatNumber(1000)).toBe('1,000');
        expect(formatNumber(1000000)).toBe('1,000,000');
        expect(formatNumber(0)).toBe('0');
    });

    // Test with multiple assertions
    test('classifyNumber correctly classifies numbers', () => {
        expect(classifyNumber(5)).toBe('positive');
        expect(classifyNumber(-5)).toBe('negative');
        expect(classifyNumber(0)).toBe('zero');
    });

    // Example of test.each for data-driven tests
    test.each([
        [1000, '1,000'],
        [1000000, '1,000,000'],
        [0, '0'],
        [-1000, '-1,000']
    ])('formatNumber(%i) should return %s', (input, expected) => {
        expect(formatNumber(input)).toBe(expected);
    });
});

// Example of how to test async functions
describe('Asynchronous tests', () => {
    // Async function to test
    async function fetchData(): Promise<string> {
        return new Promise((resolve) => {
            setTimeout(() => resolve('data'), 100);
        });
    }

    // Testing async function with async/await
    test('fetchData returns data', async () => {
        const data = await fetchData();
        expect(data).toBe('data');
    });

    // Alternative way to test async function with resolves
    test('fetchData resolves to data', () => {
        return expect(fetchData()).resolves.toBe('data');
    });
});

// Example of test mocking
describe('Function mocking', () => {
    // Define calculateTax globally
    global.calculateTax = function calculateTax(amount: number, taxRate: number): number {
        return amount * taxRate;
    };

    // Function that uses the function we want to mock
    function calculateTotal(amount: number, taxRate: number): number {
        return amount + (global as any).calculateTax(amount, taxRate);
    }

    test('calculateTotal calls calculateTax and adds the result', () => {
        // Create a spy on the original function
        const calculateTaxSpy = jest.spyOn(global, 'calculateTax' as any).mockReturnValue(50);

        // Call the function that uses our mocked function
        const total = calculateTotal(100, 0.2);

        // Verify the mock was called with correct arguments
        expect(calculateTaxSpy).toHaveBeenCalledWith(100, 0.2);

        // Verify the result uses the mocked return value
        expect(total).toBe(150);

        // Clean up
        calculateTaxSpy.mockRestore();
    });
}); 