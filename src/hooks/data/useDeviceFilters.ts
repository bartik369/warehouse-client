import { useState, useEffect, ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { IDeviceFilters, IFilteredDevicesFromBack } from './../../types/devices';
import { CheckedDeviceOptions } from "../../types/content";
import { useGetDevicesQuery, useGetDeviceOptionsQuery } from "../../store/api/devicesApi";

export const useDeviceFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [disabledOptions, setDisabledOptions] = useState<Record<string, string[]>>({});
  const { data: devices } = useGetDevicesQuery(Object.fromEntries(searchParams));
  const { data: options } = useGetDeviceOptionsQuery();

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

  console.log(devices)

  useEffect(() => {
    if (!options) return;
    const disabledOptions: Record<string, string[]> = {
      manufacturer: [],
      type: [],
      model: [],
      memorySize: [],
      screenSize: [],
      warehouse: [],
      isFunctional: [],
      isAssigned: [],
    };
    // Get all device options
    const devicesOptions: Record<string, string[]> = {
      manufacturer: options.manufacturer?.map((item) => item.slug) || [],
      type: options.type?.map((item) => item.slug) || [],
      model: options.model?.map((item) => item.slug) || [],
      memorySize: options.memorySize?.map((item) => String(item.memorySize)) || [],
      screenSize: options.screenSize?.map((item) => String(item.screenSize)) || [],
      warehouse: options.warehouse?.map((item) => item.slug) || [],
      isFunctional: ["true", "false"],
      isAssigned: ["true", "false"],
    };
    //Checking available options by selected filters
    Object.entries(devicesOptions).forEach(([key, optionList]) => {
      //Filtering options that cant be selected  based on the selected files
      disabledOptions[key] = optionList.filter((option) => {
        // Creating temporary filters with the addition current option
        const tempFilters = { ...filters, [key]: [...filters[key as keyof IDeviceFilters], option] }; 
        // Checking some device which matches all current filters
        const isOptionAvailable = devices && devices.some((device: IFilteredDevicesFromBack) => {
          const matchesFilters = Object.entries(tempFilters).every(([key, values]) => {
            if (values.length === 0) return true;
             //Get the value of device for filter 
            const deviceValue =
              key === "manufacturer" ? device.model.manufacturer?.slug :
              key === "type" ? device.model.type?.slug :
              key === "model" ? device.model.slug :
              key === "warehouse" ? device.warehouse?.slug :
              key === "memorySize" ? String(device.memorySize) :
              key === "screenSize" ? String(device.screenSize) :
              key === "isFunctional" ? String(device.isFunctional) :
              key === "isAssigned" ? String(device.isAssigned) :
              undefined;
            return values.includes(deviceValue as keyof IDeviceFilters);
          });
          return matchesFilters;
        });
        return !isOptionAvailable;
      });
    });

    setDisabledOptions(disabledOptions);
  }, [filters, devices, options]);

  // Set query params for backend
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
  
  // Disabled options of the checkboxes
  const getUniqueOptions = (key: keyof IDeviceFilters): CheckedDeviceOptions[] => {
    if (!options) return [];

    const optionsMap: Record<keyof IDeviceFilters, any[]> = {
      manufacturer: options.manufacturer?.map((option: any, index: number) => ({
        id: index + 1,
        name: option.name,
        type: option.slug,
        value: option.slug,
        disabled: disabledOptions?.manufacturer?.includes(option.slug),
      })),
      isFunctional: options.isFunctional?.map((option: any, index: number) => ({
        id: index + 1000,
        name: option.isFunctional ? "Да" : "Нет",
        type: "isFunctional",
        value: String(option.isFunctional),
        disabled: disabledOptions?.isFunctional?.includes(String(option.isFunctional)),
      })),
      type: options.type?.map((option: any, index: number) => ({
        id: index + 2000,
        name: option.name,
        type: option.slug,
        value: option.slug,
        disabled: disabledOptions?.type?.includes(option.slug),
      })),
      memorySize: options.memorySize?.map((option: any, index: number) => ({
        id: index + 3000,
        name: option.memorySize,
        type: "memorySize",
        value: String(option.memorySize),
        disabled: disabledOptions?.memorySize?.includes(String(option.memorySize)),
      })),
      screenSize: options.screenSize?.map((option: any, index: number) => ({
        id: index + 4000,
        name: option.screenSize,
        type: "screenSize",
        value: String(option.screenSize),
        disabled: disabledOptions?.screenSize?.includes(String(option.screenSize)),
      })),
      model: options.model?.map((option: any, index: number) => ({
        id: index + 5000,
        name: option.name,
        type: option.slug,
        value: option.slug,
        disabled: disabledOptions?.model?.includes(option.slug),
      })),
      warehouse: options.warehouse?.map((option: any, index: number) => ({
        id: index + 6000,
        name: option.name,
        type: option.slug,
        value: option.slug,
        disabled: disabledOptions?.warehouse?.includes(option.slug),
      })),
      isAssigned: options.isAssigned?.map((option: any, index: number) => ({
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

