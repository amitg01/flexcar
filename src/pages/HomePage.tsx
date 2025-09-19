import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-2 sm:py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="w-5 h-5 sm:w-8 sm:h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs sm:text-sm">
                  F
                </span>
              </div>
              <span className="text-base sm:text-2xl font-bold text-purple-600">
                FLEXCAR
              </span>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-4">
              <span className="text-xs sm:text-sm text-gray-600 hidden sm:inline">
                How it works
              </span>
              <span className="text-xs sm:text-sm text-gray-600 hidden xs:inline">Log in</span>
              <span className="text-xs sm:text-sm text-gray-600 xs:hidden">Login</span>
              {/* Mobile menu button */}
              <button className="sm:hidden p-1 ml-1">
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

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

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div className="sm:col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs sm:text-sm">
                    F
                  </span>
                </div>
                <span className="text-lg sm:text-2xl font-bold text-white">
                  FLEXCAR
                </span>
              </div>
              <p className="text-sm sm:text-base text-gray-400">
                Live large. Spend small.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">
                Flexcar
              </h4>
              <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Inventory
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    The Flextra Mile
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">
                Support
              </h4>
              <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Pickups
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Delivery
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Swaps
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Help center
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">
                Social
              </h4>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm sm:text-base"
                >
                  Facebook
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm sm:text-base"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm sm:text-base"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm sm:text-base"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 sm:pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <p className="text-sm sm:text-base text-gray-400 text-center sm:text-left">
                © 2025 Flexcar, LLC. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center sm:justify-end gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400">
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
                <span>•</span>
                <a href="#" className="hover:text-white">
                  Terms of Service
                </a>
                <span>•</span>
                <a href="#" className="hover:text-white">
                  SMS Privacy Policy
                </a>
                <span>•</span>
                <a href="#" className="hover:text-white">
                  Membership Agreement
                </a>
                <span>•</span>
                <a href="#" className="hover:text-white">
                  Sitemap
                </a>
                <span>•</span>
                <button className="hover:text-white">Cookie Preferences</button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
