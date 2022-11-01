import { createSlice } from "@reduxjs/toolkit";


export const searchSlice = createSlice({
    name: "search",
    initialState: {
        results: [],
    },
    reducers: {
        onSearch: (state, action) => {
            state.results = action.payload;
        },
        onClearSearch: (state) => {
            state.results = [];
        }
    },
});

export const { onSearch, onClearSearch } = searchSlice.actions;
