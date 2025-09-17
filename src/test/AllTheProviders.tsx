import React from 'react';
import { VehicleProvider } from '../contexts/VehicleContext';

// Custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <VehicleProvider>{children}</VehicleProvider>;
};

export default AllTheProviders;
