import type { Permission, User } from "@prisma-app/client";

export type UserData = Pick<UserViewModel, 'firstName' | 'lastName' | 'login'>;

export interface UserViewModel extends Omit<User, "passwordHash"> {
    permissions: Permission[];
}
