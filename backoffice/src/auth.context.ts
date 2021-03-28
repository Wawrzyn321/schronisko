import type { UserViewModel } from './../../prisma/viewModels/UserViewModel';
import { writable } from 'svelte/store';
// import jwt_decode from 'jwt-decode';
import { push } from 'svelte-spa-router';

interface Auth {
    token: string;
    user: UserViewModel;
}

const AUTH_STORAGE_KEY = 'AUTH_STORAGE';

const savedValue = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || 'null');
const value = writable<Auth>(savedValue);

export const setUser = (user: UserViewModel, token: string) => {
    value.set({user, token});
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({user, token}));
}

export const logout = () => {
    value.set(null);
    localStorage.setItem(AUTH_STORAGE_KEY, null);
    push('/login');
}

export const login = async (email: string, password: string) => {
    const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw Error(response.statusText);

    const json = await response.json();
    setUser(json.user, json.access_token);
}

export const auth = value;
