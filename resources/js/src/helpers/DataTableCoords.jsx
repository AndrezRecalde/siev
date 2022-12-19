
import React, { useMemo } from "react";

import DataTable from "react-data-table-component";

import FilterComponent from "./FilterComponent";

const TableCoordsSearch = (props) => {


    const columns = [
        {
            name: "Nombres",
            selector: (row) => row.nombres,
            sortable: true,
            width: "200px"
        },
        {
            name: "Cedula",
            selector: (row) => row.dni,
            sortable: true,
            width: "150px"

        },
        {
            name: "Telefono",
            selector: (row) => row.phone,
            sortable: true,
        },
        {
            name: "Cantón",
            selector: (row) => row.nombre_canton,
            sortable: true,
            width: "200px"
        },
        {
            name: "Parroquia",
            selector: (row) => row.nombre_parroquia,
            sortable: true,
            width: "200px"
        },
        {
            name: "Recinto",
            selector: (row) => row.nombre_recinto,
            sortable: true,
            width: "400px"

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

export default TableCoordsSearch;
