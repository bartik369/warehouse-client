import { Link } from 'react-router-dom';

const Admin = () => {
    return (
        <div>
            <Link to={`/admin/add-device`}>Добавить устройство</Link>
            <Link to={`/admin/add-user`}>Добавить пользователя</Link>
        </div>
    );
};

export default Admin;