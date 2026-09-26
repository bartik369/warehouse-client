import { Card, Flex } from 'antd';
import { LuUserCheck } from 'react-icons/lu';
import { TbUsers } from 'react-icons/tb';

import { CardTitle } from '@/shared/ui/card-title/CardTitle';
import { PageHeader } from '@/shared/ui/page-header/PageHeader';

import { createUserFields } from '../model/createUserFields';
import { useManageUser } from '../model/useManageUser';
import { useUserTableController } from '../model/useUserTableController';
import styles from './ManageUser.module.scss';
import { UserForm } from './form/UserForm';
import { UserFilters } from './user-filters/UserFilters';
import { UsersTable } from './users-table/UsersTable';

export const ManageUser = () => {
  const {
    user,
    filters,
    queryFilters,
    mode,
    locationsOptions,
    departmentsOptions,
    locationsLoading,
    departmentsLoading,
    onSearch,
    onEdit,
  } = useManageUser();
  const { page, limit, users, totalCount, isLoading, isFetching, setPage, setLimit } =
    useUserTableController(queryFilters);

  const isCreate = mode === 'create';

  return (
    <Flex vertical>
      <PageHeader
        title="Пользователи"
        description="Управление учетными записями. Добавление, редактирование общей информации"
      />
      <div className={styles.container}>
        <Card className={styles.card}>
          <Flex vertical gap={20}>
            <CardTitle title="Список пользователей" icon={<TbUsers size={16} />} />
            <UserFilters filters={filters} onSearch={onSearch} />
            <UsersTable
              page={page}
              limit={limit}
              users={users}
              totalCount={totalCount}
              loading={isLoading || isFetching}
              setLimit={setLimit}
              setPage={setPage}
              onEdit={onEdit}
            />
          </Flex>
        </Card>
        <Card className={styles.card}>
          <Flex vertical gap={20}>
            <CardTitle
              title={isCreate ? 'Добавить пользователя' : 'Обновить пользователя'}
              icon={<LuUserCheck size={16} />}
            />
            <UserForm
              user={user}
              mode={mode}
              fields={createUserFields}
              locationsOptions={locationsOptions}
              departmentsOptions={departmentsOptions}
              locationsLoading={locationsLoading}
              departmentsLoading={departmentsLoading}
            />
          </Flex>
        </Card>
      </div>
    </Flex>
  );
};
