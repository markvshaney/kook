/**
 * Example Test File
 * 
 * This file demonstrates how to write tests using Jest and TypeScript.
 * It shows different testing techniques and best practices.
 */

import { describe, expect, jest, test } from '@jest/globals';

// Define specific types to avoid 'any'
interface MockData {
  id: number;
  name: string;
}

// Mock fetchData function
const fetchData = async (): Promise<MockData> => {
  return { id: 1, name: 'Test' };
};

// Mock functions for testing
function calculateTax(amount: number): number {
  return amount * 0.1;
}

function calculateTotal(amount: number, taxFunction: (amount: number) => number): number {
  return amount + taxFunction(amount);
}

// A simple utility function to test
function formatNumber(num: number): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Another utility function to test
function classifyNumber(num: number): string {
    if (num > 0) return 'positive';
    if (num < 0) return 'negative';
    return 'zero';
}

describe('Number utilities', () => {
    test('formatNumber formats numbers with commas', () => {
        expect(formatNumber(1000)).toBe('1,000');
        expect(formatNumber(1000000)).toBe('1,000,000');
        expect(formatNumber(0)).toBe('0');
        expect(formatNumber(-1000)).toBe('-1,000');
    });

    test('classifyNumber correctly classifies numbers', () => {
        expect(classifyNumber(5)).toBe('positive');
        expect(classifyNumber(-5)).toBe('negative');
        expect(classifyNumber(0)).toBe('zero');
    });

    test('formatNumber(1000) should return 1,000', () => {
        const result = formatNumber(1000);
        expect(result).toBe('1,000');
    });

    test('formatNumber(1000000) should return 1,000,000', () => {
        const result = formatNumber(1000000);
        expect(result).toBe('1,000,000');
    });

    test('formatNumber(0) should return 0', () => {
        const result = formatNumber(0);
        expect(result).toBe('0');
    });

    test('formatNumber(-1000) should return -1,000', () => {
        const result = formatNumber(-1000);
        expect(result).toBe('-1,000');
    });
});

// Testing asynchronous functionality
describe('Asynchronous tests', () => {
    test('fetchData returns data', async () => {
        // Define a local fetchData function for this test
        async function fetchData(): Promise<string> {
            // Simulate an API call
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve('data');
                }, 100);
            });
        }

        const data = await fetchData();
        expect(data).toBe('data');
    });

    test('fetchData resolves to data', async () => {
        // Define and use fetchData only in this test
        const fetchData = jest.fn().mockResolvedValue('data');
        await expect(fetchData()).resolves.toBe('data');
    });
});

// Testing with mocks
describe('Function mocking', () => {
    test('calculateTotal calls calculateTax and adds the result', () => {
        // Set up global space for test
        // Use properly typed functions for the test
        const calculateTax = jest.fn((amount: number): number => {
            return amount * 0.1;
        });

        function calculateTotal(amount: number, taxFn: (val: number) => number): number {
            return amount + taxFn(amount);
        }

        const total = calculateTotal(100, calculateTax);
        
        expect(calculateTax).toHaveBeenCalledWith(100);
        expect(total).toBe(110);
    });
}); 