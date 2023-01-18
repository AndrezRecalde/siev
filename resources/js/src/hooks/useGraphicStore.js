import React from "react";
import { useDispatch, useSelector } from "react-redux";
import consejoApi from "../api/consejoApi";
import { onClearGraphicCantones, onClearGraphicParroquias, onClearGraphicRecintos, onGraphicCantones, onGraphicParroquias, onGraphicRecintos } from "../store/graphic/graphicSlice";

export const useGraphicStore = () => {

    const { grCantones, grParroquias, grRecintos } = useSelector((state) => state.graphic);
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
            const { sum_parroquias } = data;
            dispatch(onGraphicParroquias(sum_parroquias));
        } catch (error) {
            console.log(error);
        }
    }

    const startLoadGraphicParroquia = async(canton_id) => {
        try {
            const { data } = await consejoApi.post("/getGraficoxParroquia", {canton_id});
            const { sum_parroquias } = data;
            dispatch(onGraphicParroquias(sum_parroquias));
            //console.log(sum_parroquias);
        } catch (error) {
            console.log(error);
        }
    }

    const startLoadGraphicRecinto = async(parroquia_id) => {
        try {
            const { data } = await consejoApi.post("/getGraficoRecinto", {parroquia_id});
            const { sum_recintox } = data;
            dispatch(onGraphicRecintos(sum_recintox));
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

    const startClearGraphicRecinto = () => {
        dispatch(onClearGraphicRecintos());
    }

    return {
        grCantones,
        grParroquias,
        grRecintos,

        startLoadGraphicCanton,
        startLoadGraphicParroquias,
        startLoadGraphicParroquia,
        startLoadGraphicRecinto,

        startClearGraphicCanton,
        startClearGraphicParroquia,
        startClearGraphicRecinto

    };
};
