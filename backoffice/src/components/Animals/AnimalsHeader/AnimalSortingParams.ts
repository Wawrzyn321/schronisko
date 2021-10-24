import type { Animal } from '.prisma/client';
import type { AnimalListElement } from '../../../common/types';
import type { SortingOrder } from '../../shared/SortControl/SortControl';

export type AnimalSortingParams = {
    sortByName: SortingOrder;
    sortByDate: SortingOrder;
}

export function applySorting(animals: AnimalListElement[], params: AnimalSortingParams) {
    const sorter = (a: Animal, b: Animal) => {
        if (params.sortByName) {
            const dir = params.sortByName === 'ASC' ? 1 : -1;
            return a.name.localeCompare(b.name) * dir;
        }
        if (params.sortByDate) {
            const dir = params.sortByName === 'ASC' ? 1 : -1;
            return (new Date(a.addedDate).getTime() - new Date(b.addedDate).getTime()) * dir;
        }
        return 1;
    }

    return animals.sort(sorter);
}

export function createDefaultSortingParams(): AnimalSortingParams {
    return {
        sortByName: 'ASC',
        sortByDate: null,
    }
}