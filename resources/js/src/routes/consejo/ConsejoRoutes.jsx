import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "../../components/consejo/pages/HomePage";
import { SearchVeedor } from "../../components/consejo/pages/SearchVeedor";
import { Footer } from "../../components/consejo/pages/ui/Footer";
import { NavBar } from "../../components/consejo/pages/ui/NavBar";

export const ConsejoRoutes = () => {
    return (
        <>
            <NavBar />

            <Routes>
                <Route path="home" element={<HomePage />} />
                <Route path="search/veedores" element={<SearchVeedor />} />

                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/search" element={<Navigate to="/search/veedores" />} />
            </Routes>

            <Footer />

        </>
    );
};