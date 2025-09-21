import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../HomePage';

// Mock the hooks
const mockUseOnboarding = vi.fn();

vi.mock('@/hooks/useOnboarding', () => ({
  useOnboarding: () => mockUseOnboarding(),
}));

// Mock the layout components
vi.mock('@/components/layout', () => ({
  Header: () => <div data-testid="header">Header</div>,
  Footer: () => <div data-testid="footer">Footer</div>,
  Banner: () => <div data-testid="banner">Banner</div>,
}));

// Mock the OnboardingModal
vi.mock('../HomePage/OnboardingModal', () => ({
  default: () => <div data-testid="onboarding-modal">Onboarding Modal</div>,
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('User Interactions', () => {
    it('should show onboarding modal when showModal is true', () => {
      mockUseOnboarding.mockReturnValue({ showModal: true });

      renderWithRouter(<HomePage />);

      expect(screen.getByTestId('onboarding-modal')).toBeInTheDocument();
    });

    it('should not show onboarding modal when showModal is false', () => {
      mockUseOnboarding.mockReturnValue({ showModal: false });

      renderWithRouter(<HomePage />);

      expect(screen.queryByTestId('onboarding-modal')).not.toBeInTheDocument();
    });

    it('should call useOnboarding hook', () => {
      mockUseOnboarding.mockReturnValue({ showModal: false });

      renderWithRouter(<HomePage />);

      expect(mockUseOnboarding).toHaveBeenCalledTimes(1);
    });

    it('should render without crashing when useOnboarding returns undefined', () => {
      mockUseOnboarding.mockReturnValue({ showModal: false });

      expect(() => renderWithRouter(<HomePage />)).not.toThrow();
    });

    it('should render without crashing when showModal is undefined', () => {
      mockUseOnboarding.mockReturnValue({ showModal: undefined });

      expect(() => renderWithRouter(<HomePage />)).not.toThrow();
    });
  });
});
