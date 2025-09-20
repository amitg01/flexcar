import React, { useEffect } from 'react';
import { Header, Footer, Banner } from '../../components/layout';
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
import { useOnboarding } from '../../contexts/OnboardingContext';

const HomePage: React.FC = () => {
  const { setShowModal } = useOnboarding();

  useEffect(() => {
    setShowModal(true);
  }, [setShowModal]);

  return (
    <div className="min-h-screen bg-white">
      <OnboardingModal />
      <Banner />
      <Header />
      <HeroSection />
      <VideoSection />
      <FreedomSection />
      <VehicleCategoriesSection />
      <BenefitsSection />
      <ReviewsSection />
      <CTASection />
      <AppDownloadSection />

      <Footer />
    </div>
  );
};

export default HomePage;
