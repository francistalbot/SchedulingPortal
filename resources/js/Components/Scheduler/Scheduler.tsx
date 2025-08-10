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
import { addEvents, removeEvents } from "@/app/eventsSlice";
import { Event } from "@/types/event";

export default function Scheduler() {
    const eventsState = useSelector((state: RootState) => state.events);
    const dispatch = useDispatch<AppDispatch>();

    const quickInfoTemplates: QuickInfoTemplatesModel = {
        content: QuickInfoContentTemplate,
    };

    const eventSettings: EventSettingsModel = {
        dataSource: eventsState.events,
        template: EventTemplate,
    };

    const onPopupOpen = (args: PopupOpenEventArgs) => {
        customizeEditorTemplate(args);
    };

    const onPopupClose = (args: PopupCloseEventArgs) => {
        if (args.type === "Editor") {
            console.log(args.data);
        }
    };
    
      const onActionBegin = (args: ActionEventArgs) => {
        console.log("Action:", args.requestType, args.data);
        
        // Empêche Syncfusion de modifier directement les données
        if (args.requestType === 'eventCreate' || 
            args.requestType === 'eventChange' || 
            args.requestType === 'eventRemove') {
            args.cancel = true;
            
            // Dispatch les actions Redux appropriées
            const events = Array.isArray(args.data) 
                ? Event.fromArray(args.data) 
                : [Event.fromAny(args.data)];
            if (args.requestType === 'eventCreate' && args.data) {
                    dispatch(addEvents(events));
            } else if (args.requestType === 'eventChange' && args.data) {
                // dispatch(updateEvent(args.data));
            } else if (args.requestType === 'eventRemove' && args.data) {
                // dispatch(deleteEvent(args.data));
            }
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
            actionBegin={onActionBegin}
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
