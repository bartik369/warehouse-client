import { useEffect } from 'react';
import { useEntity } from '../../../hooks/data/useEntity';
import Input from '../../ui/input/Input';
import BtnAction from '../../ui/buttons/BtnAction';
import Preview from '../../ui/preview/Preview';
import { ToastContainer, Bounce } from 'react-toastify';
import { add, reset, slugInfo } from '../../../utils/constants/constants';
import {slugLabel, nameLabel} from '../../../utils/constants/device';
import { GoPlus } from 'react-icons/go';
import { HiMiniXMark } from 'react-icons/hi2';
import { BsQuestionSquare } from "react-icons/bs";
import styles from './EntityForm.module.scss';

interface IEntityProps {
  typeId: string;
  manufacturerId: string;
  fieldType: string;
};

const EntityForm = ({ fieldType, typeId, manufacturerId }:IEntityProps) => { 
    const { fileInputRef, state, actions} = useEntity();

    useEffect(() => {
      if (fieldType === 'model' && (typeId && manufacturerId)) {
        actions.handleInputChange('typeId', typeId); 
        actions.handleInputChange('manufacturerId', manufacturerId); 
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
          <div className={styles.content}>
            {fieldType === "model" && 
              <div className={styles.preview}>
                <Preview media={state.media.prevImg || ""} ref={fileInputRef} actions={actions} />
              </div>
            }
            <form>
              <Input
                onChange={(e) => actions.handleInputChange("name", e.target.value)}
                type="text"
                value={state.entity.name || ""}
                label={nameLabel}
                errors={state.errors}
                name="name"
              /> 
               <span className={styles.tooltip} data-tooltip={slugInfo} tabIndex={0}>
                  <BsQuestionSquare className={styles.icon}/>
               </span>
               <Input
                onChange={(e) => actions.handleInputChange("slug", e.target.value)}
                type="text"
                value={state.entity.slug || ""}
                label={slugLabel}
                errors={state.errors}
                name="slug"
              />
              <div className={styles.actions}>
                <BtnAction 
                  icon={<HiMiniXMark />} 
                  size="lg" 
                  color="grey" 
                  title={reset}
                  click={actions.handleResetEntity}
                />   
                <BtnAction 
                  icon={<GoPlus />} 
                  size="lg" 
                  color="green" 
                  title={add} 
                  click={() => actions.handleCreateEntity(fieldType)}
                />
              </div>
            </form>
            </div>
        </>
    );
};

export default EntityForm;