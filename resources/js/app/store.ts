// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import eventsSlice from "@/app/eventsSlice";
import assignmentsSlice from "@/app/assignmentsSlice"

export const store = configureStore({
    reducer: {
        events: eventsSlice,
        assignments: assignmentsSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
