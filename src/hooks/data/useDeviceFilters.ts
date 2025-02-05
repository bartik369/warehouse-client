import { CheckedDeviceOptions } from '../../types/content';
import { IFilteredDevicesFromBack, IDeviceFilters } from './../../types/devices';
import { useState, useEffect, ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetDevicesQuery } from "../../store/api/devicesApi";


export const useDeviceFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<IDeviceFilters>({
    manufacturer: [],
    isFunctional: [],
    isAssigned: [],
    type: [],
    memorySize: [],
    screenSize: [],
    model: [],
    warehouse: [],
  });
  const { data: devices } = useGetDevicesQuery(Object.fromEntries(searchParams));

  console.log(devices);
  
  useEffect(() => {
    const params: Record<string, string> = {};
    Object.keys(filters).forEach((key: string) => {
      if (filters[key as keyof IDeviceFilters].length) {
        params[key] = filters[key as keyof IDeviceFilters].join(",");
      }
    });
    setSearchParams(params);
  }, [filters, setSearchParams]);

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>, value: string) => {
    const { name } = e.target;
    if (!(name in filters)) return;

    if (Array.isArray(filters[name as keyof IDeviceFilters])) {
      const key = name as keyof IDeviceFilters;
      const updatedValues = filters[key].includes(String(value))
        ? filters[key].filter((item) => item !== String(value))
        : [...filters[key], String(value)];
      setFilters((prev) => ({
        ...prev,
        [key]: updatedValues,
      }));
    }
  };
  
  const getUniqueOptions = (
    key: keyof IDeviceFilters
  ): CheckedDeviceOptions[] => {
    if (!devices) return [];

    const optionsMap: Record<keyof IDeviceFilters, any[]> = {
      manufacturer: devices.map(
        (device: IFilteredDevicesFromBack, index: number) => ({
          id: index + 1,
          name: device.model.manufacturer.name,
          type: device.model.manufacturer.slug,
          value: device.model.manufacturer.slug,
        })
      ),
      isFunctional: devices.map(
        (device: IFilteredDevicesFromBack, index: number) => ({
          id: index + 1000,
          name: device.isFunctional ? "Да" : "Нет",
          type: "isFunctional",
          value: device.isFunctional ? "true" : "false",
        })
      ),
      type: devices.map((device: IFilteredDevicesFromBack, index: number) => ({
        id: index + 2000,
        name: device.model.type.name,
        type: device.model.type.slug,
        value: device.model.type.slug,
      })),
      memorySize: devices.map(
        (device: IFilteredDevicesFromBack, index: number) => ({
          id: index + 3000,
          name: String(device.memorySize),
          type: "memorySize",
          value: device.memorySize,
        })
      ),
      screenSize: devices.map(
        (device: IFilteredDevicesFromBack, index: number) => ({
          id: index + 4000,
          name: String(device.screenSize),
          type: "screenSize",
          value: device.screenSize,
        })
      ),
      model: devices.map((device: IFilteredDevicesFromBack, index: number) => ({
        id: index + 5000,
        name: device.model.name,
        type: device.model.slug,
        value: device.model.slug,
      })),
      warehouse: devices.map(
        (device: IFilteredDevicesFromBack, index: number) => ({
          id: index + 6000,
          name: device.warehouse.name,
          type: device.warehouse.slug,
          value: device.warehouse.slug,
        })
      ),
      isAssigned: devices.map(
        (device: IFilteredDevicesFromBack, index: number) => ({
          id: index + 7000,
          name: device.isAssigned ? "Используется" : "На складе",
          type: "isAssigned",
          value: device.isAssigned ? "true" : "false",
        })
      ),
    };

    const uniqueOptions = optionsMap[key].reduce((acc, item) => {
      if (item.value && item.value != null) {
        if (!acc.has(item.name)) {
          acc.set(item.name, item);
        }
      }
      return acc;
    }, new Map());

    return Array.from(uniqueOptions.values());
  };

  return { devices, filters, searchParams, handleFilterChange, getUniqueOptions };
};
