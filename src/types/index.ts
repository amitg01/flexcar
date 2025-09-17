// Global type definitions for the FlexCar application

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  trim: string;
  year: number;
  color: string;
  mileage: number;
  price: number;
  image: string;
  zipCode: string;
}

export type SortOption =
  | 'price-high-low'
  | 'price-low-high'
  | 'make-alphabetical';

export interface SearchFilters {
  make: string;
  color: string;
  sortBy: SortOption;
}

export interface SearchState {
  vehicles: Vehicle[];
  filteredVehicles: Vehicle[];
  filters: SearchFilters;
  zipCode: string;
  isLoading: boolean;
  error: string | null;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  total: number;
}

export interface VehicleSearchParams {
  zipCode: string;
  make?: string;
  color?: string;
  sortBy?: SortOption;
  pagination?: PaginationParams;
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Component prop types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface LoadingProps {
  isLoading?: boolean;
  loadingText?: string;
}

export interface ErrorProps {
  error?: string | null;
  onRetry?: () => void;
}
