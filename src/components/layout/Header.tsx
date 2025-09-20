import React from 'react';
import { Menu, MapPin, User, CreditCard, Calendar, Shield } from 'lucide-react';
import BrandLogo from '@/assets/brand-logo.svg';
import { useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  const isInventoryPage = location.pathname === '/inventory';

  // Get user data from localStorage for inventory page
  const userData = isInventoryPage
    ? (() => {
        try {
          const data = localStorage.getItem('flexcar-user-data');
          return data ? JSON.parse(data) : null;
        } catch {
          return null;
        }
      })()
    : null;

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

          {isInventoryPage && userData ? (
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{userData.zipCode}</span>
              </div>
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>{userData.age}</span>
              </div>
              <div className="flex items-center space-x-1">
                <CreditCard className="w-4 h-4" />
                <span>{userData.creditScore}+</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Standard Plan</span>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="w-4 h-4" />
                <span>Protection: Essential</span>
              </div>
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
