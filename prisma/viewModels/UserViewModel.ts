import { User } from "@prisma/client";

export type PriviledgeType = 'USER' | 'CONST_POST' | 'POST' | 'ANIMAL';

export interface UserViewModel extends Omit<User, "passwordHash"> {
    priviledges: PriviledgeType[];
}
