import React from 'react';
import { Header, Footer, Banner } from '@/components/layout';
import {
  HeroSection,
  VideoSection,
  FreedomSection,
  VehicleCategoriesSection,
  BenefitsSection,
  ReviewsSection,
  CTASection,
  AppDownloadSection,
} from './components';
import OnboardingModal from './OnboardingModal';
import { useOnboarding } from '@/hooks/useOnboarding';

const HomePage: React.FC = () => {
  const { showModal } = useOnboarding();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {showModal && <OnboardingModal />}
      <Banner />
      <Header />
      <div className="flex-1">
        <HeroSection />
        <VideoSection />
        <FreedomSection />
        <VehicleCategoriesSection />
        <BenefitsSection />
        <ReviewsSection />
        <CTASection />
        <AppDownloadSection />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
