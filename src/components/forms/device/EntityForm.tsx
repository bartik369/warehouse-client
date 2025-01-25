import {FC, useEffect} from 'react';
import { ToastContainer, Bounce } from 'react-toastify';
import { useEntity } from '../../../hooks/data/useEntity';
import BtnAction from '../../ui/buttons/BtnAction';
import Input from '../../ui/input/Input';
import Preview from '../../ui/preview/Preview';
import { add, reset } from '../../../utils/constants/constants';
import { manufacturersLabel} from '../../../utils/constants/device';
import {faPlus, faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import style from './EntityForm.module.scss';
import { IEntity } from '../../../types/devices';

interface IEntityProps {
  typeId: string;
  manufacturerId: string;
  fieldType: string;
};

const EntityForm:FC<IEntityProps> = ({fieldType, typeId, manufacturerId}) => { 
    const { entity, errors, media, fileInputRef, handleMedia,
    handleInputChange, handleCreateEntity, handleResetEntity} = useEntity();

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
            {fieldType === 'model' && 
              <div className={style.preview}>
              <Preview  prevImg={media.prevImg} ref={fileInputRef} setMedia={handleMedia} />
              </div>
            }
            <form>
              <Input
                onChange={(e) => handleInputChange('name', e.target.value)}
                type={"text"}
                value={entity.name || ''}
                label={manufacturersLabel}
                errors={errors}
                name="name"
              />
               <Input
                onChange={(e) => handleInputChange('slug', e.target.value)}
                type={"text"}
                value={entity.slug || ''}
                label={manufacturersLabel}
                errors={errors}
                name="slug"
              />
              <div className={style.actions}>
                <BtnAction 
                  icon={faCircleXmark} 
                  type='button' 
                  size='lg' 
                  color='grey' 
                  title={reset}
                  click={handleResetEntity}
                />   
                <BtnAction 
                  icon={faPlus} 
                  type='submit' 
                  size='lg' 
                  color='red' 
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