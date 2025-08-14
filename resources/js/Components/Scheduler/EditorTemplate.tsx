import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
import { comiteData, succursalData } from "./datasource";

export const EditorTemplate = (props: Record<string, any>) => {
    return props !== undefined ? (
        <div className="e-dialog-parent">
            {/* Title and Location Row */}
            <div className="e-title-location-row">
                <div className="e-subject-container">
                    <div className="e-float-input e-control-wrapper e-input-group">
                        <input
                            className="e-subject e-field"
                            type="text"
                            name="Subject"
                            defaultValue={props.Subject || ""}
                            id="Subject"
                            aria-labelledby="label_Subject"
                        />
                        <span className="e-float-line"></span>
                        <label
                            className="e-float-text e-label-top"
                            id="label_Subject"
                            htmlFor="Subject"
                        >
                            Title
                        </label>
                    </div>
                </div>
                <div className="e-location-container">
                    <DropDownListComponent
                        id="SuccursalID"
                        data-name="SuccursalID"
                        className="e-SuccursalID e-field"
                        placeholder="Choose Succursal"
                        dataSource={succursalData}
                        fields={{ text: "Text", value: "Id" }}
                        value={props.SuccursalID || null}
                        floatLabelType="Auto"
                    />
                </div>
            </div>

            {/* Start and End Time Row */}
            <div className="e-start-end-row">
                <div className="e-start-container">
                    <DateTimePickerComponent
                        id="StartTime"
                        data-name="StartTime"
                        className="e-start e-field"
                        format="dd/MM/yy hh:mm a"
                        value={new Date(props.StartTime || props.startTime)}
                        floatLabelType="Auto"
                        placeholder="Start"
                    />
                </div>
                <div className="e-end-container">
                    <DateTimePickerComponent
                        id="EndTime"
                        data-name="EndTime"
                        className="e-end e-field"
                        format="dd/MM/yy hh:mm a"
                        value={new Date(props.EndTime || props.endTime)}
                        floatLabelType="Auto"
                        placeholder="End"
                    />
                </div>
            </div>

            {/* All Day and Timezone Row */}
            <div className="e-all-day-time-zone-row">
                <div className="e-all-day-container">
                    <CheckBoxComponent
                        id="IsAllDay"
                        data-name="IsAllDay"
                        className="e-all-day e-field"
                        label="All day"
                        checked={props.IsAllDay || false}
                    />
                </div>
            </div>

            {/* Repeat Row*/}
            <div className="e-repeat-parent-row">
                <div className="e-repeat-container">
                    {/* Repeat Row*/}
                    <CheckBoxComponent
                        id="Repeat"
                        data-name="Repeat"
                        className="e-repeat e-field"
                        label="Repeat"
                        checked={!!props.RecurrenceRule}
                    />
                    <span className="e-recurrence-container">
                        <button
                            className="e-recurrence-edit-button e-control e-btn e-lib e-medium e-icon-btn"
                            type="button"
                            title="Edit Recurrence"
                        >
                            <span className="e-btn-icon e-recurrence-edit e-icons"></span>
                        </button>
                    </span>
                </div>
            </div>

            {/* Recurence Editor */}
            <div
                id="_recurrence_editor"
                className="e-recurrenceeditor e-lib e-control"
            >
                <div className="e-editor">
                    <div className="e-input-wrapper e-form-left">
                        <div
                            className="e-float-input e-control-wrapper e-input-group e-ddl e-lib e-keyboard e-valid-input"
                            style={{ width: "100%" }}
                            tabIndex={0}
                            aria-label="dropdownlist"
                            aria-disabled="false"
                            role="combobox"
                            aria-expanded="false"
                            aria-live="polite"
                            aria-labelledby="ej2_dropdownlist_186_hidden"
                            aria-controls="ej2_dropdownlist_186"
                        >
                            <select
                                aria-hidden="true"
                                tabIndex={-1}
                                className="e-ddl-hidden"
                                aria-label="dropdownlist"
                                name="null"
                                id="ej2_dropdownlist_186_hidden"
                            >
                                <option selected={true} value="none">
                                    Never
                                </option>
                            </select>

                            {/*                 <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>*/}
                            <input
                                type="text"
                                className="e-repeat-element e-control e-dropdownlist e-lib"
                                role="combobox"
                                aria-expanded="false"
                                readOnly={true}
                                id="ej2_dropdownlist_186"
                                aria-label="dropdownlist"
                                title="Repeat"
                                aria-disabled="false"
                                tabIndex={-1}
                                value="Never"
                                aria-labelledby="label_ej2_dropdownlist_186"
                            />
                            <span className="e-float-line"></span>
                            <label
                                className="e-float-text e-label-top"
                                id="label_ej2_dropdownlist_186"
                            >
                                Repeat
                            </label>
                            <span className="e-input-group-icon e-ddl-icon e-search-icon"></span>
                        </div>
                    </div>
                    <div className="e-input-wrapper e-interval e-form-right e-hide-recurrence-element">
                        <table
                            className="e-recurrence-table e-repeat-content-wrapper"
                            role="none"
                        >
                            <tbody>
                                <tr>
                                    <td>
                                        <div className="e-control-wrapper e-numeric e-float-input e-input-group e-valid-input">
                                            <input
                                                type="text"
                                                tabIndex={0}
                                                id="_recurrence_editor_e-repeat-interval"
                                                className="e-repeat-interval e-control e-numerictextbox e-lib"
                                                title="Repeat every"
                                                role="spinbutton"
                                                autoComplete="off"
                                                aria-valuemin={1}
                                                aria-valuemax={999}
                                                aria-labelledby="label__recurrence_editor_e-repeat-interval"
                                                aria-valuenow={1}
                                                value="1"
                                            />
                                            <input
                                                type="text"
                                                data-validatehidden="true"
                                                aria-label="hidden"
                                                className="e-numeric-hidden"
                                                name="_recurrence_editor_e-repeat-interval"
                                                value="1"
                                            />
                                            <span className="e-float-line"></span>
                                            <label
                                                className="e-float-text e-label-top"
                                                id="label__recurrence_editor_e-repeat-interval"
                                                htmlFor="_recurrence_editor_e-repeat-interval"
                                            >
                                                Repeat every
                                            </label>
                                            <span
                                                className="e-input-group-icon e-spin-down"
                                                title="Decrement value"
                                            ></span>
                                            <span
                                                className="e-input-group-icon e-spin-up"
                                                title="Increment value"
                                            ></span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="e-repeat-content"></span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="e-input-wrapper-side e-days e-form-left e-hide-recurrence-element">
                        <div className="e-week-expander-label">Repeat On</div>
                        <button
                            type="button"
                            className="e-round e-lib e-btn e-control"
                            data-index="0"
                            title="Sunday"
                        >
                            S
                        </button>
                        <button
                            type="button"
                            className="e-round e-lib e-btn e-control"
                            data-index="1"
                            title="Monday"
                        >
                            M
                        </button>
                        <button
                            type="button"
                            className="e-round e-lib e-btn e-control"
                            data-index="2"
                            title="Tuesday"
                        >
                            T
                        </button>
                        <button
                            type="button"
                            className="e-round e-lib e-btn e-control e-active e-primary"
                            data-index="3"
                            title="Wednesday"
                        >
                            W
                        </button>
                        <button
                            type="button"
                            className="e-round e-lib e-btn e-control"
                            data-index="4"
                            title="Thursday"
                        >
                            T
                        </button>
                        <button
                            type="button"
                            className="e-round e-lib e-btn e-control"
                            data-index="5"
                            title="Friday"
                        >
                            F
                        </button>
                        <button
                            type="button"
                            className="e-round e-lib e-btn e-control"
                            data-index="6"
                            title="Saturday"
                        >
                            S
                        </button>
                    </div>
                    <div className="e-input-wrapper-side e-non-week e-form-left e-hide-recurrence-element">
                        <div className="e-month-expander-label">Repeat On</div>
                        <div className="e-year-expander e-hide-recurrence-element">
                            <span
                                className="e-input-group e-control-wrapper e-ddl e-lib e-keyboard e-valid-input"
                                style={{ width: "100%" }}
                                tabIndex={0}
                                aria-label="dropdownlist"
                                aria-disabled="false"
                                role="combobox"
                                aria-expanded="false"
                                aria-live="polite"
                                aria-labelledby="ej2_dropdownlist_190_hidden"
                            >
                                <select
                                    aria-hidden="true"
                                    tabIndex={-1}
                                    className="e-ddl-hidden"
                                    aria-label="dropdownlist"
                                    name="null"
                                    id="ej2_dropdownlist_190_hidden"
                                >
                                    <option value="6">June</option>
                                </select>
                                <input
                                    className="e-year-expander-element e-control e-dropdownlist e-lib e-input"
                                    type="text"
                                    title="Year Expander"
                                    role="combobox"
                                    aria-expanded="false"
                                    id="ej2_dropdownlist_190"
                                    aria-label="dropdownlist"
                                    aria-disabled="false"
                                    tabIndex={-1}
                                    value="August"
                                />
                                <span className="e-input-group-icon e-ddl-icon e-search-icon"></span>
                            </span>
                        </div>
                        <div className="e-month-expander e-hide-recurrence-element">
                            <table
                                className="e-recurrence-table e-month-expand-wrapper"
                                role="none"
                            >
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className="e-input-wrapper e-month-expander-checkbox-wrapper">
                                                <div className="e-radio-wrapper e-wrapper">
                                                    <input
                                                        className="e-month-expander-element e-control e-radio e-lib"
                                                        title="Month Expander"
                                                        type="radio"
                                                        id="e-radio_192"
                                                        name="monthType"
                                                        value="day"
                                                    />
                                                    <label htmlFor="e-radio_192">
                                                        <span className="e-label">
                                                            Day
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </td>
                                        <td colSpan={2}>
                                            <div className="e-input-wrapper e-monthday-element">
                                                <span className="e-control-wrapper e-numeric e-input-group e-valid-input">
                                                    <input
                                                        type="text"
                                                        tabIndex={0}
                                                        id="_recurrence_editor_e-month-day"
                                                        className="e-month-day e-control e-numerictextbox e-lib e-input"
                                                        title="Repeat On"
                                                        role="spinbutton"
                                                        autoComplete="off"
                                                        aria-valuemin={1}
                                                        aria-valuemax={31}
                                                        aria-valuenow={23}
                                                        value="1"
                                                        aria-label="numerictextbox"
                                                    />
                                                    <input
                                                        type="text"
                                                        data-validatehidden="true"
                                                        aria-label="hidden"
                                                        className="e-numeric-hidden"
                                                        name="_recurrence_editor_e-month-day"
                                                        value="1"
                                                    />
                                                    <span
                                                        className="e-input-group-icon e-spin-down"
                                                        title="Decrement value"
                                                    ></span>
                                                    <span
                                                        className="e-input-group-icon e-spin-up"
                                                        title="Increment value"
                                                    ></span>
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="e-input-wrapper e-month-expander-checkbox-wrapper e-repeat-on-week-selector">
                                                <div className="e-radio-wrapper e-wrapper e-month-type">
                                                    <input
                                                        className="e-month-expander-wrapper e-control e-radio e-lib"
                                                        title="Month Expander"
                                                        type="radio"
                                                        id="e-radio_193"
                                                        name="monthType"
                                                        value="daypos"
                                                    />
                                                    <label htmlFor="e-radio_193">
                                                        <span className="e-label">
                                                            Month Expander
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="e-input-wrapper e-week-position">
                                                <span
                                                    className="e-input-group e-control-wrapper e-ddl e-lib e-keyboard e-valid-input"
                                                    style={{ width: "100%" }}
                                                    tabIndex={0}
                                                    aria-label="dropdownlist"
                                                    aria-disabled="false"
                                                    role="combobox"
                                                    aria-expanded="false"
                                                    aria-live="polite"
                                                    aria-labelledby="ej2_dropdownlist_188_hidden"
                                                >
                                                    <select
                                                        aria-hidden="true"
                                                        tabIndex={-1}
                                                        className="e-ddl-hidden"
                                                        aria-label="dropdownlist"
                                                        name="null"
                                                        id="ej2_dropdownlist_188_hidden"
                                                    >
                                                        <option value="4">
                                                            Fourth
                                                        </option>
                                                    </select>
                                                    <input
                                                        type="text"
                                                        className="e-month-pos e-control e-dropdownlist e-lib e-input"
                                                        title="Month Position"
                                                        role="combobox"
                                                        aria-expanded="false"
                                                        id="ej2_dropdownlist_188"
                                                        aria-label="dropdownlist"
                                                        aria-disabled="false"
                                                        tabIndex={-1}
                                                        value="Second"
                                                    />
                                                    <span className="e-input-group-icon e-ddl-icon e-search-icon"></span>
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="e-input-wrapper e-day-position">
                                                <span
                                                    className="e-input-group e-control-wrapper e-ddl e-lib e-keyboard e-valid-input"
                                                    style={{ width: "100%" }}
                                                    tabIndex={0}
                                                    aria-label="dropdownlist"
                                                    aria-disabled="false"
                                                    role="combobox"
                                                    aria-expanded="false"
                                                    aria-live="polite"
                                                    aria-labelledby="ej2_dropdownlist_189_hidden"
                                                >
                                                    <select
                                                        aria-hidden="true"
                                                        tabIndex={-1}
                                                        className="e-ddl-hidden"
                                                        aria-label="dropdownlist"
                                                        name="null"
                                                        id="ej2_dropdownlist_189_hidden"
                                                    >
                                                        <option value="WE">
                                                            Wednesday
                                                        </option>
                                                    </select>
                                                    <input
                                                        type="text"
                                                        className="e-month-week e-control e-dropdownlist e-lib e-input"
                                                        title="Month Week"
                                                        role="combobox"
                                                        aria-expanded="false"
                                                        id="ej2_dropdownlist_189"
                                                        aria-label="dropdownlist"
                                                        aria-disabled="false"
                                                        tabIndex={-1}
                                                        value="Monday"
                                                    />
                                                    <span className="e-input-group-icon e-ddl-icon e-search-icon"></span>
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="e-input-wrapper-side e-end-on e-form-right e-hide-recurrence-element">
                        <div className="e-input-wrapper e-end-on-left">
                            <div
                                className="e-float-input e-control-wrapper e-input-group e-ddl e-lib e-keyboard e-valid-input"
                                style={{ width: "100%" }}
                                tabIndex={0}
                                aria-label="dropdownlist"
                                aria-disabled="false"
                                role="combobox"
                                aria-expanded="false"
                                aria-live="polite"
                                aria-labelledby="ej2_dropdownlist_187_hidden"
                            >
                                <select
                                    aria-hidden="true"
                                    tabIndex={-1}
                                    className="e-ddl-hidden"
                                    aria-label="dropdownlist"
                                    name="null"
                                    id="ej2_dropdownlist_187_hidden"
                                >
                                    <option value="never">Never</option>
                                </select>
                                <input
                                    type="text"
                                    className="e-end-on-element e-control e-dropdownlist e-lib"
                                    title="End"
                                    role="combobox"
                                    aria-expanded="false"
                                    id="ej2_dropdownlist_187"
                                    aria-label="dropdownlist"
                                    aria-disabled="false"
                                    tabIndex={-1}
                                    value="Until"
                                    aria-labelledby="label_ej2_dropdownlist_187"
                                />
                                <span className="e-float-line"></span>
                                <label
                                    className="e-float-text e-label-top"
                                    id="label_ej2_dropdownlist_187"
                                >
                                    End
                                </label>
                                <span className="e-input-group-icon e-ddl-icon e-search-icon"></span>
                            </div>
                        </div>
                        <div className="e-input-wrapper e-end-on-date e-hide-recurrence-element">
                            <span
                                className="e-input-group e-control-wrapper e-date-wrapper e-valid-input"
                                style={{ width: "100%" }}
                            >
                                <input
                                    type="text"
                                    className="e-until-date e-control e-datepicker e-lib e-input e-keyboard"
                                    title="Until"
                                    id="ej2-datepicker_191"
                                    placeholder="Choose a date"
                                    name="ej2-datepicker_191"
                                    aria-atomic="true"
                                    aria-expanded="false"
                                    role="combobox"
                                    autoComplete="off"
                                    autoCorrect="off"
                                    autoCapitalize="none"
                                    spellCheck="false"
                                    aria-invalid="false"
                                    aria-label="datepicker"
                                    aria-disabled="false"
                                    tabIndex={0}
                                    value=""
                                />
                                <span
                                    className="e-clear-icon e-clear-icon-hide"
                                    aria-label="close"
                                    role="button"
                                ></span>
                                <span
                                    className="e-input-group-icon e-date-icon e-icons"
                                    aria-label="select"
                                    role="button"
                                ></span>
                            </span>
                        </div>
                        <div className="e-input-wrapper e-end-on-count e-hide-recurrence-element">
                            <span className="e-control-wrapper e-numeric e-input-group e-valid-input">
                                <input
                                    type="text"
                                    tabIndex={0}
                                    id="_recurrence_editor_e-recurrence-count"
                                    className="e-recurrence-count e-control e-numerictextbox e-lib e-input"
                                    title="Count"
                                    role="spinbutton"
                                    autoComplete="off"
                                    aria-valuemin={1}
                                    aria-valuemax={999}
                                    aria-valuenow={10}
                                    value="10"
                                    aria-label="numerictextbox"
                                />
                                <input
                                    type="text"
                                    data-validatehidden="true"
                                    aria-label="hidden"
                                    className="e-numeric-hidden"
                                    name="_recurrence_editor_e-recurrence-count"
                                    value="10"
                                />
                                <span
                                    className="e-input-group-icon e-spin-down"
                                    title="Decrement value"
                                ></span>
                                <span
                                    className="e-input-group-icon e-spin-up"
                                    title="Increment value"
                                ></span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Resources Row - Comité et Succursale */}
            <div className="e-resources-row">
                <div className="e-ComiteID-container e-resources">
                    <DropDownListComponent
                        id="ComiteID"
                        data-name="ComiteID"
                        className="e-ComiteID e-field"
                        placeholder="Choose Comité"
                        dataSource={comiteData}
                        fields={{ text: "Text", value: "Id" }}
                        value={props.ComiteID || null}
                        floatLabelType="Auto"
                    />
                </div>
            </div>

            {/* Description Row */}
            <div className="e-description-row">
                <div className="e-description-container">
                    <div className="e-float-input e-control-wrapper e-input-group e-multi-line-input">
                        <textarea
                            className="e-description e-field"
                            name="Description"
                            defaultValue={props.Description || ""}
                            id="Description"
                            aria-labelledby="label_Description"
                        />
                        <span className="e-float-line"></span>
                        <label
                            className="e-float-text e-label-top"
                            id="label_Description"
                            htmlFor="Description"
                        >
                            Description
                        </label>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div></div>
    );
};
