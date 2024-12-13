import React, {FC, useEffect} from 'react';
import { useGetDevicesQuery } from '../../../store/api/devicesApi';

const Devices: FC = () => {
    const {data: devices } = useGetDevicesQuery({skip: true});

    useEffect(() => {
        console.log(devices)
    }, [])

    return (
        <div>
           devices 
        </div>
    );
};

export default Devices;