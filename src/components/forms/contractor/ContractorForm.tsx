import Input from '../../ui/input/Input';
import Textarea from '../../ui/textarea/Textarea';
import Actions from '../device/Actions';
import { useContactor } from '../../../hooks/data/useContractor';
import { LABELS } from '../../../utils/constants/ui/labels';
import { PLACEHOLDER_LABELS } from '../../../utils/constants/ui/placeholders';
import styles from './ContractorForm.module.scss';

const ContractorForm = () => {
    const {contractor, errors,  handleInputChange, handleReset, handleCreateContractor} = useContactor();
    return (
        <form>
          <Input 
            type="string" 
            name="name" 
            value={contractor.name} 
            onChange={(e) => handleInputChange("name", e.target.value)}
            label={LABELS.contractorName}
            errors={errors}
          />
          <Input 
            type="tel" 
            name="phoneNumber" 
            value={contractor.phoneNumber}
            placeholder={PLACEHOLDER_LABELS.phoneMask}
            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            label={LABELS.phoneNumber}
            errors={errors}
          />
          <Textarea
            name="address"
            onChange={(e) => handleInputChange("address", e.target.value)}
            value={contractor.address}
            label={LABELS.contractorAddress}
            errors={errors}
          />
          <div className={styles.actions}>
            <Actions
              resetEntity={handleReset}
              addEntity={handleCreateContractor}
            />
          </div>
        </form>
    );
};

export default ContractorForm;