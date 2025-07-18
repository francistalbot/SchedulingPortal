import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
import { ComiteData, SuccursalData } from "./datasource";

export const EditorTemplate = (props: Record<string, any>) => {
    return props !== undefined ? (
        <table
            className="custom-event-editor"
            style={{ width: "100%" }}
            cellPadding={5}
        >
            <tbody>
                <tr>
                    <td className="e-textlabel">Title</td>
                    <td colSpan={4}>
                        <input
                            id="Title"
                            className="e-field e-input"
                            type="text"
                            name="Subject"
                            style={{ width: "100%" }}
                        />
                    </td>
                </tr>
                <tr>
                    <td className="e-textlabel">Comité</td>
                    <td colSpan={4}>
                        <DropDownListComponent
                            id="Comite"
                            placeholder="Choose Comité"
                            data-name="ComiteID"
                            className="e-field"
                            style={{ width: "100%" }}
                            dataSource={ComiteData}
                            fields={{ text: "Text", value: "Id" }}
                        />
                    </td>
                </tr>
                <tr>
                    <td className="e-textlabel">Location</td>
                    <td colSpan={4}>
                        <DropDownListComponent
                            id="Location"
                            placeholder="Choose Succursal"
                            data-name="SuccursalID"
                            className="e-field"
                            style={{ width: "100%" }}
                            dataSource={SuccursalData}
                            fields={{ text: "Text", value: "Id" }}
                        />
                    </td>
                </tr>
                <tr>
                    <td className="e-textlabel">Start</td>
                    <td colSpan={4}>
                        <DateTimePickerComponent
                            id="StartTime"
                            format="dd/MM/yy hh:mm a"
                            data-name="StartTime"
                            value={new Date(props.startTime || props.StartTime)}
                            className="e-field"
                        />
                    </td>
                </tr>
                <tr>
                    <td className="e-textlabel">End</td>
                    <td colSpan={4}>
                        <DateTimePickerComponent
                            id="EndTime"
                            format="dd/MM/yy hh:mm a"
                            data-name="EndTime"
                            value={new Date(props.endTime || props.EndTime)}
                            className="e-field"
                        />
                    </td>
                </tr>
                <tr>
                    <td className="e-textlabel">All Day</td>
                    <td colSpan={4}>
                        <CheckBoxComponent
                            id="IsAllDay"
                            data-name="IsAllDay"
                            className="e-field"
                        />
                    </td>
                </tr>
                <tr>
                    <td className="e-textlabel">Description</td>
                    <td colSpan={4}>
                        <textarea
                            id="Description"
                            className="e-field e-input"
                            name="Description"
                            rows={3}
                            cols={50}
                            style={{
                                width: "100%",
                                height: "60px !important",
                                resize: "vertical",
                            }}
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    ) : (
        <div></div>
    );
};
