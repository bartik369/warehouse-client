import React, { ChangeEvent, FC, useEffect, useState } from "react";
import Checkbox from "../ui/checkbox/Checkbox";
import { manufacturers, locations, deviceType } from "../../utils/constants/device";
import { useSearchParams } from "react-router-dom";
import { useStickyHeader } from "../../hooks/data/useStickyHeader";
import style from "./Filter.module.scss";

interface IFilterProps {}
interface IFilter {
    manufacturer: string[];
    type: string[];
    location: string[];
  }

const Filter: FC<IFilterProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {isSticky} = useStickyHeader();

  const [filters, setFilters] = useState<IFilter>({
    manufacturer: [],
    type: [],
    location: [],
  });

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (Array.isArray(filters[name as keyof IFilter])) {
      const updateValues = filters[name as keyof IFilter].includes(value)
        ? filters[name as keyof IFilter].filter((item) => item !== value)
        : [...filters[name as keyof IFilter], value];
      setFilters((prev) => ({
        ...prev,
        [name]: updateValues,
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
      const newParams: Record<string, string> = {}
      Object.entries(filters).forEach(([key, value]) => {
          if (Array.isArray(value) && value.length > 0) {
              newParams[key] = value.join(',')
          } else if (value) {
              newParams[key] = value
          }
      })
      setSearchParams(newParams);
  }, [filters]);

  useEffect(() => {
      const currentParams = Object.fromEntries([...searchParams]);
      const parsedFilters = {...filters};

      Object.entries(currentParams).forEach(([key, value]) => {
          if (filters[key as keyof IFilter] && Array.isArray(filters[key as keyof IFilter])) {
            parsedFilters[key as keyof IFilter] = value.split(",");
          } else {
          parsedFilters[key] = value;
          setFilters(parsedFilters);
          }

      })

  }, [searchParams]);

  console.log(isSticky);
  

  return (
    <div className={`${style.filter} ${isSticky
    ? style.sticky
    : style.relative}`}>
      <Checkbox
        name="manufacturer"
        label={"Производитель"}
        items={manufacturers}
        click={handleFilterChange}
      />
      <Checkbox
        name="type"
        label={"Тип"}
        items={deviceType}
        click={handleFilterChange}
      />
      <Checkbox
        name="location"
        label={"Локация"}
        items={locations}
        click={handleFilterChange}
      />
       {filters.type.includes('Мобильный телефон' || 'Ноутбук') && 
       <>
         <Checkbox
            name="manufacturer"
            label={"Экран"}
            items={manufacturers}
            click={handleFilterChange}
        />
        <Checkbox
            name="type"
            label={"Память"}
            items={deviceType}
            click={handleFilterChange}
        />
       </>
    }
    </div>
  );
};

export default Filter;
