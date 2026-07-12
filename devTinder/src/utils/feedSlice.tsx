import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null as Request[] | null,
    reducers: {
        addFeed: (state, action) => {
            return action.payload;            
        },
        removeUserFromFeed: (state, action) => {
            if (!state) return state;
            return state.filter((card:any) => card._id !== action.payload);           
        },
    }
});

export const {addFeed, removeUserFromFeed} = feedSlice.actions;

export default feedSlice.reducer;