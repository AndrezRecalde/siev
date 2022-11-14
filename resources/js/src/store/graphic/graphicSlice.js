import { createSlice } from "@reduxjs/toolkit";


export const graphicSlice = createSlice({
    name: "graphic",
    initialState: {
        grCantones: [],
        grParroquias: [],
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
        }
    },
});

export const { onGraphicCantones, onGraphicParroquias, onClearGraphicCantones, onClearGraphicParroquias } = graphicSlice.actions;
