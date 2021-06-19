import type { Permission } from '@prisma/client';
import type { UserCreateParams } from './../components/User/UserCreateParams';
import { throwingFetch } from "./throwingFetch";
import { API_URL } from './config';
import type { UserViewModel } from '../prisma-types/viewModels/UserViewModel';
import { setUser } from "../contexts/auth.context";

const baseUrl = `${API_URL}/api/users`;

export class UserService {
    async getAll(): Promise<UserViewModel[]> {
        return await throwingFetch(baseUrl);
    }

    async addUser(user: UserCreateParams): Promise<UserViewModel> {
        return await throwingFetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });
    }

    async updateUser(user: UserViewModel): Promise<UserViewModel> {
        return await throwingFetch(`${baseUrl}/${user.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });
    }

    async updateSelf(user: UserViewModel): Promise<UserViewModel> {
        const updatedUser = await this.updateUser(user);
        setUser({ ...updatedUser, permissions: user.permissions });
        return updatedUser;
    }

    async deleteUser(id: number): Promise<UserViewModel> {
        return await throwingFetch(`${baseUrl}/${id}`, { method: 'DELETE' });
    }

    async getPermissions(id: number): Promise<Permission[]> {
        const permissions = await throwingFetch(`${API_URL}/api/users/${id}/permissions`);
        return permissions.map((p: { permission: Permission }) => p.permission);
    }
}

export const userService = new UserService();
