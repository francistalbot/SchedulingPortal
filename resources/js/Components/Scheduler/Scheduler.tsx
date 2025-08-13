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
import { addEvents, removeEvents, updateEvents } from "@/app/eventsSlice";
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

        if (
            args.requestType === "eventCreate" ||
            args.requestType === "eventChange" ||
            args.requestType === "eventRemove"
        ) {
            args.cancel = true;
            // Args.data envoi soi un tableau d'event
            // ou une occurence avec son parent recurrent
            const argArray = Array.isArray(args.data) ? args.data : [args.data];
            const {
                events,
                recurrenceOccurences,
            }: {
                events: Event[];
                recurrenceOccurences: { occurrence: Event; parent: Event }[];
            } = argArray.reduce(
                (acc, item) => {
                    if (item.occurrence && item.parent) {
                        acc.recurrenceOccurences.push({
                            occurrence: Event.fromAny(item.occurrence),
                            parent: Event.fromAny(item.parent),
                        });
                    } else if (item.Id || item.id) {
                        acc.events.push(Event.fromAny(item));
                    } else {
                        console.warn("Structure d'événement inconnue:", item);
                    }
                    return acc;
                },
                { events: [], recurrenceOccurences: [] }
            );
            console.log("events:", events);
            console.log("recurrenceOccurences:", recurrenceOccurences);
            // Dispatch les actions Redux appropriées
            if (args.requestType === "eventCreate" && args.data) {
                if (events.length > 0) dispatch(addEvents(events));
            } else if (args.requestType === "eventChange" && args.data) {
                if (events.length > 0) dispatch(updateEvents(events));
            } else if (args.requestType === "eventRemove" && args.data) {
                if (events.length > 0)
                    dispatch(removeEvents(events.map((e) => e.Id)));
            }
        }
    };

    const onActionComplete = (args: ActionEventArgs) => {
        console.log("Action ended:", args.requestType, args.data);
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
            actionComplete={onActionComplete}
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
