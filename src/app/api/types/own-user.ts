import {User} from "./user";

export interface OwnUser extends User {
  allowIpAuthentication: boolean;
  role: number;
}
