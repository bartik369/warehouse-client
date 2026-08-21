import { Flex } from 'antd';
import { IoDocumentOutline } from 'react-icons/io5';
import { TfiPieChart } from 'react-icons/tfi';

import logo from '../../../assets/elements/logo.png';
import authPick from '../../../assets/elements/pick-auth.png';
import styles from './MangeAuth.module.scss';
import AuthForm from './form/AuthForm';

export const ManageAuth = () => {
  return (
    <Flex className={styles.container}>
      <Flex className={styles.left}>
        <div className={styles.pick}>
          <img src={authPick} />
        </div>
        <Flex gap={30}>
          <Flex className={styles.block}>
            <IoDocumentOutline className={styles.icon} />
            <span className={styles.label}>Контроль</span>
            <span className={styles.description}>История операций</span>
          </Flex>
          <Flex className={styles.block}>
            <TfiPieChart className={styles.icon} />
            <span className={styles.label}>Аналитика</span>
            <span className={styles.description}>Отчеты и аналитика</span>
          </Flex>
        </Flex>
      </Flex>
      <Flex className={styles.right}>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.pick}>
              <img src={logo} alt="logo" />
            </div>
            <div className={styles.info}>
              <h1>IT ASSET PORTAL</h1>
              <span>Портал управления IT-активами</span>
            </div>
          </div>

          <AuthForm />
        </div>
      </Flex>
    </Flex>
  );
};
