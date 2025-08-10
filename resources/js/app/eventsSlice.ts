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
            console.log("addEvent:", action.payload);
            action.payload.forEach(event => {
                state.events.push(event)
            });
        },
        removeEvents: (state, action: { payload: Event["Id"][] }) => {
            action.payload.forEach(
                Id => {
                    state.events = state.events.filter(
                        (event) => event.Id !== Id
                    );
                }
            )
        },
    },
});

export const { setEvents, addEvents, removeEvents } = eventsSlice.actions;

export default eventsSlice.reducer;
