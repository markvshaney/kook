/**
 * Jest Configuration
 *
 * Comprehensive configuration for testing Next.js applications with TypeScript.
 * Includes specific setup for:
 * - TypeScript support via ts-jest
 * - React Testing Library setup
 * - Module path aliases
 * - Test environment configuration
 */

const nextJest = require('next/jest');

// Create a custom Next.js configuration
const createJestConfig = nextJest({
    // Path to your Next.js app
    dir: './',
});

// Base Jest configuration
const customJestConfig = {
    // Set the test environment - jsdom simulates a DOM environment (browser-like)
    testEnvironment: 'jsdom',

    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage',

    // Files to collect coverage from
    collectCoverageFrom: [
        'lib/**/*.{js,jsx,ts,tsx}',
        'app/**/*.{js,jsx,ts,tsx}',
        '!**/*.d.ts',
        '!**/node_modules/**',
        '!**/.next/**',
    ],

    // Files to ignore in coverage reports
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/__tests__/',
        '/coverage/',
        '/.next/',
    ],

    // Minimum coverage thresholds (can be adjusted as needed)
    coverageThreshold: {
        global: {
            statements: 70,
            branches: 70,
            functions: 70,
            lines: 70,
        },
    },

    // Module name mapper for path aliases
    moduleNameMapper: {
        // Handle CSS imports (with CSS modules)
        '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
        // Handle CSS imports (without CSS modules)
        '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
        // Handle image imports
        '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': '<rootDir>/__mocks__/fileMock.js',
    },

    // Setup files to run before tests
    setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],

    // Display verbose output
    verbose: true,

    // Clear mocks between tests
    clearMocks: true,
};

// Export the configured Jest setup
module.exports = createJestConfig(customJestConfig); 