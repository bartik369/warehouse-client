import { CheckedDeviceOptions } from '../../types/content';
import { IFilteredDevicesFromBack, IDeviceFilters, IFilterDeviceOptions } from './../../types/devices';
import { useState, useEffect, ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetDevicesQuery, useGetDeviceOptionsQuery } from "../../store/api/devicesApi";

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

  const [disabledOptions, setDisabledOptions] = useState<Record<string, string[]>>({});
  const { data: devices } = useGetDevicesQuery(Object.fromEntries(searchParams));
  const { data: options } = useGetDeviceOptionsQuery();

  useEffect(() => {
    if (!devices || !options) return;

    const newDisabledOptions: Record<string, string[]> = {
      manufacturer: [],
      type: [],
      model: [],
      memorySize: [],
      screenSize: [],
      warehouse: [],
      isFunctional: [],
      isAssigned: [],
    };

    const availableValues: Record<string, string[]> = {
      manufacturer: Array.from(
        new Set(devices?.map((device: IFilteredDevicesFromBack) => device.model.manufacturer?.slug).filter(Boolean))
      ),
      type: Array.from(
        new Set(devices?.map((device: IFilteredDevicesFromBack) => device.model.type?.slug).filter(Boolean))
      ),
      model: Array.from(
        new Set(devices?.map((device: IFilteredDevicesFromBack) => device.model?.slug).filter(Boolean))
      ),
      warehouse: Array.from(
        new Set(devices?.map((device: IFilteredDevicesFromBack) => device.warehouse?.slug).filter(Boolean))
      ),
      memorySize: Array.from(
        new Set(devices?.map((device: IFilteredDevicesFromBack) => device?.memorySize?.toString()))
      ),
      screenSize: Array.from(
        new Set(devices?.map((device: IFilteredDevicesFromBack) => device?.screenSize?.toString()))
      ),
      isFunctional: Array.from(
        new Set(devices?.map((device: IFilteredDevicesFromBack) => String(device.isFunctional)))
      ),
      isAssigned: Array.from(
        new Set(devices?.map((device: IFilteredDevicesFromBack) => String(device.isAssigned)))
      ),
    };
   
    Object.entries(availableValues).forEach(([key, values]) => {
      const optionList = options[key as keyof IFilterDeviceOptions] as Array<any> || [];
    
      newDisabledOptions[key] = optionList
        .map((item) => [
          item.slug?.toString(),
          item.memorySize !== undefined ? String(item.memorySize) : undefined,
          item.screenSize !== undefined ? String(item.screenSize) : undefined,
          item.isAssigned === true ? "true" : item.isAssigned === false ? "false" : undefined,
          item.isFunctional === true ? "true" : item.isFunctional === false ? "false" : undefined
        ])
        .flat()
        .filter((value): value is string => value !== undefined && !values.includes(value));
    });
    
    setDisabledOptions(newDisabledOptions);
  }, [devices, options]);

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


  const getUniqueOptions = (key: keyof IDeviceFilters): CheckedDeviceOptions[] => {
    if (!options) return [];

    const optionsMap: Record<keyof IDeviceFilters, any[]> = {
      manufacturer: options?.manufacturer?.map((option: any, index: number) => ({
        id: index + 1,
        name: option.name,
        type: option.slug,
        value: option.slug,
        disabled: disabledOptions?.manufacturer?.includes(option.slug),
      })),
      isFunctional: options?.isFunctional?.map((option: any, index: number) => ({
        id: index + 1000,
        name: option.isFunctional ? "Да" : "Нет",
        type: "isFunctional",
        value: String(option.isFunctional),
        disabled: disabledOptions?.isFunctional?.includes(String(option.isFunctional)),
      })),
      type: options?.type?.map((option: any, index: number) => ({
        id: index + 2000,
        name: option.name,
        type: option.slug,
        value: option.slug,
        disabled: disabledOptions?.type?.includes(option.slug),
      })),
      memorySize: options?.memorySize?.map((option: any, index: number) => ({
        id: index + 3000,
        name: option.memorySize,
        type: "memorySize",
        value: String(option.memorySize),
        disabled: disabledOptions?.memorySize?.includes(String(option.memorySize)),
      })),
      screenSize: options?.screenSize?.map((option: any, index: number) => ({
        id: index + 4000,
        name: option.screenSize,
        type: "screenSize",
        value: String(option.screenSize),
        disabled: disabledOptions?.screenSize?.includes(String(option.screenSize)),
      })),
      model: options?.model?.map((option: any, index: number) => ({
        id: index + 5000,
        name: option.name,
        type: option.slug,
        value: option.slug,
        disabled: disabledOptions?.model?.includes(option.slug),
      })),
      warehouse: options?.warehouse?.map((option: any, index: number) => ({
        id: index + 6000,
        name: option.name,
        type: option.slug,
        value: option.slug,
        disabled: disabledOptions?.warehouse?.includes(option.slug),
      })),
      isAssigned: options?.isAssigned?.map((option: any, index: number) => ({
        id: index + 7000,
        name: option.isAssigned ? "Используется" : "На складе",
        type: "isAssigned",
        value: String(option.isAssigned),
        disabled: disabledOptions?.isAssigned?.includes(String(option.isAssigned)),
      })),
    };

    return optionsMap[key] || [];
  };

  return { devices, options, filters, searchParams, handleFilterChange, getUniqueOptions };
};
