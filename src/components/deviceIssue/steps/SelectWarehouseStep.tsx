import { useEffect } from "react";
import Select from "../select/Select";
import BtnAction from "@/components/ui/buttons/BtnAction";
import { useIssueContext } from "@/features/issue/context/IssueContext";
import { useAppSelector } from "@/hooks/redux/useRedux";
import { BaseDeviceQuery } from "@/types/devices";
import { RootState } from "@/store/store";
import { COLORS } from "@/utils/constants/ui/colors";
import { BUTTON_LABELS } from "@/utils/constants/ui/buttons";
import { BsCheck } from "react-icons/bs";
import styles from "./Steps.module.scss";

interface SelectWarehouseStepProps {
  actions: BaseDeviceQuery;
}

const SelectWarehouseStep = ({ actions }: SelectWarehouseStepProps) => {
  const { state } = useIssueContext();
  const currentUserId = useAppSelector(
    (state: RootState) => state.auth.user?.id
  );

  useEffect(() => {
    if (currentUserId) {
      actions.handleGetWarehousesByUser(currentUserId);
    }
  }, [currentUserId]);

  return (
    <div className={styles.inner}>
      <form className={styles.form}>
        <Select actions={actions} warehouses={state.warehouses} />
      </form>
      {state.warehouse.name && (
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
