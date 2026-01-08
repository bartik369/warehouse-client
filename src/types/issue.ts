import { StepsProps } from 'antd';

import { Warehouse } from './locations';

type StepsItemsType = StepsProps['items'];
type NonNullableStepsItems = NonNullable<StepsItemsType>;
export type ItemType = NonNullableStepsItems[number];

export interface AssignedDevice {
  id: string;
  name: string;
  modelName?: string | null;
  modelType: string;
  manufacturer?: string | null;
  inventoryNumber?: string | null;
  serialNumber?: string | null;
}

export interface BaseIssueQuery {
  handleCompleteProcess: (file: Blob) => void;
  handleUserChange: (value: string) => void;
  handleFullReset: () => void;
  handleResetDeviceQuery: () => void;
  handleSetUser: (id: string) => Promise<void>;
  handleStartDeviceIssueWith: (id: string) => void;
  handleGetDevice: () => void;
  handleDeviceChange: (value: string) => void;
  handleSetDevice: (item: AssignedDevice) => void;
  handleSetWarehouse: (item: Warehouse) => void;
  handleGetWarehousesByUser: (id: string) => void;
  handleNextStep: () => void;
  handleDeleteDevice: (id: string) => void;
  handleResetIssueDevices: () => void;
  handleSetStep: (step: number) => void;
  handleResetUser: () => void;
  handleResetUserQuery: () => void;
  isSuccess: boolean;
  isFetching: boolean;
  isIssueSuccess: boolean;
  isIssueLoading: boolean;
}
