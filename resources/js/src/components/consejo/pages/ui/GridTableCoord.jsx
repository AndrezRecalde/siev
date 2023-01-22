import React from 'react'
import TableCoord from '../../../../helpers/DataTableCoord';
import { useAuthStore } from '../../../../hooks/useAuthStore'

export const GridTableCoord = () => {

    const { coordinadores } = useAuthStore();


  return (
    <TableCoord data={coordinadores ? coordinadores: []} />
  )
}
