import { useDispatch, useSelector } from "react-redux";
import consejoApi from "../api/consejoApi";
import {
    checking,
    clearErrorMessage,
    onAdministradores,
    onCoordinadores,
    onLogin,
    onLogout,
    onProfile,
    onSupervisores,
    onVeedores,
} from "../store/auth/authSlice";

export const useAuthStore = () => {
    const { status, user, profile, administradores, supervisores, coordinadores, veedores, errorMessage } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({ dni, password }) => {
        console.log({ dni, password });
        dispatch(checking());

        try {
            const { data } = await consejoApi.post("/auth/login", {
                dni,
                password,
            });

            localStorage.setItem("token", data.access_token);
            localStorage.setItem("token-init-date", new Date().getTime());
            dispatch(
                onLogin({
                    dni: data.user.dni,
                    first_name: data.user.first_name,
                    last_name: data.user.last_name,
                    phone: data.user.phone,
                    email: data.user.email,
                    roles: data.user.roles.map((role) => role.name),
                })
            );
        } catch (error) {
            console.log(error);
            dispatch(onLogout("Credenciales incorrectas"));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const startProfile = async () => {
        console.log(localStorage.getItem("token"))
        try {
            const { data } = await consejoApi.get("/profile");
            dispatch(
                onProfile({
                    dni: data.profile.dni,
                    first_name: data.profile.first_name,
                    last_name: data.profile.last_name,
                    phone: data.profile.phone,
                    email: data.profile.email,
                    canton: data.profile.canton.nombre_canton,
                    parroquias: data.profile.parroquias.map(parroquia => parroquia.nombre_parroquia),
                    recintos: data.profile.recintos.map(recinto => recinto.nombre_recinto),
                    roles: data.profile.roles.map((role) => role.name),
                    responsable: data.profile.first_name
                })
            );

            /* if((data.user.roles[0].name === ('Administrador'))){

                dispatch(
                    onAdministradores(data.administradores)
                )
                dispatch(
                    onSupervisores(data.supervisores)
                )
                dispatch(
                    onCoordinadores(data.coordinadores)
                )
            } else if((data.user.roles[0].name === ('Supervisor'))){

                dispatch(
                    onCoordinadores(data.coordinadores)
                )
            } else if((data.user.roles[0].name === ('Coordinador'))) {
                dispatch(
                    onVeedores(data.veedores)
                )
            } */
        } catch (error) {
            console.log(error);
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    }

    return {
        status,
        user,
        administradores,
        supervisores,
        coordinadores,
        veedores,
        profile,
        errorMessage,

        startLogin,
        startLogout,
        startProfile,
    };
};
