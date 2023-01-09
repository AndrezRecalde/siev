import { createSlice } from "@reduxjs/toolkit";


export const graphicSlice = createSlice({
    name: "graphic",
    initialState: {
        grCantones: [],
        grParroquias: [],
        grRecintos: []
    },
    reducers: {
        onGraphicCantones: (state, action) => {
            state.grCantones = action.payload;
        },
        onClearGraphicCantones: (state) => {
            state.grCantones = []
        },
        onGraphicParroquias: (state, action) => {
            state.grParroquias = action.payload;
        },
        onClearGraphicParroquias: (state) => {
            state.grParroquias = []
        },
        onGraphicRecintos: (state, action) => {
            state.grRecintos = action.payload;
        },
        onClearGraphicRecintos: (state) => {
            state.grRecintos = []
        },
    },
});

export const { onGraphicCantones, onGraphicParroquias, onClearGraphicCantones, onClearGraphicParroquias, onGraphicRecintos, onClearGraphicRecintos } = graphicSlice.actions;
