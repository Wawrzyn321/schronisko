import type { Permission, User } from "@prisma/client";

export interface UserViewModel extends Omit<User, "passwordHash"> {
    permissions?: Permission[];
}
