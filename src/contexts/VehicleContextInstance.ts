import { createContext } from 'react';
import type { VehicleContextType } from '@/types/contexts/VehicleContext';

export const VehicleContext = createContext<VehicleContextType | undefined>(
  undefined
);
