import { useEffect } from 'react';

import { BsCheck } from 'react-icons/bs';

import BtnAction from '@/components/ui/buttons/BtnAction';
import { useAppSelector } from '@/hooks/redux/useRedux';
import { RootState } from '@/store/store';
import { Warehouse } from '@/types/locations';
import { BUTTON_LABELS } from '@/utils/constants/ui/buttons';
import { COLORS } from '@/utils/constants/ui/colors';

import Select from '../select/Select';
import styles from './Steps.module.scss';

interface SelectWarehouseStepProps {
  userWarehouse: (id: string) => void;
  nextStep: () => void;
  setWarehouse: (item: Warehouse) => void;
  fullReset: () => void;
  warehouse: Warehouse;
  warehouses: Warehouse[];
}

const SelectWarehouseStep = ({
  warehouse,
  warehouses,
  userWarehouse,
  nextStep,
  setWarehouse,
  fullReset,
}: SelectWarehouseStepProps) => {
  const currentUserId = useAppSelector((state: RootState) => state.auth.user?.id);

  useEffect(() => {
    if (currentUserId) {
      userWarehouse(currentUserId);
    }
  }, [currentUserId, userWarehouse]);

  return (
    <div className={styles.inner}>
      <form className={styles.form}>
        <Select
          warehouses={warehouses}
          warehouse={warehouse}
          setWarehouse={setWarehouse}
          fullReset={fullReset}
        />
      </form>
      {warehouse.name && (
        <div className={styles.actions}>
          <BtnAction
            icon={<BsCheck />}
            size="lg"
            color={COLORS.darkGreen}
            title={BUTTON_LABELS.select}
            click={nextStep}
          />
        </div>
      )}
    </div>
  );
};

export default SelectWarehouseStep;
