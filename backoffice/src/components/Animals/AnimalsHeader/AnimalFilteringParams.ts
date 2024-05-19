import type { AnimalType, AnimalGender, AnimalLocation, AnimalCategory, Animal } from '@prisma-app/client';
import type { AnimalListElement } from './../../../common/types';

export type AnimalFilteringParams = {
    showOnlyPublic: boolean;
    typeFilter: AnimalType[];
    genderFilter: AnimalGender[];
    searchPhrase: string;
    locationFilter: AnimalLocation[];
    categoryFilter: AnimalCategory[];
};

const filterBySearchPhrase =
    (params: AnimalFilteringParams) => (animal: AnimalListElement) =>
        !params.searchPhrase ||
        animal.name.toLowerCase().includes(params.searchPhrase.toLowerCase()) ||
        animal.refNo.toLowerCase().includes(params.searchPhrase.toLowerCase());

const filterByPublic = (params: AnimalFilteringParams) => (animal: AnimalListElement) =>
    !params.showOnlyPublic || animal.isPublic;

const filterByType = (params: AnimalFilteringParams) => (animal: AnimalListElement) =>
    !params.typeFilter.length || params.typeFilter.includes(animal.type);

const filterByGender = (params: AnimalFilteringParams) => (animal: AnimalListElement) =>
    !params.genderFilter.length || params.genderFilter.includes(animal.gender);

const filterByLocation =
    (params: AnimalFilteringParams) => (animal: AnimalListElement) =>
        !params.locationFilter.length ||
        (animal.location && params.locationFilter.includes(animal.location));

const filterByCategory =
    (params: AnimalFilteringParams) => (animal: AnimalListElement) =>
        !params.categoryFilter.length ||
        params.categoryFilter.includes(animal.category);

export const applyFiltering = (animals: AnimalListElement[], params: AnimalFilteringParams) =>
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
