import { Internationalization } from "@syncfusion/ej2-base";

const instance: Internationalization = new Internationalization();

// Template personnalisée pour l'affichage des événements
export const EventTemplate = (props: any) => (
    console.log("EventTemplate props:", props),
    (
        <div className="e-appointment-details">
            <div className="e-inner-wrap">
                <div className="e-subject">{props.Subject}</div>
                <div className="e-time">
                    {instance.formatDate(new Date(props.StartTime), {
                        skeleton: "hm",
                    })}{" "}
                    -{" "}
                    {instance.formatDate(new Date(props.EndTime), {
                        skeleton: "hm",
                    })}
                </div>
                <div className="e-location">{props.Location}</div>
            </div>
        </div>
    )
);

// Template personnalisée pour l'affichage des événements dans l'agenda
export const AgendaEventTemplate = (props: any) => (
    <>
        <div className="e-subject">{props.Subject}</div>
        <div className="e-date-time">
            {instance.formatDate(new Date(props.StartTime), {
                skeleton: "hm",
            })}{" "}
            -{" "}
            {instance.formatDate(new Date(props.EndTime), {
                skeleton: "hm",
            })}
        </div>
        <div className="e-location">{props.Location}</div>
        <div className="e-description">{props.Description}</div>
    </>
);
