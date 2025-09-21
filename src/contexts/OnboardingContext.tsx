import React, { useState, useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import type { OnboardingContextType } from '@/types/contexts/OnboardingContext.types';
import { OnboardingContext } from './OnboardingContextInstance';
import { useZipCodeModal } from './ZipCodeModalContextInstance';
import { useVehicle } from '@/hooks/useVehicle';

interface OnboardingProviderProps {
  children: ReactNode;
}

export const OnboardingProvider: React.FC<OnboardingProviderProps> = ({
  children,
}) => {
  const navigate = useNavigate();
  const { isZipCodeModalOpen, closeZipCodeModal } = useZipCodeModal();
  const { searchVehicles } = useVehicle();
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [zipCode, setZipCode] = useState('');
  const [age, setAge] = useState('');
  const [creditScore, setCreditScore] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

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

  // Show modal when zip code modal is open
  useEffect(() => {
    if (isZipCodeModalOpen) {
      // Load existing user data from localStorage
      const userData = localStorage.getItem('flexcar-user-data');
      if (userData) {
        try {
          const parsedData = JSON.parse(userData);
          setZipCode(parsedData.zipCode || '');
          setAge(parsedData.age || '');
          setCreditScore(parsedData.creditScore || '');
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }

      setShowModal(true);
      setIsEditMode(true);
      setCurrentStep(1);
    }
  }, [isZipCodeModalOpen]);

  // Reset zip code modal state when onboarding modal is closed
  useEffect(() => {
    if (!showModal && isEditMode) {
      // Small delay to ensure the modal close animation completes
      const timer = setTimeout(() => {
        closeZipCodeModal();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [showModal, isEditMode, closeZipCodeModal]);

  const handleZipSubmit = (formData: {
    zipCode: string;
    age: string;
    creditScore: string;
  }) => {
    setZipCode(formData.zipCode);
    setAge(formData.age);
    setCreditScore(formData.creditScore);

    // If in edit mode, close modal and update vehicles
    if (isEditMode) {
      // Store updated user data in localStorage
      const userData = {
        zipCode: formData.zipCode,
        age: formData.age,
        creditScore: formData.creditScore,
      };
      localStorage.setItem('flexcar-user-data', JSON.stringify(userData));

      setShowModal(false);
      setIsEditMode(false);
      closeZipCodeModal();

      // Trigger vehicle search with new zip code
      searchVehicles(formData.zipCode);
    } else {
      setCurrentStep(2);
    }
  };

  const handleUserInfoSubmit = (formData: {
    zipCode: string;
    age: string;
    creditScore: string;
  }) => {
    setZipCode(formData.zipCode);
    setAge(formData.age);
    setCreditScore(formData.creditScore);

    // Store user data in localStorage
    const userData = {
      zipCode: formData.zipCode,
      age: formData.age,
      creditScore: formData.creditScore,
    };
    localStorage.setItem('flexcar-user-data', JSON.stringify(userData));

    // Handle user info submission
    setShowModal(false);
    setIsEditMode(false);

    // Only navigate to vehicle listing page if not in edit mode
    if (!isEditMode) {
      navigate('/inventory');
    }
  };

  const handleLocateMe = () => {
    // Handle locate me functionality
    console.info('Locate me clicked');
    // You can implement geolocation API here
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsEditMode(false);
    closeZipCodeModal();
  };

  const handleBackToStep1 = () => {
    setCurrentStep(1);
  };

  const openEditModal = (step: number) => {
    // Load existing user data from localStorage
    const userData = localStorage.getItem('flexcar-user-data');
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        setZipCode(parsedData.zipCode || '');
        setAge(parsedData.age || '');
        setCreditScore(parsedData.creditScore || '');
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }

    setCurrentStep(step);
    setIsEditMode(true);
    setShowModal(true);
  };

  const value: OnboardingContextType = {
    showModal,
    currentStep,
    zipCode,
    age,
    creditScore,
    isEditMode,
    setShowModal,
    setCurrentStep,
    setZipCode,
    setAge,
    setCreditScore,
    setIsEditMode,
    handleZipSubmit,
    handleUserInfoSubmit,
    handleLocateMe,
    handleCloseModal,
    handleBackToStep1,
    openEditModal,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};
