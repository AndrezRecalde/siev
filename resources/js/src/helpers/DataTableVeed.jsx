import { ActionIcon } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons";
import React, { useMemo } from "react";

import DataTable from "react-data-table-component";
import { useAuthStore } from "../hooks/useAuthStore";
import { useConsejoStore } from "../hooks/useConsejoStore";
import { useStatesStore } from "../hooks/useStatesStore";
import { useUiStore } from "../hooks/useUiStore";
import FilterComponent from "./FilterComponent";

const TableVeed = (props) => {

    const { modalActionVeedor } = useUiStore();
    const { startLoadCantones, startLoadAllRecintos, startLoadAllParroquias, startLoadRoles } = useStatesStore();
    const { setActiveVeedor, startDeleteVeedor } = useConsejoStore();


    const handleSelect = (veedor) => {
        startLoadCantones();
        startLoadAllParroquias();
        startLoadAllRecintos();
        setActiveVeedor(veedor);
        modalActionVeedor("open");
    }

    const handleSelectDelete = (user) => {
        startDeleteVeedor(user);
    }

    const columns = [
        {
            name: "Nombres",
            selector: (row) => row.first_name + " " + row.last_name,
            sortable: true,
            grow: 2,
        },
        {
            name: "Telefono",
            selector: (row) => row.phone,
            sortable: true,
            grow: 2
        },
        {
            name: "Parroquia",
            selector: (row) => row.parroquia,
            sortable: true,
            grow: 2
        },
        {
            name: "Recinto Donde Cuida",
            selector: (row) => row.destino,
            sortable: true,
            grow: 6,

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
    const filteredItems = props.data.filter(
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

export default TableVeed;
