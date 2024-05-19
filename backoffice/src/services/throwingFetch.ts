import { get } from 'svelte/store';
import { auth, checkForTokenExpiration } from "../contexts/auth.context";

interface RequestInitWithAuth extends RequestInit {
    noAuth?: boolean;
}

export async function throwingFetch(input: RequestInfo, init?: RequestInitWithAuth) {
    const { noAuth, ...fetchInit } = init || {};
    if (!noAuth) {
        const token = get(auth)?.token;
        if (!token) {
            throw Error("No auth.");
        }
        if (!checkForTokenExpiration(token)) {
            return null;
        }
        fetchInit.headers = {
            ...(fetchInit.headers || {}),
            Authorization: `Bearer ${token}`
        };
    }
    let response: Response;
    try {
        response = await fetch(input, fetchInit);
    } catch (e: unknown) {
        if (e instanceof Error) {
            throw { message: "Serwer jest nieosiągalny." };
        }
        throw e;
    }
    if (response.ok) {
        if (response.headers.get('content-type')?.includes('application/json')) {
            return await response.json();
        } else {
            return null;
        }
    } else {
        const map: Record<string, string> = {
            401: "Brak uwierzytelnienia, zaloguj się ponownie.",
            403: "Nie masz uprawnień do wykonania tej akcji.",
            404: "Szukany obiekt nie istnieje."
        }
        let message = map[response.status.toString()];
        if (!message) {
            console.warn(response);
            message = "Błąd wykonania na serwerze!";
        }
        throw { status: response.status, statusText: response.statusText, message };
    }
}
