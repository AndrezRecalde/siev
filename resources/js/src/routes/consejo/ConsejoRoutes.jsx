import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { GraphicCantones } from "../../components/consejo/pages/GraphicCantones";
import { GraphicParroquias } from "../../components/consejo/pages/GraphicParroquias";
import { HomePage } from "../../components/consejo/pages/HomePage";
import { SearchCoords } from "../../components/consejo/pages/SearchCoords";
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
                <Route path="search/coordinadores" element={<SearchCoords />} />
                <Route path="graficos/cantones" element={<GraphicCantones />} />
                <Route path="graficos/parroquias" element={<GraphicParroquias />} />


                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/search/veedores" element={<Navigate to="/search/veedores" />} />
                <Route path="/search/coordinadores" element={<Navigate to="/search/coordinadores" />} />

            </Routes>

            <Footer />

        </>
    );
};
