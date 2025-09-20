import React from 'react';

const BenefitsSection: React.FC = () => {
  return (
    <section className="py-8 xs:py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="flex w-full flex-row items-center justify-center">
        <div className="w-full max-w-[1440px] md:mx-4">
          <div className="px-3 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-6 xs:gap-8 sm:gap-12 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 xs:mb-4 sm:mb-6 leading-tight">
                  Traditional car ownership is highway robbery.
                </h2>
                <p className="text-sm xs:text-lg sm:text-xl text-gray-600 mb-4 xs:mb-6 sm:mb-8">
                  Flexcar is freedom without financial burden. It's car
                  ownership completely reimagined.
                </p>

                <div className="space-y-4 xs:space-y-6 sm:space-y-8">
                  <div>
                    <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4">
                      Unparalleled savings
                    </h3>
                    <div className="w-10 xs:w-12 sm:w-14 h-1 bg-gray-900 mb-2 xs:mb-3 sm:mb-4"></div>
                    <ul className="space-y-1 text-xs xs:text-sm sm:text-base text-gray-700">
                      <li>• 20%+ lower car payments</li>
                      <li>• No down payment</li>
                      <li>• Zero debt</li>
                      <li>• Save 30¢ per gal on gas</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4">
                      Comprehensive coverage
                    </h3>
                    <div className="w-10 xs:w-12 sm:w-14 h-1 bg-gray-900 mb-2 xs:mb-3 sm:mb-4"></div>
                    <ul className="space-y-1 text-xs xs:text-sm sm:text-base text-gray-700">
                      <li>• Insurance included</li>
                      <li>• Maintenance included</li>
                      <li>• 24/7 roadside assistance included</li>
                    </ul>
                  </div>
                </div>

                <button className="mt-4 xs:mt-6 sm:mt-8 bg-gray-900 text-white px-4 xs:px-6 sm:px-8 py-2 xs:py-3 sm:py-4 rounded-full text-inter-16-semibold hover:bg-gray-800 transition-colors w-full sm:w-auto">
                  View cars
                </button>
              </div>
              <div className="order-1 md:order-2">
                <img
                  src="https://via.placeholder.com/600x400/3A00E5/FFFFFF?text=Highway+Robbery"
                  alt="Traditional car ownership is highway robbery"
                  className="w-full rounded-xl xs:rounded-2xl sm:rounded-3xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
