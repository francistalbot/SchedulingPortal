import { PopupOpenEventArgs } from "@syncfusion/ej2-react-schedule";
import { DropDownList, MultiSelect } from "@syncfusion/ej2-dropdowns";
import { comiteData, posteData } from "./datasource";

export const customizeEditorTemplate = (args: PopupOpenEventArgs): void => {
    console.log(args);
    if (args.type !== "Editor") return;
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
            let containerComiteId: HTMLElement = document.createElement("div");
            containerComiteId.className = "e-ComiteID-container";
            let inputEleComiteId: HTMLInputElement =
                document.createElement("input");
            inputEleComiteId.className = "e-field";
            inputEleComiteId.setAttribute("name", "ComiteID");

            containerComiteId.appendChild(inputEleComiteId);
            row.appendChild(containerComiteId);
            let ComiteDropdown: DropDownList = new DropDownList({
                dataSource: comiteData,
                fields: { text: "Name", value: "Id" },
                placeholder: "Choose Comite",
                floatLabelType: "Always",
                value: (args.data?.ComiteID ?? null) as string,
            });
            ComiteDropdown.appendTo(inputEleComiteId);
            inputEleComiteId.setAttribute("name", "ComiteID");

            let containerPosteId: HTMLElement = document.createElement("div");
            containerPosteId.className = "e-PosteID-container";
            let inputElePosteId: HTMLInputElement =
                document.createElement("input");
            inputElePosteId.className = "e-field";
            inputElePosteId.setAttribute("name", "PosteID");

            containerPosteId.appendChild(inputElePosteId);
            row.appendChild(containerPosteId);
            let PosteMultiSelect: MultiSelect = new MultiSelect({
                dataSource: posteData,
                fields: { text: "Name", value: "Id" },
                placeholder: "Choose Postes",
                floatLabelType: "Always",
                mode: "Box", // Affiche les sélections sous forme de chips/tags
                value: args.data?.PosteIDs ?? [], // Utilise un tableau pour les valeurs multiples
                showClearButton: true,
                showDropDownIcon: true,
                allowCustomValue: false, // Permet la saisie de valeurs personnalisées
            });
            PosteMultiSelect.appendTo(inputElePosteId);
            inputElePosteId.setAttribute("name", "PosteID"); /* */
        }
    }
};
