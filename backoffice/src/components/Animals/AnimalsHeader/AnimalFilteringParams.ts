import type { AnimalType, AnimalGender, AnimalLocation, AnimalCategory, Animal } from '.prisma/client';

export type AnimalFilteringParams = {
    showOnlyPublic: boolean;
    typeFilter: AnimalType[];
    genderFilter: AnimalGender[];
    searchPhrase: string;
    locationFilter: AnimalLocation[];
    categoryFilter: AnimalCategory[];
};

const filterBySearchPhrase =
    (params: AnimalFilteringParams) => (animal: Animal) =>
        !params.searchPhrase ||
        animal.name.toLowerCase().includes(params.searchPhrase.toLowerCase());

const filterByPublic = (params: AnimalFilteringParams) => (animal: Animal) =>
    !params.showOnlyPublic || animal.isPublic;

const filterByType = (params: AnimalFilteringParams) => (animal: Animal) =>
    !params.typeFilter.length || params.typeFilter.includes(animal.type);

const filterByGender = (params: AnimalFilteringParams) => (animal: Animal) =>
    !params.genderFilter.length || params.genderFilter.includes(animal.gender);

const filterByLocation =
    (params: AnimalFilteringParams) => (animal: Animal) =>
        !params.locationFilter.length ||
        params.locationFilter.includes(animal.location);

const filterByCategory =
    (params: AnimalFilteringParams) => (animal: Animal) =>
        !params.categoryFilter.length ||
        params.categoryFilter.includes(animal.category);

export const applyFiltering = (animals: Animal[], params: AnimalFilteringParams) =>
    animals.filter(filterBySearchPhrase(params))
        .filter(filterByPublic(params))
        .filter(filterByType(params))
        .filter(filterByGender(params))
        .filter(filterByLocation(params))
        .filter(filterByCategory(params));

export function createDefaultFilteringParams(): AnimalFilteringParams {
    return {
        showOnlyPublic: true,
        typeFilter: [],
        searchPhrase: '',
        genderFilter: [],
        locationFilter: [],
        categoryFilter: [],
    };
}
