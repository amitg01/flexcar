import React from 'react';
import { Play } from 'lucide-react';

const VideoSection: React.FC = () => {
  return (
    <section className="py-8 xs:py-12 sm:py-16 md:py-20 bg-white">
      <div className="flex w-full flex-row items-center justify-center">
        <div className="w-full max-w-[1440px] md:mx-4">
          <div className="px-3 sm:px-6 lg:px-8">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 xs:mb-8 sm:mb-12 text-center">
              Flexcar in 75 seconds.
            </h2>
            <div className="aspect-video bg-gray-200 rounded-lg xs:rounded-xl sm:rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-2 xs:mb-3 sm:mb-4">
                  <Play className="w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 text-gray-600" />
                </div>
                <p className="text-xs xs:text-sm sm:text-base text-gray-600">
                  Video: Flexcar in 75 seconds
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
