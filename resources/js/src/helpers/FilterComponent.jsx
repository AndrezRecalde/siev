import { CloseButton, Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import React from "react";


const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    {/* <Input
      id="search"
      type="text"
      placeholder="Filter table data..."
      value={filterText}
      onChange={onFilter}
    /> */}
    <Input
      icon={<IconSearch />}
      placeholder="Filter table data..."
      value={filterText}
      onChange={onFilter}
    />
    {/* <ClearButton onClick={onClear}>X</ClearButton> */}
    <CloseButton onClick={onClear} title="Close popover" size="xl" iconSize={20} />
  </>
);

export default FilterComponent;
