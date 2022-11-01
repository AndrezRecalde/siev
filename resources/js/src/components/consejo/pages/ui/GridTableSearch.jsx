import React from 'react'
import TableVeedSearch from '../../../../helpers/DataTableSearch';
import { useSearch } from '../../../../hooks/useSearch';

export const GridTableVeedSearch = () => {

    const { results } = useSearch();

  return (
    <TableVeedSearch data={results ? results : []} />
    )
}
