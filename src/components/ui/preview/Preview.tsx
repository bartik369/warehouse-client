import React, {FC} from 'react';
import previewPicture from '../../../assets/elements/default.png';
import loadIcon from '../../../assets/elements/load.svg';
import style from './Preview.module.scss';

interface IPreviewProps {
    setMedia: (e:React.ChangeEvent<HTMLInputElement>) => void;
    prevImg: string | null;
}
const Preview:FC<IPreviewProps> = ({setMedia, prevImg}) => {
    return (
        <label className={style.file} htmlFor={"upload"}>
           <div className={style.icon}>
               <img src={loadIcon} alt="" />
           </div>
        <img src={prevImg ? prevImg : previewPicture} alt="" />
        <input
            name="file"
            id="upload" 
            type="file"
            accept='image/*'
            hidden
            onChange={(e) => setMedia(e)}
        />
     </label>
    );
};

export default Preview;