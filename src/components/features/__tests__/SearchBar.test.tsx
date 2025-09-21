import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import '@testing-library/jest-dom';
import SearchBar from '../SearchBar';

// Mock the hooks
vi.mock('@/hooks/useVehicle', () => ({
  useVehicle: vi.fn(),
}));

vi.mock('@/hooks', () => ({
  useDebounce: vi.fn(),
}));

describe('SearchBar', () => {
  const mockSearchVehicles = vi.fn();

  beforeEach(async () => {
    vi.clearAllMocks();

    // Import the mocked functions
    const { useVehicle } = await import('../../../hooks/useVehicle');
    const { useDebounce } = await import('../../../hooks');

    // Set up default mock return values
    vi.mocked(useVehicle).mockReturnValue({
      state: {
        zipCode: '',
        isLoading: false,
      },
      searchVehicles: mockSearchVehicles,
    });

    vi.mocked(useDebounce).mockReturnValue('');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Basic rendering', () => {
    it('should render search input and button', () => {
      render(<SearchBar />);

      expect(
        screen.getByPlaceholderText('Enter ZIP code (e.g., 10001)')
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /search/i })
      ).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = render(<SearchBar className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should have proper form structure', () => {
      const { container } = render(<SearchBar />);

      const form = container.querySelector('form');
      expect(form).toBeInTheDocument();
      expect(form).toHaveClass('flex gap-3');
    });
  });

  describe('Input validation', () => {
    it('should show error for invalid ZIP code format', () => {
      render(<SearchBar />);

      const input = screen.getByPlaceholderText('Enter ZIP code (e.g., 10001)');
      fireEvent.change(input, { target: { value: '123' } });

      expect(
        screen.getByText('Please enter a valid ZIP code (5 digits)')
      ).toBeInTheDocument();
    });

    it('should not show error for valid ZIP code', () => {
      render(<SearchBar />);

      const input = screen.getByPlaceholderText('Enter ZIP code (e.g., 10001)');
      fireEvent.change(input, { target: { value: '12345' } });

      expect(
        screen.queryByText('Please enter a valid ZIP code (5 digits)')
      ).not.toBeInTheDocument();
    });

    it('should accept ZIP+4 format', () => {
      render(<SearchBar />);

      const input = screen.getByPlaceholderText('Enter ZIP code (e.g., 10001)');
      fireEvent.change(input, { target: { value: '12345-6789' } });

      expect(
        screen.queryByText('Please enter a valid ZIP code (5 digits)')
      ).not.toBeInTheDocument();
    });

    it('should show error for empty input after typing', () => {
      render(<SearchBar />);

      const input = screen.getByPlaceholderText('Enter ZIP code (e.g., 10001)');
      fireEvent.change(input, { target: { value: '12345' } });
      fireEvent.change(input, { target: { value: '' } });

      expect(
        screen.queryByText('Please enter a valid ZIP code (5 digits)')
      ).not.toBeInTheDocument();
    });
  });

  describe('Form submission', () => {
    it('should call searchVehicles on valid form submission', () => {
      render(<SearchBar />);

      const input = screen.getByPlaceholderText('Enter ZIP code (e.g., 10001)');
      const button = screen.getByRole('button', { name: /search/i });

      fireEvent.change(input, { target: { value: '12345' } });
      fireEvent.click(button);

      expect(mockSearchVehicles).toHaveBeenCalledWith('12345');
    });

    it('should not call searchVehicles on invalid form submission', () => {
      render(<SearchBar />);

      const input = screen.getByPlaceholderText('Enter ZIP code (e.g., 10001)');
      const button = screen.getByRole('button', { name: /search/i });

      fireEvent.change(input, { target: { value: '123' } });
      fireEvent.click(button);

      expect(mockSearchVehicles).not.toHaveBeenCalled();
    });

    it('should prevent default form submission', () => {
      const { container } = render(<SearchBar />);

      const form = container.querySelector('form');
      const submitEvent = new Event('submit', {
        bubbles: true,
        cancelable: true,
      });
      const preventDefaultSpy = vi.spyOn(submitEvent, 'preventDefault');

      fireEvent(form!, submitEvent);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('should trim whitespace from input', async () => {
      const { container } = render(<SearchBar />);

      const input = screen.getByPlaceholderText('Enter ZIP code (e.g., 10001)');
      const form = container.querySelector('form');

      // Set input with whitespace
      fireEvent.change(input, { target: { value: '  12345  ' } });

      // Wait for the input to be updated
      await waitFor(() => {
        expect(input).toHaveValue('  12345  ');
      });

      // Submit the form directly
      fireEvent.submit(form!);

      expect(mockSearchVehicles).toHaveBeenCalledWith('12345');
    });
  });

  describe('Auto-search functionality', () => {
    it('should auto-search when debounced value changes and is valid', async () => {
      const { useDebounce } = await import('../../../hooks');
      vi.mocked(useDebounce).mockReturnValue('12345');
      render(<SearchBar />);

      await waitFor(() => {
        expect(mockSearchVehicles).toHaveBeenCalledWith('12345');
      });
    });

    it('should not auto-search when debounced value is invalid', async () => {
      const { useDebounce } = await import('../../../hooks');
      vi.mocked(useDebounce).mockReturnValue('123');
      render(<SearchBar />);

      await waitFor(() => {
        expect(mockSearchVehicles).not.toHaveBeenCalled();
      });
    });

    it('should not auto-search when debounced value is empty', async () => {
      const { useDebounce } = await import('../../../hooks');
      vi.mocked(useDebounce).mockReturnValue('');
      render(<SearchBar />);

      await waitFor(() => {
        expect(mockSearchVehicles).not.toHaveBeenCalled();
      });
    });

    it('should not auto-search when debounced value matches current zipCode', async () => {
      // Mock useVehicle to return a state with existing zipCode
      const { useVehicle } = await import('../../../hooks/useVehicle');
      vi.mocked(useVehicle).mockReturnValue({
        state: {
          zipCode: '12345',
          isLoading: false,
        },
        searchVehicles: mockSearchVehicles,
      });

      const { useDebounce } = await import('../../../hooks');
      vi.mocked(useDebounce).mockReturnValue('12345');
      render(<SearchBar />);

      await waitFor(() => {
        expect(mockSearchVehicles).not.toHaveBeenCalled();
      });
    });
  });

  describe('Loading state', () => {
    it('should disable input and button when loading', async () => {
      // Mock useVehicle to return loading state
      const { useVehicle } = await import('../../../hooks/useVehicle');
      vi.mocked(useVehicle).mockReturnValue({
        state: {
          zipCode: '',
          isLoading: true,
        },
        searchVehicles: mockSearchVehicles,
      });

      render(<SearchBar />);

      const input = screen.getByPlaceholderText('Enter ZIP code (e.g., 10001)');
      const button = screen.getByRole('button', { name: /loading/i });

      expect(input).toBeDisabled();
      expect(button).toBeDisabled();
    });

    it('should show loading text on button when loading', async () => {
      // Mock useVehicle to return loading state
      const { useVehicle } = await import('../../../hooks/useVehicle');
      vi.mocked(useVehicle).mockReturnValue({
        state: {
          zipCode: '',
          isLoading: true,
        },
        searchVehicles: mockSearchVehicles,
      });

      render(<SearchBar />);

      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should disable button when input is invalid', () => {
      render(<SearchBar />);

      const input = screen.getByPlaceholderText('Enter ZIP code (e.g., 10001)');
      const button = screen.getByRole('button', { name: /search/i });

      fireEvent.change(input, { target: { value: '123' } });

      expect(button).toBeDisabled();
    });

    it('should disable button when input is empty', () => {
      render(<SearchBar />);

      const button = screen.getByRole('button', { name: /search/i });

      expect(button).toBeDisabled();
    });
  });

  describe('Accessibility', () => {
    it('should have proper input attributes', () => {
      render(<SearchBar />);

      const input = screen.getByPlaceholderText('Enter ZIP code (e.g., 10001)');
      expect(input).toHaveAttribute('type', 'text');
      expect(input).toHaveAttribute(
        'placeholder',
        'Enter ZIP code (e.g., 10001)'
      );
    });

    it('should have proper button attributes', () => {
      render(<SearchBar />);

      const button = screen.getByRole('button', { name: /search/i });
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('should associate error message with input', () => {
      render(<SearchBar />);

      const input = screen.getByPlaceholderText('Enter ZIP code (e.g., 10001)');
      fireEvent.change(input, { target: { value: '123' } });

      const errorMessage = screen.getByText(
        'Please enter a valid ZIP code (5 digits)'
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe('Component structure', () => {
    it('should render with proper container structure', () => {
      const { container } = render(<SearchBar />);

      expect(container.firstChild).toHaveClass('w-full max-w-2xl mx-auto');
    });

    it('should pass className to wrapper div', () => {
      const { container } = render(<SearchBar className="test-class" />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('test-class');
    });

    it('should have proper input styling', () => {
      render(<SearchBar />);

      const input = screen.getByPlaceholderText('Enter ZIP code (e.g., 10001)');
      expect(input).toHaveClass(
        'text-lg h-14 border-2 border-gray-300 focus:border-blue-500 rounded-lg'
      );
    });

    it('should have proper button styling', () => {
      render(<SearchBar />);

      const button = screen.getByRole('button', { name: /search/i });
      expect(button).toHaveClass(
        'h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg'
      );
    });
  });

  describe('Edge cases', () => {
    it('should handle rapid input changes', () => {
      render(<SearchBar />);

      const input = screen.getByPlaceholderText('Enter ZIP code (e.g., 10001)');

      fireEvent.change(input, { target: { value: '1' } });
      fireEvent.change(input, { target: { value: '12' } });
      fireEvent.change(input, { target: { value: '123' } });
      fireEvent.change(input, { target: { value: '1234' } });
      fireEvent.change(input, { target: { value: '12345' } });

      expect(
        screen.queryByText('Please enter a valid ZIP code (5 digits)')
      ).not.toBeInTheDocument();
    });

    it('should handle special characters in input', () => {
      render(<SearchBar />);

      const input = screen.getByPlaceholderText('Enter ZIP code (e.g., 10001)');
      fireEvent.change(input, { target: { value: 'abc123' } });

      expect(
        screen.getByText('Please enter a valid ZIP code (5 digits)')
      ).toBeInTheDocument();
    });

    it('should handle very long input', () => {
      render(<SearchBar />);

      const input = screen.getByPlaceholderText('Enter ZIP code (e.g., 10001)');
      fireEvent.change(input, { target: { value: '12345678901234567890' } });

      expect(
        screen.getByText('Please enter a valid ZIP code (5 digits)')
      ).toBeInTheDocument();
    });
  });

  describe('Integration with hooks', () => {
    it('should call useDebounce with correct parameters', async () => {
      render(<SearchBar />);

      const input = screen.getByPlaceholderText('Enter ZIP code (e.g., 10001)');
      fireEvent.change(input, { target: { value: '12345' } });

      const { useDebounce } = await import('../../../hooks');
      expect(vi.mocked(useDebounce)).toHaveBeenCalledWith('12345', 300);
    });

    it('should use state from useVehicle hook', async () => {
      // Mock useVehicle to return specific state
      const { useVehicle } = await import('../../../hooks/useVehicle');
      vi.mocked(useVehicle).mockReturnValue({
        state: {
          zipCode: '54321',
          isLoading: true,
        },
        searchVehicles: mockSearchVehicles,
      });

      render(<SearchBar />);

      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });
});
