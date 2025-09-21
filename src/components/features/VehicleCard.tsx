import React, { useState, Suspense } from 'react';
import { type Vehicle } from '@/data/vehicles';

interface VehicleCardProps {
  vehicle: Vehicle;
  className?: string;
  onViewDetails?: () => void;
}

interface LazyImageProps {
  src: string;
  alt: string;
  className: string;
  onLoad: () => void;
  onError: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

// Lazy image component with Suspense
const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className,
  onLoad,
  onError,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLoad = () => {
    setImageLoaded(true);
    onLoad();
  };

  return (
    <div className="relative">
      {!imageLoaded && (
        <div className="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
          <div
            data-testid="loading-spinner"
            className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
          ></div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-48 object-cover rounded-t-lg transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0 absolute'
        } ${className}`}
        onLoad={handleLoad}
        onError={onError}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
};

const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  className = '',
}) => {
  const [, setImageError] = useState(false);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage: number): string => {
    return new Intl.NumberFormat('en-US').format(mileage);
  };

  const handleImageLoad = () => {
    setImageError(false);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setImageError(true);
    const target = e.target as HTMLImageElement;
    // Use a more professional fallback image
    target.src =
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center&auto=format&q=80';
    // If the fallback also fails, use a simple placeholder
    target.onerror = () => {
      target.src =
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgMTI1SDIyNVYxNzVIMTc1VjEyNVoiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTE5NSAxNDVIMjA1VjE1NUgxOTVWMjA1WiIgZmlsbD0iIzlDQTNBRiIvPgo8dGV4dCB4PSIyMDAiIHk9IjE4MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNkI3MjgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5WZWhpY2xlIEltYWdlPC90ZXh0Pgo8L3N2Zz4K';
    };
  };

  // Determine if vehicle is recently added or brand new
  const isRecentlyAdded = Math.random() > 0.7; // Random for demo
  const isBrandNew = Math.random() > 0.9; // Random for demo
  const isEV =
    vehicle.make.toLowerCase().includes('mercedes') &&
    vehicle.model.toLowerCase().includes('eqb');

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 ${className}`}
    >
      <div className="relative">
        <Suspense
          fallback={
            <div className="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
              <div
                data-testid="loading-spinner"
                className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
              ></div>
            </div>
          }
        >
          <LazyImage
            src={vehicle.image}
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            className=""
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        </Suspense>

        {/* Labels */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isEV && (
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
              EV
            </span>
          )}
          {isRecentlyAdded && (
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
              Recently added
            </span>
          )}
          {isBrandNew && (
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">
              Brand new
            </span>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h3>
          <p className="text-gray-600 text-sm">
            {vehicle.trim} · {formatMileage(vehicle.mileage)} miles ·{' '}
            {vehicle.color}
          </p>
        </div>

        <div className="mb-3">
          <p className="text-sm text-gray-500">Get it by Sep 23</p>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(vehicle.price)}
            </span>
            <span className="text-gray-500 text-sm ml-1">/mo</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
