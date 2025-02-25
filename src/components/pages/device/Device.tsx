import React, {FC, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useGetDeviceQuery } from '../../../store/api/devicesApi';
import {setDeviceInfo} from '../../../store/slices/deviceSlice';
import {useAppDispatch}  from '../../../hooks/redux/useRedux';

const Device:FC = () => {
  const [deviceId, setDeviceId] = useState<string>('')
    
    const params = useParams();
    const [skip, setSkip] = useState(true);
    const {data: device} = useGetDeviceQuery(deviceId, {skip: skip});
    const dispatch = useAppDispatch()

  
    useEffect(() => {
      if (params.id) {
        setDeviceId(params.id);
        setSkip(false)
      }
    }, [params.id]);

    useEffect(() => {
        if (device && device.id) {
            const data = { 
                device: {
                    id: device.id,
                    isAssigned: device.isAssigned,
                    warehouse: {
                        name: device.warehouse.name,
                        slug: device.warehouse.slug
                    }
                },
            }
            dispatch(setDeviceInfo(data))
        }
    }, [device])
  
    return (
        <div>
            device page
        </div>
    );
};

export default Device;