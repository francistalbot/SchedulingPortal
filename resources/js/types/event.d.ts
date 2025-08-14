export interface Event {
    Id: number;
    Subject: string;
    StartTime: string;
    EndTime: string;
    Description?: string;
    IsAllDay?: boolean;
    RecurrenceRule?: string;
    RecurrenceException?: string;
    RecurrenceID?: number;
    Location?: string;
    SuccursalID?: number;
    ComiteID?: number;
    PosteIDs?: number[];
}
