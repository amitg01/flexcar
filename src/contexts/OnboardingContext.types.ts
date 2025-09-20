export interface OnboardingContextType {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  zipCode: string;
  setZipCode: (zip: string) => void;
  age: string;
  setAge: (age: string) => void;
  creditScore: string;
  setCreditScore: (score: string) => void;
  handleZipSubmit: (e: React.FormEvent) => void;
  handleUserInfoSubmit: (e: React.FormEvent) => void;
  handleLocateMe: () => void;
  handleCloseModal: () => void;
  handleBackToStep1: () => void;
}
