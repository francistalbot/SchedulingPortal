export interface ScheduleDataItem {
    Id: number;
    Subject: string;
    StartTime: Date;
    EndTime: Date;
    Description?: string;
    IsAllDay?: boolean;
    RecurrenceRule?: string;
    RecurrenceException?: string;
    RecurrenceID?: number;
    Source?: string;
}