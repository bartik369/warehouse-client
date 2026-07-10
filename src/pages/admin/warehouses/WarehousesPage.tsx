import MultiForm from '@/components/forms/multi/MultiForm';
import { warehouseFormFields } from '@/components/forms/multi/formConfigs/modelFormFields';
import { useAddAdminEntities } from '@/hooks/data/useAddAdminEntities';
import { useGetWarehousesQuery } from '@/store/api/warehousesApi';
import { SECTION_TITLES } from '@/utils/constants/ui/titles';

import styles from '../Admin.module.scss';
import ItemsList from '../ItemsList';

const WarehousesPage = () => {
  const { data: warehouses } = useGetWarehousesQuery();
  const { actions, state } = useAddAdminEntities();

  return (
    <section className={styles.inner}>
      <div className={styles.form}>
        <MultiForm
          fields={warehouseFormFields}
          title={SECTION_TITLES.addWarehouse}
          actions={actions}
          state={state}
          locationType="warehouse"
        />
      </div>
      <aside className={styles.list}>
        <ItemsList field="warehouse" items={warehouses || []} actions={actions} />
      </aside>
    </section>
  );
};

export default WarehousesPage;
