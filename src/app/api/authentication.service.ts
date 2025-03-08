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
import { RefreshApiResponse } from "./refresh-api-response";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService extends ApiImplementation {
    public user: BehaviorSubject<ExtendedUser | undefined> = new BehaviorSubject<ExtendedUser | undefined>(undefined);
    
    constructor(http: HttpClient, private tokenStorage: TokenStorageService, private bannerService: BannerService, private router: Router) {
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
                if (refreshTokenIfFail) {
                    this.RefreshToken();
                }
                else {
                    const apiError: RefreshApiError | undefined = error.error?.error;
                    this.bannerService.error("Failed to get your user info", apiError == null ? error.message : apiError.message);
                }
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
                this.ResetStoredInformation();
                const apiError: RefreshApiError | undefined = error.error?.error;

                console.warn("API error during token refresh:", apiError);
                this.bannerService.warn("Session Expired", "Your session has expired, please sign in again.");
            },
            next: response => {
                this.tokenStorage.SetStoredGameToken(response.tokenData);
                this.tokenStorage.SetStoredRefreshToken(response.refreshTokenData);
                this.GetOwnUser();
            },
        });
    }
    
    public LogIn(emailAddress: string, passwordSha512: string, redirectAfterSuccess: boolean = false) {
        const body: AuthRequest = {
            emailAddress,
            passwordSha512,
        }
        
        this.http.post<AuthResponse>("/login", body).subscribe({
            error: error => {
                const apiError: RefreshApiError | undefined = error.error?.error;
                this.bannerService.error("Failed to sign in", apiError == null ? error.message : apiError.message);
            },
            next: response => {
                if (response === undefined) {
                    console.warn("response was null?", response)
                    return;
                }
                    
                this.HandleAuthResponse(response);
                
                let greeted: boolean = false;
                this.user.subscribe((user) => {
                    if (user && !greeted) {
                        this.bannerService.success(`Hi, ${user.username}!`, "You have been successfully signed in. Have fun!");
                        if (redirectAfterSuccess) this.router.navigate(['/user/', user.username]);

                        greeted = true;
                    }
                });
            },
        });
    }

    public LogOut(redirectAfterResponse: boolean = false) {
        this.http.put<RefreshApiResponse<undefined>>("/logout", null).subscribe({
            error: error => {
                this.ResetStoredInformation();

                const apiError: RefreshApiError | undefined = error.error?.error;
                this.bannerService.warn("Failed to properly sign out", apiError == null ? error.message : apiError.message);

                if (redirectAfterResponse) this.router.navigate(['/']);
            },
            next: response => {
                this.ResetStoredInformation();

                this.bannerService.success("Until next time!", "You have been successfully signed out.");

                if (redirectAfterResponse) this.router.navigate(['/']);
            },
        })
    }

    private ResetStoredInformation() {
        this.tokenStorage.ClearStoredGameToken();
        this.tokenStorage.ClearStoredRefreshToken();
        this.tokenStorage.ClearStoredUser();
        this.user.next(undefined);
    }
}