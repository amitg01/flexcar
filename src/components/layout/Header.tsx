import React, { useState, useEffect } from 'react';
import { Menu, MapPin, User, CreditCard, X } from 'lucide-react';
import BrandLogo from '@/assets/brand-logo.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { useOnboarding } from '@/hooks/useOnboarding';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { openEditModal } = useOnboarding();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // Mobile menu handlers
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavigationClick = (path: string) => {
    navigate(path);
    closeMobileMenu();
  };

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMobileMenu();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

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
            <button
              className="sm:hidden p-1 ml-1 hover:bg-gray-100 rounded-md transition-colors"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4 text-gray-600" />
              ) : (
                <Menu className="w-4 h-4 text-gray-600" />
              )}
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

        {/* Mobile menu overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
            onClick={closeMobileMenu}
          />
        )}

        {/* Mobile menu */}
        <div
          className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out sm:hidden ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Mobile menu header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <img src={BrandLogo} alt="FlexCar" className="h-8 w-[85px]" />
              <button
                onClick={closeMobileMenu}
                className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                aria-label="Close mobile menu"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Mobile menu navigation */}
            <div className="flex-1 p-4">
              <nav className="space-y-4">
                <button
                  onClick={() => handleNavigationClick('/')}
                  className="block w-full text-left text-lg font-semibold text-black hover:text-gray-600 transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => handleNavigationClick('/inventory')}
                  className="block w-full text-left text-lg font-semibold text-black hover:text-gray-600 transition-colors"
                >
                  View Cars
                </button>
                <button
                  onClick={() => handleNavigationClick('/how-it-works')}
                  className="block w-full text-left text-lg font-semibold text-black hover:text-gray-600 transition-colors"
                >
                  How it works
                </button>
                <button
                  onClick={() => handleNavigationClick('/login')}
                  className="block w-full text-left text-lg font-semibold text-black hover:text-gray-600 transition-colors"
                >
                  Log in
                </button>
              </nav>

              {/* Mobile user data section */}
              {isInventoryPage && userData && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                    Your Profile
                  </h3>
                  <div className="space-y-3">
                    <div
                      className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3 cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => {
                        handleZipCodeClick();
                        closeMobileMenu();
                      }}
                    >
                      <MapPin className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-semibold text-black">
                          {userData.zipCode}
                        </p>
                      </div>
                    </div>
                    <div
                      className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3 cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => {
                        handleAgeClick();
                        closeMobileMenu();
                      }}
                    >
                      <User className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-500">Age Range</p>
                        <p className="font-semibold text-black">
                          {userData.age}
                        </p>
                      </div>
                    </div>
                    <div
                      className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3 cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => {
                        handleCreditScoreClick();
                        closeMobileMenu();
                      }}
                    >
                      <CreditCard className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-500">Credit Score</p>
                        <p className="font-semibold text-black">
                          {userData.creditScore}+
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
