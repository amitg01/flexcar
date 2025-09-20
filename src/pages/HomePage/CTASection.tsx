import React from 'react';

const CTASection: React.FC = () => {
  return (
    <section className="py-8 xs:py-12 sm:py-16 md:py-20 bg-white">
      <div className="flex w-full flex-row items-center justify-center">
        <div className="w-full max-w-[1440px] md:mx-4">
          <div className="px-3 sm:px-6 lg:px-8 text-center">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 xs:mb-4 sm:mb-6 leading-tight">
              Own the road. Not the debt.
            </h2>
            <p className="text-sm xs:text-lg sm:text-xl text-gray-600 mb-4 xs:mb-6 sm:mb-8 max-w-3xl mx-auto">
              Flexcar is the world's first ever month-to-month car lease. No
              down payments. No multi-year contracts. No B.S.
            </p>
            <button className="bg-gradient-to-r from-teal-400 to-purple-600 text-white px-4 xs:px-6 sm:px-8 py-2 xs:py-3 sm:py-4 rounded-full text-inter-16-semibold hover:shadow-lg transition-all w-full sm:w-auto">
              Get your Flexcar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
