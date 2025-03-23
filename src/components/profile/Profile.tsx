import { FC } from 'react';
import ProfileMenu from '../navigates/profile/ProfileMenu';
import style from './Profile.module.scss'

const Profile:FC = () => {
    return (
        <div className={style.profile}>
           <ProfileMenu />
        </div>
    );
};

export default Profile;