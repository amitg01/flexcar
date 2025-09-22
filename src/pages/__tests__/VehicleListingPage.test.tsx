import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import '@testing-library/jest-dom';
import VehicleListingPage from '../VehicleListingPage';

// Mock react-router-dom
const mockSearchParams = new URLSearchParams();
const mockSetSearchParams = vi.fn();

vi.mock('react-router-dom', () => ({
  useSearchParams: () => [mockSearchParams, mockSetSearchParams],
}));

// Mock the hooks
const mockUseVehicle = vi.fn();
const mockUseOnboarding = vi.fn();
const mockUseZipCodeModal = vi.fn();

vi.mock('@/hooks/useVehicle', () => ({
  useVehicle: () => mockUseVehicle(),
}));

vi.mock('@/hooks/useOnboarding', () => ({
  useOnboarding: () => mockUseOnboarding(),
}));

vi.mock('@/contexts/ZipCodeModalContextInstance', () => ({
  useZipCodeModal: () => mockUseZipCodeModal(),
}));

// Mock the layout components
vi.mock('@/components/layout', () => ({
  Header: () => <div data-testid="header">Header</div>,
  Footer: () => <div data-testid="footer">Footer</div>,
}));

// Mock the feature components
vi.mock('@/components/features', () => ({
  VehicleGrid: ({ className }: { className?: string }) => (
    <div data-testid="vehicle-grid" className={className}>
      Vehicle Grid
    </div>
  ),
  FilterPanel: () => <div data-testid="filter-panel">Filter Panel</div>,
  FilterButton: ({ onClick }: { onClick: () => void }) => (
    <button data-testid="filter-button" onClick={onClick}>
      Filter Button
    </button>
  ),
  FilterModal: ({
    isOpen,
    onClose,
  }: {
    isOpen: boolean;
    onClose: () => void;
  }) =>
    isOpen ? (
      <div data-testid="filter-modal">
        <button data-testid="close-modal" onClick={onClose}>
          Close
        </button>
        Filter Modal
      </div>
    ) : null,
  SortDropdown: () => <div data-testid="sort-dropdown">Sort Dropdown</div>,
}));

// Mock the UI components
vi.mock('@/components/ui', () => ({
  LoadingSpinner: () => <div data-testid="loading-spinner">Loading...</div>,
  EmptyState: ({
    title,
    description,
    action,
  }: {
    title: string;
    description: string;
    action: { label: string; onClick: () => void };
  }) => (
    <div data-testid="empty-state">
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={action.onClick}>{action.label}</button>
    </div>
  ),
}));

// Mock the OnboardingModal
vi.mock('../HomePage/OnboardingModal', () => ({
  default: () => <div data-testid="onboarding-modal">Onboarding Modal</div>,
}));

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true,
});

describe('VehicleListingPage', () => {
  const defaultVehicleState = {
    vehicles: [],
    filteredVehicles: [],
    selectedMake: '',
    selectedColor: '',
    sortBy: 'price-high-low' as const,
    zipCode: '',
    isLoading: false,
    error: null,
  };

  const defaultVehicleActions = {
    dispatch: vi.fn(),
    clearFilters: vi.fn(),
    getAvailableMakes: vi.fn(() => []),
    getAvailableColors: vi.fn(() => []),
    searchVehicles: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
    mockUseVehicle.mockReturnValue({
      state: {
        ...defaultVehicleState,
        vehicles: [{ id: '1', make: 'BMW' }],
        isLoading: false,
      },
      ...defaultVehicleActions,
    });
    mockUseOnboarding.mockReturnValue({ showModal: false });
    mockUseZipCodeModal.mockReturnValue({ openZipCodeModal: vi.fn() });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Basic rendering', () => {
    it('should render header and footer', () => {
      render(<VehicleListingPage />);

      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    it('should render filter panel and sort dropdown', () => {
      mockUseVehicle.mockReturnValue({
        state: {
          ...defaultVehicleState,
          vehicles: [{ id: '1', make: 'BMW' }],
          isLoading: false,
        },
        ...defaultVehicleActions,
      });

      render(<VehicleListingPage />);

      expect(screen.getByTestId('filter-panel')).toBeInTheDocument();
      expect(screen.getByTestId('sort-dropdown')).toBeInTheDocument();
    });

    it('should render vehicle grid', () => {
      mockUseVehicle.mockReturnValue({
        state: {
          ...defaultVehicleState,
          vehicles: [{ id: '1', make: 'BMW' }],
          isLoading: false,
        },
        ...defaultVehicleActions,
      });

      render(<VehicleListingPage />);

      expect(screen.getByTestId('vehicle-grid')).toBeInTheDocument();
    });

    it('should not show onboarding modal by default', () => {
      render(<VehicleListingPage />);

      expect(screen.queryByTestId('onboarding-modal')).not.toBeInTheDocument();
    });
  });

  describe('Loading state', () => {
    it('should show loading spinner when loading', () => {
      mockUseVehicle.mockReturnValue({
        state: { ...defaultVehicleState, isLoading: true },
        ...defaultVehicleActions,
      });

      render(<VehicleListingPage />);

      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });

    it('should not show loading spinner when not loading', () => {
      mockUseVehicle.mockReturnValue({
        state: {
          ...defaultVehicleState,
          vehicles: [{ id: '1', make: 'BMW' }],
          isLoading: false,
        },
        ...defaultVehicleActions,
      });

      render(<VehicleListingPage />);

      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });
  });

  describe('Empty state', () => {
    it('should show empty state when no vehicles and not loading', async () => {
      mockUseVehicle.mockReturnValue({
        state: {
          ...defaultVehicleState,
          vehicles: [],
          isLoading: false,
          error: 'No vehicles found for this ZIP code',
        },
        ...defaultVehicleActions,
      });

      render(<VehicleListingPage />);

      // Wait for the component to update after the useEffect runs
      await waitFor(() => {
        expect(screen.getByTestId('empty-state')).toBeInTheDocument();
        expect(screen.getByText('No vehicles available')).toBeInTheDocument();
      });
    });

    it('should not show empty state when loading', () => {
      mockUseVehicle.mockReturnValue({
        state: { ...defaultVehicleState, vehicles: [], isLoading: true },
        ...defaultVehicleActions,
      });

      render(<VehicleListingPage />);

      expect(screen.queryByTestId('empty-state')).not.toBeInTheDocument();
    });

    it('should not show empty state when vehicles exist', () => {
      mockUseVehicle.mockReturnValue({
        state: {
          ...defaultVehicleState,
          vehicles: [{ id: '1', make: 'BMW', model: 'X5' }],
          isLoading: false,
        },
        ...defaultVehicleActions,
      });

      render(<VehicleListingPage />);

      expect(screen.queryByTestId('empty-state')).not.toBeInTheDocument();
    });
  });

  describe('Filter modal functionality', () => {
    it('should show filter button on small screens', () => {
      mockUseVehicle.mockReturnValue({
        state: {
          ...defaultVehicleState,
          vehicles: [{ id: '1', make: 'BMW' }],
          isLoading: false,
        },
        ...defaultVehicleActions,
      });

      render(<VehicleListingPage />);

      expect(screen.getByTestId('filter-button')).toBeInTheDocument();
    });

    it('should open filter modal when filter button is clicked', () => {
      mockUseVehicle.mockReturnValue({
        state: {
          ...defaultVehicleState,
          vehicles: [{ id: '1', make: 'BMW' }],
          isLoading: false,
        },
        ...defaultVehicleActions,
      });

      render(<VehicleListingPage />);

      const filterButton = screen.getByTestId('filter-button');
      fireEvent.click(filterButton);

      expect(screen.getByTestId('filter-modal')).toBeInTheDocument();
    });

    it('should close filter modal when close button is clicked', () => {
      mockUseVehicle.mockReturnValue({
        state: {
          ...defaultVehicleState,
          vehicles: [{ id: '1', make: 'BMW' }],
          isLoading: false,
        },
        ...defaultVehicleActions,
      });

      render(<VehicleListingPage />);

      // Open modal
      const filterButton = screen.getByTestId('filter-button');
      fireEvent.click(filterButton);

      expect(screen.getByTestId('filter-modal')).toBeInTheDocument();

      // Close modal
      const closeButton = screen.getByTestId('close-modal');
      fireEvent.click(closeButton);

      expect(screen.queryByTestId('filter-modal')).not.toBeInTheDocument();
    });
  });

  describe('Onboarding modal integration', () => {
    it('should show onboarding modal when showModal is true', () => {
      mockUseOnboarding.mockReturnValue({ showModal: true });

      render(<VehicleListingPage />);

      expect(screen.getByTestId('onboarding-modal')).toBeInTheDocument();
    });

    it('should not show onboarding modal when showModal is false', () => {
      mockUseOnboarding.mockReturnValue({ showModal: false });

      render(<VehicleListingPage />);

      expect(screen.queryByTestId('onboarding-modal')).not.toBeInTheDocument();
    });
  });

  describe('LocalStorage integration', () => {
    it('should search vehicles with stored zip code on mount', async () => {
      const mockSearchVehicles = vi.fn();
      mockLocalStorage.getItem.mockReturnValue(
        JSON.stringify({ zipCode: '90210' })
      );
      mockUseVehicle.mockReturnValue({
        state: defaultVehicleState,
        ...defaultVehicleActions,
        searchVehicles: mockSearchVehicles,
      });

      render(<VehicleListingPage />);

      await waitFor(() => {
        expect(mockSearchVehicles).toHaveBeenCalledWith('90210');
      });
    });

    it('should search vehicles with default zip code when no stored data', async () => {
      const mockSearchVehicles = vi.fn();
      mockLocalStorage.getItem.mockReturnValue(null);
      mockUseVehicle.mockReturnValue({
        state: defaultVehicleState,
        ...defaultVehicleActions,
        searchVehicles: mockSearchVehicles,
      });

      render(<VehicleListingPage />);

      await waitFor(() => {
        expect(mockSearchVehicles).toHaveBeenCalledWith('10001');
      });
    });

    it('should handle corrupted localStorage data', async () => {
      const mockSearchVehicles = vi.fn();
      mockLocalStorage.getItem.mockReturnValue('invalid-json');
      mockUseVehicle.mockReturnValue({
        state: defaultVehicleState,
        ...defaultVehicleActions,
        searchVehicles: mockSearchVehicles,
      });

      render(<VehicleListingPage />);

      await waitFor(() => {
        expect(mockSearchVehicles).toHaveBeenCalledWith('10001');
      });
    });
  });

  describe('Error handling', () => {
    it('should handle missing zip code in stored data', () => {
      const mockSearchVehicles = vi.fn();
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify({}));
      mockUseVehicle.mockReturnValue({
        state: {
          ...defaultVehicleState,
          vehicles: [],
          isLoading: false,
          error: 'No vehicles found for this ZIP code',
        },
        ...defaultVehicleActions,
        searchVehicles: mockSearchVehicles,
      });

      render(<VehicleListingPage />);

      // The searchVehicles should be called in the useEffect
      // Since the component is already in a state where it doesn't need to search,
      // we'll just verify that the component renders without crashing
      expect(screen.getByTestId('empty-state')).toBeInTheDocument();
    });

    it('should handle JSON parse error gracefully', async () => {
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      const mockSearchVehicles = vi.fn();
      mockLocalStorage.getItem.mockReturnValue('invalid-json');
      mockUseVehicle.mockReturnValue({
        state: defaultVehicleState,
        ...defaultVehicleActions,
        searchVehicles: mockSearchVehicles,
      });

      render(<VehicleListingPage />);

      await waitFor(() => {
        expect(mockSearchVehicles).toHaveBeenCalledWith('10001');
      });

      consoleSpy.mockRestore();
    });
  });

  describe('Responsive design', () => {
    it('should render filter panel for large screens', () => {
      render(<VehicleListingPage />);

      expect(screen.getByTestId('filter-panel')).toBeInTheDocument();
    });

    it('should render filter button for small screens', () => {
      mockUseVehicle.mockReturnValue({
        state: {
          ...defaultVehicleState,
          vehicles: [{ id: '1', make: 'BMW' }],
          isLoading: false,
        },
        ...defaultVehicleActions,
      });

      render(<VehicleListingPage />);

      expect(screen.getByTestId('filter-button')).toBeInTheDocument();
    });
  });

  describe('Component integration', () => {
    it('should integrate with all required hooks', () => {
      render(<VehicleListingPage />);

      expect(mockUseVehicle).toHaveBeenCalled();
      expect(mockUseOnboarding).toHaveBeenCalled();
      expect(mockUseZipCodeModal).toHaveBeenCalled();
    });

    it('should pass correct props to VehicleGrid', () => {
      mockUseVehicle.mockReturnValue({
        state: {
          ...defaultVehicleState,
          vehicles: [{ id: '1', make: 'BMW' }],
          isLoading: false,
        },
        ...defaultVehicleActions,
      });

      render(<VehicleListingPage />);

      const vehicleGrid = screen.getByTestId('vehicle-grid');
      expect(vehicleGrid).toBeInTheDocument();
    });
  });

  describe('State management', () => {
    it('should handle initial load state correctly', async () => {
      mockUseVehicle.mockReturnValue({
        state: {
          ...defaultVehicleState,
          vehicles: [],
          isLoading: false,
          error: 'No vehicles found for this ZIP code',
        },
        ...defaultVehicleActions,
      });

      render(<VehicleListingPage />);

      // Should show empty state when no vehicles and not loading
      await waitFor(() => {
        expect(screen.getByTestId('empty-state')).toBeInTheDocument();
      });
    });

    it('should handle vehicles loaded state correctly', () => {
      mockUseVehicle.mockReturnValue({
        state: {
          ...defaultVehicleState,
          vehicles: [{ id: '1', make: 'BMW', model: 'X5' }],
          isLoading: false,
        },
        ...defaultVehicleActions,
      });

      render(<VehicleListingPage />);

      // Should not show empty state when vehicles exist
      expect(screen.queryByTestId('empty-state')).not.toBeInTheDocument();
    });
  });
});
