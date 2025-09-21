import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import AppDownloadSection from '../AppDownloadSection';

describe('AppDownloadSection', () => {
  describe('User Interactions', () => {
    it('should render app store download links with correct attributes', () => {
      render(<AppDownloadSection />);

      const appStoreLink = screen
        .getByAltText('Download on the App Store')
        .closest('a');
      expect(appStoreLink).toHaveAttribute(
        'href',
        'https://apps.apple.com/us/app/my-flexcar/id1548544372'
      );
      expect(appStoreLink).toHaveAttribute('target', '_blank');
      expect(appStoreLink).toHaveAttribute('rel', 'noreferrer');
    });

    it('should render Google Play download link with correct attributes', () => {
      render(<AppDownloadSection />);

      const playStoreLink = screen
        .getByAltText('GET IT ON Google Play')
        .closest('a');
      expect(playStoreLink).toHaveAttribute(
        'href',
        'https://play.google.com/store/apps/details?id=com.flexcar.flexcar'
      );
      expect(playStoreLink).toHaveAttribute('target', '_blank');
      expect(playStoreLink).toHaveAttribute('rel', 'noreferrer');
    });

    it('should render hub finder link with correct attributes', () => {
      render(<AppDownloadSection />);

      const hubLink = screen.getByText('Find a hub near you').closest('a');
      expect(hubLink).toHaveAttribute(
        'href',
        'https://support.flexcar.com/hc/en-us/sections/8349003738907-Flexcar-Locations'
      );
    });

    it('should render business contact link with correct attributes', () => {
      render(<AppDownloadSection />);

      const contactLink = screen.getByText('Contact Us').closest('a');
      expect(contactLink).toHaveAttribute(
        'href',
        'mailto:business@flexcar.com?subject=Flexcar%20for%20Business%20Inquiry'
      );
    });

    it('should render how it works link with correct attributes', () => {
      render(<AppDownloadSection />);

      const howItWorksLink = screen.getByText('How it works').closest('a');
      expect(howItWorksLink).toHaveAttribute('href', '/how-it-works');
      expect(howItWorksLink).toHaveAttribute('data-discover', 'true');
    });
  });
});
