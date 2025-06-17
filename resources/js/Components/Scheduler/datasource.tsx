import { ScheduleDataItem } from "./ScheduleDataItem";

export const SuccursalData = [
    { SuccursalText: "Vilray", Id: 1, OwnerColor: "#ffaa00" },
    { SuccursalText: "Plateau", Id: 2, OwnerColor: "#f8a398" },
];

export const ComiteData = [
    { ComiteText: "Comité Bois", Id: 1, OwnerColor: "#f8a398" },
    { ComiteText: "Comité Outil", Id: 2, OwnerColor: "#7499e1" },
];

export const RoleData = [
    { RoleText: "Accueil", Id: 1 },
    { RoleText: "Decouverte", Id: 2 },
];

export const BenevoleData = [
    { BenevoleText: "Francis", Id: 1 },
    { BenevoleText: "Benois", Id: 2 },
];
export const EventsData: ScheduleDataItem[] = [
    {
        Id: 1,
        Subject: "Developers Meeting",
        StartTime: new Date(2018, 5, 1, 10, 0),
        EndTime: new Date(2018, 5, 1, 11, 0),
        RecurrenceRule: "FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR",
        SuccursalID: 1,
        ComiteID: 1,
        Postes: [
            {
                Id: 1,
                Name: "Accueil",
                Affectations: [
                    { Date: new Date(2024, 5, 20), BenevoleId: 101 },
                    { Date: new Date(2024, 5, 27), BenevoleId: 102 },
                ],
            },
            {
                Id: 2,
                Name: "Distribution",
                Affectations: [
                    {
                        Date: new Date(2024, 5, 20),
                        BenevoleId: 103,
                    },
                    { Date: new Date(2024, 5, 27) }, // poste non pourvu ce jour-là
                ],
            },
        ],
    },
    {
        Id: 2,
        Subject: "Test report Validation",
        StartTime: new Date(2018, 5, 2, 10, 30),
        EndTime: new Date(2018, 5, 2, 13, 0),
        RecurrenceRule: "FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,WE,FR",
        SuccursalID: 1,
        ComiteID: 2,
    },
    {
        Id: 3,
        Subject: "Requirement planning",
        StartTime: new Date(2018, 5, 4, 9, 30),
        EndTime: new Date(2018, 5, 4, 10, 45),
        SuccursalID: 2,
        ComiteID: 1,
    },
    {
        Id: 4,
        Subject: "Bug Automation",
        StartTime: new Date(2018, 5, 2, 11, 0),
        EndTime: new Date(2018, 5, 2, 13, 0),
        RecurrenceRule: "FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,WE,FR",
        SuccursalID: 2,
        ComiteID: 2,
    },
    {
        Id: 5,
        Subject: "Timeline estimation",
        StartTime: new Date(2018, 5, 3, 10, 0),
        EndTime: new Date(2018, 5, 3, 12, 0),
        SuccursalID: 1,
        ComiteID: 1,
    },
    {
        Id: 6,
        Subject: "Timeline estimation",
        StartTime: new Date(2018, 5, 3, 13, 0),
        EndTime: new Date(2018, 5, 3, 15, 0),
        SuccursalID: 2,
        ComiteID: 1,
    },
    {
        Id: 7,
        Subject: "Functionality testing",
        StartTime: new Date(2018, 5, 4, 14, 0),
        EndTime: new Date(2018, 5, 4, 15, 30),
        SuccursalID: 1,
        ComiteID: 2,
    },
    {
        Id: 8,
        Subject: "Functionality testing",
        StartTime: new Date(2018, 5, 4, 19, 0),
        EndTime: new Date(2018, 5, 4, 21, 0),
        SuccursalID: 2,
        ComiteID: 2,
    },
    {
        Id: 9,
        Subject: "Workflow Analysis",
        StartTime: new Date(2018, 5, 5, 14, 0),
        EndTime: new Date(2018, 5, 5, 15, 30),
        SuccursalID: 1,
        ComiteID: 1,
    },
    {
        Id: 10,
        Subject: "Quality Analysis",
        StartTime: new Date(2018, 5, 5, 13, 0),
        EndTime: new Date(2018, 5, 5, 16, 0),
        SuccursalID: 2,
        ComiteID: 1,
    },
    {
        Id: 11,
        Subject: "Cross-browser testing",
        StartTime: new Date(2018, 5, 5, 14, 45),
        EndTime: new Date(2018, 5, 5, 16, 15),
        SuccursalID: 1,
        ComiteID: 2,
    },
    {
        Id: 12,
        Subject: "Resolution-based testing",
        StartTime: new Date(2018, 5, 5, 15, 0),
        EndTime: new Date(2018, 5, 5, 17, 30),
        SuccursalID: 2,
        ComiteID: 2,
    },
    {
        Id: 13,
        Subject: "Project Preview",
        StartTime: new Date(2018, 5, 8, 16, 0),
        EndTime: new Date(2018, 5, 8, 18, 0),
        SuccursalID: 1,
        ComiteID: 1,
    },
    {
        Id: 14,
        Subject: "Project Preview",
        StartTime: new Date(2018, 5, 8, 15, 0),
        EndTime: new Date(2018, 5, 8, 17, 30),
        SuccursalID: 2,
        ComiteID: 1,
    },
    {
        Id: 15,
        Subject: "Test report Validation",
        StartTime: new Date(2018, 5, 8, 15, 30),
        EndTime: new Date(2018, 5, 8, 17, 45),
        SuccursalID: 1,
        ComiteID: 2,
    },
    {
        Id: 16,
        Subject: "Test report Validation",
        StartTime: new Date(2018, 5, 8, 15, 0),
        EndTime: new Date(2018, 5, 8, 17, 0),
        SuccursalID: 2,
        ComiteID: 2,
    },
    {
        Id: 17,
        Subject: "Resource planning",
        StartTime: new Date(2018, 5, 6, 15, 0),
        EndTime: new Date(2018, 5, 6, 18, 0),
        SuccursalID: 1,
        ComiteID: 1,
    },
    {
        Id: 18,
        Subject: "Resource planning",
        StartTime: new Date(2018, 5, 7, 16, 0),
        EndTime: new Date(2018, 5, 7, 17, 0),
        SuccursalID: 2,
        ComiteID: 1,
    },
    {
        Id: 19,
        Subject: "Run test cases",
        StartTime: new Date(2018, 5, 7, 14, 0),
        EndTime: new Date(2018, 5, 7, 18, 0),
        SuccursalID: 1,
        ComiteID: 2,
    },
    {
        Id: 20,
        Subject: "Run test cases",
        StartTime: new Date(2018, 5, 6, 14, 0),
        EndTime: new Date(2018, 5, 6, 17, 30),
        SuccursalID: 2,
        ComiteID: 2,
    },
    {
        Id: 21,
        Subject: "Resource planning",
        StartTime: new Date(2018, 5, 7, 9, 30),
        EndTime: new Date(2018, 5, 7, 11, 30),
        SuccursalID: 2,
        ComiteID: 1,
    },
    {
        Id: 22,
        Subject: "Developers Meeting",
        StartTime: new Date(2018, 5, 1, 12, 0),
        EndTime: new Date(2018, 5, 1, 13, 0),
        RecurrenceRule: "FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR",
        SuccursalID: 2,
        ComiteID: 1,
    },
];
