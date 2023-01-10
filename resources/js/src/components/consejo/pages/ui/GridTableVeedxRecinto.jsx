import { Container } from "@mantine/core";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import TableVeedxRecinto from "../../../../helpers/DataTableVeedxRecinto";
import { useAuthStore } from "../../../../hooks/useAuthStore";

export const GridTableVeedxRecinto = () => {
    const { veeds, getVeedoresxRecinto, clearVeedsxRecinto } = useAuthStore();

    const { recinto_id } = useParams();

    useEffect(() => {
        getVeedoresxRecinto(recinto_id);

        /* return () => {
            clearVeedsxRecinto();
        }; */
    }, []);

    return (
        <Container size={1500} px={2}>
            <TableVeedxRecinto data={veeds} />
        </Container>
    );
};
