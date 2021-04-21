import type { UserViewModel } from './prisma-types/viewModels/UserViewModel';
import { writable } from 'svelte/store';
// import jwt_decode from 'jwt-decode';
import { push } from 'svelte-spa-router';
import { throwingFetch } from './common/throwingFetch';

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
    location.reload();
}

export const login = async (email: string, password: string) => {
    const response = await throwingFetch('http://localhost:3000/auth/login', {
        noAuth: true,
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
    });
    setUser(response.user, response.access_token);
}

export const auth = value;
