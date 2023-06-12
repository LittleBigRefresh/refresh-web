import {User} from "./user";

export interface PhotoSubject {
  User: User | null;
  DisplayName: string;
  Bounds: number[];
}
