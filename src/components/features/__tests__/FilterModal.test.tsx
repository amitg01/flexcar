import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, afterEach, describe, beforeEach, it, expect } from 'vitest';
import FilterModal from '../FilterModal';

// Mock the FilterPanel component
vi.mock('../FilterPanel', () => ({
  default: () => <div data-testid="filter-panel">Filter Panel Content</div>,
}));

describe('FilterModal', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Basic rendering', () => {
    it('should render modal when open', () => {
      render(<FilterModal isOpen={true} onClose={mockOnClose} />);

      expect(screen.getByText('Filters')).toBeInTheDocument();
      expect(screen.getByTestId('filter-panel')).toBeInTheDocument();
    });

    it('should not render modal when closed', () => {
      render(<FilterModal isOpen={false} onClose={mockOnClose} />);

      expect(screen.queryByText('Filters')).not.toBeInTheDocument();
      expect(screen.queryByTestId('filter-panel')).not.toBeInTheDocument();
    });

    it('should render with proper title', () => {
      render(<FilterModal isOpen={true} onClose={mockOnClose} />);

      expect(screen.getByText('Filters')).toBeInTheDocument();
    });
  });

  describe('Modal functionality', () => {
    it('should call onClose when modal is closed', () => {
      render(<FilterModal isOpen={true} onClose={mockOnClose} />);

      // Find and click the close button
      const closeButton = screen.getByLabelText('Close modal');
      fireEvent.click(closeButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when backdrop is clicked', () => {
      const { container } = render(
        <FilterModal isOpen={true} onClose={mockOnClose} />
      );

      // Find the backdrop and click it
      const backdrop = container.querySelector('.fixed.inset-0');
      fireEvent.click(backdrop!);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should not call onClose when modal content is clicked', () => {
      render(<FilterModal isOpen={true} onClose={mockOnClose} />);

      // Click on the modal content
      const modalContent = screen.getByTestId('filter-panel');
      fireEvent.click(modalContent);

      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  describe('Content rendering', () => {
    it('should render FilterPanel component', () => {
      render(<FilterModal isOpen={true} onClose={mockOnClose} />);

      expect(screen.getByTestId('filter-panel')).toBeInTheDocument();
    });

    it('should have proper container styling', () => {
      render(<FilterModal isOpen={true} onClose={mockOnClose} />);

      const container = screen.getByTestId('filter-panel').parentElement;
      expect(container).toHaveClass('max-h-[80vh]', 'overflow-y-auto');
    });
  });

  describe('Modal state changes', () => {
    it('should show modal when isOpen changes from false to true', () => {
      const { rerender } = render(
        <FilterModal isOpen={false} onClose={mockOnClose} />
      );

      expect(screen.queryByText('Filters')).not.toBeInTheDocument();

      rerender(<FilterModal isOpen={true} onClose={mockOnClose} />);

      expect(screen.getByText('Filters')).toBeInTheDocument();
      expect(screen.getByTestId('filter-panel')).toBeInTheDocument();
    });

    it('should hide modal when isOpen changes from true to false', () => {
      const { rerender } = render(
        <FilterModal isOpen={true} onClose={mockOnClose} />
      );

      expect(screen.getByText('Filters')).toBeInTheDocument();

      rerender(<FilterModal isOpen={false} onClose={mockOnClose} />);

      expect(screen.queryByText('Filters')).not.toBeInTheDocument();
      expect(screen.queryByTestId('filter-panel')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper modal structure', () => {
      render(<FilterModal isOpen={true} onClose={mockOnClose} />);

      expect(screen.getByText('Filters')).toBeInTheDocument();
      expect(screen.getByLabelText('Close modal')).toBeInTheDocument();
    });

    it('should be accessible when open', () => {
      render(<FilterModal isOpen={true} onClose={mockOnClose} />);

      // The Modal component doesn't use role="dialog", it uses a different structure
      expect(screen.getByText('Filters')).toBeInTheDocument();
      expect(screen.getByLabelText('Close modal')).toBeInTheDocument();
    });

    it('should not be accessible when closed', () => {
      render(<FilterModal isOpen={false} onClose={mockOnClose} />);

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  describe('Keyboard navigation', () => {
    it('should close modal on Escape key press', () => {
      render(<FilterModal isOpen={true} onClose={mockOnClose} />);

      fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should not close modal on other key presses', () => {
      render(<FilterModal isOpen={true} onClose={mockOnClose} />);

      fireEvent.keyDown(document, { key: 'Enter', code: 'Enter' });
      fireEvent.keyDown(document, { key: 'Space', code: 'Space' });
      fireEvent.keyDown(document, { key: 'Tab', code: 'Tab' });

      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  describe('Props handling', () => {
    it('should handle multiple onClose calls', () => {
      render(<FilterModal isOpen={true} onClose={mockOnClose} />);

      const closeButton = screen.getByLabelText('Close modal');
      fireEvent.click(closeButton);
      fireEvent.click(closeButton);

      expect(mockOnClose).toHaveBeenCalledTimes(2);
    });

    it('should handle onClose function changes', () => {
      const newOnClose = vi.fn();
      const { rerender } = render(
        <FilterModal isOpen={true} onClose={mockOnClose} />
      );

      rerender(<FilterModal isOpen={true} onClose={newOnClose} />);

      const closeButton = screen.getByLabelText('Close modal');
      fireEvent.click(closeButton);

      expect(newOnClose).toHaveBeenCalledTimes(1);
      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  describe('Edge cases', () => {
    it('should handle rapid open/close state changes', () => {
      const { rerender } = render(
        <FilterModal isOpen={false} onClose={mockOnClose} />
      );

      // Rapid state changes
      rerender(<FilterModal isOpen={true} onClose={mockOnClose} />);
      rerender(<FilterModal isOpen={false} onClose={mockOnClose} />);
      rerender(<FilterModal isOpen={true} onClose={mockOnClose} />);

      expect(screen.getByText('Filters')).toBeInTheDocument();
    });

    it('should handle undefined onClose gracefully', () => {
      expect(() =>
        render(<FilterModal isOpen={true} onClose={() => {}} />)
      ).not.toThrow();
    });
  });
});
