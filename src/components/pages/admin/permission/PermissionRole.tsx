import React from 'react';
import styles from '../Admin.module.scss';
import AccessForm from '../../../forms/access/AccessForm';
import { usePermission } from '../../../../hooks/data/usePermission';

const PermissionRole = () => {
      const {
        entity,
        errors,
        isUpdate,
        actions,
        list,
        setList,
      } = usePermission();
    return (
        <section className={styles.inner}>
          <div className={styles.form}>
           <AccessForm
           entity={entity}
           list={list}
           setList={setList}
           isUpdate={isUpdate}
           errors={errors}
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