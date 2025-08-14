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
    ActionEventArgs,
} from "@syncfusion/ej2-react-schedule";
import { EventTemplate } from "./EventTemplate";
import { QuickInfoContentTemplate } from "./QuickInfoContentTemplate";
import { succursalData } from "./datasource";
import {
    PopupOpenEventArgs,
    PopupCloseEventArgs,
    EventSettingsModel,
    QuickInfoTemplatesModel,
} from "@syncfusion/ej2-react-schedule";
import { customizeEditorTemplate } from "./customizeEditorTemplate";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/app/store";
import { Event } from "@/types/event";
import { CustomDataManager } from "./customDataManager";

export default function Scheduler() {
    const eventsState = useSelector((state: RootState) => state.events);
    const dispatch = useDispatch<AppDispatch>();

    const quickInfoTemplates: QuickInfoTemplatesModel = {
        content: QuickInfoContentTemplate,
    };
    const customDataManager = new CustomDataManager();

    const eventSettings: EventSettingsModel = {
        dataSource: customDataManager,
        template: EventTemplate,
    };

    const onPopupOpen = (args: PopupOpenEventArgs) => {
        customizeEditorTemplate(args);
    };

    const onPopupClose = (args: PopupCloseEventArgs) => {
        if (args.type === "Editor") {
        }
    };

    return (
        <ScheduleComponent
            width="100%"
            height="650px"
            eventSettings={eventSettings}
            group={{
                byGroupID: false,
                resources: ["Succursals"],
            }}
            enableAdaptiveUI={true}
            quickInfoTemplates={quickInfoTemplates}
            currentView="Month"
            selectedDate={new Date(2018, 5, 1)}
            popupOpen={onPopupOpen}
            popupClose={onPopupClose}
            //  actionBegin={onActionBegin}
            //   actionComplete={onActionComplete}
            /*    dataBinding={(args) => {
                console.log("Data binding:", args);
            }}*/
            //enableRecurrenceValidation={true}
        >
            <ViewsDirective>
                <ViewDirective option="Day" />
                <ViewDirective option="Week" />
                <ViewDirective option="WorkWeek" />
                <ViewDirective option="Month" />
            </ViewsDirective>
            <ResourcesDirective>
                <ResourceDirective
                    field="SuccursalID"
                    title="Succursal"
                    name="Succursals"
                    allowMultiple={false}
                    dataSource={succursalData}
                    textField="Name"
                    idField="Id"
                />
            </ResourcesDirective>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
        </ScheduleComponent>
    );
}
