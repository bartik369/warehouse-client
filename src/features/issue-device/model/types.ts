import type { ReactNode } from 'react';

import { AutoCompleteProps, StepsProps } from 'antd';
import { IconType } from 'react-icons';

import { User } from '@/entities/user/model/types';
import { Warehouse } from '@/entities/warehouse/model/types';
import { Status } from '@/shared/ui/custom-tag/types';

type StepsItemsType = StepsProps['items'];
type NonNullableStepsItems = NonNullable<StepsItemsType>;
export type ItemType = NonNullableStepsItems[number];

export type AutoCompleteOptions = NonNullable<AutoCompleteProps['options']>;

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

export type IssueProcessDto = {
  id: string;
  documentNo: string;
  userId: string;
  recipientFirstName: string;
  recipientLastName: string;
  warehouseId: string;
  warehouseName: string;
  issuedById: string;
  initiatorFirstName: string;
  initiatorLastName: string;
  issueDate: Date;
  comment?: string;
  status: string;
  fileId?: string;
  fileName?: string;
  filePath?: string;
  createdAt: Date;
  updatedAt: Date;
};
export type CreateIssueProcessRequest = {
  documentNo: string;
  issuedById: string;
  status: IssueProcessStatus;
  userId: string;
  warehouseId: string;
};

export type IssueProcessListItem = {
  id: string;
  documentNo: string;
  status: string;
  issueDate: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    firstNameRu: string;
    lastNameRu: string;
    department: {
      id: string;
      name: string;
    } | null;
  };
  warehouse: {
    id: string;
    name: string;
    location: {
      id: string;
      name: string;
    } | null;
  };
  issuedBy: {
    id: string;
    firstNameRu: string;
    lastNameRu: string;
    department: {
      id: string;
      name: string;
    } | null;
  };
};

export enum IssueProcessStatus {
  Draft = 'draft',
  Completed = 'completed',
}
export type IssueProcessStatusConfig = {
  title: string;
  variant: Status;
  icon?: IconType;
  iconSize?: number;
};

export type FinalizeIssueRequest = {
  processId: string;
  deviceIds: string[];
  file: Blob;
};

export type SearchDevicesParams = {
  q: string;
  warehouseId: string;
};

export type EquipmentIssuance = {
  id: string;
  documentNo: string;
  userId: string;
  warehouseId: string;
  issuedById: string;
  issueDate: string;
  comment: string | null;
  status: IssueProcessStatus;
  fileId: string | null;
  createdAt: string;
  updatedAt: string;
  user: User;
  issuedBy: {
    id: string;
    userName: string;
    email: string;
    workId: string;
    firstNameRu: string;
    lastNameRu: string;
    firstNameEn: string;
    lastNameEn: string;
    isActive: boolean;
    locationId: string;
    createdAt: string;
    updatedAt: string;
    departmentId: string;
  };
  warehouse: Warehouse;
};

export interface IssueProcessUser {
  id: string;
  firstNameRu: string;
  lastNameRu: string;
  firstNameEn: string;
  lastNameEn: string;
  email: string;
  workId: string | null;
  department: {
    id: string;
    name: string;
  } | null;
}

export interface IssueProcessWarehouse {
  id: string;
  name: string;
}

export interface IssueProcessDetails {
  id: string;
  documentNo: string;
  userId: string;
  warehouseId: string;
  issuedById: string;
  issueDate: string;
  comment: string | null;
  status: string;
  fileId: string | null;
  createdAt: string;
  updatedAt: string;
  user: IssueProcessUser;
  issuedBy: IssueProcessUser;
  warehouse: IssueProcessWarehouse;
}
