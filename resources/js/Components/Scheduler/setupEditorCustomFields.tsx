import { PopupOpenEventArgs } from "@syncfusion/ej2-react-schedule";
import { DropDownList } from "@syncfusion/ej2-dropdowns";
import { ComiteData } from "./datasource";

export const setupEditorCustomFields = (args: PopupOpenEventArgs): void => {
    if (args.type !== "Editor") return;

    console.log(args.data);

    /*
            const succursalIdContainer = args.element.querySelector(
                ".e-SuccursalID-container "
            );
                  if (succursalIdContainer) {
                // Supprime le dropdown existant
                succursalIdContainer.remove();
            }
             // Trouve le conteneur de location
          const locationContainer = args.element.querySelector(
                ".e-location-container"
            );
            if (locationContainer) {
                // Crée un nouveau conteneur pour le dropdown

                while (locationContainer.firstChild) {
                    locationContainer.removeChild(locationContainer.firstChild);
                }
                const dropdownContainer = document.createElement("div");
                dropdownContainer.className = "e-succursal-dropdown-container";
                locationContainer.appendChild(dropdownContainer);
                succursalIdContainer.appendTo(locationContainer);
                
                succursalDropdown.appendTo(dropdownContainer);
            }*/
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
            let container: HTMLElement = document.createElement("div");
            container.className = "e-ComiteID-container";
            let inputEle: HTMLInputElement = document.createElement("input");
            inputEle.className = "e-field";
            inputEle.setAttribute("name", "ComiteID");

            container.appendChild(inputEle);
            row.appendChild(container);
            let ComiteDropdown: DropDownList = new DropDownList({
                dataSource: ComiteData,
                fields: { text: "Text", value: "Id" },
                placeholder: "Choose Comite",
                floatLabelType: "Always",
                value: (args.data?.ComiteID ?? null) as string,
            });
            ComiteDropdown.appendTo(inputEle);
            inputEle.setAttribute("name", "ComiteID");
        }
    }
};
