import React from 'react'
import TableSupersSearch from '../../../../helpers/DataTableSupers';
import { useSearch } from '../../../../hooks/useSearch';

export const GridTableSupersSearch = () => {

    const { results } = useSearch();

  return (
    <TableSupersSearch data={results ? results : []} />
    )
}
