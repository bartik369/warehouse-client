import {ChangeEvent, FC, useState} from 'react';
import Input from '../../ui/input/Input';
import Select from '../../ui/select/Select';
import { manufacturers } from '../../../utils/constants/device';
import { manufacturersLabel, deviceType, deviceTypeLabel} from '../../../utils/constants/device';
import Textarea from '../../ui/textarea/Textarea';
import { yes, no } from '../../../utils/constants/constants';
import { locations } from '../../../utils/constants/device';
import Toggle from '../../ui/checkbox/Toggle';
import Checkbox from '../../ui/checkbox/Checkbox';
import File from '../../ui/file/File';
import style from './AddDeviceForm.module.scss';
import Preview from '../../ui/preview/Preview';
import Number from '../../ui/number/Number';
import { IDevice, ISelectedItem } from '../../../types/devices';
import { deviceTypes } from '../../../utils/constants/device';
import CustomNumber from '../../ui/number/CustomNumber';

const AddDeviceForm:FC = () => {
    const [device, setDevice] = useState<IDevice>({
        title: '',
        serialNumber: '',
        modelCode: '',
        inventoryNumber: '',
        type: '',
        weight: 0,
        screenSize: 0,
        memorySize: 0,
        serviceable: true,
        media: '',
        location: '',
        manufacturer: '',
        inStock: true,
        description: ''
    });
    const [media, setMedia] = useState<string | Blob>('');
    const [prevImg, setPrevImg] = useState<string | null>('');
    const [checked, setChecked] = useState(false);

    const [itemType, setItemType] = useState<string>('');
    

    const mediaHandler = (e:ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setMedia(file);
            setPrevImg(URL.createObjectURL(file));
        }
    }
    const numberHandler = (num: number) => {
        setDevice({...device, weight: num})
    }
    const extNumberHandler = (num: number, name: string) => {
        console.log(num);
        
        setDevice((prevDevice) => ({
            ...prevDevice,
            [name]: num,
        }));
    }
    const typeSwitchHandler = (name: string, type: string) => {
      name && setItemType(type);
    }
    
    return (
        <>
        <div className={style.title}>Добавление нового устройства</div>
        <div className={style.info}>
         <div className={style.picture}>
            <Preview setMedia={mediaHandler} prevImg={prevImg} />
         </div>
        <form className={style.form}>
           <Input
            onChange={(e) => setDevice({...device, title: e.target.value})}
            type={'text'} 
            value={device.title} 
            label={'Название'} 
           />
            <Select  
                setSelect={(item) => {
                    setDevice({...device, type: item.name});
                    typeSwitchHandler(item.name, item.value);
                }}
                items={deviceType} 
                label={deviceTypeLabel}
           />
            <Select 
                setSelect={(item) => {
                    setDevice({...device, manufacturer: item.name});
                    typeSwitchHandler(item.name, item.value);
                }}
                items={manufacturers} 
                label={manufacturersLabel}
           />
            <Checkbox items={deviceType} label='Тип устройства'/>
           <Input
            onChange={(e) => setDevice({...device, serialNumber: e.target.value})}
            type={'text'} 
            value={device.serialNumber || ''} 
            label={'Серийный номер'} 
           />
            <Input
            onChange={(e) => setDevice({...device, inventoryNumber: e.target.value})}
            type={'text'} 
            value={device.inventoryNumber || ''} 
            label={'Инвентарный номер'} 
           />
           <Number 
                device={device} 
                setDevice={numberHandler} 
           />
           {itemType && deviceTypes[itemType].uniqueFields.map((item) => (
             <CustomNumber
                key={item.name}
                device={device} 
                setDevice={extNumberHandler}
                item={item} 
            />
            ))}
             <Select 
                setSelect={(item) => {
                    setDevice({...device, location: item.name})
                    typeSwitchHandler(item.name, item.value);
                }}
                items={locations} 
                label={'Локация'}
           />
            <Textarea setText={(e) => setDevice({
               ...device, description: e.target.value
            })}
            value={device.description || ''}
            label={'Oписание'}
            />
        </form>
        </div>
        </>
         
    );
};

export default AddDeviceForm;

 {/* <File media={mediaHandler}/> */}
           {/* <Toggle 
                checked={checked} 
                setChecked={() => setChecked(!checked)}
                leftPosition={no}
                rightPosition={yes}
            /> */}