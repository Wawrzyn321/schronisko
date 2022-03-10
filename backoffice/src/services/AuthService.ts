import { throwingFetch } from "./throwingFetch";
import { API_URL } from './config';
import type { UserViewModel } from "../common/UserViewModel";

const baseUrl = `${API_URL}/auth`;

export class ChangePasswordParams {
    currentPassword: string = '';
    newPassword: string = '';
    newPasswordAgain: string = '';

    get isValid(): boolean {
        return this.newPassword === this.newPasswordAgain;
    }
}

export class AuthService {
    async login(login: string, password: string): Promise<{access_token: string, user: UserViewModel}> {
        return await throwingFetch(`${baseUrl}/login`, {
            noAuth: true,
            method: 'POST',
            body: JSON.stringify({ login, password }),
            headers: { 'Content-Type': 'application/json' },
        });
    }

    async changeSelfPassword(params: ChangePasswordParams): Promise<void> {
        return await throwingFetch(`${baseUrl}/change-password`, {
            method: 'POST',
            body: JSON.stringify({
                currentPassword: params.currentPassword,
                newPassword: params.newPassword,
            }),
            headers: { 'Content-Type': 'application/json' },
        });
    }

    async changeUserPassword(user: UserViewModel, password: string): Promise<UserViewModel> {
        return await throwingFetch(`${baseUrl}/change-user-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user, password }),
        });
    }

}

export const authService = new AuthService();
