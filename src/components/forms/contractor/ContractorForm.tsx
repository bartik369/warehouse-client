import React, {useState} from 'react';
import Input from '../../ui/input/Input';
import Textarea from '../../ui/textarea/Textarea';
import BtnAction from '../../ui/buttons/BtnAction';
import { useContactor } from '../../../hooks/data/useContractor';

const ContractorForm = () => {
    const {contractor, handleInputChange, errors} = useContactor()
    return (
        <form>
          <Input 
          type='string' 
          name='name' 
          value={contractor.name} 
          onChange={(e) => handleInputChange("name", e.target.value)}
          placeholder='Укажите имя'
          label='Имя подрядчика'
          errors={errors}
          />
           <Input 
          type='string' 
          name='phoneNumber' 
          value={contractor.phoneNumber} 
          onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
          placeholder='Укажите телефон'
          label='Телефон подрядчика'
          errors={errors}
          />
          <Textarea 
           setText={(e) => handleInputChange("address", e.target.value)}
           value={contractor.address}
           label='укажите адрес'
          />
        </form>
    );
};

export default ContractorForm;