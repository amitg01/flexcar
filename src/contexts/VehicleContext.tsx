import React, { useReducer, type ReactNode } from 'react';
import {
  getVehiclesByZipCode,
  getUniqueMakes,
  getUniqueColors,
} from '../data/vehicles';
import { VehicleContext, type VehicleState, type VehicleAction, type VehicleContextType } from './VehicleContext';

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
const vehicleReducer = (state: VehicleState, action: VehicleAction): VehicleState => {
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

    case 'APPLY_FILTERS_AND_SORT': {
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
    }

    default:
      return state;
  }
};

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
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const vehicles = getVehiclesByZipCode(zipCode);
      if (vehicles.length === 0) {
        dispatch({
          type: 'SET_ERROR',
          payload: 'No vehicles found for this ZIP code. Please try another location.',
        });
        dispatch({ type: 'SET_VEHICLES', payload: [] });
      } else {
        dispatch({ type: 'SET_VEHICLES', payload: vehicles });
      }
    } catch {
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

// Hook is exported from hooks/useVehicle.ts to avoid react-refresh issues