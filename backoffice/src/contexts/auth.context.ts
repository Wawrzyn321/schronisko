import type { UserViewModel } from './../common/UserViewModel';
import { notify, type NotifyParams } from './notification.context';
import { authService } from './../services/AuthService';
import { get, writable } from 'svelte/store';
import { jwtDecode } from 'jwt-decode';
import { push } from 'svelte-spa-router';

const getAuthRemainingTime = (token: string) => {
    const decoded: { exp: number } = jwtDecode(token);
    const diff = decoded.exp * 1000 - Date.now();
    const seconds = diff / 1000;
    return seconds;
}

type Auth = {
    token: string;
    user: UserViewModel;
}

const AUTH_STORAGE_KEY = 'AUTH_STORAGE';
export const LOGOUT_NOTIFY_PARAMS = 'LOGOUT_NOTIFY_PARAMS';

const getSavedAuth = () => {
    let savedValue: Auth | null = null;
    try {
        savedValue = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || 'null');
        if (savedValue && getAuthRemainingTime(savedValue.token) < 0) {
            logout({ type: 'is-info', message: 'Wylogowano z powodu zakończenia sesji.' }, false);
            return null;
        }
        return savedValue;
    } catch (e: unknown) {
        console.warn(e)
        return null;
    }
}

const value = writable<Auth | null>(getSavedAuth());

export const logout = (notifyParams?: NotifyParams, damn = true) => {
    if (damn) {
        value.set(null);
    }
    localStorage.removeItem(AUTH_STORAGE_KEY);
    if (notifyParams) {
        localStorage.setItem(LOGOUT_NOTIFY_PARAMS, JSON.stringify(notifyParams));
        location.reload();
    } else {
        push('/login');
    }
}

export const setUser = (user: UserViewModel) => {
    const currentAuth = get(value);
    if (!currentAuth) {
        throw Error("No current user")
    }
    return setAuth(user, currentAuth.token);
};

const setAuth = (user: UserViewModel, token: string) => {
    value.set({ user, token });
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user, token }));
}

export const isSelf = (user: UserViewModel) => get(value)?.user.login === user.login;

export const isLoggedIn = () => !!get(value);

export const logIn = async (login: string, password: string) => {
    const response = await authService.login(login, password);
    setAuth(response.user, response.access_token);
}

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
export const auth = value;
