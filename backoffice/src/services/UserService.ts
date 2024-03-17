import type { Permission } from '@prisma/client';
import type { UserCreateParams } from './../components/User/UserCreateParams';
import { throwingFetch } from './throwingFetch';
import { API_URL } from './config';
import type { UserData, UserViewModel } from '../common/UserViewModel';
import { setUser } from '../contexts/auth.context';

const baseUrl = `${API_URL}/api/users`;

type UpdateOtherUserParams = {
  isActive: boolean;
  permissions: Permission[];
};
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

  async updateUser(
    userId: number,
    params: UpdateOtherUserParams
  ): Promise<UpdateOtherUserParams> {
    return await throwingFetch(`${baseUrl}/update-other/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
  }

  async updateSelf(prevSelf: UserViewModel, updatedData: UserData): Promise<UserViewModel> {
    const updatedUser = await throwingFetch(baseUrl, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });
    setUser({ ...prevSelf, ...updatedUser, permissions: prevSelf.permissions });
    return updatedUser;
  }

  async deleteUser(id: number): Promise<UserViewModel> {
    return await throwingFetch(`${baseUrl}/${id}`, { method: 'DELETE' });
  }

  async getPermissions(id: number): Promise<Permission[]> {
    const permissions: { permission: Permission }[] = await throwingFetch(
      `${API_URL}/api/users/${id}/permissions`
    );
    return permissions.map((p: { permission: Permission }) => p.permission);
  }
}

export const userService = new UserService();
