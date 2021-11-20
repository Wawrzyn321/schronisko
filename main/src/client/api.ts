import { NewsListElement } from 'types';
import { AnimalCategory, AnimalType, News } from '.prisma/client';
import { AnimalImage, Page as PageModel, Animal, VirtualCaretakerType, Settings } from '@prisma/client';

const DEV = 1;

const BACKEND_URL = DEV ? 'http://localhost:60045' : 'https://schronisko-backend.oto-jest-wawrzyn.pl';
const SSR_BACKEND_URL = DEV ? 'http://localhost:60045' : 'https://schronisko-backend.oto-jest-wawrzyn.pl';

export const SITE_IMAGES_URL = BACKEND_URL + '/site';
export const OVERLAYS_URL = SITE_IMAGES_URL + '/overlays';
export const MAIN_PAGE_IMAGES_URL = SITE_IMAGES_URL + '/main';
export const IMAGES_URL = BACKEND_URL + '/img';
export const ANIMAL_IMAGES_URL = IMAGES_URL + '/animals';
export const ANIMAL_IMAGES_IMAGES_URL = ANIMAL_IMAGES_URL + '/pics';

export type PageFetchFn = (id: string, isSSR?: boolean) => Promise<FetchResult<PageModel>>;

export class FetchError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

async function throwingFetch(input: string, init: RequestInit = null, isSSR = false): Promise<any> {
    function createRequestOptions(skipHttpsValidation: boolean): RequestInit {
        if (input.startsWith('http://')) {
            return null;
        }
        const isNode = typeof window === 'undefined';
        if (isNode) {
            var Agent = (require('https') as any).Agent;
            return {
                agent: new Agent({ rejectUnauthorized: !skipHttpsValidation })
            } as RequestInit;
        }
        return null;
    }

    const response = await fetch(input, { ...init, ...createRequestOptions(isSSR) });
    if (response.ok) {
        if (response.headers.get('content-type')?.includes('application/json')) {
            return await response.json();
        } else {
            return await response.text();
        }
    }
    const error = await response.json();
    throw new FetchError(error.message, error.statusCode);
}

interface FetchResult<T> {
    data?: T;
    error?: FetchError;
}

export interface AnimalListResult {
    animals: Animal[];
    totalCount: number;
}

async function genericFetchGet<T>(url: string, isSSR: boolean = false): Promise<FetchResult<T>> {
    try {
        return {
            data: await throwingFetch(url, null, isSSR),
            error: null,
        };
    } catch (e) {
        console.warn(e);
        return {
            data: null,
            error: e,
        };
    }
}

export async function fetchAnimal(
    id: string,
    isSSR = true,
): Promise<FetchResult<Animal>> {
    const url = (isSSR ? SSR_BACKEND_URL : BACKEND_URL) + '/api/c/animals/' + id;
    return genericFetchGet(url);
}

export async function fetchAnimalImages(id: string): Promise<FetchResult<AnimalImage[]>> {
    const url = BACKEND_URL + '/api/c/animal-images/' + id;
    return genericFetchGet(url);
}

export async function fetchPage(id: string, isSSR = true): Promise<FetchResult<PageModel>> {
    const url = (isSSR ? SSR_BACKEND_URL : BACKEND_URL) + '/api/pages/' + id;
    return genericFetchGet(url, isSSR)
}

export async function fetchSettings(): Promise<FetchResult<Settings[]>> {
    const url = '/api/settings';
    return genericFetchGet(url);
}

export async function fetchAnimals({
    categories = [], type, vCaretakerType, skip, take
}: { categories: AnimalCategory[], vCaretakerType: VirtualCaretakerType, type: AnimalType, skip: number, take: number }): Promise<FetchResult<AnimalListResult>> {
    const url = `${BACKEND_URL}/api/c/animals?categories=${categories.join(',')}&vCaretakerType=${vCaretakerType}&type=${type}&skip=${skip}&take=${take}`;
    return genericFetchGet(url);
}

export async function fetchAfterAdoptionAnimals(isSSR: boolean = true): Promise<FetchResult<Animal[]>> {
    const url = (isSSR ? SSR_BACKEND_URL : BACKEND_URL) +
        '/api/c/animals/after-adoption?count=3';
    return genericFetchGet(url, isSSR)
}

export async function fetchNews(id: string, isSSR = true): Promise<FetchResult<News>> {
    const url = (isSSR ? SSR_BACKEND_URL : BACKEND_URL) + '/api/c/news/' + id;
    return genericFetchGet(url, isSSR);
}

export async function fetchRecentNews(
    isSSR = true,
): Promise<FetchResult<NewsListElement[]>> {
    const url = (isSSR ? SSR_BACKEND_URL : BACKEND_URL) + '/api/c/news/recent?count=5';
    return genericFetchGet(url, isSSR);
}

export async function fetchDogVolunteeringPage(
    _dummyId: string,
    isSSR = true,
): Promise<FetchResult<PageModel>> {
    const url = (isSSR ? SSR_BACKEND_URL : BACKEND_URL) + '/api/c/pages/dog-volunteering';
    return genericFetchGet(url, isSSR);
}
