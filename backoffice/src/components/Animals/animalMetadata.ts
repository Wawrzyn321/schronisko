import { VirtualCaretakerType } from '@prisma/client';
import { AnimalType, AnimalGender, AnimalLocation, AnimalCategory } from '.prisma/client';

export const animalTypes = Object.values(AnimalType);
export const animalTypesMap: { [type in AnimalType]: string } = {
  [AnimalType.CAT]: 'Kot',
  [AnimalType.DOG]: 'Pies',
};

export const animalGenders = Object.values(AnimalGender);
export const animalGendersMap: { [gender in AnimalGender]: string } = {
  [AnimalGender.FEMALE]: 'Żeńska',
  [AnimalGender.MALE]: 'Męska',
};

export const animalCategories = Object.values(AnimalCategory);
export const animalCategoriesMap: { [category in AnimalCategory]: string } = {
  [AnimalCategory.PilniePotrzebuja]: 'Pilnie potrzebują domu',
  [AnimalCategory.Weterani]: 'Nasi Weterani',
  [AnimalCategory.DoAdopcji]: 'Do adopcji',
  [AnimalCategory.ZnalazlyDom]: 'Znalazły dom',
  [AnimalCategory.ZaTeczowymMostem]: 'Za tęczowym mostem',
  [AnimalCategory.NiedawnoZnalezione]: 'Niedawno znalezione',
};

export const animalLocations = Object.values(AnimalLocation);
export const animalLocationsMap: { [location in AnimalLocation]: string } = {
  [AnimalLocation.DomTymczasowy]: 'Dom tymczasowy',
  [AnimalLocation.Hotel]: 'Hotel',
  [AnimalLocation.Schronisko]: 'Schronisko',
  [AnimalLocation.KociaChatka]: 'Kocia Chatka',
  [AnimalLocation.UOsobyPrywatnej]: 'U osoby prywatnej',
};

export const virtualCaretakerTypes = Object.values(VirtualCaretakerType);
export const virtualCaretakerTypesMap: { [vCaretaker in VirtualCaretakerType]: string } = {
  [VirtualCaretakerType.NiePrzypisany]: "Nieprzypisany",
  [VirtualCaretakerType.Szuka]: "Szuka",
  [VirtualCaretakerType.Znalazl]: "Znalazł"
}