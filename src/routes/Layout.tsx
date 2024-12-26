import { useEffect, useState} from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';
import style from './Layout.module.scss';

const Layout = () => {
    const [isActive, setIsActive] = useState(false);
    const [isSticky, setIsSticky] = useState<boolean>(false);
  
    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 60) {
            setIsSticky(true);
          } else {
            setIsSticky(false);
          }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

    console.log('rerender');
    

    return (
        <div className={style.wrapper}>
            <Sidebar open={isActive} />
            <div className={isActive ? style.active : style['not-active']}>
                <Header isActive={isActive} setIsActive={setIsActive} isSticky={isSticky}/>
                <div className={style.outlet}>
                    <Outlet /> 
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default Layout;