import type { Priviledge, User } from "@prisma/client";

export interface UserViewModel extends Omit<User, "passwordHash"> {
    priviledges?: Priviledge[];
}
