import { AnimalListResult, FormCaptcha, VolunteeringFormFetch, VAdoptionFormFetch } from './../types';
import { ReceivedCaptcha } from '../components/Captcha/useCapcha';
import { NewsListElement } from 'types';
import { AnimalCategory, AnimalType, News } from '.prisma/client';
import { AnimalImage, Page as PageModel, Animal, VirtualCaretakerType, Settings } from '@prisma/client';
import { BACKEND_URL, getBackendUrl, isSSR, SSR_BACKEND_URL } from './config';

export class FetchError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export type FetchResult<T> = {
    data?: T;
    error?: FetchError;
}

async function throwingFetch(input: string, init: RequestInit = null): Promise<any> {
    function createRequestOptions(): RequestInit {
        if (input.startsWith('http://')) {
            return null;
        }
        if (isSSR()) {
            var Agent = (require('https') as any).Agent;
            return {
                agent: new Agent({ rejectUnauthorized: true })
            } as RequestInit;
        }
        return null;
    }

    const response = await fetch(input, { ...init, ...createRequestOptions() });
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

async function throwingPOST(url: string, body: any) {
    return await throwingFetch(url, { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } });
}

async function genericFetch<T>(url: string, init: RequestInit = null): Promise<FetchResult<T>> {
    try {
        return {
            data: await throwingFetch(url, init),
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
): Promise<FetchResult<Animal>> {
    const url = (getBackendUrl()) + '/api/c/animals/' + id;
    return genericFetch(url);
}

export async function fetchAnimalImages(id: string): Promise<FetchResult<AnimalImage[]>> {
    const url = BACKEND_URL + '/api/c/animal-images/' + id;
    return genericFetch(url);
}

export async function fetchPage(id: string): Promise<FetchResult<PageModel>> {
    const url = (getBackendUrl()) + '/api/c/pages/' + id;
    return genericFetch(url)
}

export async function fetchPageIds(): Promise<string[]> {
    return await throwingFetch(SSR_BACKEND_URL + '/api/c/pages');
}

export async function fetchSettings(): Promise<FetchResult<Settings[]>> {
    const url = (getBackendUrl()) + '/api/settings';
    return genericFetch(url);
}

export async function fetchAnimals({
    categories = [], type, vCaretakerType, skip, take
}: { categories: AnimalCategory[], vCaretakerType: VirtualCaretakerType, type: AnimalType, skip: number, take: number }): Promise<FetchResult<AnimalListResult>> {
    const url = `${BACKEND_URL}/api/c/animals?categories=${categories.join(',')}&vCaretakerType=${vCaretakerType}&type=${type}&skip=${skip}&take=${take}`;
    return genericFetch(url);
}

export async function fetchAfterAdoptionAnimals(): Promise<FetchResult<Animal[]>> {
    const url = getBackendUrl() + '/api/c/animals/after-adoption?count=3';
    return genericFetch(url)
}

export async function fetchNews(id: string): Promise<FetchResult<News>> {
    const url = (getBackendUrl()) + '/api/c/news/' + id;
    return genericFetch(url);
}

export async function fetchRecentNews(
): Promise<FetchResult<NewsListElement[]>> {
    const url = (getBackendUrl()) + '/api/c/news/recent?count=5';
    return genericFetch(url);
}

export async function fetchCaptcha(): Promise<FetchResult<ReceivedCaptcha>> {
    const url = BACKEND_URL + '/api/comms/captcha';
    return genericFetch(url, { method: 'POST' });
}

export async function fetchVolunteeringForm(captcha: FormCaptcha, props: VolunteeringFormFetch): Promise<FetchResult<void>> {
    const url = BACKEND_URL + `/api/comms/volunteer?id=${captcha.id}&text=${captcha.text}`;
    return throwingPOST(url, props);
}

export async function fetchVAdoptionForm(captcha: FormCaptcha, props: VAdoptionFormFetch): Promise<FetchResult<void>> {
    const url = BACKEND_URL + `/api/comms/v-adoption?id=${captcha.id}&text=${captcha.text}`;
    return throwingPOST(url, props);
}

export async function fetchDogVolunteeringPage(
): Promise<FetchResult<PageModel>> {
    const url = (getBackendUrl()) + '/api/c/pages/dog-volunteering';
    return genericFetch(url);
}
