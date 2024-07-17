export interface User {
    userId: string;
    username: string;
    role: number;
    
    iconHash: string;
    description: string;
    joinDate: Date;
    lastLoginDate: Date;
}
