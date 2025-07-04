import { memo, useEffect } from 'react';
import { useEntity } from '@/hooks/data/useEntity';
import Input from '@/components/ui/input/Input';
import Actions from './Actions';
import Tooltip from '@/components/ui/tooltip/Tooltip';
import Preview from '@/components/ui/preview/Preview';
import { ToastContainer, Bounce } from 'react-toastify';
import { useGlobalModal } from '@/hooks/data/useGlobalModal';
import { MESSAGES } from '@/utils/constants/ui/messages';
import { LABELS } from '@/utils/constants/ui/labels';
import styles from './EntityForm.module.scss';

interface EntityProps {
  typeId: string;
  manufacturerId: string;
  fieldType: string;
};

const EntityForm = memo(({ fieldType, typeId, manufacturerId }:EntityProps) => { 
    const { fileInputRef, state, actions} = useEntity();
    const { modalType } = useGlobalModal();

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
            {modalType === "model" && 
              <div className={styles.preview}>
                <Preview 
                  media={state.media.prevImg || ""} 
                  ref={fileInputRef} 
                  actions={actions} 
                  state={state} 
                />
              </div>
            }
            <form>
              <Input
                onChange={(e) => actions.handleInputChange("name", e.target.value)}
                type="text"
                value={state.entity.name || ""}
                label={LABELS.deviceName}
                errors={state.errors}
                name="name"
              />
              <Tooltip data={MESSAGES.slugInfo} />
               <Input
                onChange={(e) => actions.handleInputChange("slug", e.target.value)}
                type="text"
                value={state.entity.slug || ""}
                label={LABELS.slug}
                errors={state.errors}
                name="slug"
              />
    
              <div className={styles.actions}>
                <Actions
                  resetEntity={actions.handleResetEntity}
                  addEntity={() => actions.handleCreateEntity(modalType)}
                />
              </div>
            </form>
            </div>
        </>
    );
});

export default EntityForm;