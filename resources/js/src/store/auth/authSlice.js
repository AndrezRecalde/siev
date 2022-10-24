import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        status: "not-authenticated",
        user: {},
        profile: {},
        administradores: [],
        supervisores: [],
        coordinadores: [],
        veedores: [],
        errorMessage: undefined,
    },
    reducers: {
        checking: (state) => {
            state.status = "checking";
            state.user = {};
            state.errorMessage = undefined;
        },
        onLogin: (state, action) => {
            state.status = "authenticated";
            state.user = action.payload;
            state.errorMessage = undefined;
        },
        onLogout: (state, action) => {
            state.status = "not-authenticated";
            state.user = {},
            state.profile = {},
            state.administradores = [];
            state.supervisores = [];
            state.coordinadores = [];
            state.veedores = [];
            state.errorMessage = action.payload;
        },
        clearErrorMessage: (state) => {
            state.errorMessage = undefined;
        },
        onProfile: (state, action) => {
            state.profile = action.payload;
        },
        onAdministradores: (state, action) => {
            state.administradores = action.payload;
        },
        onSupervisores: (state, action) => {
            state.supervisores = action.payload;
        },
        onCoordinadores: (state, action) => {
            state.coordinadores = action.payload;
        },
        onVeedores: (state, action) => {
            state.veedores = action.payload;
        },
    },
});

export const {
    checking,
    onLogin,
    onLogout,
    clearErrorMessage,
    onProfile,
    onAdministradores,
    onSupervisores,
    onCoordinadores,
    onVeedores,
} = authSlice.actions;
