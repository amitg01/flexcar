import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import HeroSection from '../HeroSection';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('HeroSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render the hero section with correct structure', () => {
      renderWithRouter(<HeroSection />);

      expect(screen.getByText('Live large.')).toBeInTheDocument();
      expect(screen.getByText('Spend small.')).toBeInTheDocument();
      expect(screen.getByText('View cars')).toBeInTheDocument();
    });

    it('should render desktop description on desktop screens', () => {
      renderWithRouter(<HeroSection />);

      const desktopDescription = screen.getByText(
        /because freedom shouldn't come with a contract/
      );
      expect(desktopDescription).toBeInTheDocument();
      expect(desktopDescription).toHaveClass('hidden', 'md:block');
    });

    it('should render both mobile and desktop images', () => {
      renderWithRouter(<HeroSection />);

      const images = screen.getAllByAltText('Flexcar hero background');
      expect(images).toHaveLength(2);

      // Mobile image
      expect(images[0]).toHaveClass('md:hidden');
      expect(images[0]).toHaveAttribute(
        'src',
        'https://d3lxvmq39yvk72.cloudfront.net/web/images/homepage-live-large/heropage-mercedes-mobile.webp'
      );

      // Desktop image
      expect(images[1]).toHaveClass('hidden', 'md:block');
      expect(images[1]).toHaveAttribute(
        'src',
        'https://d3lxvmq39yvk72.cloudfront.net/web/images/homepage-live-large/hero-mercedes.webp'
      );
    });

    it('should render the view cars button with correct attributes', () => {
      renderWithRouter(<HeroSection />);

      const button = screen.getByTestId('hero-view-cars-button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('View cars');
      expect(button).toHaveClass('hover:cursor-pointer');
    });
  });

  describe('Navigation', () => {
    it('should navigate to /inventory when view cars button is clicked', () => {
      renderWithRouter(<HeroSection />);

      const button = screen.getByTestId('hero-view-cars-button');
      fireEvent.click(button);

      expect(mockNavigate).toHaveBeenCalledWith('/inventory');
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });
  });

  describe('Responsive Design', () => {
    it('should have proper responsive classes', () => {
      renderWithRouter(<HeroSection />);

      const container = screen.getByText('Live large.').closest('div')
        ?.parentElement?.parentElement?.parentElement;
      expect(container).toHaveClass(
        'flex',
        'w-full',
        'flex-row',
        'items-center',
        'justify-center'
      );
    });

    it('should have proper text sizing classes', () => {
      renderWithRouter(<HeroSection />);

      const mainHeading = screen.getByText('Live large.');
      expect(mainHeading).toHaveClass(
        'text-3xl',
        'xs:text-4xl',
        'sm:text-5xl',
        'md:text-7xl'
      );
    });
  });

  describe('Accessibility', () => {
    it('should have proper alt text for images', () => {
      renderWithRouter(<HeroSection />);

      const images = screen.getAllByAltText('Flexcar hero background');
      expect(images).toHaveLength(2);
    });

    it('should have proper button accessibility', () => {
      renderWithRouter(<HeroSection />);

      const button = screen.getByTestId('hero-view-cars-button');
      expect(button).toBeEnabled();
    });
  });

  describe('Performance', () => {
    it('should have proper image loading attributes', () => {
      renderWithRouter(<HeroSection />);

      const images = screen.getAllByAltText('Flexcar hero background');
      images.forEach(image => {
        expect(image).toHaveAttribute('fetchPriority', 'high');
        expect(image).toHaveAttribute('loading', 'eager');
      });
    });
  });
});
