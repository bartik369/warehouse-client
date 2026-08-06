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
