import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import { getEnv } from "../helpers/getEnv";


const { VITE_APP_URL } = getEnv();

const consejoApi = axios.create({
    baseURL: VITE_APP_URL,

});

consejoApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'Authorization' : 'Bearer ' + localStorage.getItem("token"),
        'Accept': 'application/json',
    }

    return config;
})

export default consejoApi;
