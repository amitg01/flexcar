import React from 'react';

const ReviewsSection: React.FC = () => {
  return (
    <section className="py-8 xs:py-12 sm:py-16 md:py-20 bg-gray-900 text-white relative">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative flex w-full flex-row items-center justify-center">
        <div className="w-full max-w-[1440px] md:mx-4">
          <div className="px-3 sm:px-6 lg:px-8 text-center">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-4 xs:mb-6 sm:mb-8 leading-tight">
              Thousands of drivers
              <br />
              are switching to Flexcar.
            </h2>
            <button className="bg-white text-gray-900 px-4 xs:px-6 sm:px-8 py-2 xs:py-3 sm:py-4 rounded-full text-inter-16-semibold hover:bg-gray-100 transition-colors w-full sm:w-auto">
              See our reviews
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
