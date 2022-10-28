import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import consejoApi from '../api/consejoApi';
import { onClearStates, onLoadAllParroquias, onLoadAllRecintos, onLoadCantones, onLoadParroquias, onLoadRecintos, onLoadRoles } from '../store/states/statesSlice';

export const useStatesStore = () => {

    const { cantones, parroquias, allParroquias, recintos, allRecintos, roles } = useSelector(state => state.states);

    const dispatch = useDispatch();

    const startLoadCantones = async() => {
        try {
            const { data } = await consejoApi.get("/cantones");
            const { cantones } = data;
            dispatch(onLoadCantones(cantones));
        } catch (error) {
            console.log(error)
        }
    }

    const startLoadParroquias = async({canton_id}) => {
        try {
            const { data } = await consejoApi.post("/parroquias", {canton_id});
            const { parroquias } = data;
            dispatch(onLoadParroquias(parroquias));
        } catch (error) {
            console.log(error)
        }
    }

    const startLoadAllParroquias = async() => {
        try {
            const { data } = await consejoApi.get("/all/parroquias");
            const { parroquias } = data;
            dispatch(onLoadAllParroquias(parroquias));
        } catch (error) {
            console.log(error);
        }
    }

    const startLoadRecintos = async({parroquia_id}) => {
        try {
            const { data } = await consejoApi.post("/recintos", {parroquia_id});
            const { recintos } = data;
            dispatch(onLoadRecintos(recintos));
        } catch (error) {
            console.log(error)
        }
    }

    const startLoadAllRecintos = async() => {
        try {
            const { data } = await consejoApi.get("/all/recintos");
            const { recintos } = data;
            dispatch(onLoadAllRecintos(recintos));
        } catch (error) {
            console.log(error);
        }
    }

    const startLoadRoles = async() => {
        try {
            const { data } = await consejoApi.get("/roles");
            const { roles } = data;
            dispatch(onLoadRoles(roles));
        } catch (error) {
            console.log(error)
        }
    }

    const startClearStates = () => {
        dispatch(onClearStates());
    }

    return {
            cantones,
            parroquias,
            allParroquias,
            recintos,
            allRecintos,
            roles,

            startLoadCantones,
            startLoadParroquias,
            startLoadAllParroquias,
            startLoadRecintos,
            startLoadAllRecintos,
            startLoadRoles,

            startClearStates,
        }
}
