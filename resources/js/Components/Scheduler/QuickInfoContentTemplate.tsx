import { Internationalization } from "@syncfusion/ej2-base";
import { BenevoleData, RoleData } from "./datasource";

// https://ej2.syncfusion.com/react/documentation/api/schedule/#quickinfotemplates

export const QuickInfoContentTemplate = (props: {
    [key: string]: any;
}): JSX.Element => {
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
    console.log(props);
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
                            {props.Postes !== undefined &&
                                props.Postes.length > 0 && (
                                    <div className="postes-section">
                                        <h4>Postes à pourvoir</h4>
                                        <ul>
                                            {props.Postes.map((poste: any) => (
                                                <li key={poste.Id}>
                                                    <strong>
                                                        {poste.Name}
                                                    </strong>
                                                    <select
                                                        defaultValue={
                                                            poste
                                                                .Affectations?.[0]
                                                                ?.BenevoleId ||
                                                            ""
                                                        }
                                                        // TODO: Ajoute ici un gestionnaire pour sauvegarder l'affectation
                                                    >
                                                        <option value="">
                                                            -- Choisir un
                                                            bénévole --
                                                        </option>
                                                        {BenevoleData.map(
                                                            (b) => (
                                                                <option
                                                                    key={b.Id}
                                                                    value={b.Id}
                                                                >
                                                                    {
                                                                        b.BenevoleText
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    /*  */
                                )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
