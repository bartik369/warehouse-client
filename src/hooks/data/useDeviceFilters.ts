import { IFilters } from './../../types/devices';
import { useState, useEffect, ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetDevicesQuery } from "../../store/api/devicesApi";

interface DeviceFilters {
  manufacturer: string[];
  isFunctional: string[];
  type: string[];
  memorySize?: string[];
  screenSize?: string[];
  model: string[];
}

export const useDeviceFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<DeviceFilters>({
    manufacturer: [],
    isFunctional: [],
    type: [],
    memorySize: [],
    screenSize: [],
    model: [],
  });
  const { data: devices } = useGetDevicesQuery(Object.fromEntries(searchParams));

  console.log(devices)

  useEffect(() => {
    const params: Record<string, string> = {};
    (Object.keys(filters) as (keyof DeviceFilters)[]).forEach((key) => {
      if (filters[key]?.length) {
        params[key] = filters[key].join(",");
      }
    });
    setSearchParams(params);
  }, [filters, setSearchParams]);

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>, value: boolean) => {
    const { name } = e.target;
    if (!(name in filters)) return;

    if (Array.isArray(filters[name as keyof DeviceFilters])) {
      const key = name as keyof DeviceFilters;
      const updatedValues = filters[key].includes(String(value))
        ? filters[key].filter((item) => item !== String(value))
        : [...filters[key], String(value)];
      setFilters((prev) => ({
        ...prev,
        [key]: updatedValues,
      }));
    }
  };
  

  const getUniqueOptions = (key: keyof DeviceFilters) => {
    if (!devices) return [];
  
    const optionsMap: Record<keyof DeviceFilters, any[]> = {
      manufacturer: devices.map((device: IFilters, index: number = 1) => ({
        id: index + 1,
        name: device.model.manufacturer.name,
        type: device.model.manufacturer.slug,
        slug: device.model.manufacturer.slug,
      })),
      isFunctional: devices.map((device: IFilters, index: number) => ({
        id: index + 1000,
        name: device.isFunctional ? 'Да' : 'Нет',
        type: 'isFunctional',
        value: device.isFunctional ? 'true' : 'false',
      })),
      type: devices.map((device: IFilters, index: number) => ({
        id: index + 2000,
        name: device.model.type.name,
        type: device.model.type.slug,
        value: device.model.type.slug,
      })),
      memorySize: devices.map((device: IFilters, index: number) => ({
        id: index + 3000,
        name: String(device.memorySize),
        type: 'memorySize',
        value: device.memorySize,
      })),
      screenSize: devices.map((device: IFilters, index: number) => ({
        id: index + 4000,
        name: String(device.screenSize),
        type: 'screenSize',
        value: device.screenSize,
      })),
      model: devices.map((device: IFilters, index: number) => ({
        id: index + 5000,
        name: device.model.name,
        type: device.model.slug,
        value: device.model.slug,
      })),
    };

    const uniqueOptions = optionsMap[key].reduce((acc, value) => {
        if (!acc.has(value.name)) {
            acc.set(value.name, value);
        }
        return acc;
    }, new Map());


    return Array.from(uniqueOptions.values());
  };

  return { devices, filters, handleFilterChange, getUniqueOptions, searchParams };
};
