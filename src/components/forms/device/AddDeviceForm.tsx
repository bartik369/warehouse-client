import {FC, useState} from 'react';
import Input from '../../ui/input/Input';
import Select from '../../ui/select/Select';
import { manufacturers } from '../../../utils/constants/device';
import { manufacturersLabel, deviceType, deviceTypeLabel} from '../../../utils/constants/device';

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
    });

    console.log(device);
    
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
           <Select items={deviceType} label={deviceTypeLabel} setSelect={(item) => setDevice({
               ...device,
               type: item
           })} />
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
           <Select items={manufacturers} label={manufacturersLabel} setSelect={(item) => setDevice({
               ...device,
               manufacturer: item
           })} />
        </form>
    );
};

export default AddDeviceForm;