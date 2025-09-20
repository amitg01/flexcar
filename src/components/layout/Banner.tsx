import React from 'react';
import { ArrowRight, Car } from 'lucide-react';

const Banner: React.FC = () => {
  return (
    <div className="w-full">
      <div
        className=""
        style={{
          backgroundImage:
            'linear-gradient(90deg, #5b6374 -14.7%, #0b0c0e 97.44%)',
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
              <div
                className="text-left text-flexcar-neutral180"
                style={{
                  color: '#DDDFE4',
                  fontSize: '12px',
                  fontFamily: 'Inter, Arial, sans-serif',
                  fontWeight: 600,
                }}
              >
                <span
                  className="text-inter-16-bold"
                  style={{
                    color: '#DDDFE4',
                    fontSize: '12px',
                    fontFamily: 'Inter, Arial, sans-serif',
                    fontWeight: 600,
                  }}
                >
                  <Car className="inline w-4 h-4 mr-1" />
                  Luxury Unleashed
                </span>{' '}
                — The smartest way to get a 2025 Mercedes-Benz.{' '}
                <span
                  className="text-inter-16-bold whitespace-nowrap underline"
                  style={{
                    color: '#DDDFE4',
                    fontSize: '12px',
                    fontFamily: 'Inter, Arial, sans-serif',
                    fontWeight: 600,
                  }}
                >
                  Learn more
                  <ArrowRight className="ml-1 inline h-[14px] w-[14px] align-text-bottom" />
                </span>
              </div>
            </div>

            {/* Desktop Version */}
            <div
              className="body3 hidden flex-row items-center justify-center py-1 text-flexcar-neutral180 md:flex"
              style={{
                color: '#DDDFE4',
                fontSize: '12px',
                fontFamily: 'Inter, Arial, sans-serif',
                fontWeight: 600,
              }}
            >
              <div className="w-[48px] flex items-center justify-center">
                <div style={{ width: '100%', height: '100%', lineHeight: 0 }}>
                  <canvas
                    style={{ width: '100%', height: '100%' }}
                    width="48"
                    height="24"
                  ></canvas>
                </div>
              </div>
              <div
                className="text-left text-flexcar-neutral180"
                style={{
                  color: '#DDDFE4',
                  fontSize: '12px',
                  fontFamily: 'Inter, Arial, sans-serif',
                  fontWeight: 600,
                }}
              >
                <span
                  className="text-inter-16-bold"
                  style={{
                    color: '#DDDFE4',
                    fontSize: '12px',
                    fontFamily: 'Inter, Arial, sans-serif',
                    fontWeight: 600,
                  }}
                >
                  <Car className="inline w-4 h-4 mr-1" />
                  Luxury Unleashed
                </span>{' '}
                — The smartest way to get a 2025 Mercedes-Benz.{' '}
                <span
                  className="text-inter-16-bold whitespace-nowrap underline"
                  style={{
                    color: '#DDDFE4',
                    fontSize: '12px',
                    fontFamily: 'Inter, Arial, sans-serif',
                    fontWeight: 600,
                  }}
                >
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
