import { createContext } from 'react';
import type { OnboardingContextType } from '@/types/contexts/OnboardingContext.types';

export const OnboardingContext = createContext<
  OnboardingContextType | undefined
>(undefined);
