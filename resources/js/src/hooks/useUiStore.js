import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { onSetActivateUser } from "../store/auth/authSlice";
import {
    onCloseModalCreateAdmin,
    onCloseModalCreateCoord,
    onCloseModalCreateSuper,
    onCloseModalCreateVeedor,
    onOpenModalCreateAdmin,
    onOpenModalCreateCoord,
    onOpenModalCreateCoordxAdmin,
    onCloseModalCreateCoordxAdmin,
    onOpenModalCreateSuper,
    onOpenModalCreateVeedor,
    onOpenModalCreateVeedorGrant,
    onCloseModalCreateVeedorGrant,
} from "../store/ui/uiSlice";

export const useUiStore = () => {
    const {
        isOpenModalCreateAdmin,
        isOpenModalCreateSuper,
        isOpenModalCreateCoord,
        isOpenModalCreateCoordxAdmin,
        isOpenModalCreateVeedor,
        isOpenModalCreateVeedorGrant

    } = useSelector((state) => state.ui);

    const dispatch = useDispatch();

    const modalActionAdmin = (behavior) => {
        if (behavior === "open") {
            dispatch(onOpenModalCreateAdmin());
        } else if (behavior === "close") {
            dispatch(onCloseModalCreateAdmin());
        }
    };

    const modalActionSuper = (behavior) => {
        if (behavior === "open") {
            dispatch(onOpenModalCreateSuper());
        } else if (behavior === "close") {
            dispatch(onCloseModalCreateSuper());
        }
    };

    const modalActionCoord = (behavior) => {
        if (behavior === "open") {
            dispatch(onOpenModalCreateCoord());
        } else if (behavior === "close") {
            dispatch(onCloseModalCreateCoord());
        }
    };

    const modalActionCoordxAdmin = (behavior) => {
        if(behavior === "open") {
            dispatch(onOpenModalCreateCoordxAdmin());
        }else if(behavior === "close") {
            dispatch(onCloseModalCreateCoordxAdmin());
        }
    }

    const modalActionVeedor = (behavior) => {
        if (behavior === "open") {
            dispatch(onOpenModalCreateVeedor());
        } else if (behavior === "close") {
            dispatch(onCloseModalCreateVeedor());
        }
    }

    const modalActionVeedorGrant = (behavior) => {
        if(behavior === "open") {
            dispatch(onOpenModalCreateVeedorGrant());
        }else if(behavior === "close") {
            dispatch(onCloseModalCreateVeedorGrant());
        }
    }

    return {
        isOpenModalCreateAdmin,
        isOpenModalCreateSuper,
        isOpenModalCreateCoord,
        isOpenModalCreateCoordxAdmin,
        isOpenModalCreateVeedor,
        isOpenModalCreateVeedorGrant,

        modalActionAdmin,
        modalActionSuper,
        modalActionCoord,
        modalActionCoordxAdmin,
        modalActionVeedor,
        modalActionVeedorGrant,
    };
};
