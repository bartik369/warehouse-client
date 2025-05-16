import ProfileMenu from '../navigates/profile/ProfileMenu';
import style from './Profile.module.scss'

const Profile = () => {
    return (
        <div className={style.profile}>
           <ProfileMenu />
        </div>
    );
};

export default Profile;