import React from 'react';
import { ArrowRight } from 'lucide-react';

const Banner: React.FC = () => {
  return (
    <div className="w-full">
      <div 
        className=""
        style={{
          backgroundImage: 'linear-gradient(90deg, #5b6374 -14.7%, #0b0c0e 97.44%)'
        }}
      >
        <div className="block w-full justify-center py-[8px] text-center px-[12px]">
          <a href="https://www.flexcar.com/vehicles/2025-mercedes">
            {/* Mobile Version */}
            <div className="body3 flex flex-row items-start py-2 md:hidden md:items-center">
              <div>
                <div className="w-[48px] flex items-center justify-center">
                  <div style={{ width: '100%', height: '100%', lineHeight: 0 }}>
                    <canvas style={{ width: '100%', height: '100%' }}></canvas>
                  </div>
                </div>
              </div>
              <div className="text-left text-gray-300">
                <span className="text-inter-16-bold text-gray-300">
                  Luxury Unleashed
                </span>{' '}
                — The smartest way to get a 2025 Mercedes-Benz.{' '}
                <span className="text-inter-16-bold whitespace-nowrap text-gray-300 underline">
                  Learn more
                  <ArrowRight className="ml-1 inline h-[14px] w-[14px] align-text-bottom" />
                </span>
              </div>
            </div>

            {/* Desktop Version */}
            <div className="body3 hidden flex-row items-center justify-center py-1 text-gray-300 md:flex">
              <div className="w-[48px] flex items-center justify-center">
                <div style={{ width: '100%', height: '100%', lineHeight: 0 }}>
                  <canvas
                    style={{ width: '100%', height: '100%' }}
                    width="48"
                    height="24"
                  ></canvas>
                </div>
              </div>
              <div className="text-left text-gray-300">
                <span className="text-inter-16-bold text-gray-300">
                  Luxury Unleashed
                </span>{' '}
                — The smartest way to get a 2025 Mercedes-Benz.{' '}
                <span className="text-inter-16-bold whitespace-nowrap text-gray-300 underline">
                  Learn more
                  <ArrowRight className="ml-1 inline h-[14px] w-[14px] align-text-bottom" />
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
