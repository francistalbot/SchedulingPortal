import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Event } from "@/types/event";

// Sélecteurs de base
export const selectEvents = (state: RootState) => state.events.events;
export const selectAssignments = (state: RootState) =>
    state.assignments.assignments;
export const selectSuccursales = (state: RootState) =>
    state.referenceData.succursales;
export const selectComites = (state: RootState) => state.referenceData.comites;
export const selectPostes = (state: RootState) => state.referenceData.postes;
export const selectBenevoles = (state: RootState) =>
    state.referenceData.benevoles;
