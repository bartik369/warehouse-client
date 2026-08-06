import { useCallback, useMemo, useState } from 'react';

import { Device } from '@/entities/device/model/types';
import { useAppDispatch, useAppSelector } from '@/hooks/redux/useRedux';
import { useDebounce } from '@/shared/lib/debounce/useDebounce';
import { DeviceAutocompleteItem } from '@/shared/ui/device-autocomplete/DeviceAutocompleteItem';
import { DeviceAutocompleteOption } from '@/shared/ui/device-autocomplete/types';
import { useSearchDevicesQuery } from '@/store/api/devicesApi';

import { clearAssignedDevices, deleteAssignedDevice, setAssignedDevice } from './issueSlice';

export const useDevice = () => {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState('');
  const [inputValue, setInputValue] = useState<string | undefined>('');
  const [device, setDevice] = useState<Device | null>(null);
  const [deviceId, setDeviceId] = useState('');
  const debouncedQuery = useDebounce(query.trim(), 700);
  const wasSearched = debouncedQuery.length >= 2;
  const state = useAppSelector((rootState) => rootState.issue);

  const {
    data: devices = [],
    isLoading,
    isFetching,
    isSuccess,
    error,
  } = useSearchDevicesQuery(debouncedQuery, {
    skip: !wasSearched,
  });

  const handleChange = (value: string) => {
    setQuery(value);
    setInputValue(value);
  };

  const handleSelect = (_value: string, option: DeviceAutocompleteOption) => {
    if (!option.device) return;
    setDevice(option.device);
    setInputValue(`${option.device.name} ${option.device.inventoryNumber}`);
    dispatch(setAssignedDevice(option.device));
  };

  const handleDelete = useCallback(
    (id: string) => {
      dispatch(deleteAssignedDevice(id));
    },
    [dispatch]
  );

  const handleReset = () => {
    setQuery('');
    setDeviceId('');
  };
  const handleResetDeviceList = () => {
    dispatch(clearAssignedDevices());
  };

  const assignedDevicesIds = useMemo(() => {
    return new Set(state.assignedDevices.map((device) => device.id));
  }, [state.assignedDevices]);

  const options = useMemo(() => {
    return devices
      .filter((item) => !item.isAssigned)
      .map((device) => {
        const isSelected = assignedDevicesIds.has(device.id);
        return {
          value: device.id,
          label: <DeviceAutocompleteItem device={device} disabled={isSelected} />,
          device,
          disabled: isSelected,
        };
      });
  }, [devices, assignedDevicesIds]);

  return {
    query,
    inputValue,
    device,
    devices,
    options,
    deviceId,
    wasSearched,
    isLoading,
    handleSelect,
    handleDelete,
    handleReset,
    handleChange,
    handleResetDeviceList,
  };
};
