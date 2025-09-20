import React from 'react';
import { render as rtlRender, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Clear localStorage to ensure modal shows
    localStorage.clear();
  });

  it('renders header and modal', () => {
    render(<App />);

    expect(screen.getByText('Find Flexcars near you')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('12345')).toBeInTheDocument();
  });

  it('shows modal initially', () => {
    render(<App />);

    expect(screen.getByText('STEP 1 OF 2')).toBeInTheDocument();
    expect(screen.getByText('Find Flexcars near you')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Enter your ZIP code to see accurate availability and delivery options in your area.'
      )
    ).toBeInTheDocument();
  });

  it('advances to step 2 when valid ZIP code is entered', async () => {
    const user = userEvent.setup();

    render(<App />);

    const input = screen.getByPlaceholderText('12345');
    await user.type(input, '10001');
    await user.click(screen.getByTestId('zip-next-button'));

    await waitFor(() => {
      expect(screen.getByText('About you')).toBeInTheDocument();
      expect(screen.getByText('STEP 2 OF 2')).toBeInTheDocument();
    });
  });

  it('validates ZIP code input', async () => {
    const user = userEvent.setup();

    render(<App />);

    const input = screen.getByPlaceholderText('12345');
    await user.type(input, '99999');

    // Test that the input has the correct value
    expect(input).toHaveValue('99999');

    // Test that the Next button exists in step 1
    expect(screen.getByTestId('zip-next-button')).toBeInTheDocument();

    // Submit the form
    await user.click(screen.getByTestId('zip-next-button'));

    // Test that the modal advanced to step 2
    await waitFor(() => {
      expect(screen.getByText('About you')).toBeInTheDocument();
      expect(screen.getByText('STEP 2 OF 2')).toBeInTheDocument();
    });
  });

  it('completes onboarding flow', async () => {
    const user = userEvent.setup();

    render(<App />);

    // Step 1: Enter ZIP code
    const zipInput = screen.getByPlaceholderText('12345');
    await user.type(zipInput, '10001');
    await user.click(screen.getByTestId('zip-next-button'));

    // Step 2: Fill out user info
    await waitFor(() => {
      expect(screen.getByText('About you')).toBeInTheDocument();
    });

    // Select age and credit score
    const selectButtons = screen.getAllByRole('button', {
      name: /select one/i,
    });
    const ageSelect = selectButtons[0]; // First select is age
    const creditSelect = selectButtons[1]; // Second select is credit score

    // Click to open dropdowns and select options
    await user.click(ageSelect);
    // Wait for dropdown to open and find the option
    await waitFor(() => {
      expect(screen.getByText('26-30')).toBeInTheDocument();
    });
    await user.click(screen.getByText('26-30'));

    await user.click(creditSelect);
    // Wait for dropdown to open and find the option
    await waitFor(() => {
      expect(screen.getByText('580-669 (Good)')).toBeInTheDocument();
    });
    await user.click(screen.getByText('580-669 (Good)'));

    // Complete onboarding
    await user.click(screen.getByTestId('modal-view-cars-button'));

    // Modal should close and show main content
    await waitFor(() => {
      expect(screen.queryByText('About you')).not.toBeInTheDocument();
    });
  });

  it('shows main content after onboarding', async () => {
    const user = userEvent.setup();

    render(<App />);

    // Complete onboarding flow
    const zipInput = screen.getByPlaceholderText('12345');
    await user.type(zipInput, '10001');
    await user.click(screen.getByTestId('zip-next-button'));

    await waitFor(() => {
      expect(screen.getByText('About you')).toBeInTheDocument();
    });

    const selectButtons = screen.getAllByRole('button', {
      name: /select one/i,
    });
    const ageSelect = selectButtons[0]; // First select is age
    const creditSelect = selectButtons[1]; // Second select is credit score

    // Click to open dropdowns and select options
    await user.click(ageSelect);
    await user.click(screen.getByRole('option', { name: '26-30' }));

    await user.click(creditSelect);
    await user.click(screen.getByRole('option', { name: '580-669' }));

    await user.click(screen.getByTestId('modal-view-cars-button'));

    // Should show main content
    await waitFor(() => {
      expect(screen.getByText('Live large.')).toBeInTheDocument();
      expect(screen.getByText('Spend small.')).toBeInTheDocument();
    });
  });

  it('can navigate back to step 1', async () => {
    const user = userEvent.setup();

    render(<App />);

    // Go to step 2
    const zipInput = screen.getByPlaceholderText('12345');
    await user.type(zipInput, '10001');
    await user.click(screen.getByTestId('zip-next-button'));

    await waitFor(() => {
      expect(screen.getByText('About you')).toBeInTheDocument();
    });

    // Go back to step 1 - find the back button by its test ID
    const backButton = screen.getByTestId('back-to-step1-button');
    await user.click(backButton);

    await waitFor(() => {
      expect(screen.getByText('Find Flexcars near you')).toBeInTheDocument();
      expect(screen.getByText('STEP 1 OF 2')).toBeInTheDocument();
    });
  });

  it('validates required fields in step 2', async () => {
    const user = userEvent.setup();

    render(<App />);

    // Go to step 2
    const zipInput = screen.getByPlaceholderText('12345');
    await user.type(zipInput, '10001');
    await user.click(screen.getByTestId('zip-next-button'));

    await waitFor(() => {
      expect(screen.getByText('About you')).toBeInTheDocument();
    });

    // Try to submit without selecting age and credit score
    await user.click(screen.getByTestId('modal-view-cars-button'));

    // Should still be on step 2 (form validation should prevent submission)
    expect(screen.getByText('About you')).toBeInTheDocument();
  });
});
