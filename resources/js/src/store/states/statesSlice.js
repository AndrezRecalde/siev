import { createSlice } from "@reduxjs/toolkit";


export const statesSlice = createSlice({
    name: "state",
    initialState: {
        cantones: [],
        parroquias: [],
        recintos: [],
    },
    reducers: {
        onLoadCantones: (state, action) => {
            state.cantones = action.payload;
        },
        onLoadParroquias: (state, action) => {
            state.parroquias = action.payload;
        },
        onLoadRecintos: (state, action) => {
            state.recintos = action.payload;
        },
    },
});

export const { onLoadCantones, onLoadParroquias, onLoadRecintos } = statesSlice.actions;
