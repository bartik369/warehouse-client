import { Warehouse } from './locations';

export interface AssignedDevice {
  id: string;
  name: string;
  modelName?: string | null;
  modelType: string;
  manufacturer?: string | null;
  inventoryNumber?: string | null;
  serialNumber?: string | null;
  isAssigned?: boolean;
}

export interface IssueActions {
  onNext: () => void;
  onPrev: () => void;

  // handleCompleteProcess: (file: Blob) => Promise<void>;
  // handleUserChange: (value: string) => void;
  // handleFullReset: () => void;
  // handleResetDeviceQuery: () => void;
  // handleSetUser: (id: string) => Promise<void>;
  // handleStartDeviceIssueWith: (id: string) => Promise<void>;
  // handleGetDevice: () => Promise<void>;
  // handleDeviceChange: (value: string) => void;
  // handleSetDevice: (item: AssignedDevice) => void;
  // handleSetWarehouse: (warehouse: Warehouse) => void;
  // handleResetWarehouse: () => void;
  // handleGetWarehousesByUser: (id: string) => Promise<void>;
  // handleDeleteDevice: (id: string) => void;
  // handleResetIssueDevices: () => void;
  // handleSetStep: (step: number) => void;
  // handleResetUser: () => void;
  // handleResetUserQuery: () => void;
  // handleResetIssue: () => void;
}

export interface IssueStatus {
  isSuccess: boolean;
  isFetching: boolean;
  isIssueSuccess: boolean;
  isIssueLoading: boolean;
}

export interface IssueData {
  warehouses: Warehouse[];
}
