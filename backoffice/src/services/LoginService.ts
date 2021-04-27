import { throwingFetch } from "./throwingFetch";
import { API_URL } from './config';

export class ChangePasswordParams {
    currentPassword: string = '';
    newPassword: string = '';
    newPasswordAgain: string = '';

    get isValid(): boolean {
        console.log(this)
        return this.newPassword === this.newPasswordAgain;
    }
}

export class LoginService {
    async login(email: string, password: string) {
        return await throwingFetch(`${API_URL}/auth/login`, {
            noAuth: true,
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
    }

    async changePassword(params: ChangePasswordParams) {
        console.log(params);
    }
}

export const loginService = new LoginService();
