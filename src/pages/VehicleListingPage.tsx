import React, { useEffect } from 'react';
import { Header, Footer } from '@/components/layout';
import { VehicleGrid, FilterPanel, SortDropdown } from '@/components/features';
import { useVehicle } from '@/hooks/useVehicle';

const VehicleListingPage: React.FC = () => {
  const { state, searchVehicles } = useVehicle();

  // Load user data from localStorage and search vehicles
  useEffect(() => {
    console.log('🏠 VehicleListingPage useEffect running');
    const userData = localStorage.getItem('flexcar-user-data');
    console.log('👤 User data:', userData);
    if (userData) {
      try {
        const { zipCode } = JSON.parse(userData);
        console.log('📍 Parsed zipCode:', zipCode);
        if (zipCode) {
          searchVehicles(zipCode);
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        // If user data is corrupted, load default vehicles
        console.log('🔄 Loading default vehicles for 10001');
        searchVehicles('10001');
      }
    } else {
      // If no user data, load default vehicles instead of redirecting
      console.log('🔄 No user data, loading default vehicles for 10001');
      searchVehicles('10001');
    }
  }, [searchVehicles]);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="w-full overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="flex flex-col lg:flex-row">
            {/* Main Content */}
            <div className="flex-1 min-w-0 bg-white">
              <div className="p-4 lg:p-6">
                {/* Results Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {state.filteredVehicles.length} results
                    </h2>
                    {state.isLoading && (
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    )}
                  </div>
                  <div className="w-full sm:w-auto">
                    <SortDropdown />
                  </div>
                </div>

                {state.error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-red-800">{state.error}</p>
                  </div>
                )}

                <div className="overflow-hidden">
                  <VehicleGrid />
                </div>
              </div>
            </div>

            {/* Filters Sidebar - Right Side */}
            <div className="w-full lg:w-80 lg:border-l border-gray-200 lg:min-h-screen">
              <div className="p-4 lg:p-6">
                <FilterPanel />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default VehicleListingPage;
