import React from "react";
import { GridTableVeedxRecinto } from "./ui/GridTableVeedxRecinto";
import { ModalCreateVeed } from "./ui/ModalCreateVeed";
import { ModalCreateVeedGrant } from "./ui/ModalCreateVeedGrant";

export const VeedoresxRecintoPage = () => {
    return (
        <>
            <GridTableVeedxRecinto />

            <ModalCreateVeed />
            <ModalCreateVeedGrant />
        </>
    );
};
