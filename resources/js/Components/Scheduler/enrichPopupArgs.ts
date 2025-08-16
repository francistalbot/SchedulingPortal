import { PopupOpenEventArgs } from "@syncfusion/ej2-react-schedule";
import { RootState } from "@/app/store";
import {
    selectSuccursales,
    selectPostes,
    selectComites,
} from "@/app/selectors";
import type { Event } from "@/types/event";
import type { Comite, Poste, Succursale } from "@/types/referenceData";

// Interface pour les arguments enrichis de l'Editor
export interface EnrichedEditorArgs extends PopupOpenEventArgs {
    comites: Comite[];
    postes: Poste[];
    succursales: Succursale[];
}

// Fonction d'enrichissement pour l'Editor Template
export const enrichEditorArgs = (
    args: PopupOpenEventArgs,
    state: RootState
): EnrichedEditorArgs => {
    // Récupérer toutes les listes de référence pour les dropdowns
    const comites = selectComites(state);
    const postes = selectPostes(state);
    const succursales = selectSuccursales(state);

    return {
        ...args,
        comites,
        postes,
        succursales,
    };
};

// Fonction d'enrichissement pour le QuickInfo Template
export const enrichQuickInfoProps = (
    props: { [key: string]: any },
    state: RootState
) => {
    if (props.elementType == "cell") return props;
    const eventData = props as Event;

    // Récupérer toutes les listes de référence
    const comites = selectComites(state);
    const postes = selectPostes(state);
    const succursales = selectSuccursales(state);

    // Trouver les entités spécifiques à l'événement
    const comite = eventData.ComiteID
        ? comites.find((c) => c.Id === eventData.ComiteID)
        : undefined;
    const succursale = eventData.SuccursalID
        ? succursales.find((s) => s.Id === eventData.SuccursalID)
        : undefined;
    const eventPostes = eventData.PosteIDs
        ? postes.filter((p) => eventData.PosteIDs!.includes(p.Id))
        : [];
    return {
        ...props,
        comite,
        succursale,
        eventPostes,
    };
};
