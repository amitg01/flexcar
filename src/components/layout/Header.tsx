import React from 'react';
import { Menu } from 'lucide-react';
import BrandLogo from '../../assets/brand-logo.svg';

const Header: React.FC = () => {
  return (
    <header className="bg-white py-2 sm:py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <img
              src={BrandLogo}
              alt="FlexCar"
              className="h-10 w-[107px] cursor-pointer"
            />
          </div>
          <div className="flex items-center space-x-1 sm:space-x-4">
            <span className="text-inter-16-semibold text-black hidden sm:inline cursor-pointer">
              How it works
            </span>
            <span className="text-inter-16-semibold text-black xs:hidden cursor-pointer">
              Log in
            </span>
            {/* Mobile menu button */}
            <button className="sm:hidden p-1 ml-1">
              <Menu className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
