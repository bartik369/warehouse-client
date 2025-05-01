import {ChangeEvent } from 'react';
import { selectPhoto } from '../../../utils/constants/constants';
import fileIcon from '../../../assets/elements/file-icon.svg';
import style from './File.module.scss';

interface IFileProps {
    media: (e:ChangeEvent<HTMLInputElement>) => void;
}
const File = ({ media }:IFileProps) => {
    return (
        <div>
             <label className={style["file"]} htmlFor={"upload"}>
                 <div className={style.icon}>
                     <img className={style.test} src={fileIcon} alt="" />
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