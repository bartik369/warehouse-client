import AuthForm from '../../forms/auth/AuthForm';
import pic from '../../../assets/elements/pic.jpg'
import { titleSignin } from '../../../utils/constants/constants';
import style from './Signin.module.scss';

const Signin = () => {
    return (
        <div className={style.wrapper}>
            <div className={style.inner}>
                <div className={style.left}>
                    <div className={style.title}>{titleSignin}</div>
                    <img src={pic} alt="" />
                </div>
                <div className={style.right}>
                    <AuthForm />
                </div>
            </div>
        </div>
    );
};

export default Signin;