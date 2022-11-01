import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import consejoApi from "../api/consejoApi";
import { onClearSearch, onSearch } from "../store/search/searchSlice";

export const useSearch = () => {

    const { results } = useSelector((state) => state.search);

    const dispatch = useDispatch();

    const startSearch = async(values = {}) => {
        dispatch(onClearSearch());
        try {
            const { data } = await consejoApi.post('/search', values);
            const { search } = data;
            dispatch(onSearch(search));
            if(data.status === "error"){
                Swal.fire({
                    icon: "error",
                    title: "No hay datos en esa zona de busqueda!",
                    showConfirmButton: false,
                    timer: 1200,
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const startExportFilter = async(values = {}) => {
        try {
            const response = await consejoApi.post('/pdf/exportacion/veedores', values, {responseType:"blob"});
            const url = window.URL.createObjectURL(new Blob([response.data],{type:'application/pdf'}));
            window.open(url, "_blank");
        } catch (error) {
            console.log(error)
        }
    }

    return {
        results,

        startSearch,
        startExportFilter
    };
};
