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
    PosteIDs?: number[];
}

export interface Poste {
    Id: number;
    Name: string;
}

export interface Affectation {
    Id: number;
    Date: Date; // Date de l'occurrence spécifique
    PosteID: number; // Référence vers Poste
    BenevoleID?: number; // Référence vers Bénévole (null si non assigné)
    ScheduleDataItemID: number; // Référence vers l'événement parent
}
