import { Internationalization } from "@syncfusion/ej2-base";
import { Event } from "@/types/event";

const instance: Internationalization = new Internationalization();

// Template personnalisée pour l'affichage des événements
export const EventTemplate = (props: Event) => (
    <div className="e-appointment-details">
        <div className="e-subject">{props.Subject}</div>
        <div className="e-time">
            {instance.formatDate(new Date(props.StartTime), { skeleton: "hm" })}{" "}
            - {instance.formatDate(new Date(props.EndTime), { skeleton: "hm" })}
        </div>
        <div className="e-location">{props.Location}</div>
    </div>
);
