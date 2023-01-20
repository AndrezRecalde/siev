import { ActionIcon, Button, Card, Table } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons";
import React, { useMemo } from "react";

import DataTable from "react-data-table-component";
import { useAuthStore } from "../hooks/useAuthStore";
import { useConsejoStore } from "../hooks/useConsejoStore";
import { useUiStore } from "../hooks/useUiStore";
import { IconPencilPlus } from "@tabler/icons";
import FilterComponent from "./FilterComponent";

const TableVeedxRecinto = (props) => {
    const { user } = useAuthStore();
    const { modalActionVeedor, modalActionVeedorGrant } = useUiStore();
    const { setActiveVeedor, setActiveVeedorGrant, startDeleteVeedor } =
        useConsejoStore();

    const handleCreateVeedor = (e) => {
        e.preventDefault();

        if (
            user.roles?.includes("Administrador") ||
            user.roles?.includes("Supervisor")
        ) {
            modalActionVeedorGrant("open");
        } else {
            modalActionVeedor("open");
        }
    };

    const handleSelect = (selected) => {
        if (
            user.roles?.includes("Administrador") ||
            user.roles?.includes("Supervisor")
        ) {
            setActiveVeedorGrant(selected);
            modalActionVeedorGrant("open");
        } else {
            setActiveVeedor(selected);
            modalActionVeedor("open");
        }
    };

    const handleSelectDelete = (selected) => {
        startDeleteVeedor(selected);
    };

    const columns = [
        {
            name: "Nombres",
            selector: (row) => row.first_name + " " + row.last_name,
            sortable: true,
            wrap: true,
        },
        {
            name: "Cédula",
            sortable: true,
            width: "150px",
            cell: (row) => (
                <>
                    <Button
                        onClick={() => handleSelect(row)}
                        color="dark"
                        variant="subtle"
                    >
                        {row.dni}
                    </Button>
                </>
            ),
        },
        {
            name: "Telefono",
            selector: (row) => row.phone,
            sortable: true,
            width: "150px",
        },
        {
            name: "Recinto Donde Cuida",
            selector: (row) => row.destino,
            sortable: true,
            width: "300px",
            wrap: true,
        },
        {
            name: "Acciones",
            button: true,
            cell: (row) => (
                <>
                    <ActionIcon
                        onClick={() => handleSelectDelete(row)}
                        color="red"
                        variant="light"
                    >
                        <IconTrash size={20} />
                    </ActionIcon>
                </>
            ),
        },
    ];

    const [filterText, setFilterText] = React.useState("");
    const [resetPaginationToggle, setResetPaginationToggle] =
        React.useState(false);
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

    const ExpandedComponent = ({ data }) => (
        <Table withColumnBorders>
            <thead>
                <tr>
                    <th>Parroquia</th>
                    <th>Recinto donde Vota</th>
                    <th>Recinto donde cuida voto</th>
                    <th>Responsable</th>
                </tr>
            </thead>
            <tbody>
                <tr key={data.id}>
                    <td>{data.parroquia}</td>
                    <td>{data.origen}</td>
                    <td>{data.destino}</td>
                    <td>{data.coordinador}</td>
                </tr>
            </tbody>
        </Table>
    );

    return (
        <Card
            withBorder
            radius="md"
            mt="lg"
            mb="lg"
            sx={{ position: "static" }}
        >
            <Card.Section withBorder inheritPadding py="lg">
                <Button
                    onClick={(e) => handleCreateVeedor(e)}
                    leftIcon={<IconPencilPlus />}
                    variant="white"
                >
                    Crear Veedor
                </Button>
            </Card.Section>

            <DataTable
                title="Lista de Veedores"
                columns={columns}
                data={filteredItems}
                defaultSortField="Nombres"
                striped
                pagination
                subHeader
                subHeaderComponent={subHeaderComponent}
                expandableRows
                expandableRowsComponent={ExpandedComponent}
            />
        </Card>
    );
};

export default TableVeedxRecinto;
