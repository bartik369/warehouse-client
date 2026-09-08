import { Flex } from 'antd';
import { FcIdea } from 'react-icons/fc';
import { PiWarningDuotone } from 'react-icons/pi';

import previewPicture from '@/assets/elements/default.png';
import { Model } from '@/entities/model/model/types';
import { PATHS } from '@/shared/api/paths';
import { FormSection } from '@/shared/ui/form-section/FormSection';
import { InfoBlock } from '@/shared/ui/info-block/InfoBlock';

import { DEVICE_FORM_INFO } from '../model/constants';
import styles from './DeviceFrom.module.scss';

interface DevicePreviewProps {
  model?: Model;
}

export const DevicePreview = ({ model }: DevicePreviewProps) => {
  return (
    <Flex vertical gap={20}>
      <FormSection title="Предпросмотр">
        <Flex vertical gap={15}>
          <div className={styles.preview}>
            <img
              src={model?.imagePath ? `${PATHS.models}${model.imagePath}` : previewPicture}
              alt=""
            />
          </div>
        </Flex>
      </FormSection>
      <InfoBlock
        title={DEVICE_FORM_INFO.image.title}
        description={DEVICE_FORM_INFO.image.description}
        icon={<PiWarningDuotone size={19} />}
        variant="info"
      />
      <InfoBlock
        title={DEVICE_FORM_INFO.inventoryNumber.title}
        description={DEVICE_FORM_INFO.inventoryNumber.description}
        icon={<FcIdea size={20} />}
        variant="hint"
      />
    </Flex>
  );
};
