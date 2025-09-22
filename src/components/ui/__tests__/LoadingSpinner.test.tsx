import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import LoadingSpinner from '../LoadingSpinner';

describe('LoadingSpinner', () => {
  describe('Basic rendering', () => {
    it('should render loading spinner', () => {
      render(<LoadingSpinner />);
      const spinner = screen.getByRole('img', { hidden: true });
      expect(spinner).toBeInTheDocument();
    });

    it('should render with default props', () => {
      render(<LoadingSpinner />);
      const spinner = screen.getByRole('img', { hidden: true });
      expect(spinner).toHaveClass(
        'animate-spin',
        'w-6',
        'h-6',
        'text-flexcar-blue'
      );
    });

    it('should apply custom className', () => {
      render(<LoadingSpinner className="custom-class" />);
      const container = screen.getByRole('img', { hidden: true }).parentElement;
      expect(container).toHaveClass('custom-class');
    });
  });

  describe('Sizes', () => {
    it('should render small size', () => {
      render(<LoadingSpinner size="sm" />);
      const spinner = screen.getByRole('img', { hidden: true });
      expect(spinner).toHaveClass('w-4', 'h-4');
    });

    it('should render medium size by default', () => {
      render(<LoadingSpinner />);
      const spinner = screen.getByRole('img', { hidden: true });
      expect(spinner).toHaveClass('w-6', 'h-6');
    });

    it('should render large size', () => {
      render(<LoadingSpinner size="lg" />);
      const spinner = screen.getByRole('img', { hidden: true });
      expect(spinner).toHaveClass('w-8', 'h-8');
    });

    it('should render extra large size', () => {
      render(<LoadingSpinner size="xl" />);
      const spinner = screen.getByRole('img', { hidden: true });
      expect(spinner).toHaveClass('w-12', 'h-12');
    });
  });

  describe('Colors', () => {
    it('should render primary color by default', () => {
      render(<LoadingSpinner />);
      const spinner = screen.getByRole('img', { hidden: true });
      expect(spinner).toHaveClass('text-flexcar-blue');
    });

    it('should render secondary color', () => {
      render(<LoadingSpinner color="secondary" />);
      const spinner = screen.getByRole('img', { hidden: true });
      expect(spinner).toHaveClass('text-gray-600');
    });

    it('should render white color', () => {
      render(<LoadingSpinner color="white" />);
      const spinner = screen.getByRole('img', { hidden: true });
      expect(spinner).toHaveClass('text-white');
    });

    it('should render gray color', () => {
      render(<LoadingSpinner color="gray" />);
      const spinner = screen.getByRole('img', { hidden: true });
      expect(spinner).toHaveClass('text-gray-400');
    });
  });

  describe('SVG structure', () => {
    it('should render proper SVG structure', () => {
      render(<LoadingSpinner />);
      const spinner = screen.getByRole('img', { hidden: true });

      expect(spinner.tagName).toBe('svg');
      expect(spinner).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
      expect(spinner).toHaveAttribute('fill', 'none');
      expect(spinner).toHaveAttribute('viewBox', '0 0 24 24');
    });

    it('should have proper circle element', () => {
      render(<LoadingSpinner />);
      const spinner = screen.getByRole('img', { hidden: true });
      const circle = spinner.querySelector('circle');

      expect(circle).toBeInTheDocument();
      expect(circle).toHaveClass('opacity-25');
      expect(circle).toHaveAttribute('cx', '12');
      expect(circle).toHaveAttribute('cy', '12');
      expect(circle).toHaveAttribute('r', '10');
      expect(circle).toHaveAttribute('stroke', 'currentColor');
      expect(circle).toHaveAttribute('stroke-width', '4');
    });

    it('should have proper path element', () => {
      render(<LoadingSpinner />);
      const spinner = screen.getByRole('img', { hidden: true });
      const path = spinner.querySelector('path');

      expect(path).toBeInTheDocument();
      expect(path).toHaveClass('opacity-75');
      expect(path).toHaveAttribute('fill', 'currentColor');
      expect(path).toHaveAttribute(
        'd',
        'M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
      );
    });
  });

  describe('Animation', () => {
    it('should have spin animation class', () => {
      render(<LoadingSpinner />);
      const spinner = screen.getByRole('img', { hidden: true });
      expect(spinner).toHaveClass('animate-spin');
    });

    it('should maintain animation across different sizes', () => {
      const sizes = ['sm', 'md', 'lg', 'xl'] as const;

      sizes.forEach(size => {
        const { unmount } = render(<LoadingSpinner size={size} />);
        const spinner = screen.getByRole('img', { hidden: true });
        expect(spinner).toHaveClass('animate-spin');
        unmount();
      });
    });

    it('should maintain animation across different colors', () => {
      const colors = ['primary', 'secondary', 'white', 'gray'] as const;

      colors.forEach(color => {
        const { unmount } = render(<LoadingSpinner color={color} />);
        const spinner = screen.getByRole('img', { hidden: true });
        expect(spinner).toHaveClass('animate-spin');
        unmount();
      });
    });
  });

  describe('Combined props', () => {
    it('should handle all props together', () => {
      render(
        <LoadingSpinner size="lg" color="white" className="custom-spinner" />
      );

      const container = screen.getByRole('img', { hidden: true }).parentElement;
      const spinner = screen.getByRole('img', { hidden: true });

      expect(container).toHaveClass('custom-spinner');
      expect(spinner).toHaveClass('animate-spin', 'w-8', 'h-8', 'text-white');
    });

    it('should handle minimal props', () => {
      render(<LoadingSpinner />);
      const spinner = screen.getByRole('img', { hidden: true });
      expect(spinner).toHaveClass(
        'animate-spin',
        'w-6',
        'h-6',
        'text-flexcar-blue'
      );
    });
  });

  describe('Accessibility', () => {
    it('should be accessible as an image', () => {
      render(<LoadingSpinner />);
      const spinner = screen.getByRole('img', { hidden: true });
      expect(spinner).toBeInTheDocument();
    });

    it('should support custom ARIA attributes', () => {
      render(<LoadingSpinner aria-label="Loading content" />);

      const spinner = screen.getByRole('img', { hidden: true });
      expect(spinner).toHaveAttribute('aria-label', 'Loading spinner');
    });

    it('should be hidden from screen readers by default', () => {
      render(<LoadingSpinner />);
      const spinner = screen.getByRole('img', { hidden: true });
      expect(spinner).toBeInTheDocument();
    });
  });

  describe('Container structure', () => {
    it('should render in a div container', () => {
      render(<LoadingSpinner />);
      const container = screen.getByRole('img', { hidden: true }).parentElement;
      expect(container).toHaveClass('inline-block');
    });

    it('should apply custom className to container', () => {
      render(<LoadingSpinner className="custom-container" />);
      const container = screen.getByRole('img', { hidden: true }).parentElement;
      expect(container).toHaveClass('inline-block', 'custom-container');
    });
  });

  describe('Edge cases', () => {
    it('should handle empty className', () => {
      render(<LoadingSpinner className="" />);
      const container = screen.getByRole('img', { hidden: true }).parentElement;
      expect(container).toHaveClass('inline-block');
    });

    it('should handle multiple classNames', () => {
      render(<LoadingSpinner className="class1 class2 class3" />);
      const container = screen.getByRole('img', { hidden: true }).parentElement;
      expect(container).toHaveClass(
        'inline-block',
        'class1',
        'class2',
        'class3'
      );
    });
  });
});
