import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import consejoApi from "../api/consejoApi";
import {
    onAddNewAdmin,
    onAddNewCoord,
    onAddNewSuper,
    onAddNewVeedor,
    onDeleteCoord,
    onDeleteSuper,
    onDeleteVeedor,
    onSetActivateUser,
    onSetActivateVeedor,
    onUpdateCoord,
    onUpdateSuper,
    onUpdateVeedor,
} from "../store/auth/authSlice";
import { useAuthStore } from "./useAuthStore";

export const useConsejoStore = () => {
    const { activateUser, activateVeedor, juntas } = useSelector(
        (state) => state.auth
    );

    const { startProfile } = useAuthStore();

    const dispatch = useDispatch();

    const setActiveUser = (user) => {
        dispatch(
            onSetActivateUser({
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                dni: user.dni,
                phone: user.phone,
                canton_id: user.canton_id,
                roles: user.roles?.map((role) => role.id),
                email: user.email,
                canton_id: user.canton_id,
                parroquia_id: user.parroquias[0]?.id,
                recinto_id: 0,
            })
        );
    };

    const setActiveVeedor = (veedor) => {
        dispatch(
            onSetActivateVeedor({
                id: veedor.id,
                first_name: veedor.first_name,
                last_name: veedor.last_name,
                dni: veedor.dni,
                phone: veedor.phone,
                email: veedor.email,
                observacion: veedor.observacion,
                parroquia_id: veedor.parroquia_id,
                recinto_id: veedor.recinto_id,
                recinto__id: veedor.recinto__id,
            })
        );
    };

    const startSavingAdmin = async (user) => {
        try {
            if (user.id) {
                await consejoApi.post(`/update/usuarios/${user.id}`, user);
                dispatch(onUpdateAdmin({ ...user }));
                Swal.fire({
                    icon: "success",
                    title: "Actualizado con éxito!",
                    showConfirmButton: false,
                    timer: 1000,
                });
                return;
            }

            await consejoApi.post(`/create/usuarios`, user);
            dispatch(onAddNewAdmin({ ...user }));
            Swal.fire({
                icon: "success",
                title: "Creado con éxito!",
                showConfirmButton: false,
                timer: 1000,
            });

        } catch (error) {
            console.log(error);
            Swal.fire(
                "Error",
                JSON.stringify(error.response.data.errores),
                "error"
            );
        }
    };

    const startSavingSuper = async (user) => {
        try {
            if (user.id) {
                await consejoApi.post(`/update/usuarios/${user.id}`, user);
                dispatch(
                    onUpdateSuper({
                        ...user,
                    })
                );
                Swal.fire({
                    icon: "success",
                    title: "Actualizado con éxito!",
                    showConfirmButton: false,
                    timer: 1000,
                });
                return;
            }
            await consejoApi.post(`/create/usuarios/`, user);
            dispatch(
                onAddNewSuper({
                    ...user,
                })
            );
            Swal.fire({
                icon: "success",
                title: "Guardado con éxito!",
                showConfirmButton: false,
                timer: 1000,
            });
        } catch (error) {
            console.log(error);
            Swal.fire(
                "Error",
                JSON.stringify(error.response.data.errores),
                "error"
            );
        }
    };

    const startSavingCoord = async (user) => {
        try {
            if (user.id) {
                await consejoApi.post(`/update/usuarios/${user.id}`, user);
                console.log(user);

                dispatch(
                    onUpdateCoord({
                        ...user,
                    })
                );
                Swal.fire({
                    icon: "success",
                    title: "Actualizado con éxito!",
                    showConfirmButton: false,
                    timer: 1000,
                });
                return;
            }
            await consejoApi.post(`/create/usuarios/`, user);
            console.log(user);
            dispatch(
                onAddNewCoord({
                    ...user,
                })
            );
            Swal.fire({
                icon: "success",
                title: "Guardado con éxito!",
                showConfirmButton: false,
                timer: 1000,
            });
        } catch (error) {
            console.log(error);
            Swal.fire(
                "Error",
                JSON.stringify(error.response.data.errores),
                "error"
            );
        }
    };

    const startSavingVeedor = async (veedor) => {
        try {
            if (veedor.id) {
                await consejoApi.post(`/update/veedores/${veedor.id}`, veedor);
                dispatch(
                    onUpdateVeedor({
                        ...veedor,
                    })
                );
                Swal.fire({
                    icon: "success",
                    title: "Actualizado con éxito!",
                    showConfirmButton: false,
                    timer: 1000,
                });
                return;
            }
            await consejoApi.post(`/create/veedores/`, veedor);
            dispatch(
                onAddNewVeedor({
                    ...veedor,
                })
            );
            Swal.fire({
                icon: "success",
                title: "Creado con éxito!",
                showConfirmButton: false,
                timer: 1000,
            });
        } catch (error) {
            console.log(error);
            Swal.fire(
                "Error",
                JSON.stringify(error.response.data.errores),
                "error"
            );
        }
    };

    const startDeleteUser = async (user) => {
        Swal.fire({
            title: "¿Estas seguro de eliminarlo?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Si",
            denyButtonText: `No`,
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    consejoApi.post(`/delete/usuario/${user.id}`);
                    /* dispatch(onDeleteSuper()); */
                    Swal.fire("Eliminado!", "", "success");
                    startProfile();
                } catch (error) {
                    Swal.fire(
                        "Error!",
                        JSON.stringify(error.response.data.errores),
                        "error"
                    );
                }
            } else if (result.isDenied) {
                Swal.fire("Cambios no guardados", "", "info");
            }
        });
    };

    /* const startDeleteCoord = async () => {
        try {
            await consejoApi.post(`/delete/usuario/${activateUser.id}`);
            dispatch(onDeleteCoord());
        } catch (error) {
            console.log(error);
        }
    }; */

    const startDeleteVeedor = async (veedor) => {
        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`,
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    consejoApi.post(`/delete/veedor/${veedor.id}`);
                    Swal.fire("Saved!", "", "success");
                    startProfile();
                    /* dispatch(onDeleteVeedor()); */
                } catch (error) {
                    Swal.fire(
                        "Error!",
                        JSON.stringify(error.response.data.errores),
                        "error"
                    );
                }
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    };

    const setClearActivateUser = () => {
        dispatch(onSetActivateUser(null));
    };

    const setClearActivateVeedor = () => {
        dispatch(onSetActivateVeedor(null));
    };

    //PDF:
    const exportPDF = async () => {
        const response = await consejoApi.get("/pdf/veedores");
        const url = window.URL.createObjectURL(new Blob([response.data]));
        window.open(url, "_blank");
    };

    return {
        activateUser,
        activateVeedor,
        juntas,

        setActiveUser,
        setActiveVeedor,
        setClearActivateUser,
        setClearActivateVeedor,
        startSavingAdmin,
        startSavingSuper,
        startSavingCoord,
        startSavingVeedor,

        startDeleteUser,
        /*  startDeleteCoord, */
        startDeleteVeedor,
        exportPDF,
    };
};
