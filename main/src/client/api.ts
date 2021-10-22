import { NewsListElement } from 'types';
import { AnimalCategory, AnimalType, News } from '.prisma/client';
import { AnimalImage, Page as PageModel, Animal } from '@prisma/client';

const DEV = 1;

const BACKEND_URL = DEV ? 'http://localhost:60045' : 'https://schronisko-backend.oto-jest-wawrzyn.pl';
const SSR_BACKEND_URL = 'http://localhost:60045';

export const SITE_IMAGES_URL = BACKEND_URL + '/site';
export const OVERLAYS_URL = SITE_IMAGES_URL + '/overlays';
export const ANIMAL_DETAILS_URL = SITE_IMAGES_URL + '/animal-details'; // todo niepotrzebne?
export const MAIN_PAGE_IMAGES_URL = SITE_IMAGES_URL + '/main';
export const IMAGES_URL = BACKEND_URL + '/img';

export class FetchError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

async function throwingFetch(input: RequestInfo, init?: RequestInit): Promise<any> {
    const response = await fetch(input, init);
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

async function genericFetch<T>(url: string): Promise<FetchResult<T>> {
    try {
        return {
            data: await throwingFetch(url),
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
    return genericFetch(url);
}

export async function fetchAnimalImages(id: string): Promise<FetchResult<AnimalImage[]>> {
    const url = BACKEND_URL + '/api/c/animal-images/' + id;
    return genericFetch(url);
}

export async function fetchPage(id: string, isSSR = true): Promise<FetchResult<PageModel>> {
    const url = (isSSR ? SSR_BACKEND_URL : BACKEND_URL) + '/api/pages/' + id;
    return genericFetch(url)
}

export async function fetchAnimals(category: AnimalCategory, type: AnimalType): Promise<FetchResult<Animal[]>> {
    const url = `${BACKEND_URL}/api/c/animals?category=${category}&type=${type}`;
    return genericFetch(url);
}

export async function fetchAfterAdoptionAnimals(isSSR: boolean = true): Promise<FetchResult<Animal[]>> {
    const url = (isSSR ? SSR_BACKEND_URL : BACKEND_URL) +
        '/api/c/animals/after-adoption?count=3';
    return genericFetch(url)
}

export async function fetchNews(id: string, isSSR = true): Promise<FetchResult<News>> {
    const url = (isSSR ? SSR_BACKEND_URL : BACKEND_URL) + '/api/c/news/' + id;
    return genericFetch(url);
}

export async function fetchRecentNews(
    isSSR = true,
): Promise<FetchResult<NewsListElement[]>> {
    const url = (isSSR ? SSR_BACKEND_URL : BACKEND_URL) + '/api/c/news/recent?count=5';
    return genericFetch(url);
}
