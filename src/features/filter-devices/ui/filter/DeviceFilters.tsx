import { Flex } from 'antd';
import type { SelectProps } from 'antd';
import { GrDocumentText } from 'react-icons/gr';
import { HiOutlineSelector } from 'react-icons/hi';
import { LiaCitySolid } from 'react-icons/lia';
import { MdOutlineWarehouse } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';

import { CheckboxList } from '@/shared/ui/checkbox-list/CheckboxList';
import { SelectField } from '@/shared/ui/select-field/SelectField';

import { DeviceFiltersType } from '../../model/types';
import styles from './DeviceFilters.module.scss';

interface DeviceFiltersProps {
  filters: DeviceFiltersType;
  citiesOptions: SelectProps['options'];
  statusesOptions: SelectProps['options'];
  warehousesOptions: SelectProps['options'];
  handleWarehouseChange: (value: string[]) => void;
  handleStatusChange: (value: string) => void;
}

export const DeviceFilters = ({
  filters,
  citiesOptions,
  statusesOptions,
  warehousesOptions,
  handleWarehouseChange,
  handleStatusChange,
}: DeviceFiltersProps) => {
  const { city } = useParams<{ city: string }>();

  const navigate = useNavigate();
  return (
    <Flex>
      <Flex gap={20}>
        <SelectField
          value={city}
          className={styles.select}
          popupClassName={styles.citySelectDropdown}
          label="Город"
          options={citiesOptions}
          suffixIcon={<HiOutlineSelector size={14} />}
          prefix={<LiaCitySolid size={17} className={styles.icon} />}
          onChange={(city) => navigate(`/devices/locations/${city}`)}
        />
        <CheckboxList
          width={245}
          allowClear
          label="Склад"
          showSearch={false}
          mode="multiple"
          maxTagCount={1}
          value={filters.warehouseIds}
          options={warehousesOptions}
          prefix={<MdOutlineWarehouse size={16} className={styles.icon} />}
          onChange={handleWarehouseChange}
        />
        <CheckboxList
          width={130}
          label="Состояние"
          allowClear
          value={filters.isFunctional == null ? null : String(filters.isFunctional)}
          options={statusesOptions}
          suffix={<HiOutlineSelector size={14} />}
          prefix={<GrDocumentText size={14} className={styles.icon} />}
          onChange={handleStatusChange}
        />
      </Flex>
    </Flex>
  );
};
