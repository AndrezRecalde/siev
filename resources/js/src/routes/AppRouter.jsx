import { Loader } from "@mantine/core";
import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../components/consejo/pages/Auth/LoginPage";
import { HomePage } from "../components/consejo/pages/HomePage";
import { useAuthStore } from "../hooks/useAuthStore";
import "../styles/index.css";

export const AppRouter = () => {
    const { status } = useAuthStore();

    if (status === "checking") {
        return <Loader color="yellow" size="lg" variant="dots" />;
    }

    return (
        <Routes>
            {status === "not-authenticated" ? (
                <>
                    <Route path="/auth/*" element={<LoginPage />} />
                    <Route path="/*" element={<Navigate to="/auth/login" />} />
                </>
            ) : (
                <>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/*" element={<Navigate to="/" />} />

                </>
            )}
        </Routes>
    );
};
