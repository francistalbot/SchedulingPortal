import { addEvents, removeEvents, updateEvents } from "@/app/eventsSlice";
import { DataManager, Query } from "@syncfusion/ej2-data";
import { store } from "@/app/store";
export class CustomDataManager extends DataManager {
    private dispatch = store.dispatch;
    constructor() {
        super();
    }

    executeQuery(query: any): Promise<any> {
        const events = store.getState().events.events;
        return new Promise((resolve) => {
            resolve({
                result: events,
                count: events.length,
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
