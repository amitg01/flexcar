import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, beforeEach, afterEach, it, expect } from 'vitest';
import VehicleCard from '../VehicleCard';
import { type Vehicle } from '../../../data/vehicles';

// Mock vehicle data
const mockVehicle: Vehicle = {
  id: '1',
  make: 'BMW',
  model: 'X5',
  year: 2023,
  trim: 'xDrive40i',
  color: 'Black',
  price: 65000,
  mileage: 15000,
  image: 'https://example.com/bmw-x5.jpg',
  zipCode: '10001',
};

const mockMercedesEV: Vehicle = {
  id: '2',
  make: 'Mercedes',
  model: 'EQB',
  year: 2023,
  trim: 'EQB 300',
  color: 'White',
  price: 55000,
  mileage: 5000,
  image: 'https://example.com/mercedes-eqb.jpg',
  zipCode: '10001',
};

describe('VehicleCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock Math.random to control label visibility
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render vehicle information correctly', () => {
    render(<VehicleCard vehicle={mockVehicle} />);

    expect(screen.getByText('2023 BMW X5')).toBeInTheDocument();
    expect(
      screen.getByText('xDrive40i · 15,000 miles · Black')
    ).toBeInTheDocument();
    expect(screen.getByText('$65,000')).toBeInTheDocument();
    expect(screen.getByText('/mo')).toBeInTheDocument();
    expect(screen.getByText('Get it by Sep 23')).toBeInTheDocument();
  });

  it('should render vehicle image with correct alt text', () => {
    render(<VehicleCard vehicle={mockVehicle} />);

    const image = screen.getByAltText('2023 BMW X5');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/bmw-x5.jpg');
    expect(image).toHaveAttribute('loading', 'lazy');
    expect(image).toHaveAttribute('decoding', 'async');
  });

  it('should show EV label for Mercedes EQB', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    render(<VehicleCard vehicle={mockMercedesEV} />);

    expect(screen.getByText('EV')).toBeInTheDocument();
  });

  it('should show recently added label when random > 0.7', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.8);
    render(<VehicleCard vehicle={mockVehicle} />);

    expect(screen.getByText('Recently added')).toBeInTheDocument();
  });

  it('should show brand new label when random > 0.9', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.95);
    render(<VehicleCard vehicle={mockVehicle} />);

    expect(screen.getByText('Brand new')).toBeInTheDocument();
  });

  it('should show multiple labels when conditions are met', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.95);
    render(<VehicleCard vehicle={mockMercedesEV} />);

    expect(screen.getByText('EV')).toBeInTheDocument();
    expect(screen.getByText('Brand new')).toBeInTheDocument();
  });

  it('should not show labels when conditions are not met', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    render(<VehicleCard vehicle={mockVehicle} />);

    expect(screen.queryByText('EV')).not.toBeInTheDocument();
    expect(screen.queryByText('Recently added')).not.toBeInTheDocument();
    expect(screen.queryByText('Brand new')).not.toBeInTheDocument();
  });

  it('should format price correctly', () => {
    const expensiveVehicle = { ...mockVehicle, price: 125000 };
    render(<VehicleCard vehicle={expensiveVehicle} />);

    expect(screen.getByText('$125,000')).toBeInTheDocument();
    expect(screen.getByText('/mo')).toBeInTheDocument();
  });

  it('should format mileage correctly', () => {
    const highMileageVehicle = { ...mockVehicle, mileage: 150000 };
    render(<VehicleCard vehicle={highMileageVehicle} />);

    expect(
      screen.getByText('xDrive40i · 150,000 miles · Black')
    ).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <VehicleCard vehicle={mockVehicle} className="custom-class" />
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should show loading spinner initially', () => {
    render(<VehicleCard vehicle={mockVehicle} />);

    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('should handle image load successfully', async () => {
    render(<VehicleCard vehicle={mockVehicle} />);

    const image = screen.getByAltText('2023 BMW X5');

    // Simulate image load
    fireEvent.load(image);

    await waitFor(() => {
      expect(image).toHaveClass('opacity-100');
    });
  });

  it('should handle image error and show fallback', async () => {
    render(<VehicleCard vehicle={mockVehicle} />);

    const image = screen.getByAltText('2023 BMW X5');

    // Simulate image error
    fireEvent.error(image);

    await waitFor(() => {
      expect(image).toHaveAttribute(
        'src',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center&auto=format&q=80'
      );
    });
  });

  it('should handle fallback image error and show SVG placeholder', async () => {
    render(<VehicleCard vehicle={mockVehicle} />);

    const image = screen.getByAltText('2023 BMW X5');

    // Simulate first error (triggers fallback)
    fireEvent.error(image);

    await waitFor(() => {
      expect(image).toHaveAttribute(
        'src',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center&auto=format&q=80'
      );
    });

    // Simulate fallback error (triggers SVG placeholder)
    fireEvent.error(image);

    await waitFor(() => {
      expect(image).toHaveAttribute(
        'src',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgMTI1SDIyNVYxNzVIMTc1VjEyNVoiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTE5NSAxNDVIMjA1VjE1NUgxOTVWMjA1WiIgZmlsbD0iIzlDQTNBRiIvPgo8dGV4dCB4PSIyMDAiIHk9IjE4MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNkI3MjgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5WZWhpY2xlIEltYWdlPC90ZXh0Pgo8L3N2Zz4K'
      );
    });
  });

  it('should render with Suspense fallback', () => {
    render(<VehicleCard vehicle={mockVehicle} />);

    // The Suspense fallback should be visible initially
    const fallbackSpinner = screen.getByTestId('loading-spinner');
    expect(fallbackSpinner).toBeInTheDocument();
  });

  it('should have proper accessibility attributes', () => {
    render(<VehicleCard vehicle={mockVehicle} />);

    const image = screen.getByAltText('2023 BMW X5');
    expect(image).toHaveAttribute('loading', 'lazy');
    expect(image).toHaveAttribute('decoding', 'async');
  });

  it('should render different vehicle makes and models correctly', () => {
    const audiVehicle = {
      ...mockVehicle,
      make: 'Audi',
      model: 'A4',
      year: 2022,
      trim: 'Premium Plus',
      color: 'Silver',
    };

    render(<VehicleCard vehicle={audiVehicle} />);

    expect(screen.getByText('2022 Audi A4')).toBeInTheDocument();
    expect(
      screen.getByText('Premium Plus · 15,000 miles · Silver')
    ).toBeInTheDocument();
  });

  it('should handle zero mileage correctly', () => {
    const zeroMileageVehicle = { ...mockVehicle, mileage: 0 };
    render(<VehicleCard vehicle={zeroMileageVehicle} />);

    expect(screen.getByText('xDrive40i · 0 miles · Black')).toBeInTheDocument();
  });

  it('should handle very high mileage correctly', () => {
    const highMileageVehicle = { ...mockVehicle, mileage: 999999 };
    render(<VehicleCard vehicle={highMileageVehicle} />);

    expect(
      screen.getByText('xDrive40i · 999,999 miles · Black')
    ).toBeInTheDocument();
  });
});
