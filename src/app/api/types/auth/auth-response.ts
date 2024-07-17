export interface AuthResponse {
    userId: string;
    tokenData: string;
    
    refreshTokenData: string;
    expiresAt: Date;

    resetToken: string | undefined;
}