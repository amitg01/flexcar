import type { Vehicle } from '@/data/vehicles';

export type SortOption =
  | 'popularity'
  | 'price-high-low'
  | 'price-low-high'
  | 'make-alphabetical';

export interface VehicleState {
  vehicles: Vehicle[];
  filteredVehicles: Vehicle[];
  selectedMake: string;
  selectedColor: string;
  sortBy: SortOption;
  zipCode: string;
  isLoading: boolean;
  error: string | null;
}

export type VehicleAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_VEHICLES'; payload: Vehicle[] }
  | { type: 'SET_ZIP_CODE'; payload: string }
  | { type: 'SET_FILTER_MAKE'; payload: string }
  | { type: 'SET_FILTER_COLOR'; payload: string }
  | { type: 'SET_SORT_BY'; payload: SortOption }
  | { type: 'CLEAR_FILTERS' }
  | { type: 'APPLY_FILTERS_AND_SORT' };

export interface VehicleContextType {
  state: VehicleState;
  dispatch: React.Dispatch<VehicleAction>;
  searchVehicles: (zipCode: string) => Promise<void>;
  clearFilters: () => void;
  getAvailableMakes: () => string[];
  getAvailableColors: () => string[];
}
