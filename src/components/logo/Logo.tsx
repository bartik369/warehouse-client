import style from './Logo.module.scss';

interface ILogoProps {
    open: boolean;
}

const Logo = ({ open }:ILogoProps) => {
    return (
        <div className={style.logo}>
            <div className={style.title}>
               {open ? <p>management</p> : ""}
            </div>
            <img src="" alt="" />
        </div>
    );
};

export default Logo;