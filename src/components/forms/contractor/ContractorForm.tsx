import Input from '../../ui/input/Input';
import Textarea from '../../ui/textarea/Textarea';
import { useContactor } from '../../../hooks/data/useContractor';
import {phoneMaskPlaceholder } from '../../../utils/constants/constants';
import { phoneNumberLabel, contractorNameLabel, contractorAddressLabel} from '../../../utils/constants/device';
import styles from './ContractorForm.module.scss';
import Actions from '../device/Actions';

const ContractorForm = () => {
    const {contractor, errors,  handleInputChange, handleReset, handleCreateContractor} = useContactor();
    return (
        <form>
          <Input 
            type="string" 
            name="name" 
            value={contractor.name} 
            onChange={(e) => handleInputChange("name", e.target.value)}
            label={contractorNameLabel}
            errors={errors}
          />
          <Input 
            type="tel" 
            name="phoneNumber" 
            value={contractor.phoneNumber}
            placeholder={phoneMaskPlaceholder}
            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            label={phoneNumberLabel}
            errors={errors}
          />
          <Textarea
            name="address"
            onChange={(e) => handleInputChange("address", e.target.value)}
            value={contractor.address}
            label={contractorAddressLabel}
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