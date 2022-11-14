import React from "react";
import { useDispatch, useSelector } from "react-redux";
import consejoApi from "../api/consejoApi";
import { onClearGraphicCantones, onClearGraphicParroquias, onGraphicCantones, onGraphicParroquias } from "../store/graphic/graphicSlice";

export const useGraphicStore = () => {

    const { grCantones, grParroquias } = useSelector((state) => state.graphic);
    const dispatch = useDispatch();


    const startLoadGraphicCanton = async() => {
        try {
            const { data } = await consejoApi.get("/getGraficoCantones");
            const { sum_cantones } = data;
            dispatch(onGraphicCantones(sum_cantones));
        } catch (error) {
            console.log(error);
        }
    }

    const startLoadGraphicParroquias = async() => {
        try {
            const { data } = await consejoApi.get("/getGraficoParroquia");
            console.log(data)
            const { sum_parroquias } = data;
            dispatch(onGraphicParroquias(sum_parroquias));
        } catch (error) {
            console.log(error);
        }
    }

    const startClearGraphicCanton = () => {
        dispatch(onClearGraphicCantones());
    }

    const startClearGraphicParroquia = () => {
        dispatch(onClearGraphicParroquias());
    }

    return {
        grCantones,
        grParroquias,

        startLoadGraphicCanton,
        startLoadGraphicParroquias,

        startClearGraphicCanton,
        startClearGraphicParroquia
    };
};
