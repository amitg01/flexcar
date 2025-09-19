import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 xs:py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 xs:gap-6 sm:gap-8 mb-6 xs:mb-8 sm:mb-12">
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center space-x-1 xs:space-x-2 mb-2 xs:mb-3 sm:mb-4">
              <div className="w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs sm:text-sm">F</span>
              </div>
              <span className="text-base xs:text-lg sm:text-2xl font-bold text-white">FLEXCAR</span>
            </div>
            <p className="text-xs xs:text-sm sm:text-base text-gray-400">Live large. Spend small.</p>
          </div>

          <div>
            <h4 className="font-bold mb-2 xs:mb-3 sm:mb-4 text-xs xs:text-sm sm:text-base">Flexcar</h4>
            <ul className="space-y-1 text-xs xs:text-sm sm:text-base text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Inventory
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  The Flextra Mile
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-2 xs:mb-3 sm:mb-4 text-xs xs:text-sm sm:text-base">Support</h4>
            <ul className="space-y-1 text-xs xs:text-sm sm:text-base text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Pickups
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Delivery
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Swaps
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Help center
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-2 xs:mb-3 sm:mb-4 text-xs xs:text-sm sm:text-base">Social</h4>
            <div className="flex flex-wrap gap-2 xs:gap-3 sm:gap-4">
              <a href="#" className="text-gray-400 hover:text-white text-xs xs:text-sm sm:text-base">
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-xs xs:text-sm sm:text-base">
                Instagram
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-xs xs:text-sm sm:text-base">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-xs xs:text-sm sm:text-base">
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-4 xs:pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 xs:space-y-4 sm:space-y-0">
            <p className="text-xs xs:text-sm sm:text-base text-gray-400 text-center sm:text-left">
              © 2025 Flexcar, LLC. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-end gap-1 xs:gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400">
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
              <span>•</span>
              <a href="#" className="hover:text-white">
                Terms of Service
              </a>
              <span>•</span>
              <a href="#" className="hover:text-white">
                SMS Privacy Policy
              </a>
              <span>•</span>
              <a href="#" className="hover:text-white">
                Membership Agreement
              </a>
              <span>•</span>
              <a href="#" className="hover:text-white">
                Sitemap
              </a>
              <span>•</span>
              <button className="hover:text-white">Cookie Preferences</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
