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
import {
    selectSuccursales,
    selectPostes,
    selectComites,
} from "@/app/selectors";
import type { Poste, Comite } from "@/types/referenceData"; // Adjust the import path as needed
import {
    PopupOpenEventArgs,
    PopupCloseEventArgs,
    EventSettingsModel,
    QuickInfoTemplatesModel,
} from "@syncfusion/ej2-react-schedule";
import { customizeEditorTemplate } from "./customizeEditorTemplate";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/app/store";
import { CustomDataManager } from "./customDataManager";
import { OptimizedQuickInfoContentTemplate } from "./OptimizedQuickInfoContentTemplate";
import { QuickInfoWrapper } from "./QuickInfoWrapper";

export default function Scheduler() {
    const state = useSelector((state: RootState) => state);

    const quickInfoTemplates: QuickInfoTemplatesModel = {
        content: QuickInfoWrapper,
    };

    const eventSettings: EventSettingsModel = {
        dataSource: new CustomDataManager(),
        template: EventTemplate,
    };

    const onPopupOpen = (args: PopupOpenEventArgs) => {
        const enrichedArgs = {
            ...args,
            postes: selectPostes(state),
            comites: selectComites(state),
        };
        customizeEditorTemplate(enrichedArgs);
    };

    const onPopupClose = (args: PopupCloseEventArgs) => {};

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
                    dataSource={selectSuccursales(state)}
                    textField="Name"
                    idField="Id"
                />
            </ResourcesDirective>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
        </ScheduleComponent>
    );
}
