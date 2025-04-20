import Input from '../../ui/input/Input';
import Textarea from '../../ui/textarea/Textarea';
import BtnAction from '../../ui/buttons/BtnAction';
import { useContactor } from '../../../hooks/data/useContractor';
import { add, reset, phoneMaskPlaceholder } from '../../../utils/constants/constants';
import { phoneNumberLabel, contractorNameLabel, contractorAddressLabel} from '../../../utils/constants/device';
import { HiMiniXMark } from 'react-icons/hi2';
import { GoPlus } from 'react-icons/go';
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
            setText={(e) => handleInputChange("address", e.target.value)}
            value={contractor.address}
            label={contractorAddressLabel}
            errors={errors}
          />
          <div className={styles.actions}>
                <BtnAction 
                  icon={<HiMiniXMark />} 
                  size="lg" 
                  color="grey" 
                  title={reset}
                  click={handleReset}
                />   
                <BtnAction 
                  icon={<GoPlus />} 
                  size="lg" 
                  color="blue" 
                  title={add} 
                  click={handleCreateContractor}
                />
              </div>
        </form>
    );
};

export default ContractorForm;