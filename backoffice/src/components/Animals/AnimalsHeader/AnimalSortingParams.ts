import type { Animal } from '.prisma/client';
import type { AnimalListElement } from '../../../common/types';
import type { SortingOrder } from '../../shared/SortControl/SortControl';

export type AnimalSortingParams = {
    order: SortingOrder;
    sortBy: 'name' | 'modifiedAt' | 'addedAt'
}

export function applySorting(animals: AnimalListElement[], params: AnimalSortingParams) {
    const sorter = (a: Animal, b: Animal) => {
        if (params.sortBy === 'name') {
            const dir = params.order === 'ASC' ? 1 : -1;
            return a.name.localeCompare(b.name) * dir;
        }
        else if (params.sortBy === 'modifiedAt') {
            const dir = params.order === 'ASC' ? 1 : -1;
            return (new Date(a.modifiedAt).getTime() - new Date(b.modifiedAt).getTime()) * dir;
        }
        else if (params.sortBy === 'addedAt') {
            const dir = params.order === 'ASC' ? 1 : -1;
            return (new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime()) * dir;
        }
        return 1;
    }

    return animals.sort(sorter);
}

export function createDefaultSortingParams(): AnimalSortingParams {
    return {
        sortBy: 'modifiedAt',
        order: 'DESC',
    }
}