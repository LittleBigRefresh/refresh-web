import {Location} from './location';

export interface User {
    userId: string
    username: string
    iconHash: string
    location: Location
    description: string
    joinDate: Date
    lastLoginDate: Date
}
