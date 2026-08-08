import { Button, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';

import styles from './IssueList.module.scss';

export const IssueList = () => {
  const navigate = useNavigate();

  return (
    <Flex>
      <div className={styles.header}>
        <Button onClick={() => navigate('/issues/new')}>Новая выдача</Button>
      </div>
    </Flex>
  );
};
