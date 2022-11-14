import { useDispatch, useSelector } from "react-redux";
import consejoApi from "../api/consejoApi";
import {
    checking,
    clearErrorMessage,
    onAdministradores,
    onCoordinadores,
    onCountVeed,
    onJuntas,
    onLogin,
    onLogout,
    onProfile,
    onSupervisores,
    onVeedores,
} from "../store/auth/authSlice";
import { onClearStates } from "../store/states/statesSlice";

export const useAuthStore = () => {
    const {
        status,
        user,
        profile,
        administradores,
        supervisores,
        coordinadores,
        veedores,
        juntas,
        errorMessage,
    } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({ dni, password }) => {
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
            dispatch(onLogout("Credenciales incorrectas"));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    };

    const startProfile = async () => {
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
                    parroquias: data.profile.parroquias.map(
                        (parroquia) => parroquia.nombre_parroquia
                    ),
                    recintos: data.profile.recintos.map((recinto) => {
                        return [
                            recinto.id,
                            recinto.nombre_recinto,
                            recinto.num_juntas,
                        ];
                    }),
                    roles: data.profile.roles.map((role) => role.name),
                    responsable: data.profile.user.first_name,
                })
            );

            if (data.profile.roles[0].name === "Administrador") {
                dispatch(onAdministradores(data.administradores));
                dispatch(onSupervisores(data.supervisores));
                dispatch(onCoordinadores(data.coordinadores));
                dispatch(onVeedores(data.veedores));
                dispatch(onJuntas(data.juntas));
            } else if (data.profile.roles[0].name === "Supervisor") {
                dispatch(onCoordinadores(data.coordinadores));
                dispatch(onVeedores(data.veedores));
                dispatch(onJuntas(data.juntas));
            } else if (data.profile.roles[0].name === "Coordinador") {
                dispatch(onVeedores(data.veedores));
                dispatch(onJuntas(data.juntas));
                dispatch(onCountVeed(data.count_veed));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const checkAuthToken = async () => {
        const token = localStorage.getItem("token");

        if (!token) return dispatch(onLogout());

        try {
            const { data } = await consejoApi.get("/refresh");
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
            startProfile();
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    };

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
        dispatch(onClearStates());
    };

    return {
        status,
        user,
        administradores,
        supervisores,
        coordinadores,
        veedores,
        juntas,
        profile,
        errorMessage,

        startLogin,
        startLogout,
        startProfile,
        checkAuthToken,
    };
};
