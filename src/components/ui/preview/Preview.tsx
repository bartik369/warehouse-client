import React, {FC, forwardRef} from 'react';
import previewPicture from '../../../assets/elements/default.png';
import loadIcon from '../../../assets/elements/load.svg';
import style from './Preview.module.scss';

interface IPreviewProps {
    setMedia: (e:React.ChangeEvent<HTMLInputElement>) => void;
    prevImg: string | null;
    ref?: React.RefObject<HTMLInputElement>
}
const Preview = forwardRef<HTMLInputElement, IPreviewProps>(({ setMedia, prevImg }, ref) => {    
    return (
        <label className={style.file} htmlFor={"upload"}>
           <div className={style.icon}>
               <img src={loadIcon} alt="" />
           </div>
        <img src={prevImg || previewPicture} alt="Preview" />
        <input
            ref={ref}
            name="file"
            id="upload" 
            type="file"
            accept='image/*'
            hidden
            onChange={setMedia}
        />
     </label>
    )
});

export default Preview;