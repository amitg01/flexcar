import React from 'react';
import { EmptyState } from '../ui';
import VehicleCard from './VehicleCard';
import { useVehicle } from '../../contexts/VehicleContext';
import type { Vehicle } from '../../data/vehicles';

interface VehicleGridProps {
  onVehicleClick?: (vehicle: Vehicle) => void;
  className?: string;
}

const VehicleGrid: React.FC<VehicleGridProps> = ({
  onVehicleClick,
  className = '',
}) => {
  const { state } = useVehicle();

  if (state.filteredVehicles.length === 0 && state.vehicles.length > 0) {
    return (
      <EmptyState
        title='No vehicles match your filters'
        description='Try adjusting your filters to see more results.'
        action={{
          label: 'Clear Filters',
          onClick: () => {
            // This will be handled by the parent component
            window.dispatchEvent(new CustomEvent('clearFilters'));
          },
        }}
        className={className}
      />
    );
  }

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 ${className}`}
    >
      {state.filteredVehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle.id}
          vehicle={vehicle}
          onViewDetails={onVehicleClick}
        />
      ))}
    </div>
  );
};

export default VehicleGrid;
