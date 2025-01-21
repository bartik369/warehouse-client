import {FC} from 'react';
import Input from '../../ui/input/Input';
import BtnAction from '../../ui/buttons/BtnAction';
import Preview from '../../ui/preview/Preview';
import Select from '../../ui/select/Select';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { useAddDeviceModel } from '../../../hooks/data/useAddDeviceModel';
import { deviceType, deviceTypeLabel, manufacturersLabel, modelLabel } from '../../../utils/constants/device';
import { add, addDeviceModelTitle, reset } from '../../../utils/constants/constants';
import {faPlus, faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import style from './AddModelForm.module.scss';

const AddModalForm:FC = () => {
    const {
      errors,
      model, 
      media,
      fileInputRef,
      selectedValues,
      setItemType,
      handleMedia, 
      handleInputChange, 
      handleCreateModel, 
      handleResetModel,
    } = useAddDeviceModel();

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
          <div className={style.title}>{addDeviceModelTitle}</div>
            <div className={style.content}>
            <div className={style.preview}>
              <Preview  prevImg={media.prevImg} ref={fileInputRef} setMedia={handleMedia} />
            </div>
            <form>
              <Input
                onChange={(e) => handleInputChange('manufacturer', e.target.value)}
                type={"text"}
                value={model.manufacturer || ''}
                label={manufacturersLabel}
                errors={errors}
                name="manufacturer"
              />
              <Input
                onChange={(e) => handleInputChange('name', e.target.value)}
                type={"text"}
                value={model.name || ''}
                label={modelLabel}
                errors={errors}
                name="name"
              />
              <Select
              setValue={(item) => {
                handleInputChange("type", item);
                setItemType(item.value);
              }}
              items={deviceType}
              label={deviceTypeLabel}
              value={selectedValues["type"]}
              errors={errors}
              name="type"
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
        </>
    );
};

export default AddModalForm;