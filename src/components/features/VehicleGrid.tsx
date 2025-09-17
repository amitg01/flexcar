import React from 'react';
import { EmptyState, VehicleGridSkeleton } from '../ui';
import VehicleCard from './VehicleCard';
import ResponsiveVirtualizedGrid from './ResponsiveVirtualizedGrid';
import { useVehicle } from '../../contexts/VehicleContext';
import type { Vehicle } from '../../data/vehicles';

interface VehicleGridProps {
  onVehicleClick?: (vehicle: Vehicle) => void;
  className?: string;
  useVirtualization?: boolean;
  virtualizationThreshold?: number;
}

const VehicleGrid: React.FC<VehicleGridProps> = ({
  onVehicleClick,
  className = '',
  useVirtualization = true,
  virtualizationThreshold = 20,
}) => {
  const { state, clearFilters } = useVehicle();

  if (state.isLoading) {
    return <VehicleGridSkeleton count={6} className={className} />;
  }

  if (state.filteredVehicles.length === 0 && state.vehicles.length > 0) {
    return (
      <EmptyState
        title="No vehicles match your filters"
        description="Try adjusting your filters to see more results."
        action={{
          label: 'Clear Filters',
          onClick: clearFilters,
        }}
        className={className}
      />
    );
  }

  // Use virtualization for large datasets
  const shouldUseVirtualization =
    useVirtualization &&
    state.filteredVehicles.length >= virtualizationThreshold;

  if (shouldUseVirtualization) {
    return (
      <ResponsiveVirtualizedGrid
        onVehicleClick={onVehicleClick}
        className={className}
      />
    );
  }

  // Regular grid for smaller datasets
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}
    >
      {state.filteredVehicles.map(vehicle => (
        <VehicleCard
          key={vehicle.id}
          vehicle={vehicle}
          onViewDetails={() => onVehicleClick?.(vehicle)}
        />
      ))}
    </div>
  );
};

export default VehicleGrid;
