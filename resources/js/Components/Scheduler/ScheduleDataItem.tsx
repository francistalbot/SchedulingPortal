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
    Location?: string;
    SuccursalID?: number;
    ComiteID?: number;
    Postes?: SchedulePoste[];
}

export interface SchedulePoste {
    Id: number;
    Name: string;
    Affectations: AffectationBenevole[];
}

export interface AffectationBenevole {
    Date: Date; // Date de l'occurrence
    BenevoleId?: number; // null si non assigné
}
