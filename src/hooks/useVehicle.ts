import { useContext } from 'react';
import { VehicleContext } from '@/contexts/VehicleContextInstance';

// Export hook separately to avoid react-refresh issues
export const useVehicle = () => {
  const context = useContext(VehicleContext);
  if (context === undefined) {
    throw new Error('useVehicle must be used within a VehicleProvider');
  }
  return context;
};
