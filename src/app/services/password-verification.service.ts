import {Injectable} from "@angular/core";
import {BannerService} from "../banners/banner.service";
import {Banner} from "../banners/banner";

@Injectable({providedIn: 'root'})
export class PasswordVerificationService {
  constructor(private bannerService: BannerService) {}

  public verifyPassword(email: string, password: string, username: string | undefined = undefined, confirmPassword: string | undefined = undefined): boolean {
    const error: Banner = {
      Color: 'dangerous',
      Icon: 'exclamation-circle',
      Title: "Skill Issue",
      Text: "",
    }

    if(email.length <= 0) {
      error.Text = "No email was provided."
      this.bannerService.push(error)
      return false;
    }

    if(password.length <= 0) {
      error.Text = "No password was provided."
      this.bannerService.push(error)
      return false;
    }

    if(confirmPassword != undefined) {
      if(password != confirmPassword) {
        error.Text = "The passwords do not match."
        this.bannerService.push(error)
        return false;
      }

      if(password.length < 8) {
        error.Text = "The password must be at least 8 characters."
        this.bannerService.push(error)
        return false;
      }
    }

    if(username !== undefined && username.length <= 0) {
      error.Text = "No username was provided."
      this.bannerService.push(error)
      return false;
    }

    return true;
  }
}
