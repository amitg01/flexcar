import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal, Select } from '@/components/ui';
import { MapPin, ArrowLeft, HelpCircle } from 'lucide-react';
import { useOnboarding } from '@/hooks/useOnboarding';
import {
  AGE_OPTIONS,
  CREDIT_SCORE_OPTIONS,
} from '@/constants/onboarding-constants';
import {
  onboardingSchema,
  type OnboardingFormData,
} from '@/validation/onboarding';

const OnboardingModal: React.FC = () => {
  const {
    showModal,
    currentStep,
    zipCode,
    age,
    creditScore,
    isEditMode,
    handleLocateMe,
    handleCloseModal,
    handleBackToStep1,
  } = useOnboarding();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    reset,
  } = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    mode: 'onChange',
    defaultValues: {
      zipCode: zipCode || '',
      age: age || '',
      creditScore: creditScore || '',
    },
  });

  // Watch form values for real-time validation
  const watchedValues = watch();

  // Update form when context values change (for edit mode)
  React.useEffect(() => {
    if (isEditMode) {
      reset({
        zipCode: zipCode || '',
        age: age || '',
        creditScore: creditScore || '',
      });
    }
  }, [zipCode, age, creditScore, isEditMode, reset]);

  const { handleZipSubmit, handleUserInfoSubmit } = useOnboarding();

  const onSubmit = (data: OnboardingFormData) => {
    if (currentStep === 1) {
      handleZipSubmit(data);
    } else {
      handleUserInfoSubmit(data);
    }
  };

  // Check if current step is valid
  const isCurrentStepValid = React.useMemo(() => {
    if (currentStep === 1) {
      return watchedValues.zipCode && !errors.zipCode;
    } else {
      return (
        watchedValues.age &&
        watchedValues.creditScore &&
        !errors.age &&
        !errors.creditScore
      );
    }
  }, [currentStep, watchedValues, errors]);

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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                  {...register('zipCode')}
                  placeholder="12345"
                  className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none ${
                    errors.zipCode ? 'border-red-500' : 'border-gray-300'
                  }`}
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
              {errors.zipCode && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.zipCode.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!isCurrentStepValid}
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                isCurrentStepValid
                  ? 'bg-black text-white hover:bg-gray-800'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Controller
                  name="age"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="Age"
                      value={field.value}
                      onChange={field.onChange}
                      options={[
                        { value: '', label: 'Select one' },
                        ...AGE_OPTIONS,
                      ]}
                      className={errors.age ? 'border-red-500' : ''}
                    />
                  )}
                />
                {errors.age && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.age.message}
                  </p>
                )}
              </div>

              <div>
                <Controller
                  name="creditScore"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="Credit score"
                      value={field.value}
                      onChange={field.onChange}
                      options={[
                        { value: '', label: 'Select one' },
                        ...CREDIT_SCORE_OPTIONS,
                      ]}
                      className={errors.creditScore ? 'border-red-500' : ''}
                    />
                  )}
                />
                {errors.creditScore && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.creditScore.message}
                  </p>
                )}
              </div>
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
              disabled={!isCurrentStepValid}
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                isCurrentStepValid
                  ? 'bg-black text-white hover:bg-gray-800'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
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
