import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
    name: "ui",
    initialState: {
        isOpenModalCreateAdmin: false,
        isOpenModalCreateSuper: false,
        isOpenModalCreateCoord: false,
        isOpenModalCreateCoordxAdmin: false,
        isOpenModalCreateVeedor: false,
        isOpenModalCreateVeedorGrant: false
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
        onOpenModalCreateCoordxAdmin: (state) => {
            state.isOpenModalCreateCoordxAdmin = true;
        },
        onCloseModalCreateCoordxAdmin: (state) => {
            state.isOpenModalCreateCoordxAdmin = false;
        },
        onOpenModalCreateVeedor: (state) => {
            state.isOpenModalCreateVeedor = true;
        },
        onCloseModalCreateVeedor: (state) => {
            state.isOpenModalCreateVeedor = false;
        },
        onOpenModalCreateVeedorGrant: (state) => {
            state.isOpenModalCreateVeedorGrant = true;
        },
        onCloseModalCreateVeedorGrant: (state) => {
            state.isOpenModalCreateVeedorGrant = false;
        }
    },
});

export const {
    onOpenModalCreateAdmin,
    onOpenModalCreateSuper,
    onOpenModalCreateCoord,
    onOpenModalCreateCoordxAdmin,
    onCloseModalCreateCoordxAdmin,
    onOpenModalCreateVeedor,
    onOpenModalCreateVeedorGrant,
    onCloseModalCreateVeedorGrant,

    onCloseModalCreateAdmin,
    onCloseModalCreateSuper,
    onCloseModalCreateCoord,
    onCloseModalCreateVeedor,
} = uiSlice.actions;
