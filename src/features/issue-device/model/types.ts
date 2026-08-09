import type { ReactNode } from 'react';

import { AutoCompleteProps, StepsProps } from 'antd';

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

export type IssueProcessStatus = 'draft' | 'sign_document' | 'completed';
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
