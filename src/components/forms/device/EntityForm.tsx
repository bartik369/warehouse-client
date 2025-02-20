import {FC, useEffect} from 'react';
import { useEntity } from '../../../hooks/data/useEntity';
import Input from '../../ui/input/Input';
import BtnAction from '../../ui/buttons/BtnAction';
import Preview from '../../ui/preview/Preview';
import { add, reset, slugInfo } from '../../../utils/constants/constants';
import { ToastContainer, Bounce } from 'react-toastify';
import {slugLabel, nameLabel} from '../../../utils/constants/device';
import { GoPlus } from "react-icons/go";
import { HiMiniXMark } from "react-icons/hi2";
import { BsQuestionSquare } from "react-icons/bs";
import style from './EntityForm.module.scss';

interface IEntityProps {
  typeId: string;
  manufacturerId: string;
  fieldType: string;
};

const EntityForm:FC<IEntityProps> = ({fieldType, typeId, manufacturerId}) => { 
    const { entity, errors, media, fileInputRef, handleMedia, handleInputChange, 
    handleCreateEntity, handleResetEntity} = useEntity();

    useEffect(() => {
      if (fieldType === "model" && (typeId && manufacturerId)) {
        handleInputChange("typeId", typeId); 
        handleInputChange("manufacturerId", manufacturerId); 
      }
    }, [fieldType, typeId, manufacturerId]);

    return (
        <>
         <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
      />
          <div className={style.content}>
            {fieldType === "model" && 
              <div className={style.preview}>
                <Preview media={media.prevImg || ""} ref={fileInputRef} setMedia={handleMedia} />
              </div>
            }
            <form>
              <Input
                onChange={(e) => handleInputChange("name", e.target.value)}
                type="text"
                value={entity.name || ""}
                label={nameLabel}
                errors={errors}
                name="name"
              /> 
               <div className={style.tooltip}>
               <span className={style.tooltip} data-tooltip={slugInfo} tabIndex={0}>
                  <BsQuestionSquare className={style.icon}/>
               </span>
               </div>
               <Input
                onChange={(e) => handleInputChange("slug", e.target.value)}
                type="text"
                value={entity.slug || ""}
                label={slugLabel}
                errors={errors}
                name="slug"
              />
              <div className={style.actions}>
                <BtnAction 
                  icon={<HiMiniXMark />} 
                  type="button" 
                  size="lg" 
                  color="grey" 
                  title={reset}
                  click={handleResetEntity}
                />   
                <BtnAction 
                  icon={<GoPlus />} 
                  type="submit"
                  size="lg" 
                  color="blue" 
                  title={add} 
                  click={(e) => handleCreateEntity(e, fieldType)}
                />
              </div>
            </form>
            </div>
        </>
    );
};

export default EntityForm;