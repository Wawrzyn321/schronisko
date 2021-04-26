import { loginService } from './services/LoginService';
import type { UserViewModel } from './prisma-types/viewModels/UserViewModel';
import { get, writable } from 'svelte/store';
// import jwt_decode from 'jwt-decode';
import { push } from 'svelte-spa-router';
interface Auth {
    token: string;
    user: UserViewModel;
}

const AUTH_STORAGE_KEY = 'AUTH_STORAGE';

const savedValue = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || 'null');
const value = writable<Auth>(savedValue);

export const setUser = (user: UserViewModel) => setAuth(user, get(value).token);

export const setAuth = (user: UserViewModel, token: string) => {
    value.set({user, token});
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({user, token}));
}

export const isSelf = (user: UserViewModel) => get(value).user.email === user.email;

export const isLoggedIn = () => !!get(value);

export const logout = () => {
    value.set(null);
    localStorage.setItem(AUTH_STORAGE_KEY, null);
    push('/login');
    location.reload();
}

export const login = async (email: string, password: string) => {
    const response = await loginService.login(email, password);
    setAuth(response.user, response.access_token);
}

export const auth = value;
