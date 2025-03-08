/**
 * Button Component Test
 * 
 * This file demonstrates how to test React components using React Testing Library.
 * It shows different testing techniques for UI components.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// A simple Button component to test
const Button: React.FC<{
    onClick?: () => void;
    disabled?: boolean;
    children: React.ReactNode;
}> = ({ onClick, disabled = false, children }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`px-4 py-2 rounded ${disabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                }`}
        >
            {children}
        </button>
    );
};

// Test suite for the Button component
describe('Button Component', () => {
    // Test rendering
    test('renders the button with text', () => {
        render(<Button>Click me</Button>);

        // Find the button by its text content
        const buttonElement = screen.getByText('Click me');

        // Assert the button is in the document
        expect(buttonElement).toBeInTheDocument();

        // Assert the button is not disabled
        expect(buttonElement).not.toBeDisabled();
    });

    // Test disabled state
    test('renders a disabled button when disabled prop is true', () => {
        render(<Button disabled>Disabled Button</Button>);

        const buttonElement = screen.getByText('Disabled Button');

        // Assert the button is disabled
        expect(buttonElement).toBeDisabled();

        // Assert the button has the correct classes for disabled state
        expect(buttonElement).toHaveClass('bg-gray-300');
        expect(buttonElement).toHaveClass('cursor-not-allowed');
    });

    // Test click handler
    test('calls onClick handler when clicked', () => {
        // Create a mock function for the onClick handler
        const handleClick = jest.fn();

        render(<Button onClick={handleClick}>Clickable Button</Button>);

        const buttonElement = screen.getByText('Clickable Button');

        // Simulate a click on the button
        fireEvent.click(buttonElement);

        // Assert that the onClick handler was called
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    // Test that disabled button doesn't trigger onClick
    test('does not call onClick when button is disabled', () => {
        const handleClick = jest.fn();

        render(
            <Button onClick={handleClick} disabled>
                Disabled Button
            </Button>
        );

        const buttonElement = screen.getByText('Disabled Button');

        // Attempt to click the disabled button
        fireEvent.click(buttonElement);

        // Assert that the onClick handler was not called
        expect(handleClick).not.toHaveBeenCalled();
    });
}); 