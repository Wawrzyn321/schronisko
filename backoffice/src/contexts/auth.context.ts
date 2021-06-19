import { notify, NotifyParams } from './notification.context';
import { authService } from './../services/AuthService';
import type { UserViewModel } from './../../../prisma/prisma-types/viewModels/UserViewModel';
import { get, writable } from 'svelte/store';
import jwt_decode from 'jwt-decode';
import { push } from 'svelte-spa-router';

interface Auth {
    token: string;
    user: UserViewModel;
}

const AUTH_STORAGE_KEY = 'AUTH_STORAGE';

const savedValue: Auth | null = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || 'null');
const value = writable<Auth>(savedValue);

export const setUser = (user: UserViewModel) => setAuth(user, get(value).token);

export const setAuth = (user: UserViewModel, token: string) => {
    value.set({ user, token });
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user, token }));
}

export const isSelf = (user: UserViewModel) => get(value).user.login === user.login;

export const isLoggedIn = () => !!get(value);

export const logout = (notifyParams?: NotifyParams) => {
    value.set(null);
    localStorage.setItem(AUTH_STORAGE_KEY, null);
    if (notifyParams) {
        push('/login?reason=' + JSON.stringify(notifyParams));
    } else {
        push('/login');
    }
}

export const logIn = async (login: string, password: string) => {
    const response = await authService.login(login, password);
    setAuth(response.user, response.access_token);
}

export const auth = value;

export const checkForTokenExpiration = (token: string) => {
    const TIME = 5;
    const WARNING_TIME = TIME * 60; // mins
    const decoded: { exp: number } = jwt_decode(token);

    const diff = decoded.exp * 1000 - Date.now();
    const seconds = diff / 1000;

    if (seconds < 0) {
        logout({ type: 'is-info', message: 'Wylogowano z powodu zakończenia sesji.' });
    }
    if (seconds < WARNING_TIME) {
        notify({
            message: `Pozostało mniej niż ${TIME} minut do końca sesji, zapisz swoje zmiany i zaloguj sięp ponownie`,
            type: "is-warning",
            duration: seconds * 1000,
        });
    }
}