// jest.config.mjs
// Remove unused imports
// import { env } from "node:process";
// import { createRequire } from "node:module";

/** @type {import('jest').Config} */
const config = {
  // Use jest-environment-jsdom for browser-like environment
  testEnvironment: "jsdom",

  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Collect coverage information
  collectCoverage: false,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // File extensions to consider as test files
  testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/.next/**",
    "!**/coverage/**",
  ],

  // Setup file after environment is setup
  setupFilesAfterEnv: ["<rootDir>/jest.setup.mjs"],

  // Transform files with SWC
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc: {
          transform: {
            react: {
              runtime: "automatic",
            },
          },
        },
      },
    ],
    "^.+\\.mjs$": [
      "@swc/jest",
      {
        jsc: {
          parser: {
            syntax: "ecmascript",
            jsx: true,
          },
          transform: {
            react: {
              runtime: "automatic",
            },
          },
        },
      },
    ],
  },

  // Module name mapper for paths and static assets
  moduleNameMapper: {
    // Handle CSS imports (with CSS modules)
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",

    // Handle CSS imports (without CSS modules)
    "^.+\\.(css|sass|scss)$": "<rootDir>/__mocks__/styleMock.mjs",

    // Handle image imports
    "^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$": "<rootDir>/__mocks__/fileMock.mjs",

    // Handle module aliases
    "^@/(.*)$": "<rootDir>/$1",
  },

  // Test timeout in milliseconds
  testTimeout: 10000,

  // Verbose output
  verbose: true,

  // Enable ESM support
  extensionsToTreatAsEsm: [".ts", ".tsx"],

  // Configure Jest to properly handle ESM
  moduleFileExtensions: ["js", "mjs", "cjs", "jsx", "ts", "tsx", "json", "node"],

  transformIgnorePatterns: ["/node_modules/(?!(@testing-library/jest-dom)/)"],
};

export default config;
