import {FC, useState} from 'react';
import Input from '../../ui/input/Input';
import Select from '../../ui/select/Select';
import { manufacturers } from '../../../utils/constants/device';
import { manufacturersLabel, deviceType, deviceTypeLabel} from '../../../utils/constants/device';
import Textarea from '../../ui/textarea/Textarea';
import { yes, no } from '../../../utils/constants/constants';
import Toggle from '../../ui/checkbox/Toggle';
import Checkbox from '../../ui/checkbox/Checkbox';
import style from './AddDeviceForm.module.scss';

const AddDeviceForm:FC = () => {
    const [device, setDevice] = useState({
        name: '',
        serialNumber: '',
        inventoryNumber: '',
        type: '',
        weight: '',
        media: '',
        location: '',
        manufacturer: '',
        description: '',
    });
    const [checked, setChecked] = useState(false);

    return (
        <form className={style.form}>
           <Input
            onChange={(e) => setDevice({...device, name: e.target.value})}
            type={'text'} 
            value={device.name} 
            label={'Название'} 
           />
           <Input
            onChange={(e) => setDevice({...device, serialNumber: e.target.value})}
            type={'text'} 
            value={device.serialNumber} 
            label={'Серийный номер'} 
           />
            <Input
            onChange={(e) => setDevice({...device, inventoryNumber: e.target.value})}
            type={'text'} 
            value={device.inventoryNumber} 
            label={'Инвентарный номер'} 
           />
           <Select setSelect={(item) => setDevice({
               ...device,
               manufacturer: item
           })}
           items={manufacturers} 
           label={manufacturersLabel}
           />
           <Select  setSelect={(item) => setDevice({
               ...device,
               type: item
           })}
           items={deviceType} 
           label={deviceTypeLabel}
           />
            <Input
            onChange={(e) => setDevice({...device, weight: e.target.value})}
            type={'text'} 
            value={device.weight} 
            label={'Вес'} 
           />
            <Input
            onChange={(e) => setDevice({...device, media: e.target.value})}
            type={'text'} 
            value={device.media} 
            label={'Изображение'} 
           />
            <Input
            onChange={(e) => setDevice({...device, location: e.target.value})}
            type={'text'} 
            value={device.location} 
            label={'Локация'} 
           />
            <Toggle 
                checked={checked} 
                setChecked={() => setChecked(!checked)}
                leftPosition={no}
                rightPosition={yes}
            />
            <Checkbox items={deviceType}/>
            <Textarea setText={(e) => setDevice({
               ...device, description: e.target.value
            })}
            value={device.description}
            label={'Oписание'}
            />
        </form>
    );
};

export default AddDeviceForm;