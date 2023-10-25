import {EventEmitter, Injectable} from "@angular/core";
import {ApiRequestCreator} from "./api-request.creator";
import {ExtendedUser} from "./types/extended-user";
import {BannerService} from "../banners/banner.service";
import {Router} from "@angular/router";
import {ApiAuthenticationRequest} from "./types/auth/auth-request";
import {ApiError} from "./types/response/api-error";
import {ApiAuthenticationResponse} from "./types/auth/auth-response";
import {catchError, of} from "rxjs";
import {ApiPasswordResetRequest} from "./types/auth/reset-request";
import {UserUpdateRequest} from "./types/user-update-request";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly GameTokenKey: string = "game_token";

  private _userId: string | undefined = undefined;
  private _loggedIn = false;

  user: ExtendedUser | undefined = undefined;
  resetToken: string | undefined = undefined;

  userWatcher: EventEmitter<ExtendedUser | undefined>

  constructor(private apiRequestCreator: ApiRequestCreator, private bannerService: BannerService, private router: Router) {
    this.userWatcher = new EventEmitter<ExtendedUser | undefined>();

    const storedToken: string | null = this.GetStoredGameToken();

    this._loggedIn = storedToken !== null;
    if (storedToken) {
      this.GetMyUser(() => {
        // only subscribe after getting user
        this.userWatcher.subscribe((user) => this.onUserUpdate(user));
      });
    } else {
      this.userWatcher.emit(undefined);
      this.userWatcher.subscribe((user) => this.onUserUpdate(user));
    }
  }

  onUserUpdate(user: ExtendedUser | undefined): void {
    console.log("Handling user change:", user)
    if (user !== undefined) {
      if(!this._loggedIn) {
        this._loggedIn = true;
        this.bannerService.pushSuccess(`Hi, ${user.username}!`, 'You have been successfully signed in.')
        this.router.navigate(['/'])
      }
    } else {
      this._loggedIn = false;
      this.bannerService.push({
        Title: `Signed out`,
        Icon: 'right-from-bracket',
        Color: 'warning',
        Text: 'You have been logged out.'
      })

      this.router.navigate(['/login'])
    }
  }

  public LogIn(emailAddress: string, passwordSha512: string): boolean {
    if (this._userId !== undefined) throw Error("Cannot sign in when already signed in as someone."); // should never happen hopefully

    const body: ApiAuthenticationRequest = {
      username: undefined,
      emailAddress,
      passwordSha512: passwordSha512,
    }

    const errorHandler = (err: ApiError) => {
      if(err.warning) {
        this.bannerService.pushWarning('Warning', err.message);
        console.warn(err);
        return;
      }

      this.bannerService.pushError('Failed to sign in', err.message ?? "No error was provided by the server. Check the console for more details.")
      console.error(err);
    }

    this.apiRequestCreator.makeRequest<ApiAuthenticationResponse>("POST", "login", body, errorHandler)
      .pipe(catchError(() => {
        return of(undefined);
      }))
      .subscribe((authResponse) => {
        if (authResponse === undefined) return;

        if (authResponse.resetToken !== undefined) {
          this.resetToken = authResponse.resetToken;
          this.router.navigateByUrl("/forgotPassword?email=" + emailAddress);
          this.bannerService.pushWarning("Create a password", "The account you are trying to sign into is a legacy account. Please set a password.");
          return;
        }

        this._userId = authResponse.userId;
        this.SetStoredGameToken(authResponse.tokenData);
        this.GetMyUser();
      });

    return true;
  }

  public Register(username: string, emailAddress: string, passwordSha512: string): boolean {
    if (this._userId !== undefined) throw Error("Cannot register when already signed in as someone."); // should never happen hopefully

    const body: ApiAuthenticationRequest = {
      username,
      emailAddress,
      passwordSha512,
    }
    const errorHandler = (err: ApiError) => {
      if(err.warning) {
        this.bannerService.pushWarning('Warning', err.message);
        console.warn(err);
        return;
      }

      this.bannerService.pushError('Failed to register', err.message ?? "No error was provided by the server. Check the console for more details.")
      console.error(err);
    }

    this.apiRequestCreator.makeRequest<ApiAuthenticationResponse>("POST", "register", body, errorHandler)
      .pipe(catchError(() => {
        return of(undefined);
      }))
      .subscribe((authResponse) => {
        if (authResponse === undefined) return;

        this._userId = authResponse.userId;
        this.SetStoredGameToken(authResponse.tokenData);
        this.GetMyUser();
      });

    return true;
  }

  private GetMyUser(callback: Function | null = null) {
    this.apiRequestCreator.makeRequest<ExtendedUser>("GET", "users/me", undefined, (err) => {
      if(err.statusCode) {
        this.ClearStoredGameToken();
      }
      return of(undefined);
    })
      .subscribe((data) => {
        this.user = data;
        this.userWatcher.emit(this.user);
        if (callback) callback();
      });
  }

  public LogOut() {
    this._userId = undefined;
    this.user = undefined;

    this.userWatcher.emit(undefined);
    this.apiRequestCreator.makeRequest("PUT", "logout", {}).subscribe();

    this.ClearStoredGameToken();
  }

  public ResetPassword(emailAddress: string, passwordSha512: string, signIn: boolean = false): void {
    if (this.user == undefined && this.resetToken == undefined) {
      this.bannerService.pushError('Could not reset password', 'There was no token to authorize this action.')
      return;
    }

    const body: ApiPasswordResetRequest = {
      passwordSha512: passwordSha512,
      resetToken: this.resetToken,
    }

    this.apiRequestCreator.makeRequest("PUT", "resetPassword", body)
      .subscribe(() => {
        if (signIn) this.LogIn(emailAddress, passwordSha512);
        this.bannerService.push({
          Color: 'success',
          Icon: 'key',
          Title: "Password reset successful",
          Text: "Your account's password has been reset.",
        })
      });
  }

  public VerifyEmail(code: string): void {
    this.apiRequestCreator.makeRequest("POST", "verify?code=" + code)
      .subscribe(() => {
        if(this.user !== undefined) {
          this.user.emailAddressVerified = true;
        }

        this.bannerService.push({
          Color: 'success',
          Icon: 'key',
          Title: "Email verification successful",
          Text: "Your account's email has been verified.",
        })
      });
  }

  public ResendVerificationCode(): void {
    this.apiRequestCreator.makeRequest("POST", "verify/resend")
      .subscribe(() => {
        this.bannerService.push({
          Color: 'success',
          Icon: 'key',
          Title: "Resent verification code",
          Text: "The verification email has been sent to your email address.",
        })
      });
  }

  public DeleteAccount(): void {
    this.apiRequestCreator.makeRequest("DELETE", "users/me")
      .subscribe(() => {
        this.bannerService.push({
          Color: 'dangerous',
          Icon: 'trash',
          Title: "Account Deleted.",
          Text: "Your account has been successfully deleted. Goodbye.",
        });

        this._userId = undefined;
        this.user = undefined;

        this.userWatcher.emit(undefined);
        this.ClearStoredGameToken();
      });
  }

  public UpdateUser(data: UserUpdateRequest): void {
    this.apiRequestCreator.makeRequest<ExtendedUser>("PATCH", "users/me", data)
      .subscribe(data => {
        this.bannerService.pushSuccess("User updated", "Your profile was successfully updated.");

        this.user = data;
        this.userWatcher.emit(data);
      });
  }

  public GetStoredGameToken(): string | null {
    return localStorage.getItem(this.GameTokenKey);
  }

  public SetStoredGameToken(token: string): void {
    localStorage.setItem(this.GameTokenKey, token);
  }

  public ClearStoredGameToken(): void {
    localStorage.removeItem(this.GameTokenKey);
  }
}
