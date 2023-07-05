import {User} from "../user";
import {Level} from "../level";
import {ActivityEvent} from "./activity-event";

export interface ActivityPage {
  events: ActivityEvent[];
  users: User[];
  levels: Level[];
}
