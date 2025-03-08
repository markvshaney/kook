/**
 * Jest Setup File
 *
 * This file runs before Jest tests and sets up:
 * - React Testing Library's jest-dom matchers
 * - Global test utilities and mocks
 * - Test environment configuration
 */

// Import React Testing Library's custom Jest matchers
import "@testing-library/jest-dom";

// Import Jest globals
import { jest, afterEach } from "@jest/globals";

// Mock web standard objects that might be used in Next.js
if (typeof globalThis.Request === "undefined") {
  globalThis.Request = class Request {};
}
if (typeof globalThis.Response === "undefined") {
  globalThis.Response = class Response {};
}
if (typeof globalThis.Headers === "undefined") {
  globalThis.Headers = class Headers {};
}

// Mock next/router
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    pathname: "/",
    query: {},
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: function Image(props) {
    // Return a plain img object without JSX syntax
    return Object.assign(document.createElement("img"), props);
  },
}));

// Mock the Prisma client
jest.mock("@prisma/client", () => {
  const mockPrismaClient = {
    // Add mock implementations for Prisma client methods as needed
    user: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    // Add other models as needed
    $connect: jest.fn(),
    $disconnect: jest.fn(),
  };

  return {
    PrismaClient: jest.fn(() => mockPrismaClient),
  };
});

// Mock Supabase
jest.mock("@supabase/supabase-js", () => {
  const mockSupabaseClient = {
    auth: {
      signIn: jest.fn(),
      signUp: jest.fn(),
      signOut: jest.fn(),
    },
    from: jest.fn().mockReturnValue({
      select: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      delete: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn(),
    }),
    rpc: jest.fn().mockReturnValue({
      data: null,
      error: null,
    }),
  };

  return {
    createClient: jest.fn(() => mockSupabaseClient),
  };
});

// Mock NextResponse for Next.js 14
jest.mock("next/server", () => {
  return {
    NextResponse: {
      json: jest.fn().mockImplementation((body, options) => {
        return {
          data: body,
          options: options || { status: 200 },
        };
      }),
    },
  };
});

// Set global testing timeouts if needed
jest.setTimeout(30000);

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
});
