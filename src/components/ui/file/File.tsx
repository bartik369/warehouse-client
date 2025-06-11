import {ChangeEvent } from 'react';
import { selectPhoto } from '../../../utils/constants/constants';
import fileIcon from '../../../assets/elements/file-icon.svg';
import styles from './File.module.scss';

interface IFileProps {
    media: (e:ChangeEvent<HTMLInputElement>) => void;
}
const File = ({ media }:IFileProps) => {
    return (
        <div>
             <label className={styles.file} htmlFor={"upload"}>
                 <div className={styles.icon}>
                     <img className={styles.test} src={fileIcon} alt="" />
                 </div>
                 <span>{selectPhoto}</span>
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