import React, { useState, useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import type { OnboardingContextType } from '@/types/contexts/OnboardingContext.types';
import { OnboardingContext } from './OnboardingContextInstance';

interface OnboardingProviderProps {
  children: ReactNode;
}

export const OnboardingProvider: React.FC<OnboardingProviderProps> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [zipCode, setZipCode] = useState('');
  const [age, setAge] = useState('');
  const [creditScore, setCreditScore] = useState('');

  // Check localStorage on mount
  useEffect(() => {
    const userData = localStorage.getItem('flexcar-user-data');
    if (userData) {
      // User data exists, don't show modal
      setShowModal(false);
    } else {
      // No user data, show modal
      setShowModal(true);
    }
  }, []);

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
      // Store user data in localStorage
      const userData = { zipCode, age, creditScore };
      localStorage.setItem('flexcar-user-data', JSON.stringify(userData));

      // Handle user info submission
      console.log('User info submitted:', userData);
      setShowModal(false);

      // Navigate to vehicle listing page
      navigate('/inventory');
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
