import { Flex } from 'antd';

import Search from '@/shared/ui/search/Search';

import { UserFilterState } from '../../model/types';

interface UserFiltersProps {
  filters: UserFilterState;
  onSearch: (value: string) => void;
}

export const UserFilters = ({ filters, onSearch }: UserFiltersProps) => {
  return (
    <Flex>
      <Search
        placeholder="Укажите фамилию(на латинице), либо email"
        value={filters.search}
        onChange={onSearch}
      />
    </Flex>
  );
};
