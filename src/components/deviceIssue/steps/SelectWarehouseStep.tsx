import { useEffect } from "react";
import Select from "../select/Select";
import { useIssueContext } from "../../../features/issue/context/IssueContext";
import { useAppSelector } from "../../../hooks/redux/useRedux";
import { BaseDeviceQuery } from "../../../types/devices";
import { RootState } from "../../../store/store";
import { select } from "../../../utils/constants/constants";
import BtnAction from "../../ui/buttons/BtnAction";
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
        <Select
          actions={actions}
          warehouses={state.warehouses}
        />
      </form>
      {state.warehouse.name &&
     <div className={styles.actions}>
     <BtnAction
       icon={<BsCheck />}
       size="lg"
       color="dark-green"
       title={select}
       click={actions.handleNextStep}
     />
   </div>
      }
    </div>
  );
};

export default SelectWarehouseStep;
