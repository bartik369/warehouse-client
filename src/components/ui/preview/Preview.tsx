import React, { forwardRef } from 'react';
import loadIcon from '../../../assets/elements/load.svg';
import previewPicture from '../../../assets/elements/default.png';
import style from './Preview.module.scss';

interface IPreviewProps {
    media: string;
    ref?: React.RefObject<HTMLInputElement>
    setMedia: () => void;
}
const Preview = forwardRef<HTMLInputElement, IPreviewProps>(({ media, setMedia }, ref) => {    
    return (
        <label className={style.file} htmlFor={"upload"}>
           <div className={style.icon}>
               <img src={loadIcon} alt="" />
           </div>
        <img src={media || previewPicture} />
        {<input
            ref={ref}
            name="file"
            id="upload" 
            type="file"
            accept='image/*'
            hidden
            onChange={setMedia}
        />} 
     </label>
    )
});

export default Preview;