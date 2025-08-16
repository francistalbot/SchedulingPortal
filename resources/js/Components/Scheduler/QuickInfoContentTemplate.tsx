import { Internationalization } from "@syncfusion/ej2-base";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { Poste } from "@/types/referenceData";

// https://ej2.syncfusion.com/react/documentation/api/schedule/#quickinfotemplates
// https://ej2.syncfusion.com/react/documentation/schedule/how-to/show-quick-info-template?cs-save-lang=1&cs-lang=ts
export const QuickInfoContentTemplate = (props: {
    [key: string]: any;
}): JSX.Element => {
    console.log("props:", props);
    const assignmentsState = useSelector(
        (state: RootState) => state.assignments
    );
    const comiteData = props.comite;
    const succursalData = props.succursal;
    const postesData = props.eventPostes as Poste[];
    const benevoleData = useSelector(
        (state: RootState) => state.referenceData.benevoles
    );

    const intl: Internationalization = new Internationalization();

    const currentAssignments = assignmentsState.assignments.filter(
        (assignment) =>
            assignment.EventID === props.Id &&
            new Date(assignment.Date.toString()).getFullYear() ===
                new Date(props.StartTime).getFullYear() &&
            new Date(assignment.Date.toString()).getMonth() ===
                new Date(props.StartTime).getMonth() &&
            new Date(assignment.Date.toString()).getDate() ===
                new Date(props.StartTime).getDate() &&
            props.PosteIDs.includes(assignment.PosteID)
    );

    const formatDateRange = (data: { [key: string]: string }): string => {
        const startTime = new Date(data.StartTime);
        const endTime = new Date(data.EndTime);

        const startHour = intl.formatDate(startTime, { skeleton: "hm" });
        const endHour = intl.formatDate(endTime, { skeleton: "hm" });

        const startDate = intl.formatDate(startTime, {
            type: "date",
            skeleton: "full",
        });
        const endDate = intl.formatDate(endTime, {
            type: "date",
            skeleton: "full",
        });
        if (data.IsAllDay) {
            if (
                startTime.getFullYear() === endTime.getFullYear() &&
                startTime.getMonth() === endTime.getMonth() &&
                startTime.getDate() === endTime.getDate() - 1
            )
                return `${startDate} (All day)`;
            return `${startDate} (All day) - ${endDate} (All day)`;
        } else {
            if (startDate === endDate)
                return `${startDate} (${startHour} - ${endHour})`;
            return `${startDate} (${startHour}) - ${endDate} (${endHour})`;
        }
    };
    //  console.log(props);
    return (
        <div>
            {props.elementType === "cell" ? (
                <table className="e-popup-table">
                    <tbody>
                        <tr>
                            <td>
                                <form className="e-schedule-form">
                                    <span className="e-input-group e-control-wrapper">
                                        <input
                                            className="e-subject e-field e-input"
                                            type="text"
                                            name="Subject"
                                            placeholder="Add title"
                                        />
                                    </span>
                                </form>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="e-date-time">
                                    <div className="e-date-time-icon e-icons"></div>
                                    <div className="e-date-time-details e-text-ellipsis">
                                        {formatDateRange(props)}
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            ) : (
                <>
                    <div className="e-date-time">
                        <div className="e-date-time-icon e-icons"></div>
                        <div className="e-date-time-wrapper e-text-ellipsis">
                            <div className="e-date-time-details e-text-ellipsis">
                                {formatDateRange(props)}
                            </div>
                        </div>
                    </div>
                    <div className="e-event-content e-template">
                        <div className="e-subject-wrap">
                            {props.Location !== undefined ? (
                                <div className="location">{props.Location}</div>
                            ) : (
                                ""
                            )}
                            {props.Description !== undefined ? (
                                <div className="description">
                                    {props.Description}
                                </div>
                            ) : (
                                ""
                            )}
                            {/* Affichage des postes à pourvoir */}
                            {props.PosteIDs !== undefined &&
                                props.PosteIDs.length > 0 && (
                                    <div className="postes-section">
                                        <h4>Postes à pourvoir</h4>
                                        <ul>
                                            {props.PosteIDs.map(
                                                (posteID: any) => (
                                                    <li key={posteID}>
                                                        <strong>
                                                            {posteID
                                                                ? postesData.find(
                                                                      (p) =>
                                                                          p.Id ===
                                                                          posteID
                                                                  )?.Name
                                                                : ""}
                                                        </strong>
                                                        <select
                                                            defaultValue={
                                                                currentAssignments.find(
                                                                    (
                                                                        assignment
                                                                    ) =>
                                                                        assignment.PosteID ===
                                                                        posteID
                                                                )?.BenevoleID ||
                                                                ""
                                                            }
                                                            // TODO: Ajoute ici un gestionnaire pour sauvegarder l'affectation
                                                        >
                                                            <option value="">
                                                                -- Choisir un
                                                                bénévole --
                                                            </option>
                                                            {benevoleData
                                                                .filter(
                                                                    (
                                                                        benevole
                                                                    ) =>
                                                                        benevole.ComiteId ===
                                                                        props.ComiteID
                                                                )
                                                                .map(
                                                                    (
                                                                        benevole
                                                                    ) => (
                                                                        <option
                                                                            key={
                                                                                benevole.Id
                                                                            }
                                                                            value={
                                                                                benevole.Id
                                                                            }
                                                                        >
                                                                            {
                                                                                benevole.Name
                                                                            }
                                                                        </option>
                                                                    )
                                                                )}
                                                        </select>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
