import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    succursalData,
    comiteData,
    posteData,
    benevoleData,
} from "@/mocks/referenceData";
import { Benevole, Comite, Poste, Succursale } from "@/types/referenceData";

const referenceDataSlice = createSlice({
    name: "referenceData",
    initialState: {
        succursales: succursalData,
        comites: comiteData,
        postes: posteData,
        benevoles: benevoleData,
    },
    reducers: {
        setSuccursales: (state, action: PayloadAction<Succursale[]>) => {
            state.succursales = action.payload;
        },
        setComites: (state, action: PayloadAction<Comite[]>) => {
            state.comites = action.payload;
        },
        setPostes: (state, action: PayloadAction<Poste[]>) => {
            state.postes = action.payload;
        },
        setBenevoles: (state, action: PayloadAction<Benevole[]>) => {
            state.benevoles = action.payload;
        },
        // Actions pour ajouter/modifier/supprimer individuellement
        addBenevole: (state, action: PayloadAction<Benevole>) => {
            state.benevoles.push(action.payload);
        },
        updateBenevole: (state, action: PayloadAction<Benevole>) => {
            const index = state.benevoles.findIndex(
                (b) => b.Id === action.payload.Id
            );
            if (index !== -1) {
                state.benevoles[index] = action.payload;
            }
        },
        removeBenevole: (state, action: PayloadAction<number>) => {
            state.benevoles = state.benevoles.filter(
                (b) => b.Id !== action.payload
            );
        },
        addPoste: (state, action: PayloadAction<Poste>) => {
            state.postes.push(action.payload);
        },
        updatePoste: (state, action: PayloadAction<Poste>) => {
            const index = state.postes.findIndex(
                (p) => p.Id === action.payload.Id
            );
            if (index !== -1) {
                state.postes[index] = action.payload;
            }
        },
        removePoste: (state, action: PayloadAction<number>) => {
            state.postes = state.postes.filter((p) => p.Id !== action.payload);
        },
    },
});

export const {
    setSuccursales,
    setComites,
    setPostes,
    setBenevoles,
    addBenevole,
    updateBenevole,
    removeBenevole,
    addPoste,
    updatePoste,
    removePoste,
} = referenceDataSlice.actions;

export default referenceDataSlice.reducer;
