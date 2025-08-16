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
import { QuickInfoContentTemplate } from "./QuickInfoContentTemplate";
import { enrichEditorArgs, enrichQuickInfoProps } from "./enrichPopupArgs";
import { selectSuccursales } from "@/app/selectors";
import {
    PopupOpenEventArgs,
    PopupCloseEventArgs,
    EventSettingsModel,
    QuickInfoTemplatesModel,
} from "@syncfusion/ej2-react-schedule";
import { customizeEditorTemplate } from "./customizeEditorTemplate";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { CustomDataManager } from "./customDataManager";

export default function Scheduler() {
    const state = useSelector((state: RootState) => state);

    const quickInfoTemplates: QuickInfoTemplatesModel = {
        content: (props: any) => {
            // Enrichir les props avec les données de référence
            const enrichedProps = enrichQuickInfoProps(props, state);
            return QuickInfoContentTemplate(enrichedProps);
        },
    };

    const eventSettings: EventSettingsModel = {
        dataSource: new CustomDataManager(),
        template: EventTemplate,
    };

    const onPopupOpen = (args: PopupOpenEventArgs) => {
        if (args.type == "Editor") {
            const enrichedArgs = enrichEditorArgs(args, state);
            customizeEditorTemplate(enrichedArgs);
        }
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
