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
        veeds: [],
        juntas: null,
        count_veed: null,

        activateUser: null,
        activateVeedor: null,
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
            state.juntas = null;
            state.count_veed = null;
            state.activateUser = null;
            state.activateVeedor = null;
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
        onVeeds: (state, action) => {
            state.veeds = action.payload;
        },
        onJuntas: (state, action) => {
            state.juntas = action.payload;
        },

        onCountVeed: (state, action) => {
            state.count_veed = action.payload;
        },

        //Activacion de Usuario
        onSetActivateUser: (state, action) => {
            state.activateUser = action.payload;
        },
        onSetActivateVeedor: (state, action) => {
            state.activateVeedor = action.payload;
        },

        //Metodos Crud
        onAddNewAdmin: (state, action) => {
            state.administradores.push(action.payload);
            state.activateUser = null;
        },
        onAddNewSuper: (state, action) => {
            state.supervisores.push(action.payload);
            state.activateUser = null;
        },
        onAddNewCoord: (state, action) => {
            state.coordinadores.push(action.payload);
            state.activateUser = null;
        },
        onAddNewVeedor: (state, action) => {
            state.veedores.push(action.payload);
            state.activateUser = null;
        },
        onUpdateAdmin: (state, action) => {
            state.administradores = state.administradores.map( admin => {
                if(admin.id === action.payload.id){
                    return action.payload;
                }
                return admin;
            })
        },
        onUpdateSuper: (state, action) => {
            state.supervisores = state.supervisores.map( supervisor => {
                if(supervisor.id === action.payload.id) {
                    return action.payload;
                }
                return supervisor;
            })
        },
        onUpdateCoord: (state, action) => {
            state.coordinadores = state.coordinadores.map( coord => {
                if(coord.id === action.payload.id) {
                    return action.payload;
                }
                return coord;
            })
        },

        onUpdateVeedor: (state, action) => {
            state.veedores = state.veedores.map( veedor => {
                if(veedor.id === action.payload.id){
                    return action.payload;
                }
                return veedor;
            })
        },


        onDeleteAdmin: (state) => {
            if(state.activateUser){
                state.administradores = state.administradores.filter( admin => admin.id !== state.activateUser.id );
                state.activateUser = null;
            }
        },
        onDeleteSuper: (state) => {
            if(state.activateUser){
                state.administradores = state.administradores.filter( admin => admin.id !== state.activateUser.id );
                state.activateUser = null;
            }
        },
        onDeleteCoord: (state) => {
            if(state.activateUser){
                state.administradores = state.administradores.filter( admin => admin.id !== state.activateUser.id );
                state.activateUser = null;
            }
        },
        onDeleteVeedor: (state) => {
            if(state.activateUser){
                state.administradores = state.administradores.filter( admin => admin.id !== state.activateUser.id );
                state.activateUser = null;
            }
        },

        onClearVeedsxRecinto: (state) => {
            state.veeds = [];
        }

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
    onVeeds,
    onJuntas,
    onCountVeed,

    onSetActivateUser,
    onSetActivateVeedor,
    onAddNewAdmin,
    onAddNewSuper,
    onAddNewCoord,
    onAddNewVeedor,

    onUpdateAdmin,
    onUpdateSuper,
    onUpdateCoord,
    onUpdateVeedor,

    onDeleteAdmin,
    onDeleteSuper,
    onDeleteCoord,
    onDeleteVeedor,

    onClearVeedsxRecinto


} = authSlice.actions;
