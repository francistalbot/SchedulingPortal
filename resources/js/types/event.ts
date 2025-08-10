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

export namespace Event {
    export function fromAny(data: any): Event {
        return {
            Id: data.Id || 0,
            Subject: data.Subject || '',
            StartTime: data.StartTime instanceof Date 
                ? data.StartTime.toISOString() 
                : data.StartTime || '',
            EndTime: data.EndTime instanceof Date 
                ? data.EndTime.toISOString() 
                : data.EndTime || '',
            Description: data.Description,
            IsAllDay: data.IsAllDay || false,
            RecurrenceRule: data.RecurrenceRule,
            RecurrenceException: data.RecurrenceException,
            RecurrenceID: data.RecurrenceID,
            Location: data.Location,
            SuccursalID: data.SuccursalID,
            ComiteID: data.ComiteID,
            PosteIDs: data.PosteIDs || [],
        };
    }
    
    export function fromArray(data: any[]): Event[]  {
           return data.map(item => fromAny(item));
    }    
}