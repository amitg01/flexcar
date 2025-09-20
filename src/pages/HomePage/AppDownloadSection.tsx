import React from 'react';

const AppDownloadSection: React.FC = () => {
  return (
    <section className="py-8 xs:py-12 sm:py-16 md:py-20 bg-white">
      <div className="flex w-full flex-col items-center justify-center">
        <div className="mb-6 mt-22 flex max-w-[1440px] flex-col md:mx-6 md:mb-0 md:mt-30">
          <div className="grid w-full grid-flow-row grid-cols-1 gap-6 md:grid-flow-col md:grid-cols-2 md:grid-rows-2 md:gap-6">
            <div className="flex w-full flex-col justify-between rounded-2xl bg-gray-100 px-6 py-8 md:h-[350px] md:py-6 lg:h-[276px]">
              <div>
                <h1 className="block md:hidden text-xl font-bold text-gray-900">
                  The power of Flexcar is in your pocket.
                </h1>
                <h3 className="header-sans-tight hidden md:block text-2xl font-bold text-gray-900">
                  The power of Flexcar is in your pocket.
                </h3>
                <div className="h-4 flex-shrink-0"></div>
                <p className="text-base">
                  With our mobile app, drivers can view the entire Flexcar
                  portfolio, swap vehicles, schedule maintenance and save 30¢
                  per gallon on gas.
                </p>
              </div>
              <div className="mt-12 w-fit md:mt-0">
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    rel="noreferrer"
                    data-download-app="app-store"
                    href="https://apps.apple.com/us/app/my-flexcar/id1548544372"
                    target="_blank"
                    className="block"
                  >
                    <img
                      src="https://www.flexcar.com/cdn/cfa/451c7aee0fe6d0107aaaf5e289e09827f4d37294/assets/app-store-icon-BexPXDpR.svg"
                      alt="Download on the App Store"
                      className="h-16 w-48 object-contain"
                    />
                  </a>
                  <a
                    rel="noreferrer"
                    data-download-app="play-store"
                    href="https://play.google.com/store/apps/details?id=com.flexcar.flexcar"
                    target="_blank"
                    className="block"
                  >
                    <img
                      src="https://www.flexcar.com/cdn/cfa/451c7aee0fe6d0107aaaf5e289e09827f4d37294/assets/google-play-icon-uRqXJ30k.png"
                      alt="GET IT ON Google Play"
                      className="h-16 w-48 object-contain"
                    />
                  </a>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col justify-between rounded-2xl bg-gray-100 px-6 py-8 md:h-[350px] md:py-6 lg:h-[276px]">
              <div>
                <h1 className="block md:hidden text-xl font-bold text-gray-900">
                  Innovation with a personal touch.
                </h1>
                <h3 className="header-sans-tight hidden md:block text-2xl font-bold text-gray-900">
                  Innovation with a personal touch.
                </h3>
                <div className="h-4 flex-shrink-0"></div>
                <p className="text-base">
                  We love face to face. Online is good, in person is better.
                  Find a Flexcar location near you. Our dedicated team will be
                  there to meet you when you walk through the door.
                </p>
              </div>
              <div className="mt-12 w-fit md:mt-0">
                <a href="https://support.flexcar.com/hc/en-us/sections/8349003738907-Flexcar-Locations">
                  <button className="font-sans text-base font-medium leading-6 hover:cursor-pointer flex h-12 items-center justify-center rounded-full border border-solid border-gray-900 bg-gray-900 px-12 py-3 text-white ring-transparent hover:bg-gray-800 hover:shadow-lg hover:ring-transparent active:bg-gray-800 active:shadow-lg">
                    Find a hub near you
                  </button>
                </a>
              </div>
            </div>

            <div className="flex w-full flex-col justify-between rounded-2xl bg-gray-100 px-6 py-8 md:h-[350px] md:py-6 lg:h-[276px]">
              <div>
                <h1 className="block md:hidden text-xl font-bold text-gray-900">
                  Flexcar for Business
                </h1>
                <h3 className="header-sans-tight hidden md:block text-2xl font-bold text-gray-900">
                  Flexcar for Business
                </h3>
                <div className="h-4 flex-shrink-0"></div>
                <p className="text-base">
                  Don't build a fleet. Flex one. Whether it's two cars or
                  twenty, Flexcar for Business gives you the freedom to scale
                  without the strings. Contact us at business@flexcar.com to
                  learn more.
                </p>
              </div>
              <div className="mt-12 w-fit md:mt-0">
                <a
                  href="mailto:business@flexcar.com?subject=Flexcar%20for%20Business%20Inquiry"
                  className="flex h-12 items-center justify-center rounded-full border border-solid border-gray-900 bg-gray-900 px-12 py-3 text-white ring-transparent hover:bg-gray-800 hover:shadow-lg hover:ring-transparent active:bg-gray-800 active:shadow-lg"
                >
                  Contact Us
                </a>
              </div>
            </div>

            <div className="flex w-full flex-col justify-between rounded-2xl bg-gray-100 px-6 py-8 md:h-[350px] md:py-6 lg:h-[276px]">
              <div>
                <h1 className="block md:hidden text-xl font-bold text-gray-900">
                  We're in your corner.
                </h1>
                <h3 className="header-sans-tight hidden md:block text-2xl font-bold text-gray-900">
                  We're in your corner.
                </h3>
                <div className="h-4 flex-shrink-0"></div>
                <p className="text-base">
                  Engine trouble? We're on it. Dead battery? We'll jump it. Flat
                  tire? We'll fix it. No matter where you are, Flexcar is one
                  click away, ready to assist you with all your vehicle needs.
                </p>
              </div>
              <div className="mt-12 w-fit md:mt-0">
                <a href="/how-it-works" data-discover="true">
                  <button className="font-sans text-base font-medium leading-6 hover:cursor-pointer flex h-12 items-center justify-center rounded-full border border-solid border-gray-900 bg-gray-900 px-12 py-3 text-white ring-transparent hover:bg-gray-800 hover:shadow-lg hover:ring-transparent active:bg-gray-800 active:shadow-lg">
                    How it works
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownloadSection;
