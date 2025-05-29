import AuthForm from '../../forms/auth/AuthForm';
import pic from '../../../assets/elements/pic.jpg'
import style from './Signin.module.scss';

const Signin = () => {
    return (
        <div className={style.wrapper}>
            <div className={style.inner}>
            <div className={style.left}>
                    <AuthForm />
                </div>
                <div className={style.right}>
                    {/* <div className={style.title}>{titleSignin}</div> */}
                    <img src={pic} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Signin;