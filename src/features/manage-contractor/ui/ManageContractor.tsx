import { Flex } from 'antd';

import { AdminEntityList } from '@/shared/ui/admin-entity-list/AdminEntityList';

import { useManageContractor } from '../model/useManageContactor';
import { ContractorForm } from './ContractorForm';

export const ManageContractor = () => {
  const {
    contractors,
    editingContractor,
    mode,
    contractorsLoading,
    contractorsFetching,
    onEdit,
    onSave,
    onDelete,
    resetId,
  } = useManageContractor();
  return (
    <Flex gap={20}>
      <ContractorForm data={editingContractor} mode={mode} resetId={resetId} onSave={onSave} />
      <AdminEntityList
        loading={contractorsLoading}
        fetching={contractorsFetching}
        items={contractors}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </Flex>
  );
};
