import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly GameTokenKey: string = "game_token";

  GetStoredGameToken(): string | null {
    return localStorage.getItem(this.GameTokenKey);
  }

  SetStoredGameToken(token: string): void {
    localStorage.setItem(this.GameTokenKey, token);
  }

  ClearStoredGameToken(): void {
    localStorage.removeItem(this.GameTokenKey);
  }
}
