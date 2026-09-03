import previewPicture from '@/assets/elements/default.png';
import { useAppSelector } from '@/hooks/redux/useRedux';
import { PATHS } from '@/shared/api/paths';
import { RootState } from '@/store/store';

import styles from './DeviceForm.module.scss';

const DevicePreview = () => {
  const devicePic = useAppSelector((state: RootState) => state.device?.media?.prevImg);
  return (
    <figure className={styles.preview}>
      <img src={devicePic ? `${PATHS.models}${devicePic}` : previewPicture} alt="" />
    </figure>
  );
};

export default DevicePreview;
