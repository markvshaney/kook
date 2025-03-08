/**
 * Jest Setup File
 *
 * This file runs before Jest tests and sets up:
 * - React Testing Library's jest-dom matchers
 * - Global test utilities and mocks
 * - Test environment configuration
 */

// Import React Testing Library's custom Jest matchers
require('@testing-library/jest-dom');

// Mock next/router
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
        prefetch: jest.fn(),
        back: jest.fn(),
        pathname: '/',
        query: {},
    }),
    usePathname: () => '/',
    useSearchParams: () => new URLSearchParams(),
}));

// Mock next/image
jest.mock('next/image', () => ({
    __esModule: true,
    default: (props) => {
        // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
        return <img {...props} />;
    },
}));

// Mock the Prisma client
jest.mock('@prisma/client', () => {
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
jest.mock('@supabase/supabase-js', () => {
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

// Set global testing timeouts if needed
jest.setTimeout(30000);

// Clean up after each test
afterEach(() => {
    jest.clearAllMocks();
}); 