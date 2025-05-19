import { z } from 'zod';
import { AnimalType } from '@prisma-app/client';

export const VAdoptionFormDataSchema = z
  .object({
    fullName: z.string().min(1).max(50),
    vCaretakerName: z.string().min(1).max(120),
    email: z.string().email().max(120),
    animalId: z.string(),
    animalName: z.string(),
    animalRefNo: z.string(),
    additionalMessage: z.string().max(120),
    captchaToken: z.string(),
  })
  .required();

export type VAdoptionFormData = z.infer<typeof VAdoptionFormDataSchema>;

export const VolunteeringFormDataSchema = z
  .object({
    fullName: z.string().min(1).max(50),
    email: z.string().email().max(120),
    phoneNumber: z.string().min(9).max(20),
    birthDate: z.string().max(10),
    about: z.string().max(160),
    captchaToken: z.string(),
    animalType: z.union([z.literal(AnimalType.CAT), z.literal(AnimalType.DOG)]),
  })
  .required();

export type VolunteeringFormData = z.infer<typeof VolunteeringFormDataSchema>;
