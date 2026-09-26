import { SelectProps } from 'antd';

export const mapEntityToOptions = (items: SelectProps['options']) => {
  return items.map((item) => ({
    key: item.key,
    label: item.name,
    value: item.id,
  }));
};
