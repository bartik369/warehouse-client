import { useState, FC } from "react";

interface IFilterDropdown {
    label: string;
    options: string[];
    selected: string;
    onChange: (option: string) => void;
}

const FilterDropdown:FC<IFilterDropdown> = () => {

  return (
    <>
    </>
  );
}
export default FilterDropdown;
