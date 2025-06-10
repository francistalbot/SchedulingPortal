import {
    ScheduleComponent,
    Day,
    Week,
    WorkWeek,
    Month,
    Agenda,
    Inject,
    ViewsDirective,
    ViewDirective,
} from "@syncfusion/ej2-react-schedule";
import { EventTemplate } from "./EventTemplate";
import { ScheduleDataItem } from "./ScheduleDataItem";
import { QuickInfoContentTemplate } from "./QuickInfoContentTemplate";

export default function Scheduler(this: any) {
    const localData: ScheduleDataItem[] = [];

    const quickInfoTemplates = {
        content: QuickInfoContentTemplate.bind(this),
    };
    const eventSettings = { dataSource: localData, template: EventTemplate };
    return (
        <ScheduleComponent
            style={{ marginTop: "100px" }}
            eventSettings={eventSettings}
            quickInfoTemplates={quickInfoTemplates}
        >
            <ViewsDirective>
                <ViewDirective option="Day" />
                <ViewDirective option="Week" />
                <ViewDirective option="WorkWeek" />
                <ViewDirective option="Month" />
            </ViewsDirective>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
        </ScheduleComponent>
    );
}
