import { UserRoles } from "./user-roles";

export interface AdminUserUpdateRequest {
    username: string | null;
    description: string | null;

    iconHash: string | null;
    vitaIconHash: string | null;
    betaIconHash: string | null;

    role: UserRoles | null;
}