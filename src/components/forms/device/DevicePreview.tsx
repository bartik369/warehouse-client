import { useAppSelector } from '../../../hooks/redux/useRedux';
import previewPicture from '../../../assets/elements/default.png';
import styles from "./DeviceForm.module.scss";

const DevicePreview = () => {
    const devicePic = useAppSelector(state => state.device?.media?.prevImg);
    return (
        <figure className={styles.preview}>
        <img src={devicePic
          ? `/api/models/${devicePic}`
          : previewPicture 
        } alt="" />
      </figure>
    );
};

export default DevicePreview;