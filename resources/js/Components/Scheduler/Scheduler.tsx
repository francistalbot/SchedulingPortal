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

    const onPopupOpen = (args: PopupOpenEventArgs) => {
        if (args.type === "Editor") {
            console.log(args.data);
        }
    };

    const onPopupClose = (args: PopupCloseEventArgs) => {
        if (args.type === "Editor") {
            console.log(args.data);
        }
    };

    return (
        <ScheduleComponent
            style={{ marginTop: "100px" }}
            eventSettings={eventSettings}
            group={{
                byGroupID: false,
                resources: ["Succursals"],
            }}
            quickInfoTemplates={quickInfoTemplates}
            currentView="Month"
            enableAdaptiveUI={true}
            selectedDate={new Date(2018, 5, 1)}
            popupOpen={onPopupOpen}
            popupClose={onPopupClose}
        >
            <ViewsDirective>
                <ViewDirective option="Day" />
                <ViewDirective option="Week" />
                <ViewDirective option="WorkWeek" />
                <ViewDirective option="Month" />
            </ViewsDirective>
            <ResourcesDirective>
                <ResourceDirective
                    field="ComiteID"
                    title="Comite"
                    name="Comites"
                    allowMultiple={false}
                    dataSource={ComiteData}
                    textField="ComiteText"
                    idField="Id"
                    colorField="OwnerColor"
                />

                <ResourceDirective
                    field="SuccursalID"
                    title="Succursal"
                    name="Succursals"
                    allowMultiple={false}
                    dataSource={SuccursalData}
                    textField="Text"
                    idField="Id"
                />
            </ResourcesDirective>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
        </ScheduleComponent>
    );
}
