import { Button, Dropdown, MenuProps } from 'antd';
import clsx from 'clsx';
import { FaFileExcel } from 'react-icons/fa';
import { FaFileCsv } from 'react-icons/fa';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { PiExport } from 'react-icons/pi';

import { exportToCSV, exportToExcel } from '@/shared/lib/export/export-file';

import styles from './ExportFile.module.scss';

interface ExportFileProps<T> {
  stack: T[];
}

export const ExportFile = <T,>({ stack }: ExportFileProps<T>) => {
  const items: MenuProps['items'] = [
    {
      label: 'EXCEL',
      key: '1',
      icon: <FaFileExcel size={17} color="var(--green-500)" />,
      onClick: () => exportToExcel(stack),
    },
    {
      label: 'CSV',
      key: '2',
      icon: <FaFileCsv size={17} color="var(--muted-blue-600)" />,
      onClick: () => exportToCSV(stack),
    },
  ];

  const handleDownload = () => {};
  const menuProps = {
    items,
    onClick: handleDownload,
  };

  return (
    <Dropdown
      menu={menuProps}
      placement="bottomRight"
      trigger={['click']}
      rootClassName={clsx(styles.dropdown)}
    >
      <Button className={styles.exportButton}>
        <PiExport size={17} className={styles.icon} />
        <span>Экспорт</span>
        <MdKeyboardArrowDown className={styles.arrow} size={17} />
      </Button>
    </Dropdown>
  );
};
