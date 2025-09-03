import { addEvents, removeEvents, updateEvents } from "@/app/eventsSlice";
import { DataManager, Query } from "@syncfusion/ej2-data";
import { store } from "@/app/store";
import { ReferenceDataState } from "@/types/referenceData";
import { Assignment } from "@/types/assignment";
import {
    addAssignments,
    updateAssignments,
    removeAssignments,
} from "@/app/assignmentsSlice";
export class CustomDataManager extends DataManager {
    private static instance: CustomDataManager;
    private dispatch = store.dispatch;

    constructor() {
        super();
    }

    public static getInstance(): CustomDataManager {
        if (!CustomDataManager.instance) {
            CustomDataManager.instance = new CustomDataManager();
        }
        return CustomDataManager.instance;
    }

    executeQuery(query: any): Promise<any> {
        if (query && query.tableName === "assignments") {
            const startDateParam = query.params.find(
                (p: any) => p.key === "StartDate"
            );
            const eventIdParam = query.params.find(
                (p: any) => p.key === "EventId"
            );
            const startDate = new Date(startDateParam.value);
            const eventId = eventIdParam.value;
            const getAssignments = store.getState().assignments.assignments;
            const filteredAssignments = getAssignments.filter(
                (assignment: any) => {
                    return (
                        assignment.EventID === eventId &&
                        new Date(
                            assignment.StartDate.toString()
                        ).getFullYear() === new Date(startDate).getFullYear() &&
                        new Date(assignment.StartDate.toString()).getMonth() ===
                            new Date(startDate).getMonth() &&
                        new Date(assignment.StartDate.toString()).getDate() ===
                            new Date(startDate).getDate()
                    );
                }
            );
            return new Promise((resolve) => {
                resolve({
                    result: filteredAssignments,
                    count: filteredAssignments.length,
                });
            });
        }

        const allEvents = store.getState().events.events;
        let filteredEvents = allEvents;

        // Renvoi les événements seulement dans la plage de date
        if (query && query.params) {
            const startDateParam = query.params.find(
                (p: any) => p.key === "StartDate"
            );
            const endDateParam = query.params.find(
                (p: any) => p.key === "EndDate"
            );
            const startDate = new Date(startDateParam.value);
            const endDate = new Date(endDateParam.value);
            if (startDate && endDate) {
                // Filtre les événements dans la plage de dates
                filteredEvents = allEvents.filter((event) => {
                    const eventStart = new Date(event.StartTime);
                    const eventEnd = new Date(event.EndTime);

                    //Renvoi l'événement s'il est récurrent et commence avant la plage
                    if (event.RecurrenceRule && eventStart < endDate) {
                        return true;
                    }
                    // ou si l'événement se trouve dans la plage
                    return eventStart < endDate && eventEnd > startDate;
                });
            }
        }
        return new Promise((resolve) => {
            resolve({
                result: filteredEvents,
                count: filteredEvents.length,
            });
        });
    }

    // Force l'override de ces méthodes
    saveChanges(changes: any, key?: string, tableName?: string): Promise<any> {
        console.log("saveChanges called with:", changes, key, tableName);

        if (tableName === "assignments") {
            return this.saveAssignmentChanges(changes);
        } else {
            return this.saveEventChanges(changes);
        }
    }
    private saveEventChanges(changes: any): Promise<any> {
        if (changes.addedRecords && changes.addedRecords.length > 0) {
            changes.addedRecords.forEach((record: any) => {
                const newEvent = {
                    ...record,
                    StartTime: new Date(record.StartTime).toISOString(),
                    EndTime: new Date(record.EndTime).toISOString(),
                };
                this.dispatch(addEvents([newEvent]));
            });
        }
        if (changes.changedRecords && changes.changedRecords.length > 0) {
            changes.changedRecords.forEach((record: any) => {
                const updatedEvent = {
                    ...record,
                    StartTime: new Date(record.StartTime).toISOString(),
                    EndTime: new Date(record.EndTime).toISOString(),
                };
                this.dispatch(updateEvents([updatedEvent]));
            });
        }
        if (changes.deletedRecords && changes.deletedRecords.length > 0) {
            changes.deletedRecords.forEach((record: any) => {
                this.dispatch(removeEvents([record.Id]));
            });
        }
        return Promise.resolve(changes);
    }
    private saveAssignmentChanges(changes: any): Promise<any> {
        if (changes.addedRecords && changes.addedRecords.length > 0) {
            this.dispatch(addAssignments(changes.addedRecords));
        }
        if (changes.changedRecords && changes.changedRecords.length > 0) {
            this.dispatch(updateAssignments(changes.changedRecords));
        }
        if (changes.deletedRecords && changes.deletedRecords.length > 0) {
            const idsToDelete = changes.deletedRecords.map((record: any) => {
                console.log("Removing assignment with ID:", record);
                return record.Id;
            });
            console.log("Removing assignments:", idsToDelete);
            this.dispatch(removeAssignments(idsToDelete));
        }
        return Promise.resolve(changes);
    }

    getReferenceData(): ReferenceDataState {
        return store.getState().referenceData;
    }

    getAssignments(): Assignment[] {
        return store.getState().assignments.assignments;
    }

    getAssignmentsByEventId(eventId: string | number): Assignment[] {
        return this.getAssignments().filter(
            (assignment) => assignment.EventID === eventId
        );
    }
}
