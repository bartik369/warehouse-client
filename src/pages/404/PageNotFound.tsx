import { Flex } from 'antd';
import { RiHome3Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/ui/button/Button';

import img404 from '../../assets/elements/404.png';
import styles from './Page404.module.scss';

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <Flex className={styles.container}>
      <div className={styles.block}>
        <img src={img404} />
        <div className={styles.information}>
          <div className={styles.title}>Страница не найдена</div>
          <div className={styles.description}>
            Возможно, она была перемещена, удалена или Вы ошиблись в адресе.
          </div>
          <Button
            color="primary"
            title="На главную"
            icon={<RiHome3Line />}
            iconSize={16}
            onClick={() => navigate('/')}
          />
        </div>
      </div>
    </Flex>
  );
};

export default PageNotFound;
