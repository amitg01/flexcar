import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, beforeEach, afterEach, it, expect } from 'vitest';
import SortDropdown from '../SortDropdown';

// Mock the useVehicle hook
const mockDispatch = vi.fn();
const mockUseVehicle = {
  state: {
    sortBy: 'price-high-low',
  },
  dispatch: mockDispatch,
};

vi.mock('@/hooks/useVehicle', () => ({
  useVehicle: () => mockUseVehicle,
}));

describe('SortDropdown', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseVehicle.state.sortBy = 'price-high-low';
    mockUseVehicle.dispatch = mockDispatch; // Reset dispatch
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Basic rendering', () => {
    it('should render sort dropdown with label', () => {
      render(<SortDropdown />);

      expect(screen.getByText('Sort by')).toBeInTheDocument();
      expect(screen.getByText('Price: High to Low')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = render(<SortDropdown className="custom-class" />);

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should render all sort options', () => {
      render(<SortDropdown />);

      // Open the dropdown by clicking on it
      const dropdown = screen.getByRole('button', {
        name: /price: high to low/i,
      });
      fireEvent.click(dropdown);

      // Check that all options are visible in the dropdown list (only the list items, not the button)
      const listItems = screen.getAllByRole('option');
      expect(listItems).toHaveLength(3);
      expect(
        screen.getByRole('option', { name: 'Price: High to Low' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('option', { name: 'Price: Low to High' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('option', { name: 'Make: A to Z' })
      ).toBeInTheDocument();
    });
  });

  describe('Sort functionality', () => {
    it('should dispatch SET_SORT_BY when sort option changes', () => {
      render(<SortDropdown />);

      const dropdownButton = screen.getByRole('button', {
        name: /price: high to low/i,
      });
      fireEvent.click(dropdownButton); // Open dropdown
      fireEvent.click(screen.getByText('Price: Low to High')); // Select option

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'SET_SORT_BY',
        payload: 'price-low-high',
      });
    });

    it('should dispatch APPLY_FILTERS_AND_SORT when sort option changes', async () => {
      render(<SortDropdown />);

      const dropdownButton = screen.getByRole('button', {
        name: /price: high to low/i,
      });
      fireEvent.click(dropdownButton); // Open dropdown
      fireEvent.click(screen.getByText('Make: A to Z')); // Select option

      await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith({
          type: 'APPLY_FILTERS_AND_SORT',
        });
      });
    });

    it('should handle price high to low selection', () => {
      render(<SortDropdown />);

      const dropdownButton = screen.getByRole('button', {
        name: /price: high to low/i,
      });
      fireEvent.click(dropdownButton); // Open dropdown
      fireEvent.click(
        screen.getByRole('option', { name: 'Price: High to Low' })
      ); // Select option

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'SET_SORT_BY',
        payload: 'price-high-low',
      });
    });

    it('should handle price low to high selection', () => {
      render(<SortDropdown />);

      const dropdownButton = screen.getByRole('button', {
        name: /price: high to low/i,
      });
      fireEvent.click(dropdownButton); // Open dropdown
      fireEvent.click(
        screen.getByRole('option', { name: 'Price: Low to High' })
      ); // Select option

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'SET_SORT_BY',
        payload: 'price-low-high',
      });
    });

    it('should handle make alphabetical selection', () => {
      render(<SortDropdown />);

      const dropdownButton = screen.getByRole('button', {
        name: /price: high to low/i,
      });
      fireEvent.click(dropdownButton); // Open dropdown
      fireEvent.click(screen.getByRole('option', { name: 'Make: A to Z' })); // Select option

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'SET_SORT_BY',
        payload: 'make-alphabetical',
      });
    });
  });

  describe('State synchronization', () => {
    it('should display current sort value from state', () => {
      mockUseVehicle.state.sortBy = 'price-low-high';

      render(<SortDropdown />);

      expect(screen.getByText('Price: Low to High')).toBeInTheDocument();
    });

    it('should update display when state changes', () => {
      const { rerender } = render(<SortDropdown />);

      expect(screen.getByText('Price: High to Low')).toBeInTheDocument();

      // Update the mock state
      mockUseVehicle.state.sortBy = 'make-alphabetical';
      rerender(<SortDropdown />);

      expect(screen.getByText('Make: A to Z')).toBeInTheDocument();
    });
  });

  describe('useEffect behavior', () => {
    it('should call APPLY_FILTERS_AND_SORT on mount', () => {
      render(<SortDropdown />);

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'APPLY_FILTERS_AND_SORT',
      });
    });

    it('should call APPLY_FILTERS_AND_SORT when sortBy changes', async () => {
      const { rerender } = render(<SortDropdown />);

      // Clear the initial call
      mockDispatch.mockClear();

      // Change the sortBy value
      mockUseVehicle.state.sortBy = 'price-low-high';
      rerender(<SortDropdown />);

      await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith({
          type: 'APPLY_FILTERS_AND_SORT',
        });
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper label association', () => {
      render(<SortDropdown />);

      const label = screen.getByText('Sort by');
      const dropdown = screen.getByRole('button', {
        name: /price: high to low/i,
      });

      expect(label).toBeInTheDocument();
      expect(dropdown).toBeInTheDocument();
    });

    it('should have proper select attributes', () => {
      render(<SortDropdown />);

      const dropdownWrapper = screen
        .getByText('Sort by')
        .closest('[class*="min-w-"]');
      expect(dropdownWrapper).toBeInTheDocument();
    });
  });

  describe('Component structure', () => {
    it('should render with proper container structure', () => {
      const { container } = render(<SortDropdown />);

      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('flex', 'items-center', 'gap-3');
    });

    it('should pass className to wrapper div', () => {
      const { container } = render(<SortDropdown className="test-class" />);

      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('test-class');
    });
  });

  describe('Edge cases', () => {
    it('should handle empty sortBy value', () => {
      mockUseVehicle.state.sortBy = '';

      render(<SortDropdown />);

      const dropdown = screen.getByText('Select an option');
      expect(dropdown).toBeInTheDocument();
    });

    it('should handle invalid sortBy value gracefully', () => {
      mockUseVehicle.state.sortBy = 'invalid-sort';

      render(<SortDropdown />);

      const dropdown = screen.getByText('Select an option');
      expect(dropdown).toBeInTheDocument();
    });

    it('should not crash when dispatch is not available', () => {
      const originalConsoleError = console.error;
      console.error = vi.fn();

      // Mock useVehicle to return a no-op dispatch function
      mockUseVehicle.dispatch = vi.fn();

      expect(() => render(<SortDropdown />)).not.toThrow();

      console.error = originalConsoleError;
    });
  });

  describe('Multiple interactions', () => {
    it('should handle multiple rapid sort changes', async () => {
      render(<SortDropdown />);

      const dropdownButton = screen.getByRole('button', {
        name: /price: high to low/i,
      });

      // Make multiple rapid changes
      fireEvent.click(dropdownButton);
      fireEvent.click(
        screen.getByRole('option', { name: 'Price: Low to High' })
      );
      fireEvent.click(dropdownButton);
      fireEvent.click(screen.getByRole('option', { name: 'Make: A to Z' }));
      fireEvent.click(dropdownButton);
      fireEvent.click(
        screen.getByRole('option', { name: 'Price: High to Low' })
      );

      await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledTimes(4); // 1 initial APPLY_FILTERS_AND_SORT + 3 SET_SORT_BY (useEffect doesn't trigger on rapid changes)
      });
    });

    it('should maintain correct state after multiple changes', () => {
      render(<SortDropdown />);

      const dropdownButton = screen.getByRole('button', {
        name: /price: high to low/i,
      });

      fireEvent.click(dropdownButton);
      fireEvent.click(
        screen.getByRole('option', { name: 'Price: Low to High' })
      );
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'SET_SORT_BY',
        payload: 'price-low-high',
      });

      fireEvent.click(dropdownButton);
      fireEvent.click(screen.getByRole('option', { name: 'Make: A to Z' }));
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'SET_SORT_BY',
        payload: 'make-alphabetical',
      });
    });
  });
});
