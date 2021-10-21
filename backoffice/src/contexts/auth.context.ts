import type { UserViewModel } from './../common/UserViewModel';
import { notify, NotifyParams } from './notification.context';
import { authService } from './../services/AuthService';
import { get, writable } from 'svelte/store';
import jwt_decode from 'jwt-decode';
import { push } from 'svelte-spa-router';

const getAuthRemainingTime = (token: string) => {
    const decoded: { exp: number } = jwt_decode(token);
    const diff = decoded.exp * 1000 - Date.now();
    const seconds = diff / 1000;
    return seconds;
}

interface Auth {
    token: string;
    user: UserViewModel;
}

const AUTH_STORAGE_KEY = 'AUTH_STORAGE';
export const LOGOUT_NOTIFY_PARAMS = 'LOGOUT_NOTIFY_PARAMS';

// value może nie być jeszcze zdefiniowane gdy się wylogowujemy
// a nie mogę dać go wyżej, bo z kolei savedAuth jest używane w catchu poniżej
// ehhh
export const logout = (notifyParams?: NotifyParams, damn = true) => {
    if (damn) {
        value.set(null);
    }
    localStorage.setItem(AUTH_STORAGE_KEY, null);
    if (notifyParams) {
        localStorage.setItem(LOGOUT_NOTIFY_PARAMS, JSON.stringify(notifyParams));
        location.reload();
    } else {
        push('/login');
    }
}

let savedValue: Auth | null = null;
try {
    savedValue = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || 'null');
    if (getAuthRemainingTime(savedValue.token) < 0) {
        logout({ type: 'is-info', message: 'Wylogowano z powodu zakończenia sesji.' }, false);
    }
} catch (_: unknown) { }

const value = writable<Auth>(savedValue);

export const setUser = (user: UserViewModel) => setAuth(user, get(value).token);

export const setAuth = (user: UserViewModel, token: string) => {
    value.set({ user, token });
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user, token }));
}

export const isSelf = (user: UserViewModel) => get(value).user.login === user.login;

export const isLoggedIn = () => !!get(value);

export const logIn = async (login: string, password: string) => {
    const response = await authService.login(login, password);
    setAuth(response.user, response.access_token);
}

export const auth = value;

export const checkForTokenExpiration = (token: string) => {
    const TIME = 5;
    const WARNING_TIME = TIME * 60; // mins
    const remainingTime = getAuthRemainingTime(token);

    if (remainingTime < 0) {
        logout({ type: 'is-info', message: 'Wylogowano z powodu zakończenia sesji.' });
        return;
    }
    if (remainingTime < WARNING_TIME) {
        notify({
            message: `Pozostało mniej niż ${TIME} minut do końca sesji, zapisz swoje zmiany i zaloguj sięp ponownie`,
            type: "is-warning",
            duration: remainingTime * 1000,
        });
    }
    return true;
}