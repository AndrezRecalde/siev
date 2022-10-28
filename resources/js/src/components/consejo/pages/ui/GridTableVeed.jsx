import React from 'react'
import TableVeed from '../../../../helpers/DataTableVeed';
import { useAuthStore } from '../../../../hooks/useAuthStore';

export const GridTableVeed = () => {

    const { veedores } = useAuthStore();

  return (
    <TableVeed data={veedores} />
    )
}
