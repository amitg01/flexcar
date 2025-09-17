// Application constants

export const APP_CONFIG = {
  name: 'FlexCar Vehicle Search',
  version: '1.0.0',
  theme: {
    primaryColor: '#0049B7',
    colors: {
      primary: '#0049B7',
      secondary: '#6B7280',
      success: '#10B981',
      warning: '#F59E0B',
      danger: '#EF4444',
    },
  },
} as const;

export const VALIDATION_RULES = {
  zipCode: {
    pattern: /^\d{5}(-\d{4})?$/,
    message: 'Please enter a valid ZIP code (5 digits)',
  },
  required: {
    message: 'This field is required',
  },
} as const;

export const API_CONFIG = {
  baseUrl: process.env.REACT_APP_API_URL || 'https://api.flexcar.com',
  timeout: 10000,
  retries: 3,
} as const;

export const UI_CONFIG = {
  debounceDelay: 300,
  animationDuration: 200,
  itemsPerPage: 12,
  maxImageRetries: 3,
} as const;

export const SORT_OPTIONS = [
  { value: 'price-high-low', label: 'Price: High to Low' },
  { value: 'price-low-high', label: 'Price: Low to High' },
  { value: 'make-alphabetical', label: 'Make: A to Z' },
] as const;

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  NOT_FOUND: 'No vehicles found for the specified criteria.',
  INVALID_ZIP: 'Please enter a valid ZIP code.',
  GENERIC_ERROR: 'An unexpected error occurred. Please try again.',
} as const;
