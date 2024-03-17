import type { Permission, User } from "@prisma/client";

export type UserData = Pick<UserViewModel, 'firstName' | 'lastName' | 'login'>;

export interface UserViewModel extends Omit<User, "passwordHash"> {
    permissions?: Permission[];
}
