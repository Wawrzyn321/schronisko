import { throwingFetch } from "./throwingFetch";
import { API_URL } from './config';

export class LoginService {
    async login(email: string, password: string) {
        return await throwingFetch(`${API_URL}/auth/login`, {
            noAuth: true,
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export const loginService = new LoginService();
