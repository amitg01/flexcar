import React from 'react';
import { Menu, MapPin, User, CreditCard } from 'lucide-react';
import BrandLogo from '@/assets/brand-logo.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { useOnboarding } from '@/hooks/useOnboarding';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { openEditModal } = useOnboarding();

  const isInventoryPage = location.pathname === '/inventory';

  // Click handlers for user data elements
  const handleZipCodeClick = () => {
    openEditModal(1); // Go to step 1 (zip code step) with prefilled data
  };

  const handleAgeClick = () => {
    openEditModal(2); // Go to step 2 (user info step) with prefilled data
  };

  const handleCreditScoreClick = () => {
    openEditModal(2); // Go to step 2 (user info step) with prefilled data
  };

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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          {/* Logo, user data, and hamburger on same line on mobile */}
          <div className="flex items-center justify-between sm:justify-start">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <img
                src={BrandLogo}
                alt="FlexCar"
                className="h-10 w-[107px] cursor-pointer"
                onClick={() => navigate('/')}
              />
              {/* User data elements - next to logo on desktop, below on mobile */}
              {isInventoryPage && userData && (
                <div className="hidden sm:flex items-center space-x-4 text-sm text-gray-600 ml-6">
                  <div
                    className="flex items-center space-x-1 bg-gray-100 rounded-md p-2 cursor-pointer hover:bg-gray-200 transition-colors"
                    onClick={handleZipCodeClick}
                    title="Click to change location"
                  >
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-semibold text-black">
                      {userData.zipCode}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 bg-gray-100 rounded-md p-2">
                    <div
                      className="flex items-center space-x-1 cursor-pointer hover:bg-gray-200 transition-colors rounded px-1 py-1 -mx-1 -my-1"
                      onClick={handleAgeClick}
                      title="Click to change age"
                    >
                      <User className="w-4 h-4" />
                      <span className="text-sm font-semibold text-black">
                        {userData.age}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-gray-400">
                      |
                    </span>
                    <div
                      className="flex items-center space-x-1 cursor-pointer hover:bg-gray-200 transition-colors rounded px-1 py-1 -mx-1 -my-1"
                      onClick={handleCreditScoreClick}
                      title="Click to change credit score"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span className="text-sm font-semibold text-black">
                        {userData.creditScore}+
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* Mobile menu button */}
            <button className="sm:hidden p-1 ml-1">
              <Menu className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* User data elements - wrap to next line on mobile */}
          {isInventoryPage && userData && (
            <div className="flex sm:hidden flex-col items-start space-y-2 text-sm text-gray-600 mt-2">
              <div
                className="flex items-center space-x-1 bg-gray-100 rounded-md p-2 cursor-pointer hover:bg-gray-200 transition-colors"
                onClick={handleZipCodeClick}
                title="Click to change location"
              >
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-semibold text-black">
                  {userData.zipCode}
                </span>
              </div>
              <div className="flex items-center space-x-1 bg-gray-100 rounded-md p-2">
                <div
                  className="flex items-center space-x-1 cursor-pointer hover:bg-gray-200 transition-colors rounded px-1 py-1 -mx-1 -my-1"
                  onClick={handleAgeClick}
                  title="Click to change age"
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm font-semibold text-black">
                    {userData.age}
                  </span>
                </div>
                <span className="text-sm font-semibold text-gray-400">|</span>
                <div
                  className="flex items-center space-x-1 cursor-pointer hover:bg-gray-200 transition-colors rounded px-1 py-1 -mx-1 -my-1"
                  onClick={handleCreditScoreClick}
                  title="Click to change credit score"
                >
                  <CreditCard className="w-4 h-4" />
                  <span className="text-sm font-semibold text-black">
                    {userData.creditScore}+
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Desktop navigation - hidden on mobile */}
          <div className="hidden sm:flex items-center space-x-4">
            <span className="text-inter-16-semibold text-black cursor-pointer">
              How it works
            </span>
            <span className="text-inter-16-semibold text-black cursor-pointer">
              Log in
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
