import { useState, useEffect, ChangeEvent, useCallback } from 'react';
import { DeviceFilters, FilteredDevicesFromBack } from './../../types/devices';
import { CheckedDeviceOptions } from '../../types/content';
import { useSearchParams, useParams } from 'react-router-dom';
import { yes, no, inStock, inUse } from '../../utils/constants/constants';
import { useGetDevicesQuery, useGetDeviceOptionsQuery } from '../../store/api/devicesApi';
import { skipToken } from '@reduxjs/toolkit/query';

export const useDeviceFilters = () => {
  const [resetFilters, setResetFilters] = useState<Record<string, boolean>>({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeLink, setActiveLink] = useState(false)
  const [disabledOptions, setDisabledOptions] = useState<Record<string, string[]>>({});
  const {city} = useParams();
  const params = Object.fromEntries(searchParams);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState(20)
  const deviceOptionArgs = city ?? skipToken;
  const deviceQueryArgs = city ? {...params, city, page, limit } : skipToken;
  const { data: options } = useGetDeviceOptionsQuery(deviceOptionArgs);
  const { data: devices } = useGetDevicesQuery(deviceQueryArgs);
  
  const [filters, setFilters] = useState<DeviceFilters>({
    manufacturer: [],
    isFunctional: [],
    isAssigned: [],
    type: [],
    memorySize: [],
    screenSize: [],
    model: [],
    warehouse: [],
  });
  const [labels, setLabels] = useState<DeviceFilters>({
    manufacturer: [],
    isFunctional: [],
    isAssigned: [],
    type: [],
    memorySize: [],
    screenSize: [],
    model: [],
    warehouse: [],
  });
  const [list, setList] = useState<Record<number, boolean>>({})

  useEffect(() => {
    handleResetFilter();
    setPage(1);
  }, [city])

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
      isFunctional: ['true', 'false'],
      isAssigned: ['true', 'false'],
    };
    //Checking available options by selected filters
    Object.entries(devicesOptions).forEach(([key, optionList]) => {
      //Filtering options that cant be selected  based on the selected files
      disabledOptions[key] = optionList.filter((option) => {
        // Creating temporary filters with the addition current option
        const tempFilters = { ...filters, [key]: [...filters[key as keyof DeviceFilters], option] }; 
        // Checking some device which matches all current filters
        const isOptionAvailable = devices && (devices.devices as FilteredDevicesFromBack[]).some((device: FilteredDevicesFromBack) => {
          const matchesFilters = Object.entries(tempFilters).every(([key, values]) => {
            if (values.length === 0) return true;
             //Get the value of device for filter 
            const deviceValue =
              key === 'manufacturer' ? device.model.manufacturer?.slug :
              key === 'type' ? device.model.type?.slug :
              key === 'model' ? device.model.slug :
              key === 'warehouse' ? device.warehouse?.slug :
              key === 'memorySize' ? String(device.memorySize) :
              key === 'screenSize' ? String(device.screenSize) :
              key === 'isFunctional' ? String(device.isFunctional) :
              key === 'isAssigned' ? String(device.isAssigned) :
              undefined;
            return values.includes(deviceValue as keyof DeviceFilters);
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
      if (filters[key as keyof DeviceFilters].length) {
        params[key] = filters[key as keyof DeviceFilters].join(',');
      }
    });

    params.page = String(page);
    params.limit = String(limit)
    setSearchParams(params);

  }, [filters, setSearchParams, page]);

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>, item:CheckedDeviceOptions) => {
    const { name } = e.target;

    if (!(name in filters)) return;

    if (Array.isArray(filters[name as keyof DeviceFilters])) {
      const key = name as keyof DeviceFilters;
      const updatedValues = filters[key].includes(String(item.value))
        ? filters[key].filter((value) => value !== String(item.value))
        : [...filters[key], String(item.value)];
      setFilters((prev) => ({
        ...prev,
        [key]: updatedValues,
      }));
    }
    if (Array.isArray(labels[name as keyof DeviceFilters])) {
      const key = name as keyof DeviceFilters;
      const updatedLabels = labels[key].includes(String(item.name))
        ? labels[key].filter((value) => value !== String(item.name))
        : [...labels[key], String(item.name)];
      setLabels((prev) => ({
        ...prev,
        [key]: updatedLabels,
      }));
    }
  };
  // Reset all filter
  const handleResetFilter = useCallback(() => {
    if (!filters) return;
    setFilters(() => ({
      manufacturer: [],
      isFunctional: [],
      isAssigned: [],
      type: [],
      memorySize: [],
      screenSize: [],
      model: [],
      warehouse: [],
    }));
    setLabels(() => ({
      manufacturer: [],
      isFunctional: [],
      isAssigned: [],
      type: [],
      memorySize: [],
      screenSize: [],
      model: [],
      warehouse: [],
    }));
    setSearchParams({});
    setResetFilters({});
    setActiveLink(false)
    setList({})
  }, [filters, labels]);
  
  // Disabled options of the checkboxes
  const getUniqueOptions = (key: keyof DeviceFilters): CheckedDeviceOptions[] => {
    if (!options) return [];

    const idOptionsOffsets: Record<keyof DeviceFilters, number> = {
      manufacturer: 1,
      isFunctional: 1000,
      type: 2000,
      memorySize: 3000,
      screenSize: 4000,
      model: 5000,
      warehouse: 6000,
      isAssigned: 7000,
    };

    // Типы опций с разными полями
    type DeviceOptionMap = {
      type: { slug: string; name: string };
      model: { slug: string; name: string };
      manufacturer: { slug: string; name: string };
      warehouse: { slug: string; name: string };
      memorySize: { memorySize: number };
      screenSize: { screenSize: number };
      isAssigned: { isAssigned: boolean };
      isFunctional: { isFunctional: boolean };
    };

    type DeviceOptionKey = keyof DeviceOptionMap;
    return (
      options[key as DeviceOptionKey]?.map((option, index: number) => {
        let value = '';
        let name = '';

        // Безопасный switch для правильного получения value и name
        switch (key) {
          case 'manufacturer':
          case 'type':
          case 'model':
          case 'warehouse':
            if ('slug' in option && 'name' in option) {
              value = option.slug;
              name = option.name;
            }
            break;
          case 'memorySize':
            if ('memorySize' in option) {
              value = String(option.memorySize);
              name = value;
            }
            break;
          case 'screenSize':
            if ('screenSize' in option) {
              value = String(option.screenSize);
              name = value;
            }
            break;
          case 'isFunctional':
            if ('isFunctional' in option) {
              value = String(option.isFunctional);
              name = option.isFunctional ? yes : no;
            }
            break;
          case 'isAssigned':
            if ('isAssigned' in option) {
              value = String(option.isAssigned);
              name = option.isAssigned ? inUse : inStock;
            }
            break;
          default:
            break;
        }

        return {
          id: String(index + idOptionsOffsets[key]),
          value,
          disabled: disabledOptions?.[key]?.includes(value),
          name,
          type: key,
        };
      }) || []
    );
  };

  const handlePrevPage = useCallback(() => {
    setPage((prev) => prev - 1);
  }, []);
  const handleNextPage = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  
  return { devices, list, labels, options, filters, activeLink, searchParams, disabledOptions, 
    resetFilters, page, setPage, setList, handleResetFilter, handleFilterChange, getUniqueOptions, 
    handlePrevPage, handleNextPage };
};
