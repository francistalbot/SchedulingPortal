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
            action.payload.forEach(assignment => {
                state.assignments.push(assignment)
            });
        },
        removeAssignments: (state, action: { payload: Assignment["Id"][] }) => {
            action.payload.forEach(
                Id => {
                    state.assignments = state.assignments.filter(
                        (assignment) => assignment.Id !== Id
                    );
                }
            )
        },
    },
});

export const { setAssignments, addAssignments, removeAssignments } = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
