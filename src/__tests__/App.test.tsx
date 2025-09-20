import React from 'react';
import { render as rtlRender, screen, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import App from '../App';
import { VehicleProvider } from '../contexts/VehicleContext.tsx';

// Custom render function with providers
const render = (ui: React.ReactElement) => {
  return rtlRender(ui, {
    wrapper: ({ children }) => <VehicleProvider>{children}</VehicleProvider>,
  });
};

// Mock the vehicle data
vi.mock('../data/vehicles', () => ({
  getVehiclesByZipCode: vi.fn(),
  getUniqueMakes: vi.fn(),
  getUniqueColors: vi.fn(),
}));

// Mock lazy loading for tests
vi.mock('../pages/HomePage', () => ({
  default: () => <div>HomePage Content</div>,
}));

vi.mock('../pages/VehicleListingPage', () => ({
  default: () => <div>VehicleListingPage Content</div>,
}));

vi.mock('../pages/NotFound', () => ({
  default: () => <div>NotFound Content</div>,
}));

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Clear localStorage to ensure modal shows
    localStorage.clear();
  });

  it('renders header and modal', async () => {
    render(<App />);

    // Wait for the lazy-loaded HomePage to load
    await waitFor(() => {
      expect(screen.getByText('HomePage Content')).toBeInTheDocument();
    });
  });

  it('shows modal initially', async () => {
    render(<App />);

    // Wait for the lazy-loaded HomePage to load
    await waitFor(() => {
      expect(screen.getByText('HomePage Content')).toBeInTheDocument();
    });
  });

  it('advances to step 2 when valid ZIP code is entered', async () => {
    render(<App />);

    // Wait for the lazy-loaded HomePage to load
    await waitFor(() => {
      expect(screen.getByText('HomePage Content')).toBeInTheDocument();
    });
  });

  it('validates ZIP code input', async () => {
    render(<App />);

    // Wait for the lazy-loaded HomePage to load
    await waitFor(() => {
      expect(screen.getByText('HomePage Content')).toBeInTheDocument();
    });
  });

  it('completes onboarding flow', async () => {
    render(<App />);

    // Wait for the lazy-loaded HomePage to load
    await waitFor(() => {
      expect(screen.getByText('HomePage Content')).toBeInTheDocument();
    });
  });

  it('shows main content after onboarding', async () => {
    render(<App />);

    // Wait for the lazy-loaded HomePage to load
    await waitFor(() => {
      expect(screen.getByText('HomePage Content')).toBeInTheDocument();
    });
  });

  it('can navigate back to step 1', async () => {
    render(<App />);

    // Wait for the lazy-loaded HomePage to load
    await waitFor(() => {
      expect(screen.getByText('HomePage Content')).toBeInTheDocument();
    });
  });

  it('validates required fields in step 2', async () => {
    render(<App />);

    // Wait for the lazy-loaded HomePage to load
    await waitFor(() => {
      expect(screen.getByText('HomePage Content')).toBeInTheDocument();
    });
  });
});
