import { Internationalization } from "@syncfusion/ej2-base";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import {
    Benevole,
    Comite,
    Poste,
    ReferenceDataState,
    Succursale,
} from "@/types/referenceData";
import { Assignment } from "@/types/assignment";
import { Event } from "@/types/event";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { CustomDataManager } from "./customDataManager";
import { useEffect, useState } from "react";

// https://ej2.syncfusion.com/react/documentation/api/schedule/#quickinfotemplates
// https://ej2.syncfusion.com/react/documentation/schedule/how-to/show-quick-info-template?cs-save-lang=1&cs-lang=ts
export const QuickInfoContentTemplate = (props: {
    [key: string]: any;
}): JSX.Element => {
    const dataManager = CustomDataManager.getInstance();
    const [assignmentsData, setAssignmentsData] = useState<Assignment[]>(() => {
        if (props.elementType === "cell" || !props.Id) {
            return [];
        }
        dataManager
            .executeQuery({
                tableName: "assignments",
                params: [
                    { key: "StartDate", value: props.StartTime },
                    { key: "EventId", value: props.Id },
                ],
            })
            .then((response) => {
                setAssignmentsData(response.result || []);
            });
        return []; // Valeur initiale vide
    });

    const referenceData = dataManager.getReferenceData();
    const eventData = props as Event;

    // Trouver les entités spécifiques à l'événement
    const comiteData = eventData.ComiteID
        ? referenceData.comites.find((c: Comite) => c.Id === eventData.ComiteID)
        : undefined;
    const succursalData = eventData.SuccursalID
        ? referenceData.succursales.find(
              (s: Succursale) => s.Id === eventData.SuccursalID
          )
        : undefined;
    const postesData = eventData.PosteIDs
        ? referenceData.postes.filter((p: Poste) =>
              eventData.PosteIDs!.includes(p.Id)
          )
        : [];
    const benevoleData = referenceData.benevoles.filter(
        (b: Benevole) => b.ComiteId === comiteData?.Id
    );
    console.log("props:", props);

    const intl: Internationalization = new Internationalization();

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
    const handleAssignmentChange = async (
        posteID: number,
        benevoleID: number,
        assignmentID: number | undefined
    ) => {
        try {
            // Trouver l'assignement actuel pour ce poste
            const currentAssignment = assignmentsData.find(
                (assignment) => assignment.PosteID === posteID
            );
            // Vérifier si la valeur a vraiment changé
            if (currentAssignment?.BenevoleID === benevoleID) return;

            const assignment = {
                Id: assignmentID ? assignmentID : undefined,
                EventID: props.Id,
                PosteID: posteID,
                BenevoleID: benevoleID,
                StartDate: props.StartTime.toString(),
                EndDate: props.EndTime.toString(),
            };

            await dataManager.saveChanges(
                {
                    ...(assignment.Id
                        ? { changedRecords: [assignment] }
                        : { addedRecords: [assignment] }),
                },
                undefined,
                "assignments"
            );
        } catch (error) {
            console.error(
                "Erreur lors de la sauvegarde de l'assignement:",
                error
            );
        }
    };
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
                                    <div className="e-assignements">
                                        <h4>Postes à pourvoir</h4>
                                        {props.PosteIDs.map((posteID: any) => {
                                            const assignment =
                                                assignmentsData.find(
                                                    (assignment) =>
                                                        assignment.PosteID ===
                                                        posteID
                                                );

                                            return (
                                                <DropDownListComponent
                                                    key={posteID}
                                                    dataSource={benevoleData.map(
                                                        (b) => ({
                                                            text: b.Name,
                                                            value: b.Id,
                                                        })
                                                    )}
                                                    fields={{
                                                        text: "text",
                                                        value: "value",
                                                    }}
                                                    placeholder={
                                                        posteID
                                                            ? postesData.find(
                                                                  (p) =>
                                                                      p.Id ===
                                                                      posteID
                                                              )?.Name
                                                            : ""
                                                    }
                                                    value={
                                                        assignment?.BenevoleID ||
                                                        ""
                                                    }
                                                    floatLabelType="Always"
                                                    change={(e: any) =>
                                                        handleAssignmentChange(
                                                            posteID,
                                                            e.value,
                                                            assignment?.Id
                                                        )
                                                    }
                                                />
                                            );
                                        })}
                                    </div>
                                )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
