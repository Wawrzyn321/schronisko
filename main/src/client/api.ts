const DEV = 1;

export const BACKEND_URL = DEV ? 'http://localhost:60045' : 'https://schronisko-backend.oto-jest-wawrzyn.pl';
export const SSR_BACKEND_URL = 'http://localhost:60045';

export const SITE_IMAGES_URL = BACKEND_URL + '/site';
export const OVERLAYS_URL = SITE_IMAGES_URL + '/overlays';
export const IMAGES_URL = BACKEND_URL + '/img';
export const MAIN_PAGE_IMAGES_URL = SITE_IMAGES_URL + '/main';

export async function throwingFetch(input: RequestInfo, init?: RequestInit): Promise<any> {
    const response = await fetch(input, init);
    if (response.ok) {
        if (response.headers.get('content-type')?.includes('application/json')) {
            return await response.json();
        } else {
            return await response.text();
        }
    }
    console.warn(response.status, response.statusText);
    throw Error("Serwer jest nieosiągalny.");
}