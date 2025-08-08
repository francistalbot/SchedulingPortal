import { Event } from "@/types/event";

export const eventsData: Event[] = [
    {
        Id: 1,
        Subject: "Developers Meeting",
        StartTime: new Date(2018, 5, 1, 10, 0),
        EndTime: new Date(2018, 5, 1, 11, 0),
        RecurrenceRule: "FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR",
        SuccursalID: 1,
        ComiteID: 1,
        PosteIDs: [1, 2],
    },
];
