import React, {FC} from 'react';
import { Link } from 'react-router-dom';
import style from './Admin.module.scss';

const Admin:FC = () => {
    return (
        <div>
            <Link to={`/device/add`}>Добавить устройство</Link>
        </div>
    );
};

export default Admin;