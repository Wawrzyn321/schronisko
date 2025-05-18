import { Animal, News, Page as PageModel } from "@prisma-app/client";

export type AfterAdoptionAnimal = Pick<
  Animal,
  "id" | "imageName" | "name" | "type"
>;

export type NewsListElement = Pick<
  News,
  "id" | "description" | "title" | "createdAt" | "isPublished" | "imageName"
>;

export type PageFetchFn = (id: string, isSSR?: boolean) => Promise<PageModel>;

export type FormCaptcha = {
  id: string;
  text: string;
};

export type VolunteeringFormData = {
  fullName: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  about: string;
  captchaToken: string | null;
};

export type VAdoptionFormData = {
  fullName: string;
  vCaretakerName: string;
  email: string;
  additionalMessage: string;
  animalId: string;
  animalName: string;
  animalRefNo: string;
  captchaToken: string | null;
};

export type AnimalListResult = {
  animals: Animal[];
  totalCount: number;
};
