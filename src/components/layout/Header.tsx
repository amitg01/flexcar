import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 py-2 sm:py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="w-5 h-5 sm:w-8 sm:h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs sm:text-sm">
                F
              </span>
            </div>
            <span className="text-base sm:text-2xl font-bold text-purple-600">
              FLEXCAR
            </span>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-4">
            <span className="text-xs sm:text-sm text-gray-600 hidden sm:inline">
              How it works
            </span>
            <span className="text-xs sm:text-sm text-gray-600 hidden xs:inline">Log in</span>
            <span className="text-xs sm:text-sm text-gray-600 xs:hidden">Login</span>
            {/* Mobile menu button */}
            <button className="sm:hidden p-1 ml-1">
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
