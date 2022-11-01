import { createSlice } from "@reduxjs/toolkit";


export const statesSlice = createSlice({
    name: "state",
    initialState: {
        cantones: [],
        parroquias: [],
        allParroquias: [],
        recintos: [],
        allRecintos: [],
        roles: [],
    },
    reducers: {
        onLoadCantones: (state, action) => {
            state.cantones = action.payload;
        },
        onLoadParroquias: (state, action) => {
            state.parroquias = action.payload;
        },
        onLoadAllParroquias: (state, action) => {
            state.allParroquias = action.payload;
        },
        onLoadRecintos: (state, action) => {
            state.recintos = action.payload;
        },
        onLoadAllRecintos: (state, action) => {
            state.allRecintos = action.payload;
        },
        onClearStates: (state) => {
            state.parroquias = [];
            state.recintos = [];
        },
        onLoadRoles: (state, action) => {
            state.roles = action.payload;
        },

    },
});

export const { onLoadCantones, onLoadParroquias, onLoadAllParroquias, onLoadRecintos, onLoadAllRecintos, onClearStates, onLoadRoles } = statesSlice.actions;
