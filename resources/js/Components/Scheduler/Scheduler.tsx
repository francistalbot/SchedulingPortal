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
    ResourcesDirective,
    ResourceDirective,
} from "@syncfusion/ej2-react-schedule";
import { EventTemplate } from "./EventTemplate";
import { ScheduleDataItem } from "./ScheduleDataItem";
import { QuickInfoContentTemplate } from "./QuickInfoContentTemplate";
import { SuccursalData, ComiteData, EventsData } from "./datasource"; 
import {
    PopupOpenEventArgs,
    PopupCloseEventArgs,
    EventSettingsModel,
    QuickInfoTemplatesModel,
} from "@syncfusion/ej2-react-schedule";

export default function Scheduler() {
    const quickInfoTemplates: QuickInfoTemplatesModel = {
        content: QuickInfoContentTemplate,
    };
    const eventSettings: EventSettingsModel = {
dataSource: EventsData,
template: EventTemplate,
    };

    const eventSettings = { dataSource: EventsData, template: EventTemplate };

    return (
        <ScheduleComponent
            style={{ marginTop: "100px" }}
            eventSettings={eventSettings}
            quickInfoTemplates={quickInfoTemplates}
            selectedDate={new Date(2018, 3, 1)}
        >
            <ViewsDirective>
                <ViewDirective option="Day" />
                <ViewDirective option="Week" />
                <ViewDirective option="WorkWeek" />
                <ViewDirective option="Month" />
            </ViewsDirective>
            <ResourcesDirective>
                <ResourceDirective field='ComiteId' title='Comite' name='Comites' allowMultiple={true} dataSource={ComiteData} textField='ComiteText' idField='Id' colorField='OwnerColor'>
                <ResourceDirective field='SuccursalId' title='Succursal' name='Succursals' allowMultiple={true} dataSource={SuccursalData} textField='SuccursalText' idField='Id' colorField='OwnerColor'>
            </ResourceDirective></ResourceDirective>
            </ResourcesDirective>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
        </ScheduleComponent>
    );
}
