import React from 'react';
import BrandLogo from '../../assets/brand-logo.svg';

const Footer: React.FC = () => {
  const flexcarLinks = [
    { label: 'FAQ', href: '#' },
    { label: 'Inventory', href: '#' },
    { label: 'The Flextra Mile', href: '#' },
    { label: 'Careers', href: '#' },
  ];

  const supportLinks = [
    { label: 'Pickups', href: '#' },
    { label: 'Delivery', href: '#' },
    { label: 'Swaps', href: '#' },
    { label: 'Returns', href: '#' },
    { label: 'Help center', href: '#' },
  ];

  const socialLinks = [
    { label: 'Facebook', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'Twitter', href: '#' },
    { label: 'LinkedIn', href: '#' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'SMS Privacy Policy', href: '#' },
    { label: 'Membership Agreement', href: '#' },
    { label: 'Sitemap', href: '#' },
  ];

  return (
    <footer className="bg-gray-900 text-white py-8 xs:py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 xs:gap-6 sm:gap-8 mb-6 xs:mb-8 sm:mb-12">
                <div className="sm:col-span-2 md:col-span-1">
                  <div className="flex items-center space-x-1 xs:space-x-2 mb-2 xs:mb-3 sm:mb-4">
                    <img 
                      src={BrandLogo} 
                      alt="FlexCar" 
                      className="h-5 xs:h-6 sm:h-8 w-auto"
                    />
                  </div>
                  <p className="text-xs xs:text-sm sm:text-base text-gray-400">
                    Live large. Spend small.
                  </p>
                </div>

          <div>
            <h4 className="font-bold mb-2 xs:mb-3 sm:mb-4 text-xs xs:text-sm sm:text-base">
              Flexcar
            </h4>
            <ul className="space-y-1 text-xs xs:text-sm sm:text-base text-gray-400">
              {flexcarLinks.map(link => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-2 xs:mb-3 sm:mb-4 text-xs xs:text-sm sm:text-base">
              Support
            </h4>
            <ul className="space-y-1 text-xs xs:text-sm sm:text-base text-gray-400">
              {supportLinks.map(link => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-2 xs:mb-3 sm:mb-4 text-xs xs:text-sm sm:text-base">
              Social
            </h4>
            <div className="flex flex-wrap gap-2 xs:gap-3 sm:gap-4">
              {socialLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-gray-400 hover:text-white text-xs xs:text-sm sm:text-base"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-4 xs:pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 xs:space-y-4 sm:space-y-0">
            <p className="text-xs xs:text-sm sm:text-base text-gray-400 text-center sm:text-left">
              © 2025 Flexcar, LLC. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-end gap-1 xs:gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400">
              {legalLinks.map((link, index) => (
                <React.Fragment key={link.label}>
                  <a href={link.href} className="hover:text-white">
                    {link.label}
                  </a>
                  {index < legalLinks.length - 1 && <span>•</span>}
                </React.Fragment>
              ))}
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
