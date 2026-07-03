import { useState } from 'react';

import { Input } from 'antd';

import { PLACEHOLDER_LABELS } from '@/utils/constants/ui/placeholders';

import styles from './Search.module.scss';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Input.Search
      placeholder={PLACEHOLDER_LABELS.search}
      allowClear
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className={styles.search}
    />
  );
};

export default Search;
