import React, {FC} from 'react';
import Input from '../../ui/input/Input';
import BtnAction from '../../ui/buttons/BtnAction';
import Preview from '../../ui/preview/Preview';
import { useAddDevice } from '../../../hooks/data/useAddDevice';
import { manufacturersLabel, modelLabel } from '../../../utils/constants/device';
import { add, addDeviceModelTitle, reset } from '../../../utils/constants/constants';
import { useAddDeviceModel } from '../../../hooks/data/useAddDeviceModel';
import {faPlus, faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import style from './AddModalForm.module.scss';



const AddModalForm:FC = () => {
    const {errors} = useAddDevice();
    const {
      model, 
      media, 
      handleMedia, 
      handleInputChange, 
      handleCreateModel, 
      handleResetModel
    } = useAddDeviceModel()
    return (
        <div className={style.inner}>
          <div className={style.title}>{addDeviceModelTitle}</div>
            <div className={style.content}>
            <div className={style.preview}>
              <Preview setMedia={handleMedia} prevImg={media?.prevImg} />
            </div>
            <form>
              <Input
                onChange={(e) => handleInputChange(e)}
                type={"text"}
                value={model.manufacturer || ''}
                label={manufacturersLabel}
                errors={errors}
                name="manufacturer"
              />
              <Input
                onChange={(e) => handleInputChange(e)}
                type={"text"}
                value={model.name || ''}
                label={modelLabel}
                errors={errors}
                name="name"
              />
              <div className={style.actions}>
                <BtnAction 
                  icon={faCircleXmark} 
                  type='button' 
                  size='lg' 
                  color='grey' 
                  title={reset}
                  click={handleResetModel}
                  
                />   
                <BtnAction 
                  icon={faPlus} 
                  type='submit' 
                  size='lg' 
                  color='red' 
                  title={add} 
                  click={handleCreateModel}
                />
              </div>
            </form>
            </div>
        </div>
    );
};

export default AddModalForm;