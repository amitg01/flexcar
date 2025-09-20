import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import App from '../App';
import { OnboardingProvider } from '../contexts/OnboardingContext';
import { VehicleProvider } from '../contexts/VehicleContext.tsx';

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

// Mock OnboardingContext to avoid useNavigate issues
vi.mock('../contexts/OnboardingContext', () => ({
  OnboardingProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

// Custom render function with providers
const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, {
    wrapper: ({ children }) => (
      <OnboardingProvider>
        <VehicleProvider>{children}</VehicleProvider>
      </OnboardingProvider>
    ),
  });
};

describe('Routing', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders HomePage on root route', async () => {
    renderWithRouter(<App />, { route: '/' });

    // Wait for the lazy-loaded HomePage to load
    await waitFor(() => {
      expect(screen.getByText('HomePage Content')).toBeInTheDocument();
    });
  });

  it('renders NotFound page on invalid route', async () => {
    renderWithRouter(<App />, { route: '/invalid-route' });

    // Wait for the lazy-loaded NotFound page to load
    await waitFor(() => {
      expect(screen.getByText('NotFound Content')).toBeInTheDocument();
    });
  });

  it('redirects to home when accessing /inventory without user data', async () => {
    renderWithRouter(<App />, { route: '/inventory' });

    // Wait for the lazy-loaded VehicleListingPage to load
    await waitFor(() => {
      expect(
        screen.getByText('VehicleListingPage Content')
      ).toBeInTheDocument();
    });
  });

  it('renders VehicleListingPage when accessing /inventory with user data', async () => {
    // Set user data in localStorage
    const userData = { zipCode: '10001', age: '26-30', creditScore: '580-669' };
    localStorage.setItem('flexcar-user-data', JSON.stringify(userData));

    renderWithRouter(<App />, { route: '/inventory' });

    // Wait for the lazy-loaded VehicleListingPage to load
    await waitFor(() => {
      expect(
        screen.getByText('VehicleListingPage Content')
      ).toBeInTheDocument();
    });
  });
});
