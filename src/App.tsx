import React from 'react';
import { ErrorBoundary } from './components/ui';
import { VehicleProvider } from './contexts/VehicleContext';
import { useVehicle } from './hooks/useVehicle';
import {
  SearchBar,
  FilterPanel,
  SortDropdown,
  VehicleGrid,
  ErrorAlert,
} from './components/features';
import { EmptyState } from './components/ui';
import type { Vehicle } from './data/vehicles';

const AppContent: React.FC = () => {
  const { state } = useVehicle();

  const handleVehicleClick = (vehicle: Vehicle) => {
    // Handle vehicle click - could open modal, navigate to details, etc.
    console.log('Vehicle clicked:', vehicle);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              FlexCar Vehicle Search
            </h1>
            <p className="text-lg text-gray-600">
              Find your perfect vehicle by ZIP code
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Section */}
        <div className="mb-12">
          <SearchBar />
        </div>

        {/* Error Message */}
        {state.error && (
          <ErrorAlert
            error={state.error}
            onDismiss={() => {
              // Clear error - you could add this to context if needed
            }}
          />
        )}

        {/* Results Section */}
        {state.vehicles.length > 0 && (
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Filters Panel - Left Side */}
            <div className="lg:col-span-3 mb-8 lg:mb-0">
              <div className="sticky top-8">
                <FilterPanel />
              </div>
            </div>

            {/* Vehicles Grid */}
            <div className="lg:col-span-9">
              <SortDropdown />
              <VehicleGrid onVehicleClick={handleVehicleClick} />
            </div>
          </div>
        )}

        {/* Empty State */}
        {state.vehicles.length === 0 && !state.error && !state.isLoading && (
          <EmptyState
            title="Search for vehicles"
            description="Enter a ZIP code to find available vehicles in your area."
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 FlexCar. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <VehicleProvider>
        <AppContent />
      </VehicleProvider>
    </ErrorBoundary>
  );
};

export default App;
// Test comment
