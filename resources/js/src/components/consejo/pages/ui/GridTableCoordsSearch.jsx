import React from 'react'
import TableCoordsSearch from '../../../../helpers/DataTableCoords';
import { useSearch } from '../../../../hooks/useSearch';

export const GridTableCoordsSearch = () => {

    const { results } = useSearch();

  return (
    <TableCoordsSearch data={results ? results : []} />
    )
}
