import React, { useState, type ReactNode } from 'react';
import type { OnboardingContextType } from './OnboardingContext.types';
import { OnboardingContext } from './OnboardingContextInstance';

interface OnboardingProviderProps {
  children: ReactNode;
}

export const OnboardingProvider: React.FC<OnboardingProviderProps> = ({
  children,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [zipCode, setZipCode] = useState('');
  const [age, setAge] = useState('');
  const [creditScore, setCreditScore] = useState('');

  const handleZipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipCode.trim()) {
      // Move to step 2
      setCurrentStep(2);
    }
  };

  const handleUserInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (age && creditScore) {
      // Handle user info submission
      console.log('User info submitted:', { zipCode, age, creditScore });
      setShowModal(false);
    }
  };

  const handleLocateMe = () => {
    // Handle locate me functionality
    console.log('Locate me clicked');
    // You can implement geolocation API here
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleBackToStep1 = () => {
    setCurrentStep(1);
  };

  const value: OnboardingContextType = {
    showModal,
    currentStep,
    zipCode,
    age,
    creditScore,
    setShowModal,
    setCurrentStep,
    setZipCode,
    setAge,
    setCreditScore,
    handleZipSubmit,
    handleUserInfoSubmit,
    handleLocateMe,
    handleCloseModal,
    handleBackToStep1,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};
