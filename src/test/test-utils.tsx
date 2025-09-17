import React, { type ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { VehicleProvider } from '../contexts/VehicleContext';

// Custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <VehicleProvider>{children}</VehicleProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };
