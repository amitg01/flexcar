import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { VehicleProvider } from '../VehicleContext';
import { VehicleContext } from '../VehicleContextInstance';
import {
  getVehiclesByZipCode,
  getUniqueMakes,
  getUniqueColors,
} from '../../data/vehicles';

// Mock the vehicle data functions
vi.mock('@/data/vehicles', () => ({
  getVehiclesByZipCode: vi.fn(),
  getUniqueMakes: vi.fn(),
  getUniqueColors: vi.fn(),
}));

const mockVehicles = [
  {
    id: '1',
    make: 'BMW',
    model: 'X5',
    trim: 'xDrive40i',
    year: 2023,
    color: 'Black',
    price: 65000,
    image: 'test-image.jpg',
    zipCode: '10001',
    mileage: 15000,
  },
  {
    id: '2',
    make: 'Audi',
    model: 'A4',
    trim: 'Premium',
    year: 2022,
    color: 'White',
    price: 45000,
    image: 'test-image2.jpg',
    zipCode: '10001',
    mileage: 25000,
  },
];

// Create a test component that uses the context
const TestComponent = () => {
  const context = React.useContext(VehicleContext);
  if (!context) {
    throw new Error('useVehicle must be used within a VehicleProvider');
  }
  return context;
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <VehicleProvider>{children}</VehicleProvider>
);

describe('VehicleContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getVehiclesByZipCode).mockReturnValue(mockVehicles);
    vi.mocked(getUniqueMakes).mockReturnValue(['BMW', 'Audi']);
    vi.mocked(getUniqueColors).mockReturnValue(['Black', 'White']);
  });

  it('should provide initial state', () => {
    const { result } = renderHook(() => TestComponent(), { wrapper });

    expect(result.current.state.vehicles).toEqual([]);
    expect(result.current.state.filteredVehicles).toEqual([]);
    expect(result.current.state.selectedMake).toBe('');
    expect(result.current.state.selectedColor).toBe('');
    expect(result.current.state.sortBy).toBe('price-high-low');
    expect(result.current.state.zipCode).toBe('');
    expect(result.current.state.isLoading).toBe(false);
    expect(result.current.state.error).toBeNull();
  });

  it('should search vehicles successfully', async () => {
    const { result } = renderHook(() => TestComponent(), { wrapper });

    await act(async () => {
      await result.current.searchVehicles('10001');
    });

    expect(getVehiclesByZipCode).toHaveBeenCalledWith('10001');
    expect(result.current.state.vehicles).toEqual(mockVehicles);
    expect(result.current.state.filteredVehicles).toEqual(mockVehicles);
    expect(result.current.state.zipCode).toBe('10001');
    expect(result.current.state.isLoading).toBe(false);
    expect(result.current.state.error).toBeNull();
  });

  it('should handle search error when no vehicles found', async () => {
    vi.mocked(getVehiclesByZipCode).mockReturnValue([]);
    const { result } = renderHook(() => TestComponent(), { wrapper });

    await act(async () => {
      await result.current.searchVehicles('99999');
    });

    expect(result.current.state.vehicles).toEqual([]);
    expect(result.current.state.error).toContain(
      'No vehicles found for this ZIP code'
    );
    expect(result.current.state.isLoading).toBe(false);
  });

  it('should handle search error on exception', async () => {
    vi.mocked(getVehiclesByZipCode).mockImplementation(() => {
      throw new Error('API Error');
    });
    const { result } = renderHook(() => TestComponent(), { wrapper });

    await act(async () => {
      await result.current.searchVehicles('10001');
    });

    expect(result.current.state.error).toBe(
      'An error occurred while searching. Please try again.'
    );
    expect(result.current.state.isLoading).toBe(false);
  });

  it('should filter vehicles by make', async () => {
    const { result } = renderHook(() => TestComponent(), { wrapper });

    // First load vehicles
    await act(async () => {
      await result.current.searchVehicles('10001');
    });

    // Then filter by make
    act(() => {
      result.current.dispatch({ type: 'SET_FILTER_MAKE', payload: 'BMW' });
    });

    act(() => {
      result.current.dispatch({ type: 'APPLY_FILTERS_AND_SORT' });
    });

    expect(result.current.state.filteredVehicles).toHaveLength(1);
    expect(result.current.state.filteredVehicles[0].make).toBe('BMW');
  });

  it('should filter vehicles by color', async () => {
    const { result } = renderHook(() => TestComponent(), { wrapper });

    await act(async () => {
      await result.current.searchVehicles('10001');
    });

    act(() => {
      result.current.dispatch({ type: 'SET_FILTER_COLOR', payload: 'Black' });
    });

    act(() => {
      result.current.dispatch({ type: 'APPLY_FILTERS_AND_SORT' });
    });

    expect(result.current.state.filteredVehicles).toHaveLength(1);
    expect(result.current.state.filteredVehicles[0].color).toBe('Black');
  });

  it('should sort vehicles by price high to low', async () => {
    const { result } = renderHook(() => TestComponent(), { wrapper });

    await act(async () => {
      await result.current.searchVehicles('10001');
    });

    act(() => {
      result.current.dispatch({
        type: 'SET_SORT_BY',
        payload: 'price-high-low',
      });
    });

    act(() => {
      result.current.dispatch({ type: 'APPLY_FILTERS_AND_SORT' });
    });

    expect(result.current.state.filteredVehicles[0].price).toBe(65000);
    expect(result.current.state.filteredVehicles[1].price).toBe(45000);
  });

  it('should sort vehicles by price low to high', async () => {
    const { result } = renderHook(() => TestComponent(), { wrapper });

    await act(async () => {
      await result.current.searchVehicles('10001');
    });

    act(() => {
      result.current.dispatch({
        type: 'SET_SORT_BY',
        payload: 'price-low-high',
      });
    });

    act(() => {
      result.current.dispatch({ type: 'APPLY_FILTERS_AND_SORT' });
    });

    expect(result.current.state.filteredVehicles[0].price).toBe(45000);
    expect(result.current.state.filteredVehicles[1].price).toBe(65000);
  });

  it('should sort vehicles by make alphabetically', async () => {
    const { result } = renderHook(() => TestComponent(), { wrapper });

    await act(async () => {
      await result.current.searchVehicles('10001');
    });

    act(() => {
      result.current.dispatch({
        type: 'SET_SORT_BY',
        payload: 'make-alphabetical',
      });
    });

    act(() => {
      result.current.dispatch({ type: 'APPLY_FILTERS_AND_SORT' });
    });

    expect(result.current.state.filteredVehicles[0].make).toBe('Audi');
    expect(result.current.state.filteredVehicles[1].make).toBe('BMW');
  });

  it('should clear all filters', async () => {
    const { result } = renderHook(() => TestComponent(), { wrapper });

    await act(async () => {
      await result.current.searchVehicles('10001');
    });

    // Set some filters
    act(() => {
      result.current.dispatch({ type: 'SET_FILTER_MAKE', payload: 'BMW' });
      result.current.dispatch({ type: 'SET_FILTER_COLOR', payload: 'Black' });
    });

    // Clear filters
    act(() => {
      result.current.clearFilters();
    });

    expect(result.current.state.selectedMake).toBe('');
    expect(result.current.state.selectedColor).toBe('');
    expect(result.current.state.filteredVehicles).toEqual(mockVehicles);
  });

  it('should get available makes', async () => {
    const { result } = renderHook(() => TestComponent(), { wrapper });

    await act(async () => {
      await result.current.searchVehicles('10001');
    });

    const makes = result.current.getAvailableMakes();
    expect(getUniqueMakes).toHaveBeenCalledWith(mockVehicles);
    expect(makes).toEqual(['BMW', 'Audi']);
  });

  it('should get available colors', async () => {
    const { result } = renderHook(() => TestComponent(), { wrapper });

    await act(async () => {
      await result.current.searchVehicles('10001');
    });

    const colors = result.current.getAvailableColors();
    expect(getUniqueColors).toHaveBeenCalledWith(mockVehicles);
    expect(colors).toEqual(['Black', 'White']);
  });

  it('should preserve error state when no vehicles found', async () => {
    vi.mocked(getVehiclesByZipCode).mockReturnValue([]);
    const { result } = renderHook(() => TestComponent(), { wrapper });

    await act(async () => {
      await result.current.searchVehicles('99999');
    });

    expect(result.current.state.error).toContain(
      'No vehicles found for this ZIP code'
    );
    expect(result.current.state.vehicles).toEqual([]);
  });
});
