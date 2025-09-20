import React from 'react';

const VehicleCategoriesSection: React.FC = () => {
  return (
    <section className="py-8 xs:py-12 sm:py-16 md:py-20 bg-white">
      <div className="flex w-full flex-row items-center justify-center">
        <div className="w-full max-w-[1440px] md:mx-4">
          <div className="px-3 sm:px-6 lg:px-8">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 xs:mb-8 sm:mb-12 text-center">
              Swap cars in 30 seconds
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 xs:gap-4 sm:gap-6">
              <div className="bg-white border border-gray-200 rounded-xl xs:rounded-2xl sm:rounded-3xl p-3 xs:p-4 sm:p-6 hover:border-purple-500 transition-colors cursor-pointer">
                <h3 className="text-sm xs:text-lg sm:text-xl font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4">
                  SUVs
                </h3>
                <div className="h-4 xs:h-6 sm:h-8"></div>
                <img
                  className="w-full object-contain"
                  src="https://d3lxvmq39yvk72.cloudfront.net/web/images/homepage-live-large/suv.webp"
                  alt="SUVs"
                  fetchPriority="high"
                  loading="lazy"
                />
              </div>
              <div className="bg-white border border-gray-200 rounded-xl xs:rounded-2xl sm:rounded-3xl p-3 xs:p-4 sm:p-6 hover:border-purple-500 transition-colors cursor-pointer">
                <h3 className="text-sm xs:text-lg sm:text-xl font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4">
                  Sedans
                </h3>
                <div className="h-4 xs:h-6 sm:h-8"></div>
                <img
                  className="w-full object-contain"
                  src="https://d3lxvmq39yvk72.cloudfront.net/web/images/homepage-live-large/sedan.webp"
                  alt="Sedans"
                  fetchPriority="high"
                  loading="lazy"
                />
              </div>
              <div className="bg-white border border-gray-200 rounded-xl xs:rounded-2xl sm:rounded-3xl p-3 xs:p-4 sm:p-6 hover:border-purple-500 transition-colors cursor-pointer">
                <h3 className="text-sm xs:text-lg sm:text-xl font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4">
                  Trucks
                </h3>
                <div className="h-4 xs:h-6 sm:h-8"></div>
                <img
                  className="w-full object-contain"
                  src="https://d3lxvmq39yvk72.cloudfront.net/web/images/homepage-live-large/truck.webp"
                  alt="Trucks"
                  fetchPriority="high"
                  loading="lazy"
                />
              </div>
              <div className="bg-white border border-gray-200 rounded-xl xs:rounded-2xl sm:rounded-3xl p-3 xs:p-4 sm:p-6 hover:border-purple-500 transition-colors cursor-pointer">
                <h3 className="text-sm xs:text-lg sm:text-xl font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4">
                  Minivans
                </h3>
                <div className="h-4 xs:h-6 sm:h-8"></div>
                <img
                  className="w-full object-contain"
                  src="https://d3lxvmq39yvk72.cloudfront.net/web/images/homepage-live-large/minivan.webp"
                  alt="Minivans"
                  fetchPriority="high"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="text-center mt-6 xs:mt-8 sm:mt-12">
              <button className="bg-gradient-to-r from-teal-400 to-purple-600 text-white px-4 xs:px-6 sm:px-8 py-2 xs:py-3 sm:py-4 rounded-full text-inter-16-semibold hover:shadow-lg transition-all w-full sm:w-auto">
                View all cars
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VehicleCategoriesSection;
