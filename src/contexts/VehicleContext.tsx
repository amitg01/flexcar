import React, {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from 'react';
import type { Vehicle } from '../data/vehicles';
import {
  getVehiclesByZipCode,
  getUniqueMakes,
  getUniqueColors,
} from '../data/vehicles';

// Types
export type SortOption =
  | 'price-high-low'
  | 'price-low-high'
  | 'make-alphabetical';

interface VehicleState {
  vehicles: Vehicle[];
  filteredVehicles: Vehicle[];
  selectedMake: string;
  selectedColor: string;
  sortBy: SortOption;
  zipCode: string;
  isLoading: boolean;
  error: string | null;
}

type VehicleAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_VEHICLES'; payload: Vehicle[] }
  | { type: 'SET_ZIP_CODE'; payload: string }
  | { type: 'SET_FILTER_MAKE'; payload: string }
  | { type: 'SET_FILTER_COLOR'; payload: string }
  | { type: 'SET_SORT_BY'; payload: SortOption }
  | { type: 'CLEAR_FILTERS' }
  | { type: 'APPLY_FILTERS_AND_SORT' };

interface VehicleContextType {
  state: VehicleState;
  dispatch: React.Dispatch<VehicleAction>;
  searchVehicles: (zipCode: string) => Promise<void>;
  clearFilters: () => void;
  getAvailableMakes: () => string[];
  getAvailableColors: () => string[];
}

// Initial state
const initialState: VehicleState = {
  vehicles: [],
  filteredVehicles: [],
  selectedMake: '',
  selectedColor: '',
  sortBy: 'price-high-low',
  zipCode: '',
  isLoading: false,
  error: null,
};

// Reducer
function vehicleReducer(
  state: VehicleState,
  action: VehicleAction
): VehicleState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };

    case 'SET_VEHICLES':
      return {
        ...state,
        vehicles: action.payload,
        filteredVehicles: action.payload,
        isLoading: false,
        error: null,
      };

    case 'SET_ZIP_CODE':
      return { ...state, zipCode: action.payload };

    case 'SET_FILTER_MAKE':
      return { ...state, selectedMake: action.payload };

    case 'SET_FILTER_COLOR':
      return { ...state, selectedColor: action.payload };

    case 'SET_SORT_BY':
      return { ...state, sortBy: action.payload };

    case 'CLEAR_FILTERS':
      return {
        ...state,
        selectedMake: '',
        selectedColor: '',
        filteredVehicles: state.vehicles,
      };

    case 'APPLY_FILTERS_AND_SORT':
      let filtered = [...state.vehicles];

      // Apply filters
      if (state.selectedMake) {
        filtered = filtered.filter(
          (vehicle) => vehicle.make === state.selectedMake
        );
      }
      if (state.selectedColor) {
        filtered = filtered.filter(
          (vehicle) => vehicle.color === state.selectedColor
        );
      }

      // Apply sorting
      filtered.sort((a, b) => {
        switch (state.sortBy) {
          case 'price-high-low':
            return b.price - a.price;
          case 'price-low-high':
            return a.price - b.price;
          case 'make-alphabetical':
            return a.make.localeCompare(b.make);
          default:
            return 0;
        }
      });

      return { ...state, filteredVehicles: filtered };

    default:
      return state;
  }
}

// Context
const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

// Provider
interface VehicleProviderProps {
  children: ReactNode;
}

export const VehicleProvider: React.FC<VehicleProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(vehicleReducer, initialState);

  const searchVehicles = async (zipCode: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });
    dispatch({ type: 'SET_ZIP_CODE', payload: zipCode });

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 200));

      const vehicles = getVehiclesByZipCode(zipCode);

      if (vehicles.length === 0) {
        dispatch({
          type: 'SET_ERROR',
          payload: `No vehicles found for ZIP code ${zipCode}. Try searching in 10001 or 90210.`,
        });
        dispatch({ type: 'SET_VEHICLES', payload: [] });
      } else {
        dispatch({ type: 'SET_VEHICLES', payload: vehicles });
      }
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'An error occurred while searching. Please try again.',
      });
    }
  };

  const clearFilters = () => {
    dispatch({ type: 'CLEAR_FILTERS' });
  };

  const getAvailableMakes = () => {
    return getUniqueMakes(state.vehicles);
  };

  const getAvailableColors = () => {
    return getUniqueColors(state.vehicles);
  };

  const value: VehicleContextType = {
    state,
    dispatch,
    searchVehicles,
    clearFilters,
    getAvailableMakes,
    getAvailableColors,
  };

  return (
    <VehicleContext.Provider value={value}>{children}</VehicleContext.Provider>
  );
};

// Hook
export const useVehicle = () => {
  const context = useContext(VehicleContext);
  if (context === undefined) {
    throw new Error('useVehicle must be used within a VehicleProvider');
  }
  return context;
};
