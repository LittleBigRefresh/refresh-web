import {Injectable} from "@angular/core";
import {ApiImplementation} from "./api-implementation";
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {ExtendedUser} from "./types/users/extended-user";
import {AuthRequest} from "./types/auth/auth-request";
import {AuthResponse} from "./types/auth/auth-response";
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService extends ApiImplementation {
    public user: BehaviorSubject<ExtendedUser | undefined> = new BehaviorSubject<ExtendedUser | undefined>(undefined);
    
    constructor(http: HttpClient, private tokenStorage: TokenStorageService) {
        super(http);

        const storedToken: string | null = this.tokenStorage.GetStoredGameToken();
        console.debug("Has existing token:", storedToken !== null);
        
        const storedUser: ExtendedUser | null = this.tokenStorage.GetStoredUser();
        if (storedToken && storedUser) {
            console.debug("Has existing user:", storedUser);
            this.user.next(storedUser);
        }
        
        if (storedToken) {
            this.http.get<ExtendedUser>("/users/me").subscribe((data) => {
                this.user.next(data);
                this.tokenStorage.SetStoredUser(data);

                console.log(data);
            });
        }
    }
    
    private HandleAuthResponse(response: AuthResponse) {
        this.tokenStorage.SetStoredGameToken(response.tokenData);
        this.tokenStorage.SetStoredRefreshToken(response.refreshTokenData);
        
        this.GetOwnUser();
    }
    
    private GetOwnUser() {
        this.http.get<ExtendedUser>("/users/me").subscribe((data) => {
            this.user.next(data);
            this.tokenStorage.SetStoredUser(data);

            console.log(data);
        });
    }
    
    public LogIn(emailAddress: string, password: string) {
        const body: AuthRequest = {
            emailAddress,
            passwordSha512: password,
        }
        
        this.http.post<AuthResponse>("/login", body)
            .subscribe((response) => {
                if (response === undefined) {
                    console.warn("response was null?", response)
                    return;
                }
                
                this.HandleAuthResponse(response);
            });
    }
}