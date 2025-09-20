import React, { Suspense, lazy } from 'react';
import { EmptyState, VehicleGridSkeleton } from '@/components/ui';
import ResponsiveVirtualizedGrid from './ResponsiveVirtualizedGrid';
import { useVehicle } from '@/hooks/useVehicle';
import type { Vehicle } from '@/data/vehicles';

// Lazy load VehicleCard for better performance
const VehicleCard = lazy(() => import('./VehicleCard'));

interface VehicleGridProps {
  onVehicleClick?: (vehicle: Vehicle) => void;
  className?: string;
  useVirtualization?: boolean;
  virtualizationThreshold?: number;
}

const VehicleGrid: React.FC<VehicleGridProps> = ({
  onVehicleClick,
  className = '',
  useVirtualization = true, // eslint-disable-line @typescript-eslint/no-unused-vars
  virtualizationThreshold = 20, // eslint-disable-line @typescript-eslint/no-unused-vars
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

  // Use virtualization for large datasets - disabled for now due to display issues
  const shouldUseVirtualization = false;

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
    <div className={`w-full ${className}`}>
      <div className="mb-4 text-sm text-gray-600">
        Showing {state.filteredVehicles.length} vehicles in 3 columns
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {state.filteredVehicles.map(vehicle => (
          <Suspense
            key={vehicle.id}
            fallback={
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center mb-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            }
          >
            <VehicleCard vehicle={vehicle} />
          </Suspense>
        ))}
      </div>
    </div>
  );
};

export default VehicleGrid;
