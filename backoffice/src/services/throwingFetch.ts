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
        checkForTokenExpiration(token);
        fetchInit.headers = {
            ...(fetchInit.headers || {}),
            Authorization: `Bearer ${token}`
        };
    }
    const response = await fetch(input, fetchInit);
    if (response.ok) {
        if (response.headers.get('content-type')?.includes('application/json')) {
            return await response.json();
        } else {
            throw { ...response, message: "Nieobsługiwany format danych." };
        }
    } else {
        let message: string;
        if (response.status === 401) {
            message = "Brak uwierzytelnienia, zaloguj się ponownie.";
        }
        else if (response.status === 403) {
            message = "Nie masz uprawnień do wykonania tej akcji.";
        }
        else if (response.status === 404) {
            message = "Szukany obiekt nie istnieje.";
        }
        else {
            console.warn(response);
            message = "Błąd wykonania na serwerze!";
        }
        throw { ...response, message: message || response.statusText };
    }
}
