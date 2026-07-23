import { Flex } from 'antd';

import { useManageAccess } from '../model/useManageAccess';
import { AccessForm } from './AccessForm';
import styles from './ManageAccess.module.scss';

export const ManageAccess = () => {
  const { roles, onSave } = useManageAccess();
  return (
    <Flex gap={20} className={styles.page}>
      <div className={styles.formColumn}>
        <AccessForm onSave={onSave} roles={roles} />
      </div>
      <div className={styles.listColumn}>
        {/* <AdminEntityList
          loading={contractorsLoading}
          fetching={contractorsFetching}
          items={contractors}
          onEdit={onEdit}
          onDelete={onDelete}
        /> */}
      </div>
    </Flex>
  );
};
