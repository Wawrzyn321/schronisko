import { AnimalType } from '@prisma-app/client';

export type VolunteeringFormFetch = {
  fullName: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  about: string;
  captchaToken: string;
  animalType: AnimalType;
};

export function validateVoluneeringFormFetch(args: VolunteeringFormFetch) {
  return Boolean(
    args.fullName &&
      args.email &&
      args.phoneNumber &&
      args.birthDate &&
      args.about &&
      args.captchaToken,
  );
}

export type VAdoptionFormFetch = {
  fullName: string;
  vCaretakerName: string;
  email: string;
  additionalMessage: string;
  animalId: string;
  animalName: string;
  animalRefNo: string;
  captchaToken: string;
};

export function validateVAdoptionFormFetch(args: VAdoptionFormFetch) {
  return Boolean(
    args.fullName &&
      args.vCaretakerName &&
      args.email &&
      args.animalId &&
      args.animalName &&
      args.animalRefNo &&
      args.captchaToken,
  );
}
