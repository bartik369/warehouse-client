import { useEffect } from 'react';

import { Flex } from 'antd';
import { LiaWarehouseSolid } from 'react-icons/lia';

import { IssueActions, IssueWarehouse } from '@/features/issue-device/model/useIssue';
import { useAppSelector } from '@/hooks/redux/useRedux';
import { WarehouseSelect } from '@/shared/ui/warehouse-select/WarehouseSelect';
import { RootState } from '@/store/store';

import WarehousePick from '../../../../../../assets/elements/warehouse.png';
import { StepLayout } from '../../layout/StepLayout';
import { Information } from './warehouse-card/Information';

interface SelectWarehouseStepProps {
  actions: IssueActions;
  warehouseController: IssueWarehouse;
  currentStep: number;
}

export const SelectWarehouseStep = ({
  actions,
  warehouseController,
  currentStep,
}: SelectWarehouseStepProps) => {
  const isNextDisabled = !warehouseController.data.currentWarehouse?.id;

  const left = (
    <WarehouseSelect
      loading={warehouseController.status.isLoadingWarehouses}
      prefix={<LiaWarehouseSolid />}
      value={warehouseController.data.currentWarehouse}
      warehouses={warehouseController.data.warehouses}
      locations={warehouseController.data.locations}
      onChange={warehouseController.actions.handleSelect} // todo чекнуть название
      onReset={warehouseController.actions.handleReset}
      label="Выбрать склад(демо IT-склад 1 этаж / 4 этаж)"
    />
  );
  const right = (
    <Information
      warehouse={warehouseController.data.currentWarehouse}
      location={warehouseController.data.selectedLocation}
    />
  );

  return (
    <StepLayout
      leftWidth={500}
      currentStep={currentStep}
      disabledStep={isNextDisabled}
      left={left}
      right={right}
      onNext={actions.handleNextStep}
      onBack={actions.handleBackStep}
    />
  );
};
