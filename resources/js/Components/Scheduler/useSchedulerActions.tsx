import { ActionEventArgs } from "@syncfusion/ej2-react-schedule";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { addEvents, updateEvents, removeEvents } from "@/app/eventsSlice";
import { Event } from "@/types/event";
import { create } from "domain";

export const useSchedulerActions = () => {
    const dispatch = useDispatch<AppDispatch>();

    const addRecurrenceException = (
        occurrence: Event,
        parent: Event
    ): Event => {
        // Convertit la date au format UTC compact
        const date = new Date(occurrence.StartTime);
        date.setDate(date.getDate() + 1);
        const utcException =
            date.getUTCFullYear().toString() +
            (date.getUTCMonth() + 1).toString().padStart(2, "0") +
            date.getUTCDate().toString().padStart(2, "0") +
            "T000000Z";
        // Ajoute l'exception au lieu de remplacer
        parent.RecurrenceException = parent.RecurrenceException
            ? `${parent.RecurrenceException},${utcException}`
            : utcException;

        return parent;
    };

    const removeRecurrenceException = (
        occurrence: Event,
        parent: Event
    ): Event => {
        const date = new Date(occurrence.StartTime);
        date.setDate(date.getDate() + 1);
        const utcException =
            date.getUTCFullYear().toString() +
            (date.getUTCMonth() + 1).toString().padStart(2, "0") +
            date.getUTCDate().toString().padStart(2, "0") +
            "T000000Z";
        console.log(
            "Removing exception for date:",
            occurrence.StartTime,
            date,
            utcException
        );

        // Enlève l'exception
        if (parent.RecurrenceException) {
            parent.RecurrenceException = parent.RecurrenceException.split(",")
                .filter((ex) => ex !== utcException)
                .join(",");
        }

        return parent;
    };

    const onActionBegin = (args: ActionEventArgs) => {
        console.log("Action begin:", args.requestType, args);
        //const argsData = Array.isArray(args.data) ? args.data[0] : args.data;
        // Annule l'action par défaut de Syncfusion pour gérer nous-mêmes la persistance
        if (
            args.requestType === "eventCreate" ||
            args.requestType === "eventChange" ||
            args.requestType === "eventRemove"
        )
            args.cancel = true;

        // Gestion des événements ajoutés
        if (
            args.requestType === "eventCreate" &&
            args.addedRecords &&
            args.addedRecords.length > 0
        ) {
            console.log("Événements ajoutés:", args.addedRecords);
            console.log(
                "Événements ajoutés:",
                Event.fromAny(args.addedRecords)
            );

            const events: Event[] = args.addedRecords.map((record) =>
                Event.fromAny(record)
            );
            dispatch(addEvents(events));
        }

        // Gestion des événements modifiés
        if (
            args.requestType === "eventChange" &&
            args.changedRecords &&
            args.changedRecords.length > 0
        ) {
            // Les événements simples
            if (args.data && !Array.isArray(args.data) && args.data.Id) {
                const events: Event[] = args.changedRecords.map((record) => {
                    const event = Event.fromAny(record);
                    event.RecurrenceID = undefined;
                    return event;
                });
                dispatch(updateEvents(events));
            }

            // Les occurrences d'événements récurrents
            if (
                args.data &&
                !Array.isArray(args.data) &&
                args.data.occurrence &&
                args.data.parent
            ) {
                const occurrence: Event = Event.fromAny(args.data.occurrence);
                let parent: Event = Event.fromAny(args.data.parent);
                console.log("occurence:", occurrence);
                parent = addRecurrenceException(occurrence, parent);
                occurrence.RecurrenceException = undefined; // L'occurrence n'a pas besoin de RecurrenceException récupéré du parent
                occurrence.RecurrenceRule = undefined; // L'occurrence n'a pas besoin de RecurrenceRule récupéré du parent
                console.log("parent:", parent);
                dispatch(updateEvents([parent]));
                dispatch(addEvents([occurrence]));
            }

            // Les événements récurrents et toute ses occurrences
            if (
                args.changedRecords &&
                Array.isArray(args.changedRecords) &&
                args.deletedRecords &&
                Array.isArray(args.deletedRecords) &&
                args.changedRecords.length > 0
            ) {
            }
        }
        /* 
        // Gestion des événements supprimés
        if (
            args.requestType === "eventRemove" &&
            args.deletedRecords &&
            args.deletedRecords.length > 0
        ) {
            // Les événements simples
            if (args.data && Array.isArray(args.data) && args.data[0].Id) {
                const eventIds = args.deletedRecords.map((record) => record.Id);
                dispatch(removeEvents(eventIds));
                console.log("Événements supprimés:", eventIds);
            }

            if (args.data && Array.isArray(args.data) && args.data[0].Id) {
                const eventIds = args.deletedRecords.map((record) => record.Id);
                dispatch(removeEvents(eventIds));
                console.log("Événements supprimés:", eventIds);
            }
        }*/
    };

    const onActionComplete = (args: ActionEventArgs) => {
        //     console.log("Action ended:", args.requestType, args);
    };

    return {
        onActionBegin,
        onActionComplete,
    };
};
