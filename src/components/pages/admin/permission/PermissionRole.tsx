import React from 'react';
import AccessForm from '../../../forms/access/AccessForm';
import { usePermission } from '../../../../hooks/data/usePermission';
import styles from '../Admin.module.scss';

const PermissionRole = () => {
      const {
        entity,
        state,
        isUpdate,
        actions,
      } = usePermission();
    return (
        <section className={styles.inner}>
          <div className={styles.form}>
           <AccessForm
            state={state}
            entity={entity}
            isUpdate={isUpdate}
            errors={state.errors}
            actions={actions}
           />
          </div>
          <aside className={styles.list}>
            {/* <ItemsList
              field="permission"
              items={permissions || []}
              onEdit={handleGetEntity}
              onDelete={handleDeleteEntity}
            /> */}
          </aside>
        </section>
    )
};

export default PermissionRole;