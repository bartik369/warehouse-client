import { Flex, Image, Upload } from 'antd';
import { FiEdit } from 'react-icons/fi';
import { SlPicture } from 'react-icons/sl';

import { IconButton } from '@/shared/ui/icon-button/IconButton';

import styles from './Picture.module.scss';

interface PictureProps {
  previewUrl: string | null;
  onPreview: (file: File) => void;
}

export const Picture = ({ previewUrl, onPreview }: PictureProps) => {
  return (
    <Upload showUploadList={false} maxCount={1} beforeUpload={onPreview}>
      <Flex vertical gap={10} className={styles.container}>
        <IconButton icon={FiEdit} style={{ position: 'absolute', top: '10px', right: '10px' }} />
        {previewUrl ? (
          <Image width={240} src={previewUrl} preview={false} />
        ) : (
          <div className={styles.placeholder}>
            <SlPicture className={styles.placeholderIcon} />
            <span className={styles.placeholderText}>Нет фото</span>
          </div>
        )}
        <Flex className={styles.description}>
          <span>Рекомендуемый размер: 400х400px</span>
          <span>Формат: JPG, PNG до 2мб</span>
        </Flex>
      </Flex>
    </Upload>
  );
};
