import {EventType} from "./event-type";
import {EventDataType} from "./event-data-type";

export interface ActivityEvent {
    eventId: string;
    eventType: EventType;

    userId: string;
    occurredAt: Date;

    storedDataType: EventDataType;
    storedSequentialId: number | undefined;
    storedObjectId: string | undefined;
}
