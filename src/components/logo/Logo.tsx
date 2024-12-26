import {FC} from 'react';
import WarehouseLogo from '../../assets/elements/warehouse-logo.svg'
import style from './Logo.module.scss';

interface ILogoProps {
    open: boolean;
}

const Logo:FC<ILogoProps> = ({open}) => {
    return (
        <div className={style.logo}>
            <div className={style.title}>
               {/* <img src={WarehouseLogo} alt="" /> */}
               {open ? <p>management</p> : ''}
            </div>
            <img src="" alt="" />
        </div>
    );
};

export default Logo;