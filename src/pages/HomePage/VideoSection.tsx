import React from 'react';

const VideoSection: React.FC = () => {
  return (
    <section className="py-8 xs:py-12 sm:py-16 md:py-20 bg-white">
      <div className="flex w-full flex-row items-center justify-center">
        <div className="w-full max-w-[1440px] md:mx-4">
          <div className="px-3 sm:px-6 lg:px-8">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 xs:mb-8 sm:mb-12 text-center">
              Flexcar in 75 seconds.
            </h2>
            <div className="aspect-video bg-gray-200 rounded-lg xs:rounded-xl sm:rounded-2xl overflow-hidden">
              <iframe
                src="https://www.youtube-nocookie.com/embed/O0sEu131MaE?autoplay=1&mute=1&controls=0&showinfo=0&rel=0"
                title="Flexcar in 75 seconds"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
