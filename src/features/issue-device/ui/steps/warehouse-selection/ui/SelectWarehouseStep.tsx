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
  warehouse: IssueWarehouse;
  currentStep: number;
}

export const SelectWarehouseStep = ({
  actions,
  warehouse,
  currentStep,
}: SelectWarehouseStepProps) => {
  const currentUserId = useAppSelector((state: RootState) => state.auth.user?.id);
  const isNextDisabled = !warehouse.data.warehouse;

  const left = (
    <WarehouseSelect
      loading={warehouse.status.isLoadingWarehouses}
      prefix={<LiaWarehouseSolid />}
      value={warehouse.data.warehouse}
      warehouses={warehouse.data.warehouses}
      locations={warehouse.data.locations}
      onChange={warehouse.actions.handleSelect} // todo чекнуть название
      onReset={warehouse.actions.handleReset}
      label="Выбрать склад"
    />
  );
  const right = (
    <Information warehouse={warehouse.data.warehouse} location={warehouse.data.selectedLocation} />
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
