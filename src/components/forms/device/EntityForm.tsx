import {FC} from 'react';
import { ToastContainer, Bounce } from 'react-toastify';
import { useEntity } from '../../../hooks/data/useEntity';
import { add, addDeviceManufacturerTitle, reset } from '../../../utils/constants/constants';
import { manufacturersLabel} from '../../../utils/constants/device';
import BtnAction from '../../ui/buttons/BtnAction';
import Input from '../../ui/input/Input';
import {faPlus, faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import style from './DeviceForm.module.scss';

interface IEntityProps {
  fieldType: string;
};

const EntityForm:FC<IEntityProps> = ({fieldType}) => { 
    const {errors, entity, handleInputChange, handleCreateEntity, handleResetEntity,
    } = useEntity();

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
      <div className={style.inner}>
          <div className={style.title}>{
            fieldType === 'manufacturer'
            ? 'Добавление нового производителя'
            : fieldType === 'type'
            ? 'Добавление нового типа'
            : ''
          }</div>
            <div className={style.content}>
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
        </div>
            
        </>
    );
};

export default EntityForm;