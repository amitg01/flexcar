import React from 'react';

const AppDownloadSection: React.FC = () => {
  return (
    <section className="py-8 xs:py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="flex w-full flex-row items-center justify-center">
        <div className="w-full max-w-[1440px] md:mx-4">
          <div className="px-3 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-6 sm:gap-8">
              <div className="bg-gray-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                  The power of Flexcar is in your pocket.
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                  With our mobile app, drivers can view the entire Flexcar
                  portfolio, swap vehicles, schedule maintenance and save 30¢
                  per gallon on gas.
                </p>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="w-full sm:w-32 h-12 bg-gray-300 rounded-lg"></div>
                  <div className="w-full sm:w-32 h-12 bg-gray-300 rounded-lg"></div>
                </div>
              </div>

              <div className="bg-gray-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Innovation with a personal touch.
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                  We love face to face. Online is good, in person is better.
                  Find a Flexcar location near you.
                </p>
                <button className="bg-gray-900 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-inter-16-semibold hover:bg-gray-800 transition-colors w-full sm:w-auto">
                  Find a hub near you
                </button>
              </div>

              <div className="bg-gray-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Flexcar for Business
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                  Don't build a fleet. Flex one. Whether it's two cars or
                  twenty, Flexcar for Business gives you the freedom to scale
                  without the strings.
                </p>
                <button className="bg-gray-900 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-inter-16-semibold hover:bg-gray-800 transition-colors w-full sm:w-auto">
                  Contact Us
                </button>
              </div>

              <div className="bg-gray-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                  We're in your corner.
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                  Engine trouble? We're on it. Dead battery? We'll jump it. Flat
                  tire? We'll fix it. No matter where you are, Flexcar is one
                  click away.
                </p>
                <button className="bg-gray-900 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-inter-16-semibold hover:bg-gray-800 transition-colors w-full sm:w-auto">
                  How it works
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownloadSection;
