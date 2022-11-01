import { Loader } from "@mantine/core";
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { LoginPage } from "../components/consejo/pages/Auth/LoginPage";
import { useAuthStore } from "../hooks/useAuthStore";
import { ConsejoRoutes } from "./consejo/ConsejoRoutes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

import "../styles/index.css";


export const AppRouter = () => {
    const { status, checkAuthToken } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    }, [])


    if (status === "checking") {
        return <Loader color="yellow" size="lg" variant="dots" />;
    }

    return (
        <Routes>

            <Route path="auth/login/*" element={
                <PublicRoute>
                    <Routes>
                        <Route path="/*" element={<LoginPage />} />
                    </Routes>
                </PublicRoute>
            }
            />

            <Route path="/*" element={
                <PrivateRoute>
                    <ConsejoRoutes />
                </PrivateRoute>
            } />
        </Routes>
    );
};
