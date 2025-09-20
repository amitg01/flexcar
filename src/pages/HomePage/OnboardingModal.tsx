import React from 'react';
import { Modal, Select } from '@/components/ui';
import { MapPin, ArrowLeft, HelpCircle } from 'lucide-react';
import { useOnboarding } from '@/hooks/useOnboarding';
import {
  AGE_OPTIONS,
  CREDIT_SCORE_OPTIONS,
} from '@/constants/onboarding-constants';

const OnboardingModal: React.FC = () => {
  const {
    showModal,
    currentStep,
    zipCode,
    age,
    creditScore,
    isEditMode,
    setZipCode,
    setAge,
    setCreditScore,
    handleZipSubmit,
    handleUserInfoSubmit,
    handleLocateMe,
    handleCloseModal,
    handleBackToStep1,
  } = useOnboarding();

  return (
    <Modal
      isOpen={showModal}
      onClose={handleCloseModal}
      showCloseButton={false}
      title={
        isEditMode
          ? currentStep === 1
            ? 'Update Location'
            : 'Update Profile'
          : currentStep === 1
            ? 'Find Flexcars near you'
            : 'About you'
      }
      closeOnBackdropClick={true}
    >
      {currentStep === 1 ? (
        <>
          <div className="mb-6">
            {!isEditMode && (
              <div className="text-sm text-gray-500 mb-2">STEP 1 OF 2</div>
            )}
            <p className="text-gray-600 text-sm sm:text-base">
              {isEditMode
                ? 'Update your ZIP code to see accurate availability and delivery options in your area.'
                : 'Enter your ZIP code to see accurate availability and delivery options in your area.'}
            </p>
          </div>

          <form onSubmit={handleZipSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="zipCode"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Enter ZIP code
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  id="zipCode"
                  value={zipCode}
                  onChange={e => setZipCode(e.target.value)}
                  placeholder="12345"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  maxLength={5}
                />
                <button
                  type="button"
                  onClick={handleLocateMe}
                  className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  <span className="hidden xs:inline">Locate me</span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              data-testid="zip-next-button"
            >
              {isEditMode ? 'Update Location' : 'Next'}
            </button>
          </form>
        </>
      ) : (
        <>
          <div className="mb-6">
            {!isEditMode && (
              <div className="flex items-center gap-2 mb-2">
                <button
                  onClick={handleBackToStep1}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  data-testid="back-to-step1-button"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="text-sm text-gray-500">STEP 2 OF 2</div>
              </div>
            )}
            {isEditMode && (
              <p className="text-gray-600 text-sm sm:text-base">
                Update your age and credit score information.
              </p>
            )}
          </div>

          <form onSubmit={handleUserInfoSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Age"
                value={age}
                onChange={e => setAge(e.target.value)}
                options={AGE_OPTIONS}
                placeholder="Select one"
              />

              <Select
                label="Credit score"
                value={creditScore}
                onChange={e => setCreditScore(e.target.value)}
                options={CREDIT_SCORE_OPTIONS}
                placeholder="Select one"
              />
            </div>

            <div className="bg-gray-50 rounded-lg p-4 flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-600">
                Don't know your score? Just take a guess and we'll confirm later
                at checkout.
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              data-testid="modal-view-cars-button"
            >
              {isEditMode ? 'Update Profile' : 'View cars'}
            </button>
          </form>
        </>
      )}
    </Modal>
  );
};

export default OnboardingModal;
