import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <div className="flex w-full flex-row items-center justify-center">
      <div className="flex h-[623px] w-full max-w-[1440px] bg-gray-100 md:mx-4 md:h-[720px] md:bg-transparent">
        <div className="relative w-full flex-1 md:rounded-[32px]">
          {/* Mobile Image */}
          <img
            src="https://d3lxvmq39yvk72.cloudfront.net/web/images/homepage-live-large/heropage-mercedes-mobile.webp"
            className="absolute inset-0 h-full w-full object-cover md:hidden"
            fetchPriority="high"
            loading="eager"
            alt="Flexcar hero background"
          />
          {/* Desktop Image */}
          <img
            src="https://d3lxvmq39yvk72.cloudfront.net/web/images/homepage-live-large/hero-mercedes.webp"
            className="absolute inset-0 hidden h-full w-full object-cover md:block md:rounded-[32px]"
            fetchPriority="high"
            loading="eager"
            alt="Flexcar hero background"
          />
          <div className="relative m-auto flex h-full w-fit max-w-max flex-col justify-end px-4 pb-10 text-center md:ml-14 md:mt-16 md:max-w-[420px] md:justify-start md:px-0 md:text-left">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-1 xs:mb-2 sm:mb-4 leading-tight">
              Live large.
            </h1>
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-bold text-white/70 mb-3 xs:mb-4 sm:mb-6 leading-tight">
              Spend small.
            </h1>
            {/* Mobile Description */}
            <p className="text-sm xs:text-base sm:text-lg md:text-xl text-white/90 mb-4 xs:mb-6 sm:mb-8 leading-relaxed block md:hidden">
              Flexcar is the first and only
              <br />
              month-to-month car lease.
            </p>
            {/* Desktop Description */}
            <p className="text-sm xs:text-base sm:text-lg md:text-xl text-white/90 mb-4 xs:mb-6 sm:mb-8 leading-relaxed hidden md:block">
              Flexcar is the first and only month-to-month car lease,
              <br />
              because freedom shouldn't come with a contract.
              <br />
              Once you Flex, you'll never buy a car again.
            </p>
            <div className="mx-auto mt-8 w-fit md:mx-0 md:mt-12">
              <button className="font-sans text-base font-medium leading-6 hover:cursor-pointer flex h-12 w-[174px] items-center justify-center rounded-[40px] border border-solid border-gray-300 bg-white px-12 py-3 text-gray-900 shadow-lg ring-transparent hover:text-blue-600 hover:ring-transparent active:text-blue-600 md:h-14">
                View cars
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
