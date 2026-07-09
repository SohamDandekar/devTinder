import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
    name: "requests",
    initialState: null as Request[] | null,
    reducers: {
        addRequests: (state, action) => action.payload,
        removeRequest: (state, action) => {
            if (!state) return state;
            const newArray = state.filter((r:any) => r._id !== action.payload);
            return newArray;
        },
    }
});

export const {addRequests, removeRequest} = requestsSlice.actions;

export default requestsSlice.reducer;