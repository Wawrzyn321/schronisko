import { get } from 'svelte/store';
import { auth } from "../auth.context";
interface RequestInitWithAuth extends RequestInit {
    noAuth?: boolean;
}

export async function throwingFetch(input: RequestInfo, init?: RequestInitWithAuth) {
    const { noAuth, ...fetchInit } = init || {};
    if (!noAuth) {
        fetchInit.headers = {
            ...(fetchInit.headers || {}),
            Authorization: `Bearer ${get(auth)?.token}`
        };
    }
    const response = await fetch(input, fetchInit);
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error(response.statusText);
    }
}
