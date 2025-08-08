import { Internationalization } from "@syncfusion/ej2-base";
import { Event } from "./ScheduleDataItem";

const instance: Internationalization = new Internationalization();

// Template personnalisée pour l'affichage des événements
export const EventTemplate = (props: Event) => (
    <div className="e-appointment-details">
        <div className="e-subject">{props.Subject}</div>
        <div className="e-time">
            {instance.formatDate(props.StartTime, { skeleton: "hm" })} -{" "}
            {instance.formatDate(props.EndTime, { skeleton: "hm" })}
        </div>
        <div className="e-location">{props.Location}</div>
    </div>
);
