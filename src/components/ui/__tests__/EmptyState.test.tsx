import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import EmptyState from '../EmptyState';

// Mock the Button component
vi.mock('../Button', () => ({
  default: ({
    children,
    onClick,
    variant,
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: string }) => (
    <button onClick={onClick} data-variant={variant} {...props}>
      {children}
    </button>
  ),
}));

describe('EmptyState', () => {
  describe('Basic rendering', () => {
    it('should render with required props', () => {
      render(
        <EmptyState
          title="No items found"
          description="There are no items to display at this time."
        />
      );

      expect(screen.getByText('No items found')).toBeInTheDocument();
      expect(
        screen.getByText('There are no items to display at this time.')
      ).toBeInTheDocument();
    });

    it('should render with default icon when no icon provided', () => {
      render(
        <EmptyState
          title="No items found"
          description="There are no items to display at this time."
        />
      );

      const icon = screen.getByRole('img', { hidden: true });
      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe('svg');
    });

    it('should apply custom className', () => {
      render(
        <EmptyState
          title="No items found"
          description="Description"
          className="custom-class"
        />
      );

      const container = screen.getByText('No items found').closest('div');
      expect(container).toHaveClass('custom-class');
    });
  });

  describe('Icon rendering', () => {
    it('should render custom icon when provided', () => {
      const customIcon = <div data-testid="custom-icon">Custom Icon</div>;
      render(
        <EmptyState
          title="No items found"
          description="Description"
          icon={customIcon}
        />
      );

      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('should render default icon when icon is null', () => {
      render(
        <EmptyState
          title="No items found"
          description="Description"
          icon={null}
        />
      );

      const icon = screen.getByRole('img', { hidden: true });
      expect(icon).toBeInTheDocument();
    });

    it('should render default icon when icon is undefined', () => {
      render(
        <EmptyState
          title="No items found"
          description="Description"
          icon={undefined}
        />
      );

      const icon = screen.getByRole('img', { hidden: true });
      expect(icon).toBeInTheDocument();
    });
  });

  describe('Action button', () => {
    it('should render action button when action is provided', () => {
      const mockAction = {
        label: 'Add Item',
        onClick: vi.fn(),
      };

      render(
        <EmptyState
          title="No items found"
          description="Description"
          action={mockAction}
        />
      );

      const button = screen.getByText('Add Item');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('data-variant', 'primary');
    });

    it('should not render action button when action is not provided', () => {
      render(<EmptyState title="No items found" description="Description" />);

      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('should call action onClick when button is clicked', () => {
      const mockAction = {
        label: 'Add Item',
        onClick: vi.fn(),
      };

      render(
        <EmptyState
          title="No items found"
          description="Description"
          action={mockAction}
        />
      );

      const button = screen.getByText('Add Item');
      fireEvent.click(button);
      expect(mockAction.onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Content structure', () => {
    it('should render title as heading', () => {
      render(<EmptyState title="No items found" description="Description" />);

      const title = screen.getByRole('heading', { level: 3 });
      expect(title).toHaveTextContent('No items found');
    });

    it('should render description as paragraph', () => {
      render(
        <EmptyState
          title="No items found"
          description="There are no items to display at this time."
        />
      );

      const description = screen.getByText(
        'There are no items to display at this time.'
      );
      expect(description.tagName).toBe('P');
    });

    it('should have proper styling classes', () => {
      render(<EmptyState title="No items found" description="Description" />);

      const container = screen.getByText('No items found').closest('div');
      expect(container).toHaveClass('text-center', 'py-12');
    });
  });

  describe('Default icon structure', () => {
    it('should render search icon by default', () => {
      render(<EmptyState title="No items found" description="Description" />);

      const icon = screen.getByRole('img', { hidden: true });
      expect(icon).toHaveClass('mx-auto', 'h-16', 'w-16', 'text-gray-400');
      expect(icon).toHaveAttribute('fill', 'none');
      expect(icon).toHaveAttribute('viewBox', '0 0 24 24');
      expect(icon).toHaveAttribute('stroke', 'currentColor');
    });

    it('should have proper icon path', () => {
      render(<EmptyState title="No items found" description="Description" />);

      const icon = screen.getByRole('img', { hidden: true });
      const path = icon.querySelector('path');
      expect(path).toHaveAttribute('stroke-linecap', 'round');
      expect(path).toHaveAttribute('stroke-linejoin', 'round');
      expect(path).toHaveAttribute('stroke-width', '1');
    });
  });

  describe('Styling', () => {
    it('should have proper title styling', () => {
      render(<EmptyState title="No items found" description="Description" />);

      const title = screen.getByRole('heading', { level: 3 });
      expect(title).toHaveClass(
        'text-xl',
        'font-medium',
        'text-gray-900',
        'mb-2'
      );
    });

    it('should have proper description styling', () => {
      render(<EmptyState title="No items found" description="Description" />);

      const description = screen.getByText('Description');
      expect(description).toHaveClass('text-gray-500', 'mb-6');
    });

    it('should have proper icon container styling', () => {
      render(<EmptyState title="No items found" description="Description" />);

      const iconContainer = screen.getByRole('img', {
        hidden: true,
      }).parentElement;
      expect(iconContainer).toHaveClass('text-gray-400', 'mb-4');
    });
  });

  describe('Combined props', () => {
    it('should handle all props together', () => {
      const customIcon = <div data-testid="custom-icon">Custom Icon</div>;
      const mockAction = {
        label: 'Add Item',
        onClick: vi.fn(),
      };

      render(
        <EmptyState
          icon={customIcon}
          title="No items found"
          description="There are no items to display at this time."
          action={mockAction}
          className="custom-class"
        />
      );

      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
      expect(screen.getByText('No items found')).toBeInTheDocument();
      expect(
        screen.getByText('There are no items to display at this time.')
      ).toBeInTheDocument();
      expect(screen.getByText('Add Item')).toBeInTheDocument();

      const container = screen.getByText('No items found').closest('div');
      expect(container).toHaveClass('custom-class');
    });

    it('should handle minimal props', () => {
      render(<EmptyState title="Minimal" description="Minimal description" />);

      expect(screen.getByText('Minimal')).toBeInTheDocument();
      expect(screen.getByText('Minimal description')).toBeInTheDocument();
      expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading structure', () => {
      render(<EmptyState title="No items found" description="Description" />);

      const title = screen.getByRole('heading', { level: 3 });
      expect(title).toBeInTheDocument();
    });

    it('should support custom ARIA attributes', () => {
      render(
        <EmptyState
          title="No items found"
          description="Description"
          className="custom-class"
        />
      );

      const container = screen.getByText('No items found').closest('div');
      expect(container).toBeInTheDocument();
    });
  });

  describe('Edge cases', () => {
    it('should handle empty title', () => {
      render(<EmptyState title="" description="Description" />);

      const title = screen.getByRole('heading', { level: 3 });
      expect(title).toHaveTextContent('');
    });

    it('should handle empty description', () => {
      render(<EmptyState title="Title" description="" />);

      const description = screen
        .getByText('Title')
        .parentElement?.querySelector('p');
      expect(description).toBeInTheDocument();
    });

    it('should handle very long text', () => {
      const longTitle =
        'This is a very long title that might wrap to multiple lines';
      const longDescription =
        'This is a very long description that might wrap to multiple lines and should still be displayed correctly';

      render(<EmptyState title={longTitle} description={longDescription} />);

      expect(screen.getByText(longTitle)).toBeInTheDocument();
      expect(screen.getByText(longDescription)).toBeInTheDocument();
    });
  });
});
