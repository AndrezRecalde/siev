import { ActionIcon } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons";
import React, { useMemo } from "react";

import DataTable from "react-data-table-component";
import { useAuthStore } from "../hooks/useAuthStore";
import { useConsejoStore } from "../hooks/useConsejoStore";
import { useUiStore } from "../hooks/useUiStore";
import FilterComponent from "./FilterComponent";

const TableVeedxRecinto = (props) => {

    const { user } = useAuthStore();
    const { modalActionVeedor, modalActionVeedorGrant } = useUiStore();
    const { setActiveVeedor, setActiveVeedorGrant, startDeleteVeedor } = useConsejoStore();


    const handleSelect = (selected) => {
        if (user.roles?.includes("Administrador") || user.roles?.includes("Supervisor")) {
            setActiveVeedorGrant(selected);
            modalActionVeedorGrant("open");
        } else {
            setActiveVeedor(selected);
            modalActionVeedor("open");
        }

    }

    const handleSelectDelete = (selected) => {
        startDeleteVeedor(selected);
    }

    const columns = [
        {
            name: "Nombres",
            selector: (row) => row.first_name + " " + row.last_name,
            sortable: true,
            width: "300px"
        },
        {
            name: "Cédula",
            selector: (row) => row.dni,
            sortable: true,
            width: "150px"
        },
        {
            name: "Telefono",
            selector: (row) => row.phone,
            sortable: true,
            width: "150px"
        },
        {
            name: "Parroquia",
            selector: (row) => row.parroquia,
            sortable: true,
            width: "150px"
        },
        {
            name: "Recinto Donde Cuida",
            selector: (row) => row.destino,
            sortable: true,
            width: "400px"
        },
        {
            name: "Responsable",
            selector: (row) => row.coordinador,
            sortable: true,
            width: "180px"
        },
        {
            name: "Acciones",
            button: true,
            cell: (row) => (
                <>
                    <ActionIcon onClick={() => handleSelect(row)} color="cyan" variant="light" sx={{ marginRight: 5 }}>
                        <IconEdit size={20} />
                    </ActionIcon>
                    <ActionIcon onClick={() => handleSelectDelete(row)} color="red" variant="light" >
                        <IconTrash size={20} />
                    </ActionIcon>
                </>
            ),
        },
    ];

    const [filterText, setFilterText] = React.useState("");
    const [resetPaginationToggle, setResetPaginationToggle] =
        React.useState(false);
    // const filteredItems = data.filter(
    //   item => item.name && item.name.includes(filterText)
    // );
    const filteredItems = props.data?.filter(
        (item) =>
            JSON.stringify(item)
                .toLowerCase()
                .indexOf(filterText.toLowerCase()) !== -1
    );

    const subHeaderComponent = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText("");
            }
        };

        return (
            <FilterComponent
                onFilter={(e) => setFilterText(e.target.value)}
                onClear={handleClear}
                filterText={filterText}
            />
        );
    }, [filterText, resetPaginationToggle]);

    return (
        <DataTable
            title="Veedores"
            columns={columns}
            data={filteredItems}
            defaultSortField="Nombres"
            striped
            pagination
            subHeader
            subHeaderComponent={subHeaderComponent}
        />
    );
};

export default TableVeedxRecinto;
