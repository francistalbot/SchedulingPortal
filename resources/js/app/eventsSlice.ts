import { createSlice } from "@reduxjs/toolkit";
import { Event } from "@/types/event";
import { eventsData } from "@/mocks/eventsData";

const eventsSlice = createSlice({
    name: "events",
    initialState: {
        events: eventsData as Event[],
    },
    reducers: {
        setEvents: (state, action: { payload: Event[] }) => {
            state.events = action.payload;
        },
        addEvents: (state, action: { payload: Event[] }) => {
            action.payload.forEach((event) => {
                state.events.push(event);
                console.log("Événements ajouté:", action.payload);
            });
        },
        removeEvents: (state, action: { payload: Event["Id"][] }) => {
            action.payload.forEach((Id) => {
                state.events = state.events.filter((event) => event.Id !== Id);
            });
            console.log("Événements supprimés:", action.payload);
        },
        updateEvents: (state, action: { payload: Event[] }) => {
            action.payload.forEach((updatedEvent) => {
                const index = state.events.findIndex(
                    (event) => event.Id === updatedEvent.Id
                );
                if (index !== -1) {
                    state.events[index] = updatedEvent;
                }
            });
            console.log("Événements modifiés:", action.payload);
        },
    },
});

export const { setEvents, addEvents, removeEvents, updateEvents } =
    eventsSlice.actions;

export default eventsSlice.reducer;
