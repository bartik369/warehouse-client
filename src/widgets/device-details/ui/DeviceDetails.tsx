import { Alert, Card, Empty, Flex } from 'antd';
import { useParams } from 'react-router-dom';

import { PATHS } from '@/shared/api/paths';
import { Spinner } from '@/shared/ui/spinner/Spinner';
import { useGetDeviceQuery } from '@/store/api/devicesApi';

// import testImg from '../../../assets/elements/test-preview.jpg';
import styles from './DeviceDetails.module.scss';
import { DeviceStatusLocation } from './DeviceStatusLocation';
import { PriceInfo } from './PriceInfo';
import { TechnicalInfo } from './TechnicalInfo';
import { WarrantyInfo } from './WarrantyInfo';
import { DeviceDetailsTabs } from './device-activity/DeviceDetailsTabs';
import { DeviceGeneralInfo } from './general-info/DeviceGeneralInfo';

export const DeviceDetails = () => {
  const { id } = useParams();
  if (!id) return null;

  return <DeviceDetailsContent id={id} />;
};

const DeviceDetailsContent = ({ id }: { id: string }) => {
  const { data: device, isLoading, isError } = useGetDeviceQuery(id);

  if (isLoading) return <Spinner />;

  if (isError) {
    return <Alert type="error" message="Не удалось загрузить устройство" />;
  }
  if (!device) return <Empty />;

  return (
    <Flex vertical gap={20}>
      <DeviceGeneralInfo device={device} />
      <div className={styles.content}>
        <Card className={styles.container}>
          <div className={styles.preview}>
            <img src={`${PATHS.models}${device.model?.imagePath}`} alt="" />
            {/* <img src={testImg} alt="" /> */}
          </div>
        </Card>
        <TechnicalInfo device={device} />
        <DeviceStatusLocation device={device} />
        <PriceInfo device={device} />
        <WarrantyInfo device={device} />
      </div>
      <Card>
        <DeviceDetailsTabs />
      </Card>
    </Flex>
  );
};
