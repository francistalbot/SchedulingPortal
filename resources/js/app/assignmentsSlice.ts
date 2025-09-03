import { createSlice } from "@reduxjs/toolkit";
import { Assignment } from "@/types/assignment";
import { assignmentData } from "@/mocks/assignmentData";

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState: {
        assignments: assignmentData as Assignment[],
    },
    reducers: {
        setAssignments: (state, action: { payload: Assignment[] }) => {
            state.assignments = action.payload;
        },
        addAssignments: (state, action: { payload: Assignment[] }) => {
            action.payload.forEach((assignment) => {
                if (!assignment.Id)
                    assignment.Id =
                        Math.max(...state.assignments.map((a) => a.Id), 0) + 1;
                state.assignments.push({ ...assignment });
            });
        },
        updateAssignments: (state, action: { payload: Assignment[] }) => {
            action.payload.forEach((updatedAssignment) => {
                const index = state.assignments.findIndex(
                    (assignment) => assignment.Id === updatedAssignment.Id
                );
                if (index !== -1) {
                    console.log(
                        "Updating assignment:",
                        JSON.parse(JSON.stringify(state.assignments))
                    );
                    state.assignments[index] = {
                        ...updatedAssignment,
                    };
                }
            });
        },
        removeAssignments: (state, action: { payload: Assignment["Id"][] }) => {
            action.payload.forEach((Id) => {
                state.assignments = state.assignments.filter(
                    (assignment) => assignment.Id !== Id
                );
            });
        },
    },
});

export const {
    setAssignments,
    addAssignments,
    removeAssignments,
    updateAssignments,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
