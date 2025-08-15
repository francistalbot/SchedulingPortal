// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import eventsSlice from "@/app/eventsSlice";
import assignmentsSlice from "@/app/assignmentsSlice";
import referenceDataSlice from "@/app/referenceDataSlice";

export const store = configureStore({
    reducer: {
        events: eventsSlice,
        assignments: assignmentsSlice,
        referenceData: referenceDataSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
