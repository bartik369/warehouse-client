import React, {FC, forwardRef} from 'react';
import previewPicture from '../../../assets/elements/default.png';
import loadIcon from '../../../assets/elements/load.svg';
import BtnAction from '../buttons/BtnAction';
import style from './Preview.module.scss';

interface IPreviewProps {
    prevImg: string;
    model: string;
    ref?: React.RefObject<HTMLInputElement>
    setMedia: (e:React.ChangeEvent<HTMLInputElement>) => void;
}
const Preview = forwardRef<HTMLInputElement, IPreviewProps>(({ model, prevImg, setMedia }, ref) => {    
    console.log( prevImg);
    
    return (
        <label className={style.file} htmlFor={"upload"}>
           <div className={style.icon}>
               <img src={loadIcon} alt="" />
           </div>
        <img src={prevImg 
            ? `http://localhost:5000/api/models/${prevImg}`
            :  previewPicture
            } alt="Preview" 
        />
        {!model && <input
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