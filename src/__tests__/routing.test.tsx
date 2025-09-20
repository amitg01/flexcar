import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
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

// Custom render function with providers
const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, {
    wrapper: ({ children }) => (
      <MemoryRouter initialEntries={[route]}>
        <OnboardingProvider>
          <VehicleProvider>{children}</VehicleProvider>
        </OnboardingProvider>
      </MemoryRouter>
    ),
  });
};

describe('Routing', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders HomePage on root route', () => {
    renderWithRouter(<App />, { route: '/' });

    // Should show the onboarding modal since no user data exists
    expect(screen.getByText('Find Flexcars near you')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('12345')).toBeInTheDocument();
  });

  it('renders NotFound page on invalid route', () => {
    renderWithRouter(<App />, { route: '/invalid-route' });

    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    expect(
      screen.getByText('The page you are looking for does not exist.')
    ).toBeInTheDocument();
  });

  it('redirects to home when accessing /inventory without user data', () => {
    // Mock window.location.href
    const mockLocation = { href: '' };
    Object.defineProperty(window, 'location', {
      value: mockLocation,
      writable: true,
    });

    renderWithRouter(<App />, { route: '/inventory' });

    // Should redirect to home since no user data exists
    expect(mockLocation.href).toBe('/');
  });

  it('renders VehicleListingPage when accessing /inventory with user data', () => {
    // Set user data in localStorage
    const userData = { zipCode: '10001', age: '26-30', creditScore: '580-669' };
    localStorage.setItem('flexcar-user-data', JSON.stringify(userData));

    renderWithRouter(<App />, { route: '/inventory' });

    // Should show the vehicle listing page
    expect(screen.getByText('Available Vehicles')).toBeInTheDocument();
  });
});
