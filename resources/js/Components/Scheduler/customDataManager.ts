import { addEvents, removeEvents, updateEvents } from "@/app/eventsSlice";
import { DataManager, Query } from "@syncfusion/ej2-data";
import { store } from "@/app/store";
export class CustomDataManager extends DataManager {
    private dispatch = store.dispatch;
    constructor() {
        super();
    }

    executeQuery(query: any): Promise<any> {
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
}
