import { Button } from 'antd';
import { ColumnType } from 'antd/es/table';
import { FaCircleInfo } from 'react-icons/fa6';
import { IoCheckmark } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';

import { Device } from '@/entities/device/model/types';
import { sortNumbers } from '@/shared/lib/export/sortNums';
import { CustomTag } from '@/shared/ui/custom-tag/CustomTag';
import { DeviceFilters, Entity, FilterDeviceOptions } from '@/types/devices';

import styles from './Columns.module.scss';

export const getDevicesColumns = ({
  onView,
}: {
  onView: (deviceId: string) => void;
}): ColumnType<Device>[] => {
  const TABLE_TITLES = {
    manufacturer: 'Производитель',
    type: 'Тип',
    model: 'Модель',
    warehouse: 'Склад',
    screenSize: 'Размер экрана',
    memorySize: 'ОЗУ(Гб)',
    isFunctional: 'Состояние',
    isAssigned: 'Используется',
    inventoryNumber: 'Инвентарный номер',
    serialNumber: 'Серийный номер',
  };

  return [
    {
      key: 'manufacturer',
      title: TABLE_TITLES.manufacturer,
      dataIndex: ['model', 'manufacturer', 'name'],
      width: 220,
      align: 'center',
      sorter: (a, b) =>
        (a.model?.manufacturer?.name ?? '').localeCompare(b.model?.manufacturer?.name ?? ''),
    },
    {
      key: 'type',
      title: TABLE_TITLES.type,
      dataIndex: ['model', 'type', 'name'],
      width: 220,
      align: 'center',
      sorter: (a, b) => (a.model?.type?.name || '').localeCompare(b.model?.type?.name || ''),
    },
    {
      key: 'model',
      title: TABLE_TITLES.model,
      dataIndex: ['model', 'name'],
      width: 170,
      align: 'center',
      sorter: true,
    },
    {
      key: 'warehouse',
      title: TABLE_TITLES.warehouse,
      dataIndex: ['warehouse', 'name'],
      width: 200,
      align: 'center',
      sorter: (a, b) => (a.warehouse?.name || '').localeCompare(b.warehouse?.name || ''),
    },
    {
      key: 'screenSize',
      title: TABLE_TITLES.screenSize,
      dataIndex: 'screenSize',
      width: 160,
      align: 'center',
      sorter: (a, b, sortNumber) => sortNumbers(a.screenSize, b.screenSize, sortNumber!),
    },
    {
      key: 'memorySize',
      title: TABLE_TITLES.memorySize,
      dataIndex: 'memorySize',
      width: 160,
      align: 'center',
      sorter: (a, b, sortOrder) => sortNumbers(a.memorySize, b.memorySize, sortOrder),
    },
    {
      key: 'isFunctional',
      title: TABLE_TITLES.isFunctional,
      dataIndex: 'isFunctional',
      width: 160,
      align: 'center',
      sorter: (a, b) => Number(a.isFunctional) - Number(b.isFunctional),
      render: (isFunctional: boolean) => (
        <div className={styles.iconWrapper}>
          {isFunctional ? (
            <CustomTag
              variant="success"
              title="Исправно"
              size="sm"
              icon={IoCheckmark}
              iconSize={11}
            />
          ) : (
            <CustomTag
              variant="warning"
              title="Неисправно"
              size="sm"
              icon={RxCross2}
              iconSize={11}
            />
          )}
        </div>
      ),
    },
    {
      key: 'isAssigned',
      title: TABLE_TITLES.isAssigned,
      dataIndex: 'isAssigned',
      width: 150,
      align: 'center',
      sorter: (a, b) => Number(a.isAssigned) - Number(b.isAssigned),
      render: (isAssigned: boolean) => (
        <div className={styles.iconWrapper}>
          {!isAssigned ? (
            <CustomTag variant="success" title="Нет" size="sm" icon={IoCheckmark} iconSize={11} />
          ) : (
            <CustomTag variant="warning" title="Да" size="sm" icon={RxCross2} iconSize={11} />
          )}
        </div>
      ),
    },
    {
      key: 'inventoryNumber',
      title: TABLE_TITLES.inventoryNumber,
      dataIndex: 'inventoryNumber',
      width: 200,
      align: 'center',
      sorter: true,
    },
    {
      key: 'serialNumber',
      title: TABLE_TITLES.serialNumber,
      dataIndex: 'serialNumber',
      width: 220,
      align: 'center',
      sorter: true,
    },
    {
      key: 'actions',
      title: '',
      fixed: 'right',
      width: 60,
      align: 'center',
      render: (_, record: Device) => (
        <Button
          className={styles.infoButton}
          type="link"
          icon={<FaCircleInfo />}
          onClick={() => onView?.(record.id)}
          title="Информация"
        />
      ),
    },
  ];
};
