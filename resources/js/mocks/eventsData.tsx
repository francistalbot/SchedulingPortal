import { Event } from "@/types/event";

export const eventsData: Event[] = [
    {
        Id: 1,
        Subject: "Developers Meeting",
        StartTime: "2018-06-01T10:00:00.000Z",
        EndTime: "2018-06-01T11:00:00.000Z",
        RecurrenceRule: "FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR",
        SuccursalID: 1,
        ComiteID: 1,
        PosteIDs: [1, 2],
    },
];
