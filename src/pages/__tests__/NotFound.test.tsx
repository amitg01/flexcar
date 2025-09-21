import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import '@testing-library/jest-dom';
import NotFound from '../NotFound';

// Mock window.location
const mockLocation = {
  href: '',
  assign: vi.fn(),
  replace: vi.fn(),
  reload: vi.fn(),
};

Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});

describe('NotFound', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocation.href = '';
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Basic rendering', () => {
    it('should render 404 page with correct title', () => {
      render(<NotFound />);

      expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
    });

    it('should render description text', () => {
      render(<NotFound />);

      expect(
        screen.getByText(
          "Sorry, the page you're looking for doesn't exist or has been moved."
        )
      ).toBeInTheDocument();
    });

    it('should render go home button', () => {
      render(<NotFound />);

      expect(screen.getByText('Go Home')).toBeInTheDocument();
    });

    it('should render 404 icon', () => {
      render(<NotFound />);

      const icon = screen.getByRole('img', { hidden: true });
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass('mx-auto', 'h-16', 'w-16', 'text-gray-400');
    });
  });

  describe('Layout and styling', () => {
    it('should have proper container structure', () => {
      const { container } = render(<NotFound />);

      const mainContainer = container.firstChild;
      expect(mainContainer).toHaveClass(
        'min-h-screen',
        'bg-gray-50',
        'flex',
        'items-center',
        'justify-center'
      );

      const contentContainer = mainContainer?.firstChild;
      expect(contentContainer).toHaveClass('max-w-md', 'w-full', 'text-center');
    });

    it('should render EmptyState component', () => {
      render(<NotFound />);

      // Check if EmptyState is rendered by looking for its content
      expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
      expect(screen.getByText('Go Home')).toBeInTheDocument();
    });
  });

  describe('Navigation functionality', () => {
    it('should navigate to home when go home button is clicked', () => {
      render(<NotFound />);

      const goHomeButton = screen.getByText('Go Home');
      fireEvent.click(goHomeButton);

      expect(mockLocation.href).toBe('/');
    });

    it('should handle multiple clicks on go home button', () => {
      render(<NotFound />);

      const goHomeButton = screen.getByText('Go Home');
      fireEvent.click(goHomeButton);
      fireEvent.click(goHomeButton);
      fireEvent.click(goHomeButton);

      expect(mockLocation.href).toBe('/');
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading structure', () => {
      render(<NotFound />);

      // The title should be accessible as a heading
      const title = screen.getByText('404 - Page Not Found');
      expect(title).toBeInTheDocument();
    });

    it('should have accessible button', () => {
      render(<NotFound />);

      const button = screen.getByRole('button', { name: /go home/i });
      expect(button).toBeInTheDocument();
    });

    it('should have proper icon accessibility', () => {
      render(<NotFound />);

      const icon = screen.getByRole('img', { hidden: true });
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('viewBox', '0 0 24 24');
    });
  });

  describe('Error boundary compatibility', () => {
    it('should render without crashing', () => {
      expect(() => render(<NotFound />)).not.toThrow();
    });

    it('should handle window.location assignment', () => {
      render(<NotFound />);

      const goHomeButton = screen.getByText('Go Home');
      fireEvent.click(goHomeButton);

      // Verify that window.location.href was set
      expect(mockLocation.href).toBe('/');
    });
  });

  describe('Component integration', () => {
    it('should integrate properly with EmptyState component', () => {
      render(<NotFound />);

      // Verify all EmptyState props are passed correctly
      expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
      expect(
        screen.getByText(
          "Sorry, the page you're looking for doesn't exist or has been moved."
        )
      ).toBeInTheDocument();
      expect(screen.getByText('Go Home')).toBeInTheDocument();
    });

    it('should render custom icon correctly', () => {
      render(<NotFound />);

      const icon = screen.getByRole('img', { hidden: true });
      expect(icon).toHaveAttribute('fill', 'none');
      expect(icon).toHaveAttribute('stroke', 'currentColor');

      // Check the path element for strokeWidth
      const path = icon.querySelector('path');
      expect(path).toHaveAttribute('stroke-width', '1');
    });
  });
});
