import { ActionIcon, RingProgress, Text } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons";
import React, { useMemo } from "react";

import DataTable from "react-data-table-component";
import { useAuthStore } from "../hooks/useAuthStore";
import { useConsejoStore } from "../hooks/useConsejoStore";
import { useStatesStore } from "../hooks/useStatesStore";
import { useUiStore } from "../hooks/useUiStore";
import FilterComponent from "./FilterComponent";

const TableCoord = (props) => {
    const { modalActionCoord } = useUiStore();
    const { startLoadCantones, startLoadAllRecintos, startLoadRoles } =
        useStatesStore();
    const { setActiveUser, startDeleteUser } = useConsejoStore();
    const { startProfile } = useAuthStore();


    const getTotalChart = (param) => {
        let total_juntas =  param.recintos?.map( r => r.num_juntas);
        let total_veedor = param.veedores?.length;



    }


    const handleSelect = (user) => {
        startLoadCantones();
        startLoadAllRecintos();
        startLoadRoles();
        setActiveUser(user);
        modalActionCoord("open");
    };

    const handleSelectDelete = (user) => {
        startDeleteUser(user);
    }


    const columns = [
        {
            name: "Nombres",
            selector: (row) => row.first_name + " " + row.last_name,
            sortable: true,
            grow: 1,
        },
        {
            name: "Telefono",
            selector: (row) => row.phone,
            sortable: true,
            hide: "sm",
        },
        /* {
            name: "Cantón",
            selector: (row) => row.canton?.nombre_canton,
            sortable: true,
            hide: "sm",
        }, */
        {
            name: "Progreso",
            button: true,
            cell: (row) => {
                let totalJuntas = row.recintos?.map(r => r.num_juntas);
                let totalxVeedor = row.veedores?.length ? row.veedores?.length : 0 ;
                let total = totalJuntas?.reduce((a,b) => a + b, 0);

                let totales = ((totalxVeedor * 100)/total);
                console.log(totalxVeedor)
                return(
                    <RingProgress
                    size={90}
                    sections={[{ value: totales, color: "cyan" }]}
                    label={
                        <Text
                            color="blue"
                            weight={30}
                            align="center"
                            size="xs"
                        >
                            {totales !== NaN ? `${totales.toFixed(1)}%` : `${0}%`}
                        </Text>
                    }
                />
                )
            },
        },
        /* {
            name: "Parroquia",
            selector: (row) =>
                row.parroquias?.map((parr) => parr.nombre_parroquia),
            sortable: true,
            hide: "sm",
        }, */
        {
            name: "Recinto",
            selector: (row) => row.recintos?.map((rec) => rec.nombre_recinto),
            sortable: true,
            grow: 3,
        },
        {
            name: "Acciones",
            button: true,
            cell: (row) => (
                <>
                    <ActionIcon
                        color="cyan"
                        variant="light"
                        sx={{ marginRight: 5 }}
                        onClick={() => handleSelect(row)}
                    >
                        <IconEdit size={20} />
                    </ActionIcon>
                    <ActionIcon onClick={() => handleSelectDelete(row)} color="red" variant="light">
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
            title="Coordinadores"
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

export default TableCoord;
