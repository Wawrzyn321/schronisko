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
    let response: Response;
    try {
        response = await fetch(input, fetchInit);
    } catch (e: unknown) {
        console.warn(e);
        throw { ...response, message: "Serwer jest nieosiągalny." };
    }
    if (response.ok) {
        if (response.headers.get('content-type')?.includes('application/json')) {
            return await response.json();
        } else {
            throw { ...response, message: "Nieobsługiwany format danych." };
        }
    } else {
        const map = {
            401: "Brak uwierzytelnienia, zaloguj się ponownie.",
            403: "Nie masz uprawnień do wykonania tej akcji.",
            404: "Szukany obiekt nie istnieje."
        }
        let message = map[response.status];
        if (!message) {
            console.warn(response);
            message = "Błąd wykonania na serwerze!";
        }
        throw { ...response, message };
    }
}
