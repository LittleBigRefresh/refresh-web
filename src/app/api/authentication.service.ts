import {Injectable} from "@angular/core";
import {ApiImplementation} from "./api-implementation";
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {ExtendedUser} from "./types/users/extended-user";
import {AuthRequest} from "./types/auth/auth-request";
import {AuthResponse} from "./types/auth/auth-response";
import {BehaviorSubject} from "rxjs";
import { BannerService } from "../banners/banner.service";
import { RefreshApiError } from "./refresh-api-error";
import { AuthRefreshRequest } from "./types/auth/auth-refresh-request";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService extends ApiImplementation {
    public user: BehaviorSubject<ExtendedUser | undefined> = new BehaviorSubject<ExtendedUser | undefined>(undefined);
    
    constructor(http: HttpClient, private tokenStorage: TokenStorageService, private bannerService: BannerService) {
        super(http);

        const storedToken: string | null = this.tokenStorage.GetStoredGameToken();
        console.debug("Has existing token:", storedToken !== null);
        
        const storedUser: ExtendedUser | null = this.tokenStorage.GetStoredUser();
        if (storedToken && storedUser) {
            console.debug("Has existing user:", storedUser);
            this.user.next(storedUser);
        }
        
        if (storedToken) {
            this.GetOwnUser(true);
        }
    }
    
    private HandleAuthResponse(response: AuthResponse) {
        this.tokenStorage.SetStoredGameToken(response.tokenData);
        this.tokenStorage.SetStoredRefreshToken(response.refreshTokenData);
        
        this.GetOwnUser();
    }
    
    private GetOwnUser(refreshTokenIfFail: boolean = false) {
        this.http.get<ExtendedUser>("/users/me").subscribe({
            error: error => {
                if (refreshTokenIfFail) 
                    this.RefreshToken();
            },
            next: response => {
                this.user.next(response);
                this.tokenStorage.SetStoredUser(response);

                console.log(response);
            },
        });
    }

    private RefreshToken() {
        const oldRefreshToken: string | null = this.tokenStorage.GetStoredRefreshToken();

        // At this point we know the token exists in the local store
        const request: AuthRefreshRequest = {
            tokenData: oldRefreshToken!
        }

        this.http.post<AuthResponse>("/refreshToken", request).subscribe({
            error: error => {
                this.tokenStorage.ClearStoredGameToken();
                this.tokenStorage.ClearStoredRefreshToken();
                this.tokenStorage.ClearStoredUser();

                const apiError: RefreshApiError | undefined = error.error?.error;
                this.bannerService.error("Failed to extend session", apiError == null ? error.message : apiError.message);
            },
            next: response => {
                this.tokenStorage.SetStoredGameToken(response.tokenData);
                this.tokenStorage.SetStoredRefreshToken(response.refreshTokenData);
                this.GetOwnUser();
            },
        });
    }
    
    public LogIn(emailAddress: string, password: string) {
        const body: AuthRequest = {
            emailAddress,
            passwordSha512: password,
        }
        
        this.http.post<AuthResponse>("/login", body).subscribe({
            error: error => {
                const apiError: RefreshApiError | undefined = error.error?.error;
                this.bannerService.error("Login failed", apiError == null ? error.message : apiError.message);
            },
            next: response => {
                if (response === undefined) {
                    console.warn("response was null?", response)
                    return;
                }
                    
                this.HandleAuthResponse(response);
                this.bannerService.success("Login successful", "Successfully logged in, have fun!");
            },
        });
    }
}