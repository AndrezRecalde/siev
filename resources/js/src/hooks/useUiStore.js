import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    onCloseModalCreateAdmin,
    onCloseModalCreateCoord,
    onCloseModalCreateSuper,
    onCloseModalCreateVeedor,
    onOpenModalCreateAdmin,
    onOpenModalCreateCoord,
    onOpenModalCreateSuper,
    onOpenModalCreateVeedor,
} from "../store/ui/uiSlice";

export const useUiStore = () => {
    const {
        isOpenModalCreateAdmin,
        isOpenModalCreateSuper,
        isOpenModalCreateCoord,
        isOpenModalCreateVeedor

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

    const modalActionVeedor = (behavior) => {
        if (behavior === "open") {
            dispatch(onOpenModalCreateVeedor());
        } else if (behavior === "close") {
            dispatch(onCloseModalCreateVeedor());
        }
    }

    return {
        isOpenModalCreateAdmin,
        isOpenModalCreateSuper,
        isOpenModalCreateCoord,
        isOpenModalCreateVeedor,

        modalActionAdmin,
        modalActionSuper,
        modalActionCoord,
        modalActionVeedor,
    };
};
