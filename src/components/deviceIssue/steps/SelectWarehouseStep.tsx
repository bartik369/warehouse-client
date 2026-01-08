import { useEffect } from 'react';

import { BsCheck } from 'react-icons/bs';

import BtnAction from '@/components/ui/buttons/BtnAction';
import { useAppSelector } from '@/hooks/redux/useRedux';
import { RootState } from '@/store/store';
import { BaseIssueQuery } from '@/types/issue';
import { Warehouse } from '@/types/locations';
import { BUTTON_LABELS } from '@/utils/constants/ui/buttons';
import { COLORS } from '@/utils/constants/ui/colors';

import Select from '../select/Select';
import styles from './Steps.module.scss';

interface SelectWarehouseStepProps {
  actions: BaseIssueQuery;
  warehouse: Warehouse;
  warehouses: Warehouse[];
}

const SelectWarehouseStep = ({ actions, warehouse, warehouses }: SelectWarehouseStepProps) => {
  const currentUserId = useAppSelector((state: RootState) => state.auth.user?.id);

  useEffect(() => {
    if (currentUserId) {
      actions.handleGetWarehousesByUser(currentUserId);
    }
  }, [currentUserId]);

  return (
    <div className={styles.inner}>
      <form className={styles.form}>
        <Select actions={actions} warehouses={warehouses} warehouse={warehouse} />
      </form>
      {warehouse.name && (
        <div className={styles.actions}>
          <BtnAction
            icon={<BsCheck />}
            size="lg"
            color={COLORS.darkGreen}
            title={BUTTON_LABELS.select}
            click={actions.handleNextStep}
          />
        </div>
      )}
    </div>
  );
};

export default SelectWarehouseStep;
