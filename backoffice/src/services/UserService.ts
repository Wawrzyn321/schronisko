import type { UserCreateParams } from './../components/User/UserCreateParams';
import { throwingFetch } from "./throwingFetch";
import { API_URL } from './config';
import type { UserViewModel } from '../prisma-types/viewModels/UserViewModel';
import type { Priviledge } from ".prisma/client";
import { setUser } from "../auth.context";

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

    async update(user: UserViewModel): Promise<UserViewModel> {
        return await throwingFetch(`${baseUrl}/${user.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });
    }

    async updateSelf(user: UserViewModel): Promise<UserViewModel> {
        const updatedUser = await this.update(user);
        setUser({ ...updatedUser, priviledges: user.priviledges });
        return updatedUser;
    }

    async delete(id: number): Promise<UserViewModel> {
        return await throwingFetch(`${baseUrl}/${id}`, { method: 'DELETE' });
    }

    async getPriviledges(id: number): Promise<Priviledge[]> {
        const priviledges = await throwingFetch(`${API_URL}/api/users/${id}/priviledges`);
        return priviledges.map((p: any) => p.priviledge);
    }
}

export const userService = new UserService();
