import React from 'react';
import { Menu, MapPin, User, CreditCard } from 'lucide-react';
import BrandLogo from '@/assets/brand-logo.svg';
import { useLocation, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
              onClick={() => navigate('/')}
            />
            {isInventoryPage && userData && (
              <div className="flex items-center space-x-4 text-sm text-gray-600 ml-6">
                <div className="flex items-center space-x-1 bg-gray-100 rounded-md p-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-semibold text-black">
                    {userData.zipCode}
                  </span>
                </div>
                <div className="flex items-center space-x-1 bg-gray-100 rounded-md p-2">
                  <User className="w-4 h-4" />
                  <span className="text-sm font-semibold text-black">
                    {userData.age}
                  </span>
                </div>
                <div className="flex items-center space-x-1 bg-gray-100 rounded-md p-2">
                  <CreditCard className="w-4 h-4" />
                  <span className="text-sm font-semibold text-black">
                    {userData.creditScore}+
                  </span>
                </div>
              </div>
            )}
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
