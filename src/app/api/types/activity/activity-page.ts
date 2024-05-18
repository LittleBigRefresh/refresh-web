import {ActivityEvent} from "./activity-event";
import {Level} from "../levels/level";
import {User} from "../users/user";
import {Score} from "../levels/score";

export interface ActivityPage {
    events: ActivityEvent[];
    users: User[];
    levels: Level[];
    scores: Score[];
}
