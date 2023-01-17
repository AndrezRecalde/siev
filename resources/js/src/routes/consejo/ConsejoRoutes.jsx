import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { GraphicCantones } from "../../components/consejo/pages/GraphicCantones";
import { GraphicParroquia } from "../../components/consejo/pages/GraphicParroquia";
import { GraphicParroquias } from "../../components/consejo/pages/GraphicParroquias";
import { GraphicRecinto } from "../../components/consejo/pages/GraphicRecinto";
import { HomePage } from "../../components/consejo/pages/HomePage";
import { SearchCoords } from "../../components/consejo/pages/SearchCoords";
import { SearchSupers } from "../../components/consejo/pages/SearchSupers";
import { SearchVeedor } from "../../components/consejo/pages/SearchVeedor";
import { Footer } from "../../components/consejo/pages/ui/Footer";
import { GridTableVeedxRecinto } from "../../components/consejo/pages/ui/GridTableVeedxRecinto";
import { NavBar } from "../../components/consejo/pages/ui/NavBar";
import { VeedoresxRecintoPage } from "../../components/consejo/pages/VeedoresxRecintoPage";

export const ConsejoRoutes = () => {
    return (
        <>
            <NavBar />

            <Routes>
                <Route path="home" element={<HomePage />} />
                <Route path="search/veedores" element={<SearchVeedor />} />
                <Route path="search/supervisores" element={<SearchSupers />} />
                <Route path="search/coordinadores" element={<SearchCoords />} />
                <Route path="graficos/cantones" element={<GraphicCantones />} />
                <Route path="graficos/parroquias" element={<GraphicParroquias />} />
                <Route path="/graficos/parroquia/:canton_id" element={<GraphicParroquia />} />
                <Route path="/graficos/recinto/:parroquia_id" element={<GraphicRecinto />} />

                <Route path="/veedores/recinto/:recinto_id" element={<VeedoresxRecintoPage />} />

                <Route path="/*" element={<Navigate to="/home" />} />
                <Route path="/search/veedores/*" element={<Navigate to="/search/veedores" />} />
                <Route path="/search/supervisores/*" element={<Navigate to="/search/supervisores" />} />
                <Route path="/search/coordinadores/*" element={<Navigate to="/search/coordinadores" />} />
                <Route path="graficos/cantones/*" element={<Navigate to="graficos/cantones" />} />
                <Route path="graficos/parroquias/*" element={<Navigate to="graficos/parroquias" />} />
                <Route path="graficos/parroquia/:canton_id/*" element={<Navigate to="graficos/parroquia/:canton_id" />} />
                <Route path="graficos/recinto/:parroquia_id/*" element={<Navigate to="graficos/parroquia/:canton_id" />} />
                <Route path="/veedores/recinto/:recinto_id/*" element={<Navigate to="/veedores/recinto/:recinto_id" />} />












            </Routes>

            <Footer />

        </>
    );
};
