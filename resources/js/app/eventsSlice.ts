import { createSlice } from "@reduxjs/toolkit";
import { Event } from "@/types/event";
import { eventsData } from "@/mocks/eventsData";

const initialState = {
    events: eventsData as Event[],
};

const eventsSlice = createSlice({
    name: "events",
    initialState,
    reducers: {
        setEvents: (state, action: { payload: Event[] }) => {
            state.events = action.payload;
        },
        addEvent: (state, action: { payload: Event }) => {
            state.events.push(action.payload);
        },
        removeEvent: (state, action: { payload: Event["Id"] }) => {
            state.events = state.events.filter(
                (event) => event.Id !== action.payload
            );
        },
    },
});

export const { setEvents, addEvent, removeEvent } = eventsSlice.actions;

export default eventsSlice.reducer;
