import { throwingFetch } from "./throwingFetch";
import { API_URL } from './config';
import type { UserViewModel } from "../prisma-types/viewModels/UserViewModel";

export class ChangePasswordParams {
    currentPassword: string = '';
    newPassword: string = '';
    newPasswordAgain: string = '';

    get isValid(): boolean {
        return this.newPassword === this.newPasswordAgain;
    }
}

export class LoginService {
    async login(login: string, password: string): Promise<{access_token: string, user: UserViewModel}> {
        return await throwingFetch(`${API_URL}/auth/login`, {
            noAuth: true,
            method: 'POST',
            body: JSON.stringify({ login, password }),
            headers: { 'Content-Type': 'application/json' },
        });
    }

    async changePassword(params: ChangePasswordParams): Promise<void> {
        return await throwingFetch(`${API_URL}/auth/change-password`, {
            method: 'POST',
            body: JSON.stringify({
                currentPassword: params.currentPassword,
                newPassword: params.newPassword,
            }),
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export const loginService = new LoginService();
