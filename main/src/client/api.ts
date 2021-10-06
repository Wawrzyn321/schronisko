export const BACKEND_URL = 'http://localhost:60045';

export async function throwingFetch(input: RequestInfo, init?: RequestInit) {
    try {
        const response = await fetch(input, init);
        if (response.ok) {
            if (response.headers.get('content-type')?.includes('application/json')) {
                return await response.json();
            } else {
                return await response.text();
            }
        }
        console.warn(response);
        throw Error("Serwer jest nieosiągalny.");
    } catch (e: unknown) {
        console.warn(e);
        throw Error("Serwer jest nieosiągalny.");
    }
}