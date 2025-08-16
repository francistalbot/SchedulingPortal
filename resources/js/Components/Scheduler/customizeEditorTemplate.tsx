import { DropDownList, MultiSelect } from "@syncfusion/ej2-dropdowns";
import { EnrichedEditorArgs } from "./enrichPopupArgs";

export const customizeEditorTemplate = (args: EnrichedEditorArgs): void => {
    // Move SuccursalID container to the Location container
    if (args.element.querySelector(".e-resources-row")) {
        const succursalIdContainer = args.element.querySelector(
            ".e-SuccursalID-container "
        );
        if (succursalIdContainer) {
            const locationContainer = args.element.querySelector(
                ".e-location-container"
            );
            if (locationContainer) {
                while (locationContainer.firstChild) {
                    locationContainer.removeChild(locationContainer.firstChild);
                }
                locationContainer.appendChild(succursalIdContainer);
            }
        }
    }

    // Create Comite and Poste dropdowns
    if (!args.element.querySelector(".custom-field-row")) {
        let row: HTMLElement = document.createElement("div");
        row.className = "custom-field-row";
        const formElement = args.element.querySelector(
            ".e-schedule-form"
        ) as HTMLElement | null;
        if (
            formElement &&
            formElement.firstChild &&
            (formElement.firstChild as HTMLElement).insertBefore
        ) {
            formElement.firstChild.insertBefore(
                row,
                (formElement.firstChild as HTMLElement).firstChild
            );

            // Comité dropdown
            let containerComiteId: HTMLElement = document.createElement("div");
            containerComiteId.className = "e-ComiteID-container";
            let inputEleComiteId: HTMLInputElement =
                document.createElement("input");
            inputEleComiteId.className = "e-field";
            inputEleComiteId.setAttribute("name", "CID");
            containerComiteId.appendChild(inputEleComiteId);
            row.appendChild(containerComiteId);
            let ComiteDropdown: DropDownList = new DropDownList({
                dataSource: args.comites as any,
                fields: { text: "Name", value: "Id" },
                placeholder: "Choose Comite",
                floatLabelType: "Always",
                value: args.data?.ComiteID ?? null,
            });
            ComiteDropdown.appendTo(inputEleComiteId);
            inputEleComiteId.setAttribute("name", "ComiteID");

            // Postes multi-select
            let containerPosteIds: HTMLElement = document.createElement("div");
            containerPosteIds.className = "e-PosteIDs-container";
            let inputElePosteIds: HTMLInputElement =
                document.createElement("input");
            inputElePosteIds.className = "e-field";
            inputElePosteIds.setAttribute("name", "PIDs");
            containerPosteIds.appendChild(inputElePosteIds);
            row.appendChild(containerPosteIds);
            let PosteMultiSelect: MultiSelect = new MultiSelect({
                dataSource: args.postes as any,
                fields: { text: "Name", value: "Id" },
                placeholder: "Choose Postes",
                floatLabelType: "Always",
                mode: "Box",
                value: args.data?.PosteIDs ?? [],
                showClearButton: true,
                showDropDownIcon: true,
                allowCustomValue: false,
            });
            PosteMultiSelect.appendTo(inputElePosteIds);
            inputElePosteIds.setAttribute("name", "PosteIDs");
        }
    }
};
