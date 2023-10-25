import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class TokenStorageService {
    private readonly GameTokenKey: string = "game_token";
    private readonly RefreshTokenKey: string = "refresh_token";

    public GetStoredGameToken(): string | null {
        return localStorage.getItem(this.GameTokenKey);
    }

    public SetStoredGameToken(token: string): void {
        localStorage.setItem(this.GameTokenKey, token);
    }

    public ClearStoredGameToken(): void {
        localStorage.removeItem(this.GameTokenKey);
    }

    public GetStoredRefreshToken(): string | null {
        return localStorage.getItem(this.RefreshTokenKey);
    }

    public SetStoredRefreshToken(refreshToken: string): void {
        localStorage.setItem(this.RefreshTokenKey, refreshToken);
    }
}
