import React, { useEffect } from 'react';
import { ErrorBoundary } from './components/ui';
import { VehicleProvider, useVehicle } from './contexts/VehicleContext';
import {
  SearchBar,
  FilterPanel,
  SortDropdown,
  VehicleGrid,
  ErrorAlert,
} from './components/features';
import { EmptyState } from './components/ui';

const AppContent: React.FC = () => {
  const { state, clearFilters } = useVehicle();

  // Listen for clear filters event from VehicleGrid
  useEffect(() => {
    const handleClearFilters = () => {
      clearFilters();
    };

    window.addEventListener('clearFilters', handleClearFilters);
    return () => {
      window.removeEventListener('clearFilters', handleClearFilters);
    };
  }, [clearFilters]);

  const handleVehicleClick = (vehicle: any) => {
    // Handle vehicle click - could open modal, navigate to details, etc.
    console.log('Vehicle clicked:', vehicle);
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <header className='bg-flexcar-blue text-white py-8'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold text-center'>
            FlexCar Vehicle Search
          </h1>
          <p className='text-center mt-2 text-blue-100'>
            Find your perfect vehicle by ZIP code
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Search Section */}
        <div className='text-center mb-8'>
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
          <div className='lg:grid lg:grid-cols-4 lg:gap-8'>
            {/* Filters Panel - Right Side */}
            <div className='lg:col-span-1 mb-8 lg:mb-0'>
              <div className='sticky top-8'>
                <FilterPanel />
              </div>
            </div>

            {/* Vehicles Grid */}
            <div className='lg:col-span-3'>
              <SortDropdown />
              <VehicleGrid onVehicleClick={handleVehicleClick} />
            </div>
          </div>
        )}

        {/* Empty State */}
        {state.vehicles.length === 0 && !state.error && !state.isLoading && (
          <EmptyState
            title='Search for vehicles'
            description='Enter a ZIP code to find available vehicles in your area.'
          />
        )}
      </main>

      {/* Footer */}
      <footer className='bg-gray-800 text-white py-8 mt-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
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
