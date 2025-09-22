import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import Badge from '../Badge';

describe('Badge', () => {
  describe('Basic rendering', () => {
    it('should render badge with children', () => {
      render(<Badge>Badge text</Badge>);
      expect(screen.getByText('Badge text')).toBeInTheDocument();
    });

    it('should render with default props', () => {
      render(<Badge>Default Badge</Badge>);
      const badge = screen.getByText('Default Badge');
      expect(badge).toHaveClass(
        'inline-flex',
        'items-center',
        'font-medium',
        'rounded-full',
        'bg-gray-100',
        'text-gray-800',
        'px-2.5',
        'py-1',
        'text-sm'
      );
    });

    it('should apply custom className', () => {
      render(<Badge className="custom-class">Badge</Badge>);
      const badge = screen.getByText('Badge');
      expect(badge).toHaveClass('custom-class');
    });

    it('should pass through HTML span attributes', () => {
      render(
        <Badge data-testid="test-badge" role="status">
          Badge
        </Badge>
      );
      const badge = screen.getByTestId('test-badge');
      expect(badge).toHaveAttribute('role', 'status');
    });
  });

  describe('Variants', () => {
    it('should render default variant', () => {
      render(<Badge variant="default">Default</Badge>);
      const badge = screen.getByText('Default');
      expect(badge).toHaveClass('bg-gray-100', 'text-gray-800');
    });

    it('should render primary variant', () => {
      render(<Badge variant="primary">Primary</Badge>);
      const badge = screen.getByText('Primary');
      expect(badge).toHaveClass('bg-flexcar-blue', 'text-white');
    });

    it('should render secondary variant', () => {
      render(<Badge variant="secondary">Secondary</Badge>);
      const badge = screen.getByText('Secondary');
      expect(badge).toHaveClass('bg-gray-200', 'text-gray-900');
    });

    it('should render success variant', () => {
      render(<Badge variant="success">Success</Badge>);
      const badge = screen.getByText('Success');
      expect(badge).toHaveClass('bg-green-100', 'text-green-800');
    });

    it('should render warning variant', () => {
      render(<Badge variant="warning">Warning</Badge>);
      const badge = screen.getByText('Warning');
      expect(badge).toHaveClass('bg-yellow-100', 'text-yellow-800');
    });

    it('should render danger variant', () => {
      render(<Badge variant="danger">Danger</Badge>);
      const badge = screen.getByText('Danger');
      expect(badge).toHaveClass('bg-red-100', 'text-red-800');
    });

    it('should use default variant when not specified', () => {
      render(<Badge>Badge</Badge>);
      const badge = screen.getByText('Badge');
      expect(badge).toHaveClass('bg-gray-100', 'text-gray-800');
    });
  });

  describe('Sizes', () => {
    it('should render small size', () => {
      render(<Badge size="sm">Small</Badge>);
      const badge = screen.getByText('Small');
      expect(badge).toHaveClass('px-2', 'py-0.5', 'text-xs');
    });

    it('should render medium size by default', () => {
      render(<Badge>Medium</Badge>);
      const badge = screen.getByText('Medium');
      expect(badge).toHaveClass('px-2.5', 'py-1', 'text-sm');
    });

    it('should render large size', () => {
      render(<Badge size="lg">Large</Badge>);
      const badge = screen.getByText('Large');
      expect(badge).toHaveClass('px-3', 'py-1.5', 'text-base');
    });
  });

  describe('Content rendering', () => {
    it('should render text content', () => {
      render(<Badge>Text Badge</Badge>);
      expect(screen.getByText('Text Badge')).toBeInTheDocument();
    });

    it('should render number content', () => {
      render(<Badge>42</Badge>);
      expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('should render complex content', () => {
      render(
        <Badge>
          <span>Icon</span>
          <span>Text</span>
        </Badge>
      );
      expect(screen.getByText('Icon')).toBeInTheDocument();
      expect(screen.getByText('Text')).toBeInTheDocument();
    });
  });

  describe('Combined props', () => {
    it('should handle all props together', () => {
      render(
        <Badge
          variant="success"
          size="lg"
          className="custom-class"
          data-testid="combined-badge"
        >
          Combined Badge
        </Badge>
      );

      const badge = screen.getByTestId('combined-badge');
      expect(badge).toHaveClass(
        'inline-flex',
        'items-center',
        'font-medium',
        'rounded-full',
        'bg-green-100',
        'text-green-800',
        'px-3',
        'py-1.5',
        'text-base',
        'custom-class'
      );
      expect(badge).toHaveTextContent('Combined Badge');
    });

    it('should handle minimal props', () => {
      render(<Badge>Minimal Badge</Badge>);
      const badge = screen.getByText('Minimal Badge');
      expect(badge).toHaveClass(
        'inline-flex',
        'items-center',
        'font-medium',
        'rounded-full',
        'bg-gray-100',
        'text-gray-800',
        'px-2.5',
        'py-1',
        'text-sm'
      );
    });
  });

  describe('Accessibility', () => {
    it('should be accessible as a status indicator', () => {
      render(
        <Badge role="status" aria-label="Status badge">
          Active
        </Badge>
      );
      const badge = screen.getByRole('status');
      expect(badge).toHaveAttribute('aria-label', 'Status badge');
    });

    it('should support custom ARIA attributes', () => {
      render(
        <Badge aria-describedby="badge-description" aria-live="polite">
          Live Badge
        </Badge>
      );

      const badge = screen.getByText('Live Badge');
      expect(badge).toHaveAttribute('aria-describedby', 'badge-description');
      expect(badge).toHaveAttribute('aria-live', 'polite');
    });
  });

  describe('Event handling', () => {
    it('should handle click events', () => {
      const handleClick = vi.fn();
      render(<Badge onClick={handleClick}>Clickable Badge</Badge>);

      fireEvent.click(screen.getByText('Clickable Badge'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should handle mouse events', () => {
      const handleMouseEnter = vi.fn();
      const handleMouseLeave = vi.fn();

      render(
        <Badge onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          Interactive Badge
        </Badge>
      );

      const badge = screen.getByText('Interactive Badge');
      fireEvent.mouseEnter(badge);
      fireEvent.mouseLeave(badge);

      expect(handleMouseEnter).toHaveBeenCalledTimes(1);
      expect(handleMouseLeave).toHaveBeenCalledTimes(1);
    });
  });

  describe('Edge cases', () => {
    it('should handle very long text', () => {
      const longText = 'This is a very long badge text that might overflow';
      render(<Badge>{longText}</Badge>);
      expect(screen.getByText(longText)).toBeInTheDocument();
    });

    it('should handle special characters', () => {
      render(<Badge>Special @#$%^&*()</Badge>);
      expect(screen.getByText('Special @#$%^&*()')).toBeInTheDocument();
    });

    it('should handle numeric content', () => {
      render(<Badge>{0}</Badge>);
      expect(screen.getByText('0')).toBeInTheDocument();
    });
  });
});
