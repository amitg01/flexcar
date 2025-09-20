import { z } from 'zod';

// US ZIP code validation (5 digits)
const zipCodeRegex = /^\d{5}$/;

export const onboardingSchema = z.object({
  zipCode: z
    .string()
    .min(1, 'ZIP code is required')
    .regex(zipCodeRegex, 'Please enter a valid 5-digit US ZIP code'),
  age: z
    .string()
    .min(1, 'Age is required')
    .refine(val => val !== '', 'Please select an age range'),
  creditScore: z
    .string()
    .min(1, 'Credit score is required')
    .refine(val => val !== '', 'Please select a credit score range'),
});

export type OnboardingFormData = z.infer<typeof onboardingSchema>;
