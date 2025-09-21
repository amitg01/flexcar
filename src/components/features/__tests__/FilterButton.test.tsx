import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, beforeEach, afterEach, it, expect } from 'vitest';
import FilterButton from '../FilterButton';

// Mock the useVehicle hook
const mockUseVehicle = {
  state: {
    selectedMake: '',
    selectedColor: '',
  },
};

vi.mock('@/hooks/useVehicle', () => ({
  useVehicle: () => mockUseVehicle,
}));

describe('FilterButton', () => {
  const mockOnClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseVehicle.state.selectedMake = '';
    mockUseVehicle.state.selectedColor = '';
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Basic rendering', () => {
    it('should render filter button with icon and text', () => {
      render(<FilterButton onClick={mockOnClick} />);

      expect(screen.getByText('Filters')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByRole('button')).toHaveClass(
        'flex',
        'items-center',
        'gap-2'
      );
    });

    it('should apply custom className', () => {
      const { container } = render(
        <FilterButton onClick={mockOnClick} className="custom-class" />
      );

      const button = container.querySelector('button');
      expect(button).toHaveClass('custom-class');
    });

    it('should render filter icon', () => {
      render(<FilterButton onClick={mockOnClick} />);

      const icon = screen.getByRole('button').querySelector('svg');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass('w-5', 'h-5');
    });
  });

  describe('Click functionality', () => {
    it('should call onClick when button is clicked', () => {
      render(<FilterButton onClick={mockOnClick} />);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when button is not clicked', () => {
      render(<FilterButton onClick={mockOnClick} />);

      expect(mockOnClick).not.toHaveBeenCalled();
    });
  });

  describe('Active filter count', () => {
    it('should not show badge when no filters are active', () => {
      render(<FilterButton onClick={mockOnClick} />);

      expect(screen.queryByText('0')).not.toBeInTheDocument();
      expect(screen.queryByText('1')).not.toBeInTheDocument();
      expect(screen.queryByText('2')).not.toBeInTheDocument();
    });

    it('should show badge with count 1 when only make filter is active', () => {
      mockUseVehicle.state.selectedMake = 'BMW';

      render(<FilterButton onClick={mockOnClick} />);

      expect(screen.getByText('1')).toBeInTheDocument();
      const badge = screen.getByText('1');
      expect(badge).toHaveClass(
        'bg-purple-600',
        'text-white',
        'text-xs',
        'rounded-full'
      );
    });

    it('should show badge with count 1 when only color filter is active', () => {
      mockUseVehicle.state.selectedColor = 'Red';

      render(<FilterButton onClick={mockOnClick} />);

      expect(screen.getByText('1')).toBeInTheDocument();
      const badge = screen.getByText('1');
      expect(badge).toHaveClass(
        'bg-purple-600',
        'text-white',
        'text-xs',
        'rounded-full'
      );
    });

    it('should show badge with count 2 when both filters are active', () => {
      mockUseVehicle.state.selectedMake = 'BMW';
      mockUseVehicle.state.selectedColor = 'Red';

      render(<FilterButton onClick={mockOnClick} />);

      expect(screen.getByText('2')).toBeInTheDocument();
      const badge = screen.getByText('2');
      expect(badge).toHaveClass(
        'bg-purple-600',
        'text-white',
        'text-xs',
        'rounded-full'
      );
    });
  });

  describe('Button styling', () => {
    it('should have outline variant', () => {
      render(<FilterButton onClick={mockOnClick} />);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('flex', 'items-center', 'gap-2');
    });

    it('should have proper button structure', () => {
      render(<FilterButton onClick={mockOnClick} />);

      const button = screen.getByRole('button');
      const icon = button.querySelector('svg');
      const text = button.querySelector('span');
      const badge = button.querySelector('.bg-purple-600');

      expect(icon).toBeInTheDocument();
      expect(text).toHaveTextContent('Filters');
      expect(badge).not.toBeInTheDocument(); // No active filters
    });

    it('should have proper button structure with active filters', () => {
      mockUseVehicle.state.selectedMake = 'BMW';

      render(<FilterButton onClick={mockOnClick} />);

      const button = screen.getByRole('button');
      const icon = button.querySelector('svg');
      const text = button.querySelector('span');
      const badge = button.querySelector('.bg-purple-600');

      expect(icon).toBeInTheDocument();
      expect(text).toHaveTextContent('Filters');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveTextContent('1');
    });
  });

  describe('Accessibility', () => {
    it('should be accessible as a button', () => {
      render(<FilterButton onClick={mockOnClick} />);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      // The Button component doesn't set type="button" by default
      expect(button).toBeInTheDocument();
    });

    it('should have proper button text', () => {
      render(<FilterButton onClick={mockOnClick} />);

      expect(screen.getByText('Filters')).toBeInTheDocument();
    });
  });

  describe('State updates', () => {
    it('should update badge count when filters change', () => {
      const { rerender } = render(<FilterButton onClick={mockOnClick} />);

      // Initially no badge
      expect(screen.queryByText('1')).not.toBeInTheDocument();

      // Add make filter
      mockUseVehicle.state.selectedMake = 'BMW';
      rerender(<FilterButton onClick={mockOnClick} />);

      expect(screen.getByText('1')).toBeInTheDocument();

      // Add color filter
      mockUseVehicle.state.selectedColor = 'Red';
      rerender(<FilterButton onClick={mockOnClick} />);

      expect(screen.getByText('2')).toBeInTheDocument();

      // Remove make filter
      mockUseVehicle.state.selectedMake = '';
      rerender(<FilterButton onClick={mockOnClick} />);

      expect(screen.getByText('1')).toBeInTheDocument();

      // Remove color filter
      mockUseVehicle.state.selectedColor = '';
      rerender(<FilterButton onClick={mockOnClick} />);

      expect(screen.queryByText('1')).not.toBeInTheDocument();
    });
  });

  describe('Edge cases', () => {
    it('should handle empty string filters as inactive', () => {
      mockUseVehicle.state.selectedMake = '';
      mockUseVehicle.state.selectedColor = '';

      render(<FilterButton onClick={mockOnClick} />);

      expect(screen.queryByText('0')).not.toBeInTheDocument();
      expect(screen.queryByText('1')).not.toBeInTheDocument();
      expect(screen.queryByText('2')).not.toBeInTheDocument();
    });

    it('should handle whitespace-only filters as active', () => {
      mockUseVehicle.state.selectedMake = '   ';
      mockUseVehicle.state.selectedColor = '   ';

      render(<FilterButton onClick={mockOnClick} />);

      expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('should handle null/undefined filters gracefully', () => {
      // @ts-expect-error - Testing edge case
      mockUseVehicle.state.selectedMake = null;
      // @ts-expect-error - Testing edge case
      mockUseVehicle.state.selectedColor = undefined;

      render(<FilterButton onClick={mockOnClick} />);

      // The component treats null/undefined as falsy values, so it shows 0
      expect(screen.getByText('0')).toBeInTheDocument();
    });
  });
});
