import React, { useState, useEffect } from 'react';
import { Modal } from '../components/ui';
import { Header, Footer } from '../components/layout';

const HomePage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [zipCode, setZipCode] = useState('');

  useEffect(() => {
    // Show modal on page load
    setShowModal(true);
  }, []);

  const handleZipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipCode.trim()) {
      // Handle ZIP code submission
      console.log('ZIP code submitted:', zipCode);
      setShowModal(false);
    }
  };

  const handleLocateMe = () => {
    // Handle locate me functionality
    console.log('Locate me clicked');
    // You can implement geolocation API here
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ZIP Code Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title="Find Flexcars near you"
        closeOnBackdropClick={true}
      >
        <div className="mb-6">
          <div className="text-sm text-gray-500 mb-2">STEP 1 OF 2</div>
          <p className="text-gray-600 text-sm sm:text-base">
            Enter your ZIP code to see accurate availability and delivery
            options in your area.
          </p>
        </div>

        <form onSubmit={handleZipSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="zipCode"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Enter ZIP code
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                id="zipCode"
                value={zipCode}
                onChange={e => setZipCode(e.target.value)}
                placeholder="12345"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                maxLength={5}
              />
              <button
                type="button"
                onClick={handleLocateMe}
                className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="hidden xs:inline">Locate me</span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Next
          </button>
        </form>
      </Modal>
      <Header />

      {/* Hero Section */}
      <section className="relative h-[400px] xs:h-[450px] sm:h-[623px] md:h-[720px] bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="w-full text-center sm:text-left">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-1 xs:mb-2 sm:mb-4 leading-tight">
              Live large.
            </h1>
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-bold text-white/70 mb-3 xs:mb-4 sm:mb-6 leading-tight">
              Spend small.
            </h1>
            <p className="text-sm xs:text-base sm:text-lg md:text-xl text-white/90 mb-4 xs:mb-6 sm:mb-8 max-w-lg mx-auto sm:mx-0 leading-relaxed">
              Flexcar is the first and only month-to-month car lease, because
              freedom shouldn't come with a contract. Once you Flex, you'll
              never buy a car again.
            </p>
            <button className="bg-white text-gray-900 px-4 xs:px-6 sm:px-8 py-2 xs:py-3 sm:py-4 rounded-full font-semibold text-sm xs:text-base sm:text-lg hover:bg-gray-100 transition-colors w-full sm:w-auto">
              View cars
            </button>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-8 xs:py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 xs:mb-8 sm:mb-12 text-center">
            Flexcar in 75 seconds.
          </h2>
          <div className="aspect-video bg-gray-200 rounded-lg xs:rounded-xl sm:rounded-2xl flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-2 xs:mb-3 sm:mb-4">
                <svg
                  className="w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 text-gray-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-xs xs:text-sm sm:text-base text-gray-600">
                Video: Flexcar in 75 seconds
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Freedom Section */}
      <section className="py-8 xs:py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center mb-8 xs:mb-12 sm:mb-16">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 xs:mb-4 sm:mb-6 leading-tight">
              Freedom to choose.{' '}
              <span className="whitespace-nowrap">Freedom to change.</span>
            </h2>
            <p className="text-sm xs:text-lg sm:text-xl text-gray-600 mb-4 xs:mb-6 sm:mb-8">
              Cancel anytime. Swap cars on demand.
            </p>
            <button className="bg-gray-900 text-white px-4 xs:px-6 sm:px-8 py-2 xs:py-3 sm:py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors w-full sm:w-auto text-sm xs:text-base">
              Learn more about swaps
            </button>
          </div>

          {/* Freedom Images */}
          <div className="grid md:grid-cols-2 gap-4 xs:gap-6 sm:gap-8 items-center">
            <div className="order-2 md:order-1">
              <img
                src="https://via.placeholder.com/600x400/3A00E5/FFFFFF?text=Freedom+to+choose"
                alt="Freedom to choose"
                className="w-full rounded-xl xs:rounded-2xl sm:rounded-3xl"
              />
            </div>
            <div className="order-1 md:order-2">
              <img
                src="https://via.placeholder.com/600x400/25BCB6/FFFFFF?text=Freedom+to+change"
                alt="Freedom to change"
                className="w-full rounded-xl xs:rounded-2xl sm:rounded-3xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Categories */}
      <section className="py-8 xs:py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
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
                src="https://via.placeholder.com/300x200/3A00E5/FFFFFF?text=SUV"
                alt="SUVs"
                className="w-full rounded-lg xs:rounded-xl sm:rounded-2xl"
              />
            </div>
            <div className="bg-white border border-gray-200 rounded-xl xs:rounded-2xl sm:rounded-3xl p-3 xs:p-4 sm:p-6 hover:border-purple-500 transition-colors cursor-pointer">
              <h3 className="text-sm xs:text-lg sm:text-xl font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4">
                Sedans
              </h3>
              <div className="h-4 xs:h-6 sm:h-8"></div>
              <img
                src="https://via.placeholder.com/300x200/25BCB6/FFFFFF?text=Sedan"
                alt="Sedans"
                className="w-full rounded-lg xs:rounded-xl sm:rounded-2xl"
              />
            </div>
            <div className="bg-white border border-gray-200 rounded-xl xs:rounded-2xl sm:rounded-3xl p-3 xs:p-4 sm:p-6 hover:border-purple-500 transition-colors cursor-pointer">
              <h3 className="text-sm xs:text-lg sm:text-xl font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4">
                Trucks
              </h3>
              <div className="h-4 xs:h-6 sm:h-8"></div>
              <img
                src="https://via.placeholder.com/300x200/3A00E5/FFFFFF?text=Truck"
                alt="Trucks"
                className="w-full rounded-lg xs:rounded-xl sm:rounded-2xl"
              />
            </div>
            <div className="bg-white border border-gray-200 rounded-xl xs:rounded-2xl sm:rounded-3xl p-3 xs:p-4 sm:p-6 hover:border-purple-500 transition-colors cursor-pointer">
              <h3 className="text-sm xs:text-lg sm:text-xl font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4">
                Minivans
              </h3>
              <div className="h-4 xs:h-6 sm:h-8"></div>
              <img
                src="https://via.placeholder.com/300x200/25BCB6/FFFFFF?text=Minivan"
                alt="Minivans"
                className="w-full rounded-lg xs:rounded-xl sm:rounded-2xl"
              />
            </div>
          </div>
          <div className="text-center mt-6 xs:mt-8 sm:mt-12">
            <button className="bg-gradient-to-r from-teal-400 to-purple-600 text-white px-4 xs:px-6 sm:px-8 py-2 xs:py-3 sm:py-4 rounded-full font-semibold hover:shadow-lg transition-all w-full sm:w-auto text-sm xs:text-base">
              View all cars
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-8 xs:py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 xs:gap-8 sm:gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 xs:mb-4 sm:mb-6 leading-tight">
                Traditional car ownership is highway robbery.
              </h2>
              <p className="text-sm xs:text-lg sm:text-xl text-gray-600 mb-4 xs:mb-6 sm:mb-8">
                Flexcar is freedom without financial burden. It's car ownership
                completely reimagined.
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

              <button className="mt-4 xs:mt-6 sm:mt-8 bg-gray-900 text-white px-4 xs:px-6 sm:px-8 py-2 xs:py-3 sm:py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors w-full sm:w-auto text-sm xs:text-base">
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
      </section>

      {/* Reviews Section */}
      <section className="py-8 xs:py-12 sm:py-16 md:py-20 bg-gray-900 text-white relative">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-4 xs:mb-6 sm:mb-8 leading-tight">
            Thousands of drivers
            <br />
            are switching to Flexcar.
          </h2>
          <button className="bg-white text-gray-900 px-4 xs:px-6 sm:px-8 py-2 xs:py-3 sm:py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors w-full sm:w-auto text-sm xs:text-base">
            See our reviews
          </button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 xs:py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 xs:mb-4 sm:mb-6 leading-tight">
            Own the road. Not the debt.
          </h2>
          <p className="text-sm xs:text-lg sm:text-xl text-gray-600 mb-4 xs:mb-6 sm:mb-8 max-w-3xl mx-auto">
            Flexcar is the world's first ever month-to-month car lease. No down
            payments. No multi-year contracts. No B.S.
          </p>
          <button className="bg-gradient-to-r from-teal-400 to-purple-600 text-white px-4 xs:px-6 sm:px-8 py-2 xs:py-3 sm:py-4 rounded-full font-semibold hover:shadow-lg transition-all w-full sm:w-auto text-sm xs:text-base">
            Get your Flexcar
          </button>
        </div>
      </section>

      {/* App Download Section */}
      <section className="py-8 xs:py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-6 sm:gap-8">
            <div className="bg-gray-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                The power of Flexcar is in your pocket.
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                With our mobile app, drivers can view the entire Flexcar
                portfolio, swap vehicles, schedule maintenance and save 30¢ per
                gallon on gas.
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
                We love face to face. Online is good, in person is better. Find
                a Flexcar location near you.
              </p>
              <button className="bg-gray-900 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors w-full sm:w-auto text-sm sm:text-base">
                Find a hub near you
              </button>
            </div>

            <div className="bg-gray-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                Flexcar for Business
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                Don't build a fleet. Flex one. Whether it's two cars or twenty,
                Flexcar for Business gives you the freedom to scale without the
                strings.
              </p>
              <button className="bg-gray-900 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors w-full sm:w-auto text-sm sm:text-base">
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
              <button className="bg-gray-900 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors w-full sm:w-auto text-sm sm:text-base">
                How it works
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
