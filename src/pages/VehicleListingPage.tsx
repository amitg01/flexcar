import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Footer } from '@/components/layout';
import { VehicleGrid, FilterPanel, SortDropdown } from '@/components/features';
import { useVehicle } from '@/hooks/useVehicle';

const VehicleListingPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, searchVehicles } = useVehicle();

  // Load user data from localStorage and search vehicles
  useEffect(() => {
    const userData = localStorage.getItem('flexcar-user-data');
    if (userData) {
      try {
        const { zipCode } = JSON.parse(userData);
        if (zipCode) {
          searchVehicles(zipCode);
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        // If user data is corrupted, load default vehicles
        searchVehicles('10001');
      }
    } else {
      // If no user data, load default vehicles instead of redirecting
      searchVehicles('10001');
    }
  }, [searchVehicles, navigate]);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="flex w-full flex-row items-center justify-center">
        <div className="w-full max-w-[1440px] md:mx-4">
          <div className="flex">
            {/* Main Content */}
            <div className="flex-1 bg-white">
              <div className="p-6">
                {/* Results Header */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-4">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {state.filteredVehicles.length} results
                    </h2>
                    {state.isLoading && (
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    )}
                  </div>
                  <SortDropdown />
                </div>

                {state.error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-red-800">{state.error}</p>
                  </div>
                )}

                <VehicleGrid />
              </div>
            </div>

            {/* Filters Sidebar - Right Side */}
            <div className="w-80  border-l border-gray-200 min-h-screen">
              <div className="p-6">
                <FilterPanel />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Chat Icon */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-blue-600 text-white p-4 rounded-lg shadow-lg hover:bg-blue-700 transition-colors">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default VehicleListingPage;
