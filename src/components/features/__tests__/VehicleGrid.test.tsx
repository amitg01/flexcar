import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import VehicleGrid from '../VehicleGrid';
import { VehicleProvider } from '../../../contexts/VehicleContext';
import type { Vehicle } from '../../../types/index';

// Mock VehicleCard component
vi.mock('../VehicleCard', () => ({
  default: ({ vehicle }: { vehicle: Vehicle }) => (
    <div data-testid={`vehicle-card-${vehicle.id}`}>
      {vehicle.make} {vehicle.model}
    </div>
  ),
}));

// Mock the vehicle context
const mockVehicleContext = {
  state: {
    vehicles: [
      { id: '1', make: 'BMW', model: 'X5', price: 65000 },
      { id: '2', make: 'Audi', model: 'A4', price: 45000 },
    ],
    filteredVehicles: [
      { id: '1', make: 'BMW', model: 'X5', price: 65000 },
      { id: '2', make: 'Audi', model: 'A4', price: 45000 },
    ],
    selectedMake: '',
    selectedColor: '',
    sortBy: 'price-high-low',
    zipCode: '10001',
    isLoading: false,
    error: null,
  },
  dispatch: vi.fn(),
  clearFilters: vi.fn(),
  getAvailableMakes: vi.fn(),
  getAvailableColors: vi.fn(),
  searchVehicles: vi.fn(),
};

vi.mock('@/hooks/useVehicle', () => ({
  useVehicle: () => mockVehicleContext,
}));

const renderWithProvider = (ui: React.ReactElement) => {
  return render(ui, {
    wrapper: ({ children }) => <VehicleProvider>{children}</VehicleProvider>,
  });
};

describe('VehicleGrid', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockVehicleContext.state.isLoading = false;
    mockVehicleContext.state.error = null;
    mockVehicleContext.state.vehicles = [
      { id: '1', make: 'BMW', model: 'X5', price: 65000 },
      { id: '2', make: 'Audi', model: 'A4', price: 45000 },
    ];
    mockVehicleContext.state.filteredVehicles =
      mockVehicleContext.state.vehicles;
  });

  it('should render vehicle grid with results count', () => {
    renderWithProvider(<VehicleGrid />);

    expect(
      screen.getByText(/Showing 2 vehicles in 3 columns/)
    ).toBeInTheDocument();
  });

  it('should render vehicle cards', () => {
    renderWithProvider(<VehicleGrid />);

    expect(screen.getByTestId('vehicle-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('vehicle-card-2')).toBeInTheDocument();
    expect(screen.getByText('BMW X5')).toBeInTheDocument();
    expect(screen.getByText('Audi A4')).toBeInTheDocument();
  });

  it('should show loading skeleton when loading', () => {
    mockVehicleContext.state.isLoading = true;
    mockVehicleContext.state.vehicles = [];

    renderWithProvider(<VehicleGrid />);

    // Check for skeleton elements instead of "Loading..." text
    expect(screen.getByTestId('vehicle-grid-skeleton')).toBeInTheDocument();
  });

  it('should show empty state when no vehicles match filters', () => {
    mockVehicleContext.state.filteredVehicles = [];
    mockVehicleContext.state.vehicles = [
      { id: '1', make: 'BMW', model: 'X5', price: 65000 },
    ];

    renderWithProvider(<VehicleGrid />);

    expect(
      screen.getByText('No vehicles match your filters')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Try adjusting your filters to see more results.')
    ).toBeInTheDocument();
    expect(screen.getByText('Clear Filters')).toBeInTheDocument();
  });

  it('should call clearFilters when clear filters button is clicked', () => {
    mockVehicleContext.state.filteredVehicles = [];
    mockVehicleContext.state.vehicles = [
      { id: '1', make: 'BMW', model: 'X5', price: 65000 },
    ];

    renderWithProvider(<VehicleGrid />);

    const clearButton = screen.getByText('Clear Filters');
    clearButton.click();

    expect(mockVehicleContext.clearFilters).toHaveBeenCalled();
  });

  it('should render with custom className', () => {
    renderWithProvider(<VehicleGrid className="custom-class" />);

    const gridContainer = screen
      .getByText(/Showing 2 vehicles in 3 columns/)
      .closest('.w-full');
    expect(gridContainer).toHaveClass('custom-class');
  });

  it('should handle single vehicle result', () => {
    mockVehicleContext.state.filteredVehicles = [
      { id: '1', make: 'BMW', model: 'X5', price: 65000 },
    ];

    renderWithProvider(<VehicleGrid />);

    expect(
      screen.getByText(/Showing 1 vehicles in 3 columns/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Showing 1 vehicles in 3 columns/)
    ).toBeInTheDocument();
  });

  it('should handle zero vehicles', () => {
    mockVehicleContext.state.vehicles = [];
    mockVehicleContext.state.filteredVehicles = [];

    renderWithProvider(<VehicleGrid />);

    expect(
      screen.getByText(/Showing 0 vehicles in 3 columns/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Showing 0 vehicles in 3 columns/)
    ).toBeInTheDocument();
  });

  it('should render vehicle cards in grid layout', () => {
    renderWithProvider(<VehicleGrid />);

    const gridContainer = screen
      .getByText(/Showing 2 vehicles in 3 columns/)
      .closest('.w-full');
    const grid = gridContainer?.querySelector('.grid');

    expect(grid).toHaveClass(
      'grid-cols-1',
      'sm:grid-cols-2',
      'lg:grid-cols-3',
      'gap-6'
    );
  });

  it('should show loading spinner in vehicle card fallback', async () => {
    mockVehicleContext.state.isLoading = true;
    mockVehicleContext.state.vehicles = [];

    renderWithProvider(<VehicleGrid />);

    // Check for skeleton elements instead of "Loading..." text
    expect(screen.getByTestId('vehicle-grid-skeleton')).toBeInTheDocument();
  });

  it('should handle multiple vehicles correctly', () => {
    mockVehicleContext.state.filteredVehicles = [
      { id: '1', make: 'BMW', model: 'X5', price: 65000 },
      { id: '2', make: 'Audi', model: 'A4', price: 45000 },
      { id: '3', make: 'Mercedes', model: 'C-Class', price: 55000 },
    ];

    renderWithProvider(<VehicleGrid />);

    expect(
      screen.getByText(/Showing 3 vehicles in 3 columns/)
    ).toBeInTheDocument();
    expect(screen.getByTestId('vehicle-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('vehicle-card-2')).toBeInTheDocument();
    expect(screen.getByTestId('vehicle-card-3')).toBeInTheDocument();
  });
});
