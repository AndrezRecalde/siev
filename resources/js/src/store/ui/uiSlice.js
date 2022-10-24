import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
    name: "ui",
    initialState: {
        isOpenModalCreateAdmin: false,
        isOpenModalCreateSuper: false,
        isOpenModalCreateCoord: false,
        isOpenModalCreateVeedor: false,
    },
    reducers: {
        onOpenModalCreateAdmin: (state) => {
            state.isOpenModalCreateAdmin = true;
        },
        onCloseModalCreateAdmin: (state) => {
            state.isOpenModalCreateAdmin = false;
        },
        onOpenModalCreateSuper: (state) => {
            state.isOpenModalCreateSuper = true;
        },
        onCloseModalCreateSuper: (state) => {
            state.isOpenModalCreateSuper = false;
        },
        onOpenModalCreateCoord: (state) => {
            state.isOpenModalCreateCoord = true;
        },
        onCloseModalCreateCoord: (state) => {
            state.isOpenModalCreateCoord = false;
        },
        onOpenModalCreateVeedor: (state) => {
            state.isOpenModalCreateVeedor = true;
        },
        onCloseModalCreateVeedor: (state) => {
            state.isOpenModalCreateVeedor = false;
        },
    },
});

export const {
    onOpenModalCreateAdmin,
    onOpenModalCreateSuper,
    onOpenModalCreateCoord,
    onOpenModalCreateVeedor,

    onCloseModalCreateAdmin,
    onCloseModalCreateSuper,
    onCloseModalCreateCoord,
    onCloseModalCreateVeedor,
} = uiSlice.actions;
