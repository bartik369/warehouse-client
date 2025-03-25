import React, {FC} from 'react';
import { Link } from 'react-router-dom';

const Admin:FC = () => {
    return (
        <div>
            <Link to={`/admin/add-device`}>Добавить устройство</Link>
            <Link to={`/admin/add-user`}>Добавить пользователя</Link>
        </div>
    );
};

export default Admin;