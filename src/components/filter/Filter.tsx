import React, { ChangeEvent, FC, useEffect, useState } from "react";
import Checkbox from "../ui/checkbox/Checkbox";
import { manufacturers, locations, deviceType, serviceable } from "../../utils/constants/device";
import { useSearchParams } from "react-router-dom";
import { useStickyHeader } from "../../hooks/data/useStickyHeader";
import style from "./Filter.module.scss";

interface IFilterProps {}
type FilterType = string | number | boolean;

interface IFilter {
    manufacturer: string[];
    type: string[];
    location: string[];
    serviceable: string[];
    [key: string]: FilterType[];
}

const Filter: FC<IFilterProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {isSticky} = useStickyHeader();

  const [filters, setFilters] = useState<IFilter>({
    manufacturer: [],
    type: [],
    location: [],
    serviceable: [],
  });

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>, value: boolean) => {
    let { name} = e.target as { name: keyof IFilter}
    
    if (Array.isArray(filters[name])) {
      if (name === "serviceable") {
        const updatedValues = filters[name].includes(String(value))
        ? filters[name].filter((item) => item !== String(value))
        : [...filters[name], value];
        setFilters((prev) => ({
          ...prev,
          [name]: updatedValues,
        }));
      } else {
        const updateValues = filters[name].includes(value)
          ? filters[name].filter((item) => item !== value)
          : [...filters[name], value];
        setFilters((prev) => ({
          ...prev,
          [name]: updateValues,
        }));
      }
    }
  };

  useEffect(() => {
      const newParams: Record<string, string> = {}
      Object.entries(filters).forEach(([key, value]) => {
          if (Array.isArray(value) && value.length > 0) {
              newParams[key] = value.join(',')
          }
      })
      setSearchParams(newParams);
  }, [filters]);

  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    const parsedFilters: IFilter = { ...filters };
  
    Object.entries(currentParams).forEach(([key, value]) => {
      if (Array.isArray(filters[key])) {
        parsedFilters[key] = value.split(",");
      } else {
        parsedFilters[key] = [value];
      }
    });
    setFilters(parsedFilters);
  }, [searchParams]);

  return (
    <div className={`${style.filter} ${isSticky
    ? style.sticky
    : style.relative}`}>
      <Checkbox
        name="manufacturer"
        label={"Производитель"}
        items={manufacturers}
        onChange={handleFilterChange}
      />
      <Checkbox
        name="type"
        label={"Тип"}
        items={deviceType}
        onChange={handleFilterChange}
      />
      <Checkbox
        name="location"
        label={"Локация"}
        items={locations}
        onChange={handleFilterChange}
      />
       {filters.type.includes('mobile') && 
       <>
         <Checkbox
            name="manufacturer"
            label={"Экран"}
            items={manufacturers}
            onChange={handleFilterChange}
        />
        <Checkbox
            name="type"
            label={"Память"}
            items={deviceType}
            onChange={handleFilterChange}
        />
       </>
       
    }
    <Checkbox
        name="serviceable"
        label={"Исправно"}
        items={serviceable}
        onChange={handleFilterChange}
      />
    </div>
  );
};

export default Filter;
