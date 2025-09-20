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
        // If user data is corrupted, redirect to home
        navigate('/');
      }
    } else {
      // If no user data, redirect to home
      navigate('/');
    }
  }, [searchVehicles, navigate]);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="flex">
        {/* Filters Sidebar */}
        <div className="w-80 bg-gray-50 border-r border-gray-200 min-h-screen">
          <div className="p-6">
            <FilterPanel />
          </div>
        </div>

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

            {/* Promotional Banner */}
            <div className="mb-8">
              <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
                <button className="absolute top-4 right-4 text-white hover:text-gray-200">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 bg-white rounded-full"></div>
                    </div>
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
                <h3 className="text-4xl font-bold mt-4 mb-4">
                  Luxury Unleashed
                </h3>
                <button className="bg-white text-purple-600 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
                  Learn more
                </button>
              </div>
            </div>

            {/* Vehicle Grid */}
            <VehicleGrid />

            {/* Video Section */}
            <div className="mt-12">
              <div className="bg-gray-900 rounded-2xl p-8 text-white">
                <div className="relative mb-6">
                  <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                          className="w-8 h-8"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-300">
                        For a century, people have been buying cars because
                        they've had no other option.
                      </p>
                    </div>
                  </div>
                  <button className="absolute top-4 right-4 text-white hover:text-gray-200">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                    </svg>
                  </button>
                </div>
                <h3 className="text-3xl font-bold mb-2">
                  Flexcar in 75 seconds.
                </h3>
                <p className="text-lg text-gray-300">
                  Once you Flex, you'll never buy a car again.
                </p>
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
