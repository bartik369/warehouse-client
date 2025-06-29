import { ChangeEvent } from 'react';
import fileIcon from '@/assets/elements/file-icon.svg';
import { ELEMENTS_LABELS } from '@/utils/constants/ui/elements';
import styles from './File.module.scss';

interface FileProps {
    media: (e:ChangeEvent<HTMLInputElement>) => void;
}
const File = ({ media }:FileProps) => {
    return (
        <div>
             <label className={styles.file} htmlFor={"upload"}>
                 <div className={styles.icon}>
                     <img className={styles.test} src={fileIcon} alt="" />
                 </div>
                 <span>{ELEMENTS_LABELS.selectPhoto}</span>
            </label>
            <input
                name="file"
                id="upload" 
                type="file"
                hidden
                onChange={(e) => media(e)}
            />
        </div>
    );
};

export default File;