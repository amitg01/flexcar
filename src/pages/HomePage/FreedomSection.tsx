import React from 'react';

const FreedomSection: React.FC = () => {
  return (
    <section className="py-8 xs:py-12 sm:py-16 md:py-20 bg-white">
      <div className="flex w-full flex-row items-center justify-center">
        <div className="w-full max-w-[1440px] md:mx-4">
          <div className="px-3 sm:px-6 lg:px-8">
            <div className="text-center mb-8 xs:mb-12 sm:mb-16">
              <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 xs:mb-4 sm:mb-6 leading-tight">
                Freedom to choose.{' '}
                <span className="whitespace-nowrap">Freedom to change.</span>
              </h2>
              <p className="text-sm xs:text-lg sm:text-xl text-gray-600 mb-4 xs:mb-6 sm:mb-8">
                Cancel anytime. Swap cars on demand.
              </p>
              <button className="bg-gray-900 text-white px-4 xs:px-6 sm:px-8 py-2 xs:py-3 sm:py-4 rounded-full text-inter-16-semibold hover:bg-gray-800 transition-colors w-full sm:w-auto">
                Learn more about swaps
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreedomSection;
