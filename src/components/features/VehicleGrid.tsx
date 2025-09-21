import React, { Suspense, lazy } from 'react';
import { EmptyState, VehicleGridSkeleton } from '@/components/ui';
import { useVehicle } from '@/hooks/useVehicle';

// Lazy load VehicleCard for better performance
const VehicleCard = lazy(() => import('./VehicleCard'));

interface VehicleGridProps {
  className?: string;
}

const VehicleGrid: React.FC<VehicleGridProps> = ({ className = '' }) => {
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

  // Regular grid layout
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
